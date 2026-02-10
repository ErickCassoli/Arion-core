import { LayoutDashboard, CheckSquare, Bot, Cpu } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { SystemStatus } from '../components/dashboard/SystemStatus';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Overview of your OpenClaw agents & tasks.</p>
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                Last updated: Just now
            </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Active Agents" 
          value={3} 
          icon={Bot} 
          trend="+1" 
          trendUp={true} 
        />
        <StatCard 
          title="Pending Tasks" 
          value={12} 
          icon={CheckSquare} 
          trend="-2" 
          trendUp={true} 
        />
        <StatCard 
          title="Total Tokens" 
          value="1.4M" 
          icon={Cpu} 
          trend="+15%" 
          trendUp={false} 
        />
         <StatCard 
          title="Success Rate" 
          value="98.5%" 
          icon={LayoutDashboard} 
          trend="+0.5%" 
          trendUp={true} 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-3">
            <SystemStatus />
        </div>
      </div>
    </div>
  );
}
