import { LayoutGrid, FolderGit2, Terminal, Cpu, Settings, LogOut, LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: LayoutGrid, label: 'Overview', path: '/' },
  { icon: FolderGit2, label: 'Workspace', path: '/workspace' },
  { icon: Terminal, label: 'Activity', path: '/logs' },
  { icon: Cpu, label: 'System Ops', path: '/ops' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-full bg-bg-secondary border-r border-border flex flex-col flex-shrink-0">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-border gap-3">
        <div className="w-8 h-8 rounded bg-accent text-white flex items-center justify-center font-bold font-mono shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          A
        </div>
        <div>
          <div className="font-display font-bold text-white tracking-wide text-sm">ARION <span className="text-gray-500 font-sans font-normal">ATLAS</span></div>
          <div className="text-[10px] text-accent uppercase tracking-widest">v5.0 Core</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="p-4 space-y-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm font-medium",
                isActive
                  ? "bg-accent/10 text-accent border-l-2 border-accent"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
              )
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-bg-tertiary/50 border border-border">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
              <img src="https://i.imgur.com/vHq492H.jpeg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-bg-secondary animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">Arion Agent</div>
            <div className="text-[10px] text-gray-500 font-mono">ID: 8a2f...9c</div>
          </div>
          <button className="text-gray-500 hover:text-white transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
