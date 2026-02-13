import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';

export interface Project {
    id: string; // uuid
    name: string;
    type: 'trading' | 'automation' | 'security' | 'generic';
    status: 'active' | 'paused' | 'archived';
    description?: string;
    path?: string; // Caminho físico no disco
    repoUrl?: string;

    // Kanban
    columns: { id: string; title: string; taskIds: string[] }[];
    tasks: { id: string; content: string; tags: string[] }[];

    // Activity Feed
    feed: { id: string; message: string; timestamp: string; type: 'log' | 'alert' | 'success' }[];
}

export interface Schema {
    projects: Project[];
    settings: { theme: string; refreshRate: number };
}

// Default Data
const defaultData: Schema = {
    projects: [],
    settings: { theme: 'dark', refreshRate: 1000 }
};

const file = path.join(process.cwd(), 'db.json');
const adapter = new JSONFile<Schema>(file);
export const db = new Low<Schema>(adapter, defaultData);
