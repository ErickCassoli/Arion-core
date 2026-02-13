import { Activity, Terminal, ShieldAlert, Zap, Clock } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-white">Command Center</h1>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 rounded-lg transition-all font-mono text-sm">
                <ShieldAlert size={16} /> EMERGENCY STOP
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white hover:bg-accent-hover rounded-lg transition-all font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Zap size={16} /> Spawn Agent
            </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: 'Active Agents', value: '12', sub: '+2 spawning', icon: Terminal, color: 'text-accent' },
            { label: 'Pending Tasks', value: '48', sub: '12 high priority', icon: Clock, color: 'text-orange-400' },
            { label: 'Total Cost', value: '$4.20', sub: '+$0.12 / hr', icon: Activity, color: 'text-green-400' },
            { label: 'System Uptime', value: '99.9%', sub: '24h 12m', icon: Zap, color: 'text-blue-400' },
        ].map((kpi, i) => (
          <div key={i} className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <kpi.icon size={48} />
            </div>
            <div>
                <span className="text-gray-400 text-sm font-medium">{kpi.label}</span>
                <div className={`text-4xl font-mono font-bold mt-2 ${kpi.color} drop-shadow-sm`}>{kpi.value}</div>
            </div>
            <span className="text-xs text-gray-500 mt-4 font-mono">{kpi.sub}</span>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="glass-panel p-6">
        <h2 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
            <Activity size={18} className="text-accent" />
            Live Activity Feed
        </h2>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4 items-start p-3 rounded-lg hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-accent">
                    <div className="mt-1 min-w-[60px] text-xs font-mono text-gray-500">10:42:{10+i}</div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-300">Agent-00{i}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">EXECUTING</span>
                        </div>
                        <p className="text-sm text-gray-400">Initiated data scraping sequence on target <span className="text-gray-300">`finance-v2`</span>.</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
