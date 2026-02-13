import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Bot, 
  BrainCircuit, 
  FolderTree, 
  Settings, 
  Activity,
  Cpu,
  HardDrive
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FolderKanban, label: 'Projects', path: '/projects' },
  { icon: Bot, label: 'Agent Hive', path: '/hive' },
  { icon: BrainCircuit, label: 'Neural Link', path: '/neural' },
  { icon: FolderTree, label: 'Workspace', path: '/workspace' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen bg-bg-secondary border-r border-border flex flex-col fixed left-0 top-0 z-50"
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 border-b border-border/50">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-accent rounded-full border-t-transparent"
          />
          <div className="w-4 h-4 bg-accent/20 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-lg tracking-wider text-gray-100">NEXUS</span>
          <span className="text-[10px] text-gray-400 tracking-[0.2em]">ARION V3</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
              isActive 
                ? "text-accent bg-accent/10 border border-border-purple" 
                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-accent/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <item.icon size={18} className={clsx("relative z-10 transition-colors", isActive && "drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]")} />
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <div className="absolute right-2 w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_#8b5cf6]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Host Status Widget */}
      <div className="p-4 border-t border-border/50 bg-bg-tertiary/30">
        <div className="flex items-center gap-2 mb-3 text-xs font-mono text-gray-500 uppercase tracking-wider">
          <Activity size={12} className="text-accent-green" />
          <span>Host Status</span>
        </div>
        
        <div className="space-y-3">
          <StatusItem icon={Cpu} label="CPU" value="12%" color="bg-accent" />
          <StatusItem icon={Bot} label="RAM" value="4.2GB" color="bg-accent-green" />
          <StatusItem icon={HardDrive} label="DSK" value="82%" color="bg-orange-500" />
        </div>
      </div>
    </motion.aside>
  );
}

function StatusItem({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 text-gray-400">
        <Icon size={12} />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-bg rounded-full overflow-hidden">
          <div className={`h-full ${color} w-[60%] rounded-full`} />
        </div>
        <span className="font-mono text-gray-300 w-8 text-right">{value}</span>
      </div>
    </div>
  );
}
