import { Bell, Flame, Wifi, Search } from 'lucide-react';


export default function Header() {
  return (
    <header className="h-16 border-b border-border bg-bg/80 backdrop-blur-md fixed top-0 right-0 left-64 z-40 flex items-center justify-between px-6">
      {/* Left: Global Search/Context */}
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search agents, projects, or logs..." 
            className="w-full bg-bg-tertiary border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
          />
        </div>
      </div>

      {/* Right: Status Indicators */}
      <div className="flex items-center gap-6">
        {/* Token Burn Rate */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
          <Flame size={14} className="text-orange-500 animate-pulse" />
          <span className="text-xs font-mono text-orange-400">$0.0024/s</span>
        </div>

        {/* WebSocket Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-green/10 border border-accent-green/20 rounded-full">
          <Wifi size={14} className="text-accent-green" />
          <span className="text-xs font-mono text-accent-green">CONNECTED</span>
          <div className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse ml-1" />
        </div>

        <div className="w-px h-6 bg-border" />

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-bg" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-gray-200">Admin User</div>
            <div className="text-xs text-gray-500">System Architect</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-purple-600 border border-white/10" />
        </div>
      </div>
    </header>
  );
}
