import { useEffect, useState } from 'react';
import { ArrowRight, BarChart3, Mail, Code, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import KanbanBoard from '../components/modules/KanbanBoard';
import { useProjectStore } from '../stores/useProjectStore';

const getIcon = (type: string) => {
    switch (type) {
        case 'trading': return BarChart3;
        case 'automation': return Mail;
        case 'security': return Code;
        default: return Box;
    }
};

export default function Projects() {
  const { projects, fetchProjects, isLoading } = useProjectStore();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
      fetchProjects();
  }, [fetchProjects]);

  const selectedProject = projects.find(p => p.id === selectedProjectId);

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
            {isLoading ? (
                <div className="col-span-3 text-center text-gray-500 py-12">Loading operations...</div>
            ) : projects.map((p) => {
                const Icon = getIcon(p.type);
                return (
                  <div 
                    key={p.id} 
                    onClick={() => setSelectedProjectId(p.id)}
                    className="glass-panel p-6 h-64 hover:border-accent/50 transition-colors cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Icon size={100} />
                    </div>
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                        <Icon size={24} className="text-accent" />
                      </div>
                      <div className={`px-2 py-1 text-xs rounded border font-mono ${p.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                        {p.status.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-6">{p.description || 'No description provided.'}</p>
                        
                        <div className="flex items-center text-sm text-accent opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                            View Dashboard <ArrowRight size={14} className="ml-1" />
                        </div>
                    </div>
                  </div>
                );
            })}
          </motion.div>
        ) : (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-panel p-8 min-h-[600px]"
            >
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => setSelectedProjectId(null)} className="text-gray-400 hover:text-white">
                        &larr; Back to Grid
                    </button>
                    <h2 className="text-2xl font-bold text-white">{selectedProject.name} Dashboard</h2>
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
