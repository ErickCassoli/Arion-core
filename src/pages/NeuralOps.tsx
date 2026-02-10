import { Zap, Brain, Activity as ActivityIcon } from 'lucide-react';

export default function NeuralOps() {
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
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Token Usage</p>
              <h3 className="text-2xl font-mono text-white mt-1">154,320</h3>
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
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Memory Depth</p>
              <h3 className="text-2xl font-mono text-white mt-1">1,240 <span className="text-sm text-gray-500">lines</span></h3>
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
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">System Health</p>
              <h3 className="text-2xl font-mono text-success mt-1">STABLE</h3>
            </div>
            <ActivityIcon size={20} className="text-success" />
          </div>
          <p className="text-[10px] text-gray-500 mt-2 relative z-10">Last Heartbeat: 2s ago</p>
        </div>
      </div>
    </div>
  );
}
