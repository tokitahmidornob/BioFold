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
    <div className="bg-white/80 backdrop-blur-sm rounded-sm border border-gray-300 shadow-sm p-5 space-y-5">
      <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
        <Activity className="text-alpha-accent w-4 h-4" />
        <h2 className="text-xs font-bold text-alpha-dark tracking-wider uppercase">Target Conditioning</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <label className="block text-xs font-bold text-alpha-dark uppercase tracking-wider">Computational Backend / Model Registry</label>
          <div className="relative">
            <select 
              className="w-full p-3 border border-gray-300 bg-alpha-bg text-alpha-dark rounded-sm focus:ring-1 focus:ring-alpha-accent focus:border-alpha-accent outline-none text-sm appearance-none cursor-pointer"
              defaultValue="cloud"
            >
              <option value="cloud">ESMFold2 / Hugging Face API (Active Cloud)</option>
              <option value="local">H.O.L.M.E.S. Custom-Engine-v1 (Local Cluster - Enqueued)</option>
              <option value="alpha">De Novo Synthesis Engine v2 (Alpha-Testing)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <div className="inline-block bg-gray-100 text-gray-500 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm border border-gray-200">
            * Enqueued models are part of next phase
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-alpha-dark uppercase tracking-wider">Structural Target Upload (.pdb)</label>
          <div 
            className={cn(
              "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-sm transition-colors",
              dragActive ? "border-alpha-accent bg-alpha-accent/5" : "border-alpha-border bg-alpha-bg hover:bg-gray-200"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex flex-col items-center space-y-2 text-alpha-accent">
                <File className="w-10 h-10" />
                <span className="text-sm font-medium">{file.name}</span>
                <button onClick={() => setFile(null)} className="text-xs text-red-500 hover:underline">Remove</button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs">PDB, CIF, or FASTA formats</p>
              </div>
            )}
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleChange} accept=".pdb,.cif,.fasta" />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-alpha-dark uppercase tracking-wider">Biological Function / Prompt</label>
          <textarea 
            className="w-full h-48 p-4 border border-alpha-border bg-alpha-bg rounded-sm focus:ring-1 focus:ring-alpha-accent focus:border-alpha-accent outline-none resize-none text-sm"
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
          className="bg-alpha-accent hover:bg-blue-700 text-white text-sm tracking-wide uppercase font-bold py-2.5 px-6 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Initializing...' : 'Initialize Pipeline'}
        </button>
      </div>
    </div>
  );
}
