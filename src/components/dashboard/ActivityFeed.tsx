import { Activity, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const activities = [
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
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Recent Activity</h3>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
            <div className="mt-1">
              {activity.type === 'success' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              {activity.type === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
              {activity.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
              {activity.type === 'info' && <Activity className="h-4 w-4 text-blue-500" />}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
