import { MoreHorizontal, Plus } from 'lucide-react';

const tasks = {
  backlog: [
    { id: 1, title: 'Analyze market trends', tag: 'Research', color: 'bg-blue-500' },
    { id: 2, title: 'Update dependencies', tag: 'Maint', color: 'bg-gray-500' },
  ],
  planning: [
    { id: 3, title: 'Design DB Schema', tag: 'Arch', color: 'bg-purple-500' },
  ],
  inProgress: [
    { id: 4, title: 'Implement WebSocket', tag: 'Dev', color: 'bg-yellow-500' },
    { id: 5, title: 'Fix Layout Bugs', tag: 'Fix', color: 'bg-red-500' },
  ],
  done: [
    { id: 6, title: 'Setup Repo', tag: 'DevOps', color: 'bg-green-500' },
  ]
};

export default function KanbanBoard() {
  return (
    <div className="h-full flex gap-4 overflow-x-auto custom-scrollbar pb-2">
        <Column title="Backlog" tasks={tasks.backlog} />
        <Column title="Planning" tasks={tasks.planning} />
        <Column title="In Progress" tasks={tasks.inProgress} />
        <Column title="Done" tasks={tasks.done} />
    </div>
  );
}

function Column({ title, tasks }: { title: string, tasks: any[] }) {
    return (
        <div className="min-w-[250px] bg-black/20 rounded-lg p-3 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-sm font-bold text-gray-300">{title}</span>
                <button className="text-gray-500 hover:text-white transition-colors">
                    <Plus size={14} />
                </button>
            </div>
            <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {tasks.map(task => (
                    <div key={task.id} className="bg-bg-secondary p-3 rounded border border-white/5 hover:border-accent/50 transition-all cursor-grab active:cursor-grabbing group">
                        <div className="flex justify-between items-start mb-2">
                             <div className={`text-[10px] px-2 py-0.5 rounded-full text-white/90 ${task.color}`}>
                                {task.tag}
                             </div>
                             <button className="text-gray-600 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal size={14} />
                             </button>
                        </div>
                        <p className="text-sm text-gray-200 font-medium leading-snug">{task.title}</p>
                        <div className="mt-3 flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-[10px] text-accent font-bold border border-accent/30">
                                AI
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
