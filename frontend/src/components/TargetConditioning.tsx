import React, { useState } from 'react';
import { UploadCloud, File, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface TargetConditioningProps {
  onStartPipeline: (prompt: string) => void;
  isLoading?: boolean;
}

export const TargetConditioning: React.FC<TargetConditioningProps> = ({ onStartPipeline, isLoading = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [textTarget, setTextTarget] = useState('');
  const [activeTab, setActiveTab] = useState<'file' | 'sequence' | 'database'>('file');
  const [rawSequence, setRawSequence] = useState('');
  const [dbFetchId, setDbFetchId] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-sm border border-white/10 shadow-sm p-5 space-y-5">
      <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
        <Activity className="text-cyan-400 w-4 h-4" />
        <h2 className="text-xs font-bold text-gray-100 tracking-wider uppercase">Target Conditioning</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <label className="block text-xs font-bold text-gray-100 uppercase tracking-wider">Computational Backend / Model Registry</label>
          <div className="relative">
            <select 
              className="w-full p-3 border border-white/10 bg-black/20 text-gray-100 rounded-sm focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-sm appearance-none cursor-pointer"
              defaultValue="cloud"
            >
              <option value="cloud" className="bg-slate-900">ESMFold2 / Hugging Face API (Active Cloud)</option>
              <option value="local" className="bg-slate-900">H.O.L.M.E.S. Custom-Engine-v1 (Local Cluster - Enqueued)</option>
              <option value="alpha" className="bg-slate-900">De Novo Synthesis Engine v2 (Alpha-Testing)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <div className="inline-block bg-white/5 text-gray-400 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm border border-white/10">
            * Enqueued models are part of next phase
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-6 border-b border-white/10">
            <button
              onClick={() => setActiveTab('file')}
              className={cn(
                "pb-2 text-xs font-bold uppercase tracking-wider transition-colors relative",
                activeTab === 'file' ? "text-cyan-400" : "text-gray-400 hover:text-gray-300"
              )}
            >
              File Upload
              {activeTab === 'file' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(8,145,178,0.8)]"></span>}
            </button>
            <button
              onClick={() => setActiveTab('sequence')}
              className={cn(
                "pb-2 text-xs font-bold uppercase tracking-wider transition-colors relative",
                activeTab === 'sequence' ? "text-cyan-400" : "text-gray-400 hover:text-gray-300"
              )}
            >
              Raw Sequence
              {activeTab === 'sequence' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(8,145,178,0.8)]"></span>}
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={cn(
                "pb-2 text-xs font-bold uppercase tracking-wider transition-colors relative",
                activeTab === 'database' ? "text-cyan-400" : "text-gray-400 hover:text-gray-300"
              )}
            >
              Database Fetch
              {activeTab === 'database' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(8,145,178,0.8)]"></span>}
            </button>
          </div>

          <div className="h-48">
            {activeTab === 'file' && (
              <div 
                className={cn(
                  "relative flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-sm transition-colors",
                  dragActive ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 bg-black/20 hover:bg-white/5"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="flex flex-col items-center space-y-2 text-cyan-400">
                    <File className="w-10 h-10" />
                    <span className="text-sm font-medium text-gray-100">{file.name}</span>
                    <button onClick={() => setFile(null)} className="text-xs text-red-400 hover:text-red-300 hover:underline">Remove</button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                    <UploadCloud className="w-10 h-10 mb-3 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-300"><span className="font-semibold text-gray-100">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">PDB, CIF, or FASTA formats</p>
                  </div>
                )}
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleChange} accept=".pdb,.cif,.fasta" />
              </div>
            )}

            {activeTab === 'sequence' && (
              <textarea
                className="w-full h-full p-4 border border-white/10 bg-black/20 text-gray-100 rounded-sm focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none text-sm placeholder:text-gray-600"
                placeholder="e.g., MKWVTFISLLFLFSSAYSRGV..."
                value={rawSequence}
                onChange={(e) => setRawSequence(e.target.value)}
              />
            )}

            {activeTab === 'database' && (
              <div className="w-full h-full p-4 border border-white/10 bg-black/20 rounded-sm flex flex-col items-center justify-center">
                <div className="flex w-full max-w-md space-x-3">
                  <input
                    type="text"
                    className="flex-1 p-3 border border-white/10 bg-black/40 text-gray-100 rounded-sm focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-sm placeholder:text-gray-600"
                    placeholder="Enter PDB or UniProt ID (e.g., 8H5K)"
                    value={dbFetchId}
                    onChange={(e) => setDbFetchId(e.target.value)}
                  />
                  <button className="bg-white/10 hover:bg-white/20 text-cyan-400 border border-white/10 text-sm font-bold uppercase tracking-wider px-4 py-3 rounded-sm transition-colors">
                    Fetch
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-gray-100 uppercase tracking-wider">Biological Function / Prompt</label>
          <textarea 
            className="w-full h-48 p-4 border border-white/10 bg-black/20 text-gray-100 rounded-sm focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none text-sm placeholder:text-gray-600"
            placeholder="E.g., Design a de novo protein that binds to the SARS-CoV-2 spike protein receptor binding domain..."
            value={textTarget}
            onChange={(e) => setTextTarget(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          onClick={() => onStartPipeline(textTarget)}
          disabled={(!file && !textTarget) || isLoading}
          className="bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_15px_rgba(8,145,178,0.5)] text-white text-sm tracking-wide uppercase font-bold py-2.5 px-6 rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isLoading ? 'Initializing...' : 'Initialize Pipeline'}
        </button>
      </div>
    </div>
  );
}
