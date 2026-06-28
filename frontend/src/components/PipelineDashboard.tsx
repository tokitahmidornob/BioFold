import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, ShieldCheck, Dna, Cuboid } from 'lucide-react';
import { MolecularViewer } from './MolecularViewer';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type StageStatus = 'pending' | 'in_progress' | 'completed' | 'error';

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
        const response = await fetch('http://localhost:8000/api/v1/design-protein', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target_prompt: targetPrompt })
        });
        
        const data = await response.json();
        
        if (!isMounted) return;

        setSequence(data.sequence);
        setIsSafe(data.is_safe);
        setPdbData(data.pdb_data);

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
      } catch (err) {
        console.error(err);
        if (isMounted) {
            setStages(prev => prev.map(s => ({ ...s, status: 'error' })));
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-scientific-dark">Pipeline Execution Status</h2>
        
        <div className="relative">
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-100"></div>
          <div className="space-y-6 relative">
            {stages.map((stage) => (
              <div key={stage.id} className="flex items-start space-x-4">
                <div className={cn(
                  "relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 bg-white transition-colors duration-500",
                  stage.status === 'completed' ? "border-scientific-teal text-scientific-teal" :
                  stage.status === 'in_progress' ? "border-scientific-blue text-scientific-blue" :
                  "border-gray-200 text-gray-400"
                )}>
                  {stage.status === 'in_progress' ? <Loader2 className="w-5 h-5 animate-spin" /> : stage.icon}
                </div>
                
                <div className="pt-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={cn(
                      "font-semibold text-lg transition-colors",
                      stage.status === 'pending' ? "text-gray-400" : "text-gray-900"
                    )}>
                      {stage.name}
                    </h3>
                    {stage.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-scientific-teal" />}
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

      {sequence && (
        <div className="pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <h3 className="text-lg font-semibold text-gray-900 mb-2">Generated Sequence</h3>
           <div className="bg-gray-50 p-4 rounded-lg break-all font-mono text-sm text-gray-700 shadow-inner">
             {sequence}
           </div>
        </div>
      )}

      {isSafe !== null && (
        <div className="pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <h3 className="text-lg font-semibold text-gray-900 mb-2">Biosecurity Clearance</h3>
           <div className={cn("p-4 rounded-lg font-medium shadow-sm", isSafe ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200")}>
             {isSafe ? "Passed" : "Failed"}: {guardrailMessage}
           </div>
        </div>
      )}

      {pipelineComplete && pdbData && (
        <div className="pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Predicted Structure (ESMFold2)</h3>
          <MolecularViewer pdbData={pdbData} />
        </div>
      )}
    </div>
  );
};
