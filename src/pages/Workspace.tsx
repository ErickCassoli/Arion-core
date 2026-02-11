import { useState, useEffect } from 'react';
import { Folder, FileCode, Save, ChevronRight, ChevronDown, Loader2, File as FileIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { FileService } from '../services/api';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

export default function Workspace() {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoadingFiles(true);
      const data = await FileService.listFiles();
      setFiles(data);
    } catch (err) {
      console.error("Failed to load files", err);
      // Fallback data
      setFiles([
          { name: 'src', path: 'src', type: 'directory', children: [
              { name: 'main.py', path: 'src/main.py', type: 'file' },
              { name: 'utils.py', path: 'src/utils.py', type: 'file' }
          ]},
          { name: 'requirements.txt', path: 'requirements.txt', type: 'file' }
      ]);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleFileClick = async (path: string) => {
    try {
      setSelectedFile(path);
      setLoadingContent(true);
      const content = await FileService.readFile(path);
      setFileContent(content);
    } catch (err) {
        console.error("Failed to read file", err);
        setFileContent("# Error loading file content or file is binary.");
    } finally {
      setLoadingContent(false);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    try {
      setSaving(true);
      await FileService.saveFile(selectedFile, fileContent);
      // Show toast success here
      alert("File saved successfully!"); 
    } catch (err) {
      console.error("Failed to save file", err);
      alert("Failed to save file.");
    } finally {
      setSaving(false);
    }
  };

  const toggleFolder = (path: string) => {
      const next = new Set(expandedFolders);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      setExpandedFolders(next);
  };

  const renderTree = (nodes: FileNode[], depth = 0) => {
      return nodes.map(node => (
          <div key={node.path} style={{ paddingLeft: `${depth * 12}px` }}>
              <div 
                className={clsx(
                    "flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors text-sm",
                    selectedFile === node.path ? "bg-accent/20 text-accent" : "hover:bg-bg-tertiary text-gray-400 hover:text-gray-200"
                )}
                onClick={() => node.type === 'directory' ? toggleFolder(node.path) : handleFileClick(node.path)}
              >
                  {node.type === 'directory' && (
                      expandedFolders.has(node.path) ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                  )}
                  {node.type === 'directory' ? <Folder size={14} className="text-blue-400" /> : <FileCode size={14} className="text-yellow-400" />}
                  <span>{node.name}</span>
              </div>
              {node.type === 'directory' && expandedFolders.has(node.path) && node.children && (
                  <div>{renderTree(node.children, depth + 1)}</div>
              )}
          </div>
      ));
  };

  return (
    <div className="flex h-full border-t border-border">
      {/* File Tree */}
      <div className="w-64 bg-bg-secondary border-r border-border flex flex-col">
        <div className="p-3 border-b border-border font-semibold text-xs text-gray-400 uppercase tracking-wider">
            Explorer
        </div>
        <div className="flex-1 overflow-y-auto p-2">
            {loadingFiles ? (
                <div className="flex justify-center p-4"><Loader2 className="animate-spin text-gray-500" /></div>
            ) : (
                renderTree(files)
            )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-bg">
        {selectedFile ? (
            <>
                <div className="h-10 border-b border-border flex items-center justify-between px-4 bg-bg-secondary/50">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <FileIcon size={14} />
                        {selectedFile}
                    </div>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-3 py-1 bg-accent text-white rounded text-xs hover:bg-accent-hover disabled:opacity-50 transition-colors"
                    >
                        {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                        Save
                    </button>
                </div>
                <div className="flex-1 relative">
                    {loadingContent ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-bg/50 backdrop-blur-sm z-10">
                            <Loader2 className="animate-spin text-accent" size={32} />
                        </div>
                    ) : null}
                     <textarea
                        className="w-full h-full bg-bg text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none"
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        spellCheck={false}
                    />
                </div>
            </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <FileCode size={48} className="mb-4 opacity-20" />
                <p>Select a file to edit</p>
            </div>
        )}
      </div>
    </div>
  );
}
