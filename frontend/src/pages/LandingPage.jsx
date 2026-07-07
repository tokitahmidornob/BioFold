import React from 'react';

export default function LandingPage({ onStartPipeline }) {
  const metrics = [
    { value: "< 60s", label: "Sequence to 3D Topology", desc: "Bypassing months of traditional wet-lab synthesis." },
    { value: "> 85", label: "ESMFold pLDDT", desc: "High-confidence structural prediction scoring." },
    { value: "100%", label: "Thermodynamic Compliance", desc: "Enforced hydrophilic surface solubility." },
    { value: "0%", label: "Chemical Hallucinations", desc: "Dynamic atomic context injection." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30">

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-cyan-900/20 via-emerald-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Navbar (Minimal) */}
      <nav className="w-full border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-wide text-white">
            <span className="text-cyan-400">⚡</span> BIOFOLD
          </div>
          <div className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
            Ctrl+Alt+Defeat
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold tracking-widest text-cyan-400 mb-8 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          AUTONOMOUS DE NOVO PROTEIN ENGINEERING
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto mb-8 leading-[1.1]">
          Engineering the Cure, <br />
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Atom by Atom.</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          An AI-driven computational biology pipeline designed to autonomously synthesize therapeutic scavenger proteins. We bypass traditional receptor antagonists to capture, sequester, and neutralize synthetic lethal toxins directly in human blood plasma.
        </p>
        <button
          onClick={onStartPipeline}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 transform hover:-translate-y-1 text-sm tracking-wide uppercase"
        >
          Initialize Designer Pipeline
        </button>
      </header>

      {/* Section 1: Research Gaps & The Laboratory Hurdle */}
      <section className="bg-slate-900/30 border-y border-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-red-400 uppercase mb-3">The Research Gap</h2>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-6">The Inefficient Wet-Lab Bottleneck</h3>
              <div className="space-y-5 text-slate-400 leading-relaxed text-justify">
                <p>
                  Historically, discovering therapeutic proteins relied on <strong className="text-slate-200">Directed Evolution</strong> or <strong className="text-slate-200">High-Throughput Screening (HTS)</strong>. These analog processes are blind, iteratively slow, and financially crippling. Synthesizing thousands of random variants requires months of laboratory cultivation.
                </p>
                <p>
                  Furthermore, confirming structural viability traditionally demands <strong className="text-slate-200">X-Ray Crystallography</strong> or <strong className="text-slate-200">Cryo-Electron Microscopy (Cryo-EM)</strong>. These are notoriously difficult procedures; many proteins refuse to crystallize, stalling critical care research for years.
                </p>
                <p>
                  Meanwhile, the clinical landscape is shifting. Synthetic toxins like illicit Fentanyl analogues and rigid arrhythmogenic glycosides like Digoxin frequently outpace the binding affinities of standard competitive receptor antagonists (e.g., Naloxone). A paradigm shift from analog screening to deterministic, <em>in silico</em> structural prediction is urgently required.
                </p>
              </div>
            </div>

            {/* Visual Contrast Panel */}
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl" />
              <h4 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-4">Traditional Paradigm vs. BioFold Engine</h4>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-semibold">Discovery Method</span>
                  <span className="text-red-400 line-through mr-2">Random Mutation</span>
                  <span className="text-cyan-400 font-bold">Deterministic Generative AI</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-semibold">Structural Validation</span>
                  <span className="text-red-400 line-through mr-2">Cryo-EM (Months)</span>
                  <span className="text-emerald-400 font-bold">ESMFold Inference (Seconds)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-semibold">Mechanism of Action</span>
                  <span className="text-red-400 line-through mr-2">Receptor Blocking</span>
                  <span className="text-cyan-400 font-bold">Direct Toxin Sequestration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Cognitive Architecture (How the AI Thinks) */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3">Cognitive Architecture</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">How the BioFold LLM "Thinks"</h3>
            <p className="mt-4 text-slate-400">
              The engine does not hallucinate sequences randomly. It utilizes a highly constrained, multi-stage reasoning pipeline to guarantee biochemical feasibility before a single amino acid is drafted.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-colors">
              <div className="text-4xl font-black text-slate-800 mb-4">01</div>
              <h4 className="text-white font-bold mb-2">Dynamic Context Injection</h4>
              <p className="text-sm text-slate-400 leading-relaxed text-justify">
                Before generating, the backend intercepts the prompt and forces absolute chemical ground-truth into the LLM's context window. For example, it restricts the AI from utilizing "electrostatic bonds" for neutral molecules like Digoxin, eradicating foundational chemical hallucinations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-emerald-500/30 transition-colors">
              <div className="text-4xl font-black text-slate-800 mb-4">02</div>
              <h4 className="text-white font-bold mb-2">Thermodynamic Constraint</h4>
              <p className="text-sm text-slate-400 leading-relaxed text-justify">
                The LLM calculates solubility parameters based on human blood plasma. It is mathematically barred from placing hydrophobic residues on the protein's surface, ensuring the resulting scaffold is highly hydrophilic and immune to pathological aggregation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-colors">
              <div className="text-4xl font-black text-slate-800 mb-4">03</div>
              <h4 className="text-white font-bold mb-2">Chain-of-Thought Synthesis</h4>
              <p className="text-sm text-slate-400 leading-relaxed text-justify">
                Llama-3 drafts a formal clinical rationale, analyzing the exact steric hindrance and van der Waals forces required to capture the toxin. Only after the physics are justified does it output the 60-100 character primary amino acid sequence.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-emerald-500/30 transition-colors">
              <div className="text-4xl font-black text-slate-800 mb-4">04</div>
              <h4 className="text-white font-bold mb-2">Topological Physics Validation</h4>
              <p className="text-sm text-slate-400 leading-relaxed text-justify">
                The raw sequence is passed to Meta's ESMFold (esm2_t36). This massive transformer evaluates evolutionary scale modeling to instantly predict the 3D atomic coordinates (PDB), rendering a fully interactive spatial map for validation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-slate-950 border-t border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-slate-800/50">
            {metrics.map((m, idx) => (
              <div key={idx} className={`pl-8 ${idx === 0 ? 'pl-0 border-l-0' : ''}`}>
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tighter bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent mb-3">
                  {m.value}
                </div>
                <div className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wide">{m.label}</div>
                <div className="text-xs text-slate-500 pr-4 leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center">
        <p className="text-xs font-bold text-slate-600 tracking-[0.2em] mb-2 uppercase">Engineered for SciBlitz Challenge 2026</p>
        <p className="text-sm text-slate-400 font-semibold mb-1">Project: H.O.L.M.E.S. Initiative | Team: Ctrl+Alt+Defeat</p>
        <p className="text-xs text-slate-500">International University of Business Agriculture and Technology (IUBAT)</p>
      </footer>
    </div>
  );
}