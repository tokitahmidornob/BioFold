import React, { useState } from 'react';
import { TargetConditioning } from './TargetConditioning';
import { PipelineDashboard } from './PipelineDashboard';

export const Generator: React.FC = () => {
  const [pipelineActive, setPipelineActive] = useState(false);
  const [isPipelineLoading, setIsPipelineLoading] = useState(false);
  const [targetPrompt, setTargetPrompt] = useState('');

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-500">
      <header className="space-y-1 mb-4">
        <h2 className="text-2xl font-bold text-alpha-dark tracking-wide uppercase">Workspace Initialization</h2>
        <p className="text-alpha-dark/70 text-base">Define target constraints and execute the multi-agent generation pipeline.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
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
      </div>
    </main>
  );
};
