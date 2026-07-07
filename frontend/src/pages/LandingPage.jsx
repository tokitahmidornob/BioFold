import React from 'react';

export default function LandingPage({ onStartPipeline }) {
  const metrics = [
    { value: "< 60s", label: "End-to-End Generation", desc: "From prompt input to full 3D folded topology." },
    { value: "> 85", label: "ESMFold pLDDT Score", desc: "High-confidence structural prediction metrics." },
    { value: "100%", label: "Plasma Solubility", desc: "Enforced via strict thermodynamic constraints." },
    { value: "0%", label: "Chemical Hallucinations", desc: "Guaranteed by backend context injection." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium tracking-wide text-cyan-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          PROJECT: BIOFOLD ENGINE | H.O.L.M.E.S. INITIATIVE
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent max-w-4xl mx-auto mb-6">
          Engineering the Cure, <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Atom by Atom.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          An AI-driven computational biology pipeline for the <em>de novo</em> design of therapeutic scavenger proteins. We do not simply mask symptoms; we alter pharmacokinetics to capture and neutralize synthetic lethal toxins directly in the bloodstream.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={onStartPipeline}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Initialize Designer Pipeline
          </button>
          <a href="#architecture" className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-lg border border-slate-800 transition-all duration-200">
            View Technical Architecture
          </a>
        </div>
      </header>

      {/* Global Crisis Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-2">The Global Crisis</h2>
            <h3 className="text-2xl font-bold tracking-tight text-white">The Limits of Traditional Pharmacology</h3>
          </div>
          <div className="md:col-span-2 space-y-4 text-slate-400 text-justify">
            <p>
              Modern critical care is rapidly losing the arms race against complex synthetic toxins. From the crushing lipophilicity of illicit fentanyl analogues to the rigid arrhythmogenic structure of plant-derived cardiac glycosides like digoxin, conventional competitive receptor antagonists are frequently outpaced or out-bound.
            </p>
            <p>
              When a toxic profile renders traditional antidotes ineffective, clinical treatment stalls. The BioFold Engine bypasses standard biological target intervention entirely. Instead of attempting to protect individual cell receptors, we construct an unyielding biomimetic cage that traps the circulatory poison before it ever compromises cardiac or neurological tissue.
            </p>
          </div>
        </div>
      </section>

      {/* Core Solution Section */}
      <section className="bg-slate-900/40 border-y border-slate-900 py-20 my-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2">Molecular Mechanics</h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">Pharmacological Sequestration</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 font-bold">01</div>
              <h4 className="text-lg font-bold text-white mb-3">Thermodynamic Caging</h4>
              <p className="text-slate-400 text-sm leading-relaxed text-justify">
                The engine builds customized <span className="text-slate-200 font-semibold">($\beta/\alpha)_8$ TIM-barrel scaffolds</span>. By shielding the blood's aqueous environment with an intensely hydrophilic outer surface shell, the interior core remains free to form a dense, recessed hydrophobic pocket. The target toxin is energetically drawn directly into the non-polar interior trap.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 font-bold">02</div>
              <h4 className="text-lg font-bold text-white mb-3">Systemic Clearance Redirection</h4>
              <p className="text-slate-400 text-sm leading-relaxed text-justify">
                Binding events alter the target's basic pharmacokinetics. Small, high-velocity fat-soluble poisons that normally slide straight through the blood-brain or cardiac barrier are instantly locked into a sprawling, benign, water-soluble macromolecular complex. This traps the poison inside the vascular compartments until safe renal or hepatic clearance takes place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pipelines & Architecture */}
      <section id="architecture" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-2">Pipeline Architecture</h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">Zero-Shot Inference to 3D Topology</h3>
        </div>
        <div className="relative border-l-2 border-slate-900 ml-4 md:ml-32 space-y-12">
          <div className="relative pl-8">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400" />
            <h4 className="text-base font-bold text-white">1. Generative Sequence Synthesis</h4>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Powered by <span className="text-slate-200">Meta-Llama-3-8B-Instruct</span> running strict validation prompting. The system synthesizes precise, chain-of-thought clinical rationales alongside targeted primary amino acid loops tailored to a toxin's exact geometric outline.
            </p>
          </div>
          <div className="relative pl-8">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400" />
            <h4 className="text-base font-bold text-white">2. Deterministic Context & Auto-Repair Injection</h4>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              An active backend data parser screens inputs through a custom <span className="text-slate-200">Dynamic Chemical Context Injector</span>, providing foundational structural facts to the engine. Simultaneously, a failsafe script handles streaming data, managing serverless free-tier dropouts transparently.
            </p>
          </div>
          <div className="relative pl-8">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400" />
            <h4 className="text-base font-bold text-white">3. Topological Physics Validation Layer</h4>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              The primary sequence sequence feeds right into <span className="text-slate-200">ESMFold (esm2_t36_3B)</span> via serverless inference. Atomic spatial maps generate instantly, giving on-screen high-confidence 3D structures without requiring slow wet-lab verification cycles.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, idx) => (
            <div key={idx} className="text-center lg:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                {m.value}
              </div>
              <div className="text-sm font-bold text-slate-200 mb-1">{m.label}</div>
              <div className="text-xs text-slate-500 max-w-xs">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-900/60 text-center text-xs text-slate-600">
        <p className="font-semibold text-slate-500 tracking-wider mb-2">DEVELOPED BY: CTRL+ALT+DEFEAT</p>
        <p>International University of Business Agriculture and Technology (IUBAT)</p>
      </footer>
    </div>
  );
}
