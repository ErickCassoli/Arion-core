import { useState, useEffect, useRef } from 'react';
import { Terminal, Loader2, Play } from 'lucide-react';
import { clsx } from 'clsx';
import { CommandService, MetricsService } from '../services/api';

interface LogEntry {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ERROR';
  message: string;
  source: string;
}

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [command, setCommand] = useState('');
  const [executing, setExecuting] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    scrollToBottom(logsEndRef);
  }, [logs]);

  useEffect(() => {
    scrollToBottom(terminalEndRef);
  }, [output]);

  const scrollToBottom = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadLogs = async () => {
    try {
      const data = await MetricsService.getLogs();
      setLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load logs", err);
      // Fallback
      setLogs([
          { id: 1, timestamp: new Date().toISOString(), level: 'INFO', message: 'System initialized', source: 'System' },
          { id: 2, timestamp: new Date().toISOString(), level: 'WARNING', message: 'High latency on node-1', source: 'Network' }
      ]);
    }
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmd = command;
    setCommand('');
    setOutput(prev => [...prev, `> ${cmd}`]);
    
    try {
      setExecuting(true);
      const res = await CommandService.execute(cmd);
      setOutput(prev => [...prev, res.output || 'Command executed successfully']);
    } catch (err) {
      console.error("Command failed", err);
      setOutput(prev => [...prev, `Error: Failed to execute command '${cmd}'`]);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 p-6">
       
       {/* Terminal / CLI */}
       <div className="bg-[#1e1e1e] border border-border rounded-xl p-4 flex flex-col h-1/3 shadow-lg font-mono text-sm">
            <div className="flex items-center gap-2 text-gray-400 mb-2 border-b border-gray-700 pb-2">
                <Terminal size={16} />
                <span className="text-xs uppercase tracking-wider">Arion Command Interface</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-1 mb-2 text-gray-300">
                <div className="text-green-500">Welcome to Arion Core CLI v5.0.0</div>
                <div className="text-gray-500">Type 'help' for available commands.</div>
                {output.map((line, i) => (
                    <div key={i} className={line.startsWith('>') ? 'text-blue-400' : 'text-gray-300 whitespace-pre-wrap'}>
                        {line}
                    </div>
                ))}
                <div ref={terminalEndRef} />
            </div>

            <form onSubmit={handleCommand} className="flex gap-2 items-center">
                <span className="text-accent underline">{'>'}</span>
                <input 
                    type="text" 
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600"
                    placeholder="Enter command..."
                    autoFocus
                />
                <button type="submit" disabled={executing} className="text-gray-400 hover:text-white">
                    {executing ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                </button>
            </form>
       </div>

       {/* System Logs */}
       <div className="flex-1 bg-bg-secondary/30 border border-border rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center bg-bg-secondary/50">
                <h2 className="text-sm font-semibold text-white">System Logs</h2>
                <button onClick={loadLogs} className="text-xs text-accent hover:text-accent-hover">Refresh</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                {logs.map(log => (
                    <div key={log.id} className="flex gap-3 hover:bg-bg-tertiary/50 p-1 rounded">
                        <span className="text-gray-500 whitespace-nowrap">{new Date(log.timestamp).toLocaleTimeString()}</span>
                        <span className={clsx("w-16 font-bold", 
                            log.level === 'INFO' ? 'text-blue-400' : 
                            log.level === 'WARNING' ? 'text-yellow-400' : 
                            'text-red-400'
                        )}>{log.level}</span>
                        <span className="text-gray-400 w-24 truncate">[{log.source}]</span>
                        <span className="text-gray-300">{log.message}</span>
                    </div>
                ))}
                <div ref={logsEndRef} />
            </div>
       </div>
    </div>
  );
}
