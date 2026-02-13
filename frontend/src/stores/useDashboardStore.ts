import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

interface DashboardStats {
    activeAgents: number;
    activeProjects: number;
    pendingTasks: number;
    uptime: number;
}

interface DashboardStore {
    stats: DashboardStats;
    isLoading: boolean;
    fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => {
    return {
        stats: { activeAgents: 0, activeProjects: 0, pendingTasks: 0, uptime: 0 },
        isLoading: false,
        fetchStats: async () => {
            set({ isLoading: true });
            try {
                const response = await axios.get(`${API_URL}/stats`);
                set({ stats: response.data, isLoading: false });
            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
                set({ isLoading: false });
            }
        },
    };
});
