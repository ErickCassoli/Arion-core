import axios from 'axios';

// Em produção, isso deve apontar para o IP/Domínio do seu Backend na AWS
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const TaskService = {
  getAll: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  create: async (task: any) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },
  update: async (id: number, updates: any) => {
    // Implementar no backend se necessário
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
  }
};

export const FileService = {
  listFiles: async () => {
    const response = await api.get('/files');
    return response.data;
  },
  readFile: async (path: string) => {
    // Codifica o path para evitar problemas na URL
    const response = await api.get(`/files/content?path=${encodeURIComponent(path)}`);
    return response.data.content;
  },
  saveFile: async (path: string, content: string) => {
    const response = await api.post('/files/save', { path, content });
    return response.data;
  }
};

export const CommandService = {
  execute: async (command: string) => {
    const response = await api.post('/execute', { command });
    return response.data;
  }
};

export const MetricsService = {
  getSystemStatus: async () => {
    const response = await api.get('/status'); // Ou /metrics
    return response.data;
  },
  getLogs: async () => {
    const response = await api.get('/logs');
    return response.data;
  }
};
