import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, ShieldCheck, Cuboid } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-alpha-bg text-alpha-dark font-sans animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="bg-alpha-dark text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-alpha-border relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-alpha-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-alpha-success rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start space-y-8">
          
          <h1 className="text-5xl md:text-6xl font-semibold tracking-wide text-white leading-tight">
            BioFOld: Multi-Agent <br className="hidden md:block"/>
            <span className="text-alpha-accent">Sequence Generation</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl font-medium leading-relaxed">
            Developed by the H.O.L.M.E.S. Initiative. An autonomous AI swarm for safe, de novo protein engineering and structural prediction.
          </p>
          
          <div className="pt-4">
            <button 
              onClick={() => navigate('/generate')}
              className="bg-transparent border border-white/50 hover:bg-white/10 hover:border-white text-white font-bold tracking-widest uppercase py-3 px-8 rounded-sm transition-all flex items-center space-x-3 group"
            >
              <span>Launch Sequence Generator</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Informational Sections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Section 1 */}
          <div className="bg-alpha-card border border-alpha-border p-10 rounded-sm shadow-sm">
            <h2 className="text-2xl font-bold tracking-wider uppercase mb-4">What is BioFOld?</h2>
            <p className="text-lg text-alpha-dark/80 leading-relaxed max-w-4xl">
              BioFOld acts as a digital architect, drafting novel amino acid sequences and validating their 3D structures in real-time. By bridging the gap between inverse folding LLMs and physical structural prediction, it accelerates the discovery of solutions for pressing environmental and health challenges.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold tracking-wider uppercase text-center">The Multi-Agent Swarm</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-alpha-card border border-alpha-border p-8 rounded-sm shadow-sm hover:border-alpha-accent transition-colors">
                <Layers className="w-8 h-8 text-alpha-accent mb-4" />
                <h3 className="text-lg font-bold uppercase tracking-wide mb-2">The Designer</h3>
                <p className="text-alpha-dark/70 text-sm leading-relaxed">
                  Interacts with specialized Hugging Face biological LLMs to perform inverse folding and condition targeted sequence generation based on structural prompts.
                </p>
              </div>
              
              <div className="bg-alpha-card border border-alpha-border p-8 rounded-sm shadow-sm hover:border-alpha-success transition-colors">
                <ShieldCheck className="w-8 h-8 text-alpha-success mb-4" />
                <h3 className="text-lg font-bold uppercase tracking-wide mb-2">The Guardrail</h3>
                <p className="text-alpha-dark/70 text-sm leading-relaxed">
                  Autonomously cross-references generated sequences against databases of known toxins and pathogens to ensure strict biosecurity compliance.
                </p>
              </div>
              
              <div className="bg-alpha-card border border-alpha-border p-8 rounded-sm shadow-sm hover:border-purple-500 transition-colors">
                <Cuboid className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold uppercase tracking-wide mb-2">The Validator</h3>
                <p className="text-alpha-dark/70 text-sm leading-relaxed">
                  Routes safe sequences through the ESMFold2 API to predict physical 3D stability and viability, closing the discovery loop entirely in silico.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-alpha-card border border-alpha-border p-10 rounded-sm shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="max-w-2xl mb-6 md:mb-0">
              <h2 className="text-2xl font-bold tracking-wider uppercase mb-4">Open Science at Scale</h2>
              <p className="text-alpha-dark/80 leading-relaxed">
                By integrating open-source Hugging Face models and the ESMFold2 API, BioFOld democratizes computational biology. This platform provides researchers with a highly scalable, zero-trust infrastructure to discover the next generation of bio-composite materials and therapeutics.
              </p>
            </div>
            <div className="flex-shrink-0 border-l-4 border-alpha-accent pl-6 py-2">
              <p className="text-4xl font-extrabold text-alpha-dark">10x</p>
              <p className="text-sm font-bold uppercase tracking-widest text-alpha-dark/60 mt-1">Faster Discovery</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
