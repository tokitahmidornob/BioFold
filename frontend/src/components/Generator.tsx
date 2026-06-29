import React, { useState } from 'react';
import { TargetConditioning } from './TargetConditioning';
import { PipelineDashboard } from './PipelineDashboard';

export const Generator: React.FC = () => {
  const [pipelineActive, setPipelineActive] = useState(false);
  const [isPipelineLoading, setIsPipelineLoading] = useState(false);
  const [targetPrompt, setTargetPrompt] = useState('');

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-alpha-dark tracking-wide uppercase">Workspace Initialization</h2>
        <p className="text-alpha-dark/70 text-lg">Define target constraints and execute the multi-agent generation pipeline.</p>
      </header>

      <section>
        <TargetConditioning 
          isLoading={isPipelineLoading}
          onStartPipeline={(prompt) => {
            setTargetPrompt(prompt);
            setPipelineActive(true);
            setIsPipelineLoading(true);
          }} 
        />
      </section>

      <section>
        <PipelineDashboard 
          isActive={pipelineActive} 
          targetPrompt={targetPrompt} 
          onComplete={() => setIsPipelineLoading(false)}
        />
      </section>
    </main>
  );
};
