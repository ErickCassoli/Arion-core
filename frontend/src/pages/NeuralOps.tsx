import { useEffect, useState } from 'react';
import { Zap, Brain, Activity as ActivityIcon } from 'lucide-react';
import { MetricsService } from '../services/api';

export default function NeuralOps() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    MetricsService.getSystemStatus().then(setMetrics).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <header className="mb-8">
        <h2 className="text-xl font-semibold text-white">Neural Operations</h2>
        <p className="text-sm text-gray-500">Deep System Diagnostics</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={48} /></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">CPU Load</p>
              <h3 className="text-2xl font-mono text-white mt-1">{metrics?.cpu_load || '---'}</h3>
            </div>
            <Zap size={20} className="text-warning" />
          </div>
          <div className="w-full bg-bg h-1.5 rounded-full overflow-hidden relative z-10">
            <div className="bg-warning h-full w-[45%]"></div>
          </div>
        </div>

        <div className="bg-bg-secondary border border-border rounded-xl p-5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10"><Brain size={48} /></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Memory</p>
              <h3 className="text-2xl font-mono text-white mt-1">{metrics?.memory_usage || '---'}</h3>
            </div>
            <Brain size={20} className="text-accent" />
          </div>
          <div className="w-full bg-bg h-1.5 rounded-full overflow-hidden relative z-10">
            <div className="bg-accent h-full w-[70%]"></div>
          </div>
        </div>

        <div className="bg-bg-secondary border border-border rounded-xl p-5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10"><ActivityIcon size={48} /></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Node Link</p>
              <h3 className="text-sm font-mono text-success mt-2">{metrics?.node_link || 'Scanning...'}</h3>
            </div>
            <ActivityIcon size={20} className="text-success" />
          </div>
          <p className="text-[10px] text-gray-500 mt-2 relative z-10">Last Heartbeat: just now</p>
        </div>
      </div>
    </div>
  );
}
