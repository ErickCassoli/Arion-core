import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './services/db.js';
import { spawn } from 'node-pty';
import os from 'os';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Initialize DB
await db.read();
db.data ||= { projects: [], settings: { theme: 'dark', refreshRate: 1000 } };
await db.write();

// API Routes
app.get('/api/projects', async (req, res) => {
    await db.read();
    res.json(db.data.projects);
});

app.post('/api/projects', async (req, res) => {
    // Basic creation logic
    const newProject = req.body;
    db.data.projects.push(newProject);
    await db.write();
    io.emit('projects:update', db.data.projects);
    res.status(201).json(newProject);
});

app.get('/api/stats', async (req, res) => {
    await db.read();
    const projects = db.data.projects;
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const totalTasks = projects.reduce((acc, p) => acc + (p.tasks?.length || 0), 0);

    res.json({
        activeAgents: 0, // Placeholder until Agent Service is ready
        activeProjects,
        pendingTasks: totalTasks,
        uptime: process.uptime()
    });
});

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });

    // Terminal Spawn
    socket.on('terminal:spawn', (dims) => {
        const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
        const ptyProcess = spawn(shell, [], {
            name: 'xterm-color',
            cols: dims?.cols || 80,
            rows: dims?.rows || 30,
            cwd: process.cwd(),
            env: process.env as any
        });

        socket.on('terminal:data', (data) => {
            ptyProcess.write(data);
        });

        ptyProcess.onData((data) => {
            socket.emit('terminal:output', data);
        });

        socket.on('disconnect', () => {
            ptyProcess.kill();
        });
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Nexus Bridge API running on port ${PORT}`);
});
