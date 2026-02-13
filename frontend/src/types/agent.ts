export interface Agent {
    id: string;
    name: string;
    type: string;
    status: 'running' | 'stopped' | 'error';
    uptime: string;
    lastAction: string;
    avatar?: string;
}
