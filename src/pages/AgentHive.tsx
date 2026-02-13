import { Bot, Power, RefreshCw, Terminal } from 'lucide-react';

export default function AgentHive() {
  const agents = [
    { id: 'AG-01', name: 'MarketPulse', role: 'Data Analysis', status: 'executing', uptime: '4d 2h' },
    { id: 'AG-02', name: 'OutreachPro', role: 'Communication', status: 'thinking', uptime: '12h 30m' },
    { id: 'AG-03', name: 'CodeGuard', role: 'Security', status: 'error', uptime: '1d 4h' },
    { id: 'AG-04', name: 'ContentGen', role: 'Creative', status: 'idle', uptime: '2h 15m' },
    { id: 'AG-05', name: 'DataMiner', role: 'Research', status: 'executing', uptime: '5d 12h' },
    { id: 'AG-06', name: 'SupportBot', role: 'Customer Service', status: 'thinking', uptime: '3d 1h' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-display font-bold text-white">Agent Hive</h1>
            <p className="text-gray-400 text-sm mt-1">Live monitoring of autonomous agent processes.</p>
         </div>
         <div className="flex gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <div className="w-2 h-2 rounded-full bg-accent-green" /> Executing
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Thinking
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="glass-panel p-6 relative overflow-hidden group">
             {/* Background glow based on status */}
             <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full opacity-10 transition-colors
                ${agent.status === 'executing' ? 'bg-accent-green' : 
                  agent.status === 'thinking' ? 'bg-blue-500' :
                  agent.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                }
             `} />

             <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                            <Bot className={`${
                                agent.status === 'executing' ? 'text-accent-green' :
                                agent.status === 'thinking' ? 'text-blue-500' :
                                agent.status === 'error' ? 'text-red-500' : 'text-gray-400'
                            }`} size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-200">{agent.name}</h3>
                            <span className="text-xs text-gray-500 font-mono">{agent.id}</span>
                        </div>
                    </div>
                    <StatusBadge status={agent.status} />
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Role</span>
                        <span className="text-gray-300">{agent.role}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Uptime</span>
                        <span className="text-gray-300 font-mono">{agent.uptime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Memory</span>
                        <span className="text-gray-300 font-mono">142 MB</span>
                    </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/5">
                    <button className="flex-1 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 text-gray-300 rounded border border-white/5 flex items-center justify-center gap-2 transition-colors">
                        <Terminal size={12} /> Terminal
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Restart">
                        <RefreshCw size={14} />
                    </button>
                    <button className="p-1.5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors" title="Kill Process">
                        <Power size={14} />
                    </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        executing: 'text-accent-green bg-accent-green/10 border-accent-green/20',
        thinking: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
        error: 'text-red-400 bg-red-400/10 border-red-400/20',
        idle: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
    };
    
    // safe property access in case status is unknown, though types are basic here
    // @ts-ignore
    const activeStyle = styles[status] || styles.idle;

    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${activeStyle} flex items-center gap-1.5`}>
            {status === 'thinking' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
            {status === 'executing' && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
            {status === 'error' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />}
            {status}
        </span>
    );
}
