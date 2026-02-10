import { LayoutGrid, FolderGit2, Terminal, Cpu, Settings, LogOut, type LucideIcon } from 'lucide-react';
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
      <div className="h-20 flex items-center px-6 border-b border-border/50 gap-4 bg-gradient-to-r from-bg-dark-purple/50 to-transparent">
        <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.3)] border border-accent-purple/30 group cursor-pointer hover:scale-105 transition-transform overflow-hidden">
             {/* Users should check src/assets/logo.png */}
             <img src="/arion-logo.png" alt="Arion" className="w-full h-full object-cover" onError={(e) => {
                 // Fallback if image is missing
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.parentElement!.innerText = 'A';
             }}/>
        </div>
        <div>
          <div className="font-display font-bold text-white tracking-wide text-base flex items-baseline gap-1">
            ARION <span className="text-accent-purple font-sans font-light text-xs">CORE</span>
          </div>
          <div className="text-[10px] text-gray-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
            <span>ONLINE</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium group relative overflow-hidden",
                isActive
                  ? "text-white bg-gradient-to-r from-accent-purple/20 to-transparent border border-border-purple/50"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              )
            }
          >
            {({ isActive }) => (
                <>
                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-purple shadow-[0_0_10px_#7c3aed]"></div>}
                    <item.icon size={18} className={clsx("transition-colors", isActive ? "text-accent-purple" : "group-hover:text-accent-purple")} />
                    <span>{item.label}</span>
                </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 bg-bg-dark-purple/30">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-tertiary/50 border border-border hover:border-accent-purple/30 transition-colors group">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gray-700 overflow-hidden border border-gray-600 group-hover:border-accent-purple transition-colors">
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
