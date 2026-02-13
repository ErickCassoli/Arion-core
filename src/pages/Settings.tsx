import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold text-white">System Settings</h1>
      
      <div className="glass-panel p-8 max-w-2xl">
        <h2 className="text-xl font-bold text-gray-200 mb-6">Global Configuration</h2>
        
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">API Endpoint</label>
                <input type="text" value="wss://api.arion.ai/v3/stream" disabled className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-gray-400 font-mono text-sm" />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-gray-300">Dark Protocol Theme</span>
                <span className="text-accent text-sm">Active</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-gray-300">Neural Link Voice Mode</span>
                <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-gray-500 rounded-full" />
                </div>
            </div>

            <div className="pt-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors font-medium">
                    <Save size={16} /> Save Changes
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
