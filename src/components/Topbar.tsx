import { Search, Bell, Plus, Command } from 'lucide-react';

export function Topbar() {
  return (
    <div className="h-16 border-b border-border bg-bg/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Command Center */}
      <div className="flex items-center gap-3 text-gray-500 bg-bg-secondary px-3 py-1.5 rounded-md border border-border w-96 hover:border-accent/30 transition-colors group cursor-text">
        <Search size={14} className="group-hover:text-accent transition-colors" />
        <span className="text-xs group-hover:text-gray-300">Search or type command...</span>
        <div className="ml-auto flex gap-1">
          <kbd className="bg-bg-tertiary px-1.5 py-0.5 rounded text-[10px] border border-border font-mono text-gray-400">CTRL</kbd>
          <kbd className="bg-bg-tertiary px-1.5 py-0.5 rounded text-[10px] border border-border font-mono text-gray-400">K</kbd>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white relative transition-colors">
          <Bell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border-2 border-bg"></span>
        </button>
        <div className="h-6 w-px bg-border"></div>
        <button className="bg-white text-bg hover:bg-gray-200 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors">
          <Plus size={14} /> 
          <span>Create Task</span>
        </button>
      </div>
    </div>
  );
}
