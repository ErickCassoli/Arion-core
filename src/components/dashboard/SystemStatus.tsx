import { Server, Cpu, Database } from 'lucide-react';

export function SystemStatus() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <Server className="h-5 w-5 text-primary" />
        System Status
      </h3>
      
      <div className="space-y-6">
        {/* CPU Usage */}
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>CPU Usage</span>
            <span className="font-medium">45%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>

        {/* Memory Usage */}
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>Memory Usage</span>
            <span className="font-medium">2.4 GB / 8 GB</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>

        {/* API Latency */}
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-green-500" />
            <span className="text-sm">API Latency</span>
          </div>
          <span className="text-sm font-bold text-green-500">24ms</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Node Status</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
