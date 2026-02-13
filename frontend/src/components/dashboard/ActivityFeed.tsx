import { useEffect, useState } from 'react';
import { Activity, CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import { useSocket } from '../../hooks/useSocket';

interface LogEntry {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  time: string;
}

const INITIAL_ACTIVITIES: LogEntry[] = [
  {
    id: 1,
    type: 'success',
    message: 'Agent "ResearchBot" completed task "Analyze Market Trends"',
    time: '2 mins ago',
  },
  {
    id: 2,
    type: 'error',
    message: 'Agent "WriterBot" failed to connect to OpenAI API',
    time: '15 mins ago',
  },
  {
    id: 3,
    type: 'info',
    message: 'System update available (v2.1.0)',
    time: '1 hour ago',
  },
  {
    id: 4,
    type: 'warning',
    message: 'High memory usage detected on Node #3',
    time: '2 hours ago',
  },
];

export function ActivityFeed() {
  const [activities, setActivities] = useState<LogEntry[]>(INITIAL_ACTIVITIES);
  const { lastEvent } = useSocket();

  useEffect(() => {
    if (lastEvent?.event === 'log_entry') {
        const newLog = lastEvent.data[0];
        setActivities(prev => [
            {
                id: Date.now(),
                type: newLog.level === 'ERROR' ? 'error' : newLog.level === 'WARNING' ? 'warning' : 'info',
                message: newLog.message,
                time: 'Just now'
            },
            ...prev.slice(0, 49) // Keep last 50
        ]);
    }
  }, [lastEvent]);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Recent Activity</h3>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-4 overflow-y-auto flex-1 pr-2 scrollbar-thin">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0 animate-in fade-in slide-in-from-left-5 duration-300">
            <div className="mt-1">
              {activity.type === 'success' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              {activity.type === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
              {activity.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
              {activity.type === 'info' && <Info className="h-4 w-4 text-blue-500" />}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">{activity.message}</p>
              <p className="text-[10px] text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
