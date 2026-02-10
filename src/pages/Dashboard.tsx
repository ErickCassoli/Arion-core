import { useEffect, useState } from 'react';
import { MoreVertical, Clock, Plus, AlertCircle, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { TaskService } from '../services/api';

// Tipagem básica para evitar erros de TS se o projeto for estrito
interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  tag?: string;
  created_at?: string;
  source_url?: string;
}

const COLUMNS = {
  todo: { label: 'To Do', color: 'border-blue-500/50', badge: 'bg-blue-500/10 text-blue-400' },
  in_progress: { label: 'In Progress', color: 'border-accent/50', badge: 'bg-accent/10 text-accent' },
  done: { label: 'Done', color: 'border-success/50', badge: 'bg-success/10 text-success' }
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      // Tenta buscar da API, se falhar, usa dados locais para não quebrar a tela
      try {
          const data = await TaskService.getAll();
          setTasks(data);
          setError('');
      } catch (e) {
          console.warn("API Offline, loading fallback data");
          setTasks([
              { id: 1, title: 'Interface Visual v5.0 (Offline Mode)', status: 'in_progress', priority: 'high', tag: 'Frontend' },
              { id: 2, title: 'Connect Backend API', status: 'todo', priority: 'high', tag: 'Backend' }
          ]);
          setError('Offline Mode');
      }
    } catch (err) {
      console.error("Critical failure:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white flex items-center gap-3">
            Task Board
            {loading && <Loader2 size={16} className="animate-spin text-gray-500" />}
          </h1>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
            Active Neural Operations
            {error && <span className="text-amber-500 flex items-center gap-1"><AlertCircle size={10}/> {error}</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => loadTasks()} className="px-3 py-1.5 rounded-md bg-bg-secondary border border-border text-xs text-gray-300 hover:text-white transition-colors">Sync</button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-[1000px]">
          {Object.entries(COLUMNS).map(([key, col]) => (
            <div key={key} className="flex-1 flex flex-col bg-bg-secondary/30 rounded-lg border border-border/50">
              <div className={clsx("p-3 border-b border-border flex justify-between items-center border-l-2 bg-bg-secondary/50", col.color)}>
                <span className="font-medium text-gray-300 text-xs uppercase tracking-wider">{col.label}</span>
                <span className="bg-bg-tertiary text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-mono">
                  {tasks.filter(t => t.status === key).length}
                </span>
              </div>

              <div className="p-3 space-y-3 overflow-y-auto flex-1 scrollbar-thin">
                {tasks.filter(t => t.status === key).map(task => (
                  <div key={task.id} className="bg-bg-tertiary p-4 rounded border border-border hover:border-gray-500/50 transition-all cursor-pointer shadow-sm group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-3 relative z-10">
                      <span className={clsx("text-[10px] px-1.5 py-0.5 rounded border font-medium", 
                        task.tag === 'Frontend' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        task.tag === 'Backend' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                      )}>
                        {task.priority || 'Normal'}
                      </span>
                      <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    
                    <h3 className="text-sm font-medium text-gray-200 leading-snug mb-3 relative z-10 group-hover:text-white transition-colors">{task.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
