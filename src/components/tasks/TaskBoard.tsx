import type { Task } from '../../types/task';
import { cn } from '../../lib/utils';
import { MoreHorizontal, Clock } from 'lucide-react';

const tasks: Task[] = [
  { id: '1', title: 'Analyze competitor pricing', agent: 'MarketBot', status: 'in-progress', priority: 'high', createdAt: '2h ago' },
  { id: '2', title: 'Scrape new product data', agent: 'ScraperBot', status: 'pending', priority: 'medium', createdAt: '4h ago' },
  { id: '3', title: 'Generate weekly report', agent: 'ReporterBot', status: 'done', priority: 'low', createdAt: '1d ago' },
  { id: '4', title: 'Monitor brand mentions', agent: 'SocialBot', status: 'in-progress', priority: 'medium', createdAt: '30m ago' },
  { id: '5', title: 'Update database schema', agent: 'System', status: 'pending', priority: 'high', createdAt: '5h ago' },
];

const columns = [
  { id: 'pending', title: 'Pending', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { id: 'done', title: 'Done', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
];

export function TaskBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      {columns.map((col) => (
        <div key={col.id} className="flex flex-col h-full rounded-xl bg-card border border-border/50">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={cn("w-2 h-2 rounded-full", col.id === 'pending' ? 'bg-yellow-500' : col.id === 'in-progress' ? 'bg-blue-500' : 'bg-green-500')} />
              <h3 className="font-semibold">{col.title}</h3>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            {tasks.filter(t => t.status === col.id).map((task) => (
              <div key={task.id} className="p-3 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded border uppercase font-medium",
                    task.priority === 'high' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                    task.priority === 'medium' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                    "bg-slate-500/10 text-slate-500 border-slate-500/20"
                  )}>
                    {task.priority}
                  </span>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-sm font-medium mb-1 line-clamp-2">{task.title}</h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">
                        {task.agent.charAt(0)}
                    </span>
                    <span>{task.agent}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{task.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
