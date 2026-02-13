export interface Task {
    id: string;
    title: string;
    agent: string;
    status: 'pending' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
}
