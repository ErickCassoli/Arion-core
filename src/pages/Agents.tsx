import { AgentCard } from '../components/agents/AgentCard';
import type { Agent } from '../types/agent';
import { Plus } from 'lucide-react';

const agents: Agent[] = [
  { id: '1', name: 'MarketBot', type: 'Research', status: 'running', uptime: '3d 12h', lastAction: 'Scraping competitor data' },
  { id: '2', name: 'WriterBot', type: 'Content', status: 'stopped', uptime: '0s', lastAction: 'Waitng for tasks' },
  { id: '3', name: 'SocialBot', type: 'Engagement', status: 'running', uptime: '5h 30m', lastAction: 'Replying to comments' },
  { id: '4', name: 'TradeBot', type: 'Finance', status: 'error', uptime: '1h 15m', lastAction: 'Connection timeout' },
];

export default function Agents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
          <p className="text-muted-foreground mt-1">Monitor and control your autonomous agents.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> Deploy Agent
        </button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
         ))}
      </div>
    </div>
  );
}
