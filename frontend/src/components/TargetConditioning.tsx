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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
        <Activity className="text-scientific-blue w-6 h-6" />
        <h2 className="text-xl font-semibold text-scientific-dark">Target Conditioning</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Structural Target Upload (.pdb)</label>
          <div 
            className={cn(
              "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg transition-colors",
              dragActive ? "border-scientific-blue bg-blue-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex flex-col items-center space-y-2 text-scientific-teal">
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
          <label className="block text-sm font-medium text-gray-700">Biological Function / Prompt</label>
          <textarea 
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-scientific-blue focus:border-scientific-blue outline-none resize-none"
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
          className="bg-scientific-blue hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Initializing...' : 'Initialize Pipeline'}
        </button>
      </div>
    </div>
  );
}
