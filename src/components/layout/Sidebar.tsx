import { LayoutGrid, FolderGit2, Terminal, Cpu, Settings, type LucideIcon } from 'lucide-react';
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

    </aside>
  );
}
