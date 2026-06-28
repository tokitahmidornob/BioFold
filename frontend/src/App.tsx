import { useState } from 'react';
import { TargetConditioning } from './components/TargetConditioning';
import { PipelineDashboard } from './components/PipelineDashboard';
import { Microscope, GitBranch, Shield, Settings } from 'lucide-react';

function App() {
  const [pipelineActive, setPipelineActive] = useState(false);
  const [isPipelineLoading, setIsPipelineLoading] = useState(false);
  const [targetPrompt, setTargetPrompt] = useState('');

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-scientific-blue p-2 rounded-lg">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Bio-LLM <span className="text-scientific-teal">Sequence Generator</span></h1>
            </div>
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-scientific-blue flex items-center space-x-2 text-sm font-medium transition-colors">
                <GitBranch className="w-4 h-4" />
                <span>Models</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-scientific-blue flex items-center space-x-2 text-sm font-medium transition-colors">
                <Shield className="w-4 h-4" />
                <span>Security</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-scientific-blue flex items-center space-x-2 text-sm font-medium transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <header className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Workspace Initialization</h2>
          <p className="text-gray-500 text-lg">Define target constraints and execute the multi-agent generation pipeline.</p>
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

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center text-sm text-gray-500">
          <p>&copy; 2026 DeepMind Antigravity Labs. All rights reserved.</p>
          <div className="flex space-x-4">
            <span>v1.0.0</span>
            <span>Status: Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
