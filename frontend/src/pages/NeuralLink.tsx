import { useState } from 'react';
import { Send, Bot, Paperclip, Terminal, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function NeuralLink() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'user', content: 'Analyze the performance logs for Project Pegasus.', tools: [] as any[] },
    { 
        id: 2, 
        role: 'agent', 
        content: 'Accessing latest log files from the secure vault.',
        tools: [
            { 
                name: 'read_file', 
                args: { path: '/logs/pegasus/latest.log' }, 
                result: 'Access Granted. File size: 4.2MB',
                status: 'success'
            }
        ]
    },
    { id: 3, role: 'agent', content: 'I found 3 critical anomalies in the trading execution block. It seems like latency spikes are causing slippage.', tools: [] },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = { id: Date.now(), role: 'user', content: input, tools: [] };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Mock response
    setTimeout(() => {
        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            role: 'agent',
            content: 'Processing your request...',
            tools: []
        }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-display font-bold text-white">Neural Link</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-accent-green" />
                <span>Uplink Established</span>
            </div>
        </div>

      <div className="flex-1 glass-panel flex flex-col overflow-hidden relative">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((msg) => (
                <div key={msg.id} className={clsx("flex gap-4 max-w-4xl", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
                    <div className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        msg.role === 'agent' ? "bg-accent/20 border border-accent/30 text-accent" : "bg-gray-700 border border-gray-600 text-gray-300"
                    )}>
                        {msg.role === 'agent' ? <Bot size={20} /> : <div className="text-xs font-bold">ME</div>}
                    </div>
                    
                    <div className={clsx("space-y-2 max-w-[80%]", msg.role === 'user' && "flex flex-col items-end")}>
                        <div className={clsx(
                            "p-4 rounded-2xl text-sm leading-relaxed",
                            msg.role === 'agent' ? "bg-white/5 border border-white/5 text-gray-200" : "bg-accent/10 border border-accent/20 text-white rounded-tr-sm"
                        )}>
                            {msg.content}
                        </div>

                        {/* Tool Usage Badges (Agent Only) */}
                        {msg.role === 'agent' && msg.tools && msg.tools.map((tool, idx) => (
                            <ToolBadge key={idx} tool={tool} />
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-bg-secondary/50 backdrop-blur-sm">
            <div className="relative">
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder="Transmit instructions to Arion..." 
                    className="w-full bg-bg-tertiary border border-border rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-gray-200 placeholder-gray-600"
                />
                <button 
                    onClick={handleSend}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                >
                    <Send size={18} />
                </button>
                <button className="absolute right-14 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-300 transition-colors">
                    <Paperclip size={20} />
                </button>
            </div>
            <div className="flex justify-center mt-2">
                <div className="text-[10px] text-gray-600 font-mono flex items-center gap-2">
                    <span className="px-1 border border-white/10 rounded">ENTER</span> to send
                    <span className="px-1 border border-white/10 rounded">SHIFT + ENTER</span> for new line
                </div>
            </div>
        </div>

        {/* File Drop Overlay (Implicit) */}
      </div>
    </div>
  );
}

function ToolBadge({ tool }: { tool: any }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="rounded-lg border border-border bg-black/20 overflow-hidden w-full max-w-lg">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <Terminal size={12} className="text-accent" />
                    <span className="text-gray-300 font-bold">{tool.name}</span>
                    <span className="text-gray-600">call</span>
                </div>
                {isOpen ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="border-t border-border/50 bg-black/40 text-xs font-mono p-3 space-y-2 overflow-hidden"
                    >
                        <div>
                            <span className="text-blue-400">args:</span>
                            <pre className="text-gray-400 mt-1 pl-2 border-l border-white/10">
                                {JSON.stringify(tool.args, null, 2)}
                            </pre>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 text-green-400 mb-1">
                                <CheckCircle2 size={10} />
                                <span>result:</span>
                            </div>
                            <pre className="text-gray-300 pl-2 border-l border-white/10 whitespace-pre-wrap">
                                {tool.result}
                            </pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
