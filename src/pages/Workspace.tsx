import { Folder, ChevronRight, ChevronDown, FileJson, FileCode } from 'lucide-react';
import { useState } from 'react';

const fileTree = [
  { 
    name: 'src', 
    type: 'folder', 
    children: [
        { name: 'agents', type: 'folder', children: [
            { name: 'trader.ts', type: 'file' },
            { name: 'researcher.ts', type: 'file' },
        ]},
        { name: 'config.json', type: 'file' },
    ]
  },
  { name: 'package.json', type: 'file' },
];

export default function Workspace() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-display font-bold text-white">Workspace</h1>
        <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-500">Connected to:</span>
            <span className="px-2 py-1 bg-accent/10 border border-accent/20 rounded text-xs text-accent font-mono">localhost:3000</span>
        </div>
      </div>
      
      <div className="flex-1 glass-panel flex overflow-hidden">
        {/* Sidebar / File Tree */}
        <div className="w-64 border-r border-white/5 bg-black/20 p-4 overflow-y-auto">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pl-2">Explorer</div>
            {fileTree.map((item, i) => (
                <FileTreeItem key={i} item={item} />
            ))}
        </div>

        {/* Code View */}
        <div className="flex-1 flex flex-col bg-[#0d1117]">
            {/* Tabs */}
            <div className="flex items-center bg-bg-secondary border-b border-white/5">
                <div className="px-4 py-2 text-sm text-gray-200 bg-[#0d1117] border-t-2 border-accent flex items-center gap-2">
                    <FileCode size={14} className="text-blue-400" />
                    trader.ts
                </div>
                <div className="px-4 py-2 text-sm text-gray-500 hover:bg-white/5 cursor-pointer flex items-center gap-2">
                     <FileJson size={14} className="text-yellow-400" />
                     config.json
                </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 p-4 font-mono text-sm overflow-auto text-gray-300">
                <div className="flex gap-4">
                    <div className="text-gray-600 select-none text-right min-w-[20px]">
                        1<br/>2<br/>3<br/>4<br/>5<br/>6
                    </div>
                    <div>
                        <span className="text-purple-400">import</span> {'{'} Agent {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@arion/core'</span>;<br/>
                        <br/>
                        <span className="text-purple-400">export class</span> <span className="text-yellow-400">TraderAgent</span> <span className="text-purple-400">extends</span> Agent {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-purple-400">constructor</span>() {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">super</span>(<span className="text-green-400">'trader'</span>);<br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function FileTreeItem({ item, depth = 0 }: { item: any, depth?: number }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div style={{ paddingLeft: depth * 12 }}>
            <div 
                className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-white/5 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {item.type === 'folder' && (
                    <span className="text-gray-600">
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                )}
                {item.type === 'folder' ? <Folder size={14} className="text-blue-400" /> : <FileCode size={14} className="text-gray-500" />}
                <span className="text-sm">{item.name}</span>
            </div>
            {item.type === 'folder' && isOpen && item.children && (
                <div>
                    {item.children.map((child: any, i: number) => (
                        <FileTreeItem key={i} item={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}
