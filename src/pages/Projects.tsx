import { useState } from 'react';
import { ArrowRight, BarChart3, Mail, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import KanbanBoard from '../components/modules/KanbanBoard';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-display font-bold text-white">Mission Control</h1>
            <p className="text-gray-400 text-sm mt-1">Manage and monitor active agent swarms.</p>
        </div>
        <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          + New Operation
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
                { id: 1, name: 'Project Pegasus', type: 'Trading', icon: BarChart3, desc: 'High-frequency crypto arbitrage swarm.' },
                { id: 2, name: 'Outreach Bot', type: 'Automation', icon: Mail, desc: 'Cold email automation and lead qualification.' },
                { id: 3, name: 'Security Sentinel', type: 'Security', icon: Code, desc: 'Vulnerability scanning and patch management.' }
            ].map((p) => (
              <div 
                key={p.id} 
                onClick={() => setSelectedProject(p.id)}
                className="glass-panel p-6 h-64 hover:border-accent/50 transition-colors cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <p.icon size={100} />
                </div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <p.icon size={24} className="text-accent" />
                  </div>
                  <div className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded border border-green-500/20 font-mono">
                    ACTIVE
                  </div>
                </div>
                
                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-6">{p.desc}</p>
                    
                    <div className="flex items-center text-sm text-accent opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        View Dashboard <ArrowRight size={14} className="ml-1" />
                    </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-panel p-8 min-h-[600px]"
            >
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white">
                        &larr; Back to Grid
                    </button>
                    <h2 className="text-2xl font-bold text-white">Project Dashboard (Stub)</h2>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-6">
                        <div className="h-64 bg-black/20 rounded-lg border border-white/5 p-4 flex items-center justify-center text-gray-500">
                            Chart Visualization Area
                        </div>
                        {/* Task Board / Kanban Integration */}
                        <div className="h-96 bg-black/20 rounded-lg border border-white/5 p-4 flex flex-col">
                             <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Task Board</h3>
                             <div className="flex-1 overflow-hidden">
                                 <KanbanBoard />
                             </div>
                        </div>
                    </div>
                    <div className="col-span-1 space-y-6">
                        <div className="h-full bg-black/20 rounded-lg border border-white/5 p-4 flex items-center justify-center text-gray-500">
                            Chat / Agent Interlink
                        </div>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
