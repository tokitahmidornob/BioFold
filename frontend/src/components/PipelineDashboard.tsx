import React, { useState, useEffect } from 'react';
import { Loader2, ShieldCheck, Dna, Cuboid } from 'lucide-react';
import { MolecularViewer } from './MolecularViewer';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type StageStatus = 'pending' | 'in_progress' | 'completed' | 'error';

const BiologicalDataStream: React.FC = () => {
  const [stream, setStream] = useState('');
  const chars = 'ACDEFGHIKLMNPQRSTVWY';

  useEffect(() => {
    const interval = setInterval(() => {
      let newStream = '';
      for (let i = 0; i < 120; i++) {
        newStream += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setStream(newStream);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-6 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xs font-bold text-gray-100 uppercase tracking-wider mb-2 flex items-center space-x-2">
        <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
        <span>Decoding Sequence Stream...</span>
      </h3>
      <div className="bg-black/20 p-4 rounded-sm font-mono text-sm text-emerald-400 break-all shadow-inner border border-white/10 tracking-widest leading-relaxed">
        {stream}
      </div>
    </div>
  );
};

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: StageStatus;
}

interface PipelineDashboardProps {
  isActive: boolean;
  targetPrompt: string;
  onComplete?: () => void;
}

export const PipelineDashboard: React.FC<PipelineDashboardProps> = ({ isActive, targetPrompt, onComplete }) => {
  const [stages, setStages] = useState<PipelineStage[]>([
    {
      id: 'generation',
      name: 'The Bio-Designer',
      description: 'Generating sequence variants via HF LLMs',
      icon: <Dna className="w-5 h-5" />,
      status: 'pending'
    },
    {
      id: 'biosecurity',
      name: 'The Biosecurity Guardrail',
      description: 'Cross-referencing toxin databases',
      icon: <ShieldCheck className="w-5 h-5" />,
      status: 'pending'
    },
    {
      id: 'validation',
      name: 'The Validator',
      description: 'ESMFold2 3D Stability Prediction',
      icon: <Cuboid className="w-5 h-5" />,
      status: 'pending'
    }
  ]);

  const [pipelineComplete, setPipelineComplete] = useState(false);
  const [sequence, setSequence] = useState<string | null>(null);
  const [pdbData, setPdbData] = useState<string | null>(null);
  const [isSafe, setIsSafe] = useState<boolean | null>(null);
  const [guardrailMessage, setGuardrailMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clinicalRationale, setClinicalRationale] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive || !targetPrompt) return;

    let isMounted = true;

    const runPipeline = async () => {
      setStages(prev => [
        { ...prev[0], status: 'in_progress' },
        { ...prev[1], status: 'pending' },
        { ...prev[2], status: 'pending' },
      ]);

      try {
        const response = await fetch('https://tokitahmidornob-biofold-engine.hf.space/api/v1/design-protein', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target_prompt: targetPrompt })
        });
        
        const data = await response.json();
        
        if (!isMounted) return;
        
        if (!response.ok) {
           throw new Error(data.detail || 'API request failed');
        }

        setSequence(data.sequence);
        setIsSafe(data.is_safe);
        setPdbData(data.pdb_data);
        setClinicalRationale(data.clinical_rationale || null);

        const guardrailLog = data.logs?.find((l: any) => l.agent === 'The Biosecurity Guardrail');
        if (guardrailLog) {
            setGuardrailMessage(guardrailLog.message);
        }

        if (data.status === 'blocked') {
          setStages(prev => [
            { ...prev[0], status: 'completed' },
            { ...prev[1], status: 'error', description: guardrailLog?.message || 'Blocked' },
            { ...prev[2], status: 'pending' },
          ]);
          setPipelineComplete(false);
        } else {
          setStages(prev => [
            { ...prev[0], status: 'completed' },
            { ...prev[1], status: 'completed' },
            { ...prev[2], status: 'completed' },
          ]);
          setPipelineComplete(true);
        }
      } catch (err: any) {
        console.error(err);
        if (isMounted) {
            setStages(prev => prev.map(s => ({ ...s, status: 'error' })));
            setErrorMessage(err.message || 'An unexpected error occurred during the pipeline execution.');
        }
      } finally {
        if (isMounted && onComplete) {
            onComplete();
        }
      }
    };

    runPipeline();

    return () => { isMounted = false; };
  }, [isActive, targetPrompt]);

  if (!isActive) return null;

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-sm border border-white/10 shadow-sm p-5 space-y-6">
      <div className="space-y-5">
        <h2 className="text-xs font-bold text-gray-100 tracking-wider uppercase border-b border-white/10 pb-3">Pipeline Execution Status</h2>
        
        <div className="relative pl-2">
          <div className="absolute left-3.5 top-5 bottom-5 w-[1px] bg-white/10"></div>
          <div className="space-y-5 relative">
            {stages.map((stage) => (
              <div key={stage.id} className="flex items-start space-x-4">
                <div className="relative mt-1.5 flex items-center justify-center w-3 h-3 z-10">
                  <div className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-500",
                    stage.status === 'completed' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" :
                    stage.status === 'in_progress' ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" :
                    stage.status === 'error' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" :
                    "bg-white/20"
                  )} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={cn(
                      "font-semibold text-sm transition-colors",
                      stage.status === 'pending' ? "text-gray-500" : "text-gray-100"
                    )}>
                      {stage.name}
                    </h3>
                  </div>
                  <p className={cn(
                    "text-sm mt-1 transition-colors",
                    stage.status === 'pending' ? "text-gray-400" : "text-gray-500"
                  )}>{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!sequence && stages[0].status !== 'error' && (
        <BiologicalDataStream />
      )}

      {sequence && (
        <div className="pt-6 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <h3 className="text-xs font-bold text-gray-100 uppercase tracking-wider mb-2">Generated Sequence</h3>
           <div className="bg-black/20 p-4 rounded-sm break-all font-mono text-sm text-gray-100 border border-white/10">
             {sequence}
           </div>
        </div>
      )}

      {isSafe !== null && (
        <div className="pt-6 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <h3 className="text-xs font-bold text-gray-100 uppercase tracking-wider mb-2">Biosecurity Clearance</h3>
           <div className={cn("p-4 rounded-sm font-mono text-sm", isSafe ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/50" : "bg-red-500/10 text-red-400 border border-red-500/50")}>
             {isSafe ? "Passed" : "Failed"}: {guardrailMessage}
           </div>
        </div>
      )}

      {pipelineComplete && pdbData && (
        <div className="pt-6 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-xs font-bold text-gray-100 uppercase tracking-wider mb-4">Predicted Structure (ESMFold2)</h3>
          <MolecularViewer pdbData={pdbData} />
        </div>
      )}

      {clinicalRationale && (
        <div className="pt-6 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-xs font-bold text-gray-100 uppercase tracking-wider mb-4">Post-Generation Clinical Analysis</h3>
          <div className="bg-black/20 p-4 rounded-sm border border-white/10 text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
            {clinicalRationale}
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="pt-6 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Pipeline Error</h3>
          <div className="bg-red-500/10 p-4 rounded-sm border border-red-500/50 text-red-400 text-sm">
            {errorMessage}
          </div>
        </div>
      )}
    </div>
  );
};
