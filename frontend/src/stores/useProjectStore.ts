import { create } from 'zustand';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = 'http://localhost:3001/api';
const SOCKET_URL = 'http://localhost:3001';

export interface Project {
    id: string;
    name: string;
    type: 'trading' | 'automation' | 'security' | 'generic';
    status: 'active' | 'paused' | 'archived';
    description?: string;
    repoUrl?: string;
    columns: any[];
    tasks: any[];
    feed: any[];
}

interface ProjectStore {
    projects: Project[];
    isLoading: boolean;
    fetchProjects: () => Promise<void>;
    addProject: (project: Partial<Project>) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => {
    const socket = io(SOCKET_URL);

    socket.on('projects:update', (updatedProjects: Project[]) => {
        set({ projects: updatedProjects });
    });

    return {
        projects: [],
        isLoading: false,
        fetchProjects: async () => {
            set({ isLoading: true });
            try {
                const response = await axios.get(`${API_URL}/projects`);
                set({ projects: response.data, isLoading: false });
            } catch (error) {
                console.error('Failed to fetch projects:', error);
                set({ isLoading: false });
            }
        },
        addProject: async (project) => {
            try {
                await axios.post(`${API_URL}/projects`, project);
                // State update happens via socket event 'projects:update'
            } catch (error) {
                console.error('Failed to add project:', error);
            }
        },
    };
});
