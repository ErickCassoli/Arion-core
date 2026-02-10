import { MoreVertical, Clock, Plus, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

const TASKS = [
  { id: 1, title: 'Interface Visual v5.0 (Atlas Core)', status: 'in_progress', priority: 'high', tag: 'Frontend' },
  { id: 6, title: 'Email Reporting System', status: 'todo', priority: 'high', tag: 'Backend' },
  { id: 2, title: 'Audit: openclaw-remote', status: 'todo', priority: 'medium', tag: 'Security' },
  { id: 3, title: 'Audit: stealthy-auto-browse', status: 'todo', priority: 'medium', tag: 'Security' },
];

const COLUMNS = {
  todo: { label: 'To Do', color: 'border-blue-500/50', badge: 'bg-blue-500/10 text-blue-400' },
  in_progress: { label: 'In Progress', color: 'border-accent/50', badge: 'bg-accent/10 text-accent' },
  done: { label: 'Done', color: 'border-success/50', badge: 'bg-success/10 text-success' }
};

export default function Dashboard() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Task Board</h1>
          <p className="text-xs text-gray-500 mt-1">Active Neural Operations</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-md bg-bg-secondary border border-border text-xs text-gray-300 hover:text-white transition-colors">Filter</button>
          <button className="px-3 py-1.5 rounded-md bg-bg-secondary border border-border text-xs text-gray-300 hover:text-white transition-colors">Sort</button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-[1000px]">
          {Object.entries(COLUMNS).map(([key, col]) => (
            <div key={key} className="flex-1 flex flex-col bg-bg-secondary/30 rounded-lg border border-border/50">
              {/* Column Header */}
              <div className={clsx("p-3 border-b border-border flex justify-between items-center border-l-2 bg-bg-secondary/50", col.color)}>
                <span className="font-medium text-gray-300 text-xs uppercase tracking-wider">{col.label}</span>
                <span className="bg-bg-tertiary text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-mono">
                  {TASKS.filter(t => t.status === key).length}
                </span>
              </div>

              {/* Task List */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1 scrollbar-thin">
                {TASKS.filter(t => t.status === key).map(task => (
                  <div key={task.id} className="bg-bg-tertiary p-4 rounded border border-border hover:border-gray-500/50 transition-all cursor-pointer shadow-sm group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    
                    <div className="flex justify-between items-start mb-3 relative z-10">
                      <span className={clsx("text-[10px] px-1.5 py-0.5 rounded border font-medium", 
                        task.tag === 'Frontend' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        task.tag === 'Backend' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      )}>
                        {task.tag}
                      </span>
                      <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    
                    <h3 className="text-sm font-medium text-gray-200 leading-snug mb-3 relative z-10 group-hover:text-white transition-colors">{task.title}</h3>
                    
                    <div className="flex items-center gap-3 text-gray-500 text-xs relative z-10">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>2d</span>
                      </div>
                      {task.priority === 'high' && (
                        <div className="flex items-center gap-1 text-warning">
                           <AlertCircle size={12} />
                           <span>High</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 ml-auto">
                        <div className="w-5 h-5 rounded-full bg-accent text-[8px] text-white flex items-center justify-center font-bold ring-2 ring-bg-tertiary">A</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-2 text-xs text-gray-500 hover:text-accent hover:bg-accent/5 rounded border border-dashed border-gray-700 hover:border-accent/30 transition-all flex items-center justify-center gap-2 group">
                  <Plus size={12} className="group-hover:scale-110 transition-transform" /> Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
