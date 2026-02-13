import type { Agent } from '../../types/agent';
import { Play, Square, RotateCw, Activity, Terminal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col justify-between h-full hover:border-primary/50 transition-colors">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Terminal className="h-5 w-5" />
             </div>
             <div>
               <h3 className="font-semibold text-lg">{agent.name}</h3>
               <p className="text-xs text-muted-foreground">{agent.type}</p>
             </div>
          </div>
          <div className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-medium border",
            agent.status === 'running' ? "bg-green-500/10 text-green-500 border-green-500/20" :
            agent.status === 'stopped' ? "bg-slate-500/10 text-slate-500 border-slate-500/20" :
            "bg-red-500/10 text-red-500 border-red-500/20"
          )}>
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uptime</span>
                <span className="font-mono">{agent.uptime}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Action</span>
                <span className="truncate max-w-[150px]" title={agent.lastAction}>{agent.lastAction}</span>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-border">
         <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {agent.status === 'running' ? <Square className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
            {agent.status === 'running' ? 'Stop' : 'Start'}
         </button>
         <button className="p-2 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors" title="Restart">
            <RotateCw className="h-4 w-4" />
         </button>
         <button className="p-2 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors" title="Logs">
            <Activity className="h-4 w-4" />
         </button>
      </div>
    </div>
  );
}
