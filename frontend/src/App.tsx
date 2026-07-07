import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Microscope, Shield, Code } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import { Generator } from './components/Generator';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans bg-slate-950 bg-matrix text-gray-100">
        {/* Slim Minimalist Header */}
        <header className="bg-slate-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="bg-alpha-accent p-1.5 rounded-sm">
                  <Microscope className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-bold text-white tracking-widest uppercase group-hover:text-gray-200 transition-colors">
                  BioFOld
                </h1>
              </Link>
              
              <nav className="flex space-x-6 items-center">
                <Link to="/" className="text-gray-300 hover:text-white flex items-center space-x-2 text-xs font-bold tracking-wider uppercase transition-colors">
                  <span>Home</span>
                </Link>
                <a href="#" className="text-gray-300 hover:text-white flex items-center space-x-2 text-xs font-bold tracking-wider uppercase transition-colors">
                  <span>About</span>
                </a>
                <a href="https://github.com/holmes-initiative/biofold" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-sm transition-colors border border-white/10 flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider uppercase px-1">GitHub</span>
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<LandingPage onStartPipeline={() => window.location.href='/generate'} />} />
            <Route path="/generate" element={<Generator />} />
          </Routes>
        </div>

        {/* Technical Footer */}
        <footer className="bg-slate-900/50 border-t border-white/10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-wider uppercase font-medium text-gray-400 space-y-4 md:space-y-0">
            <div className="flex flex-col space-y-2 text-center md:text-left">
              <p>&copy; 2026 H.O.L.M.E.S. Initiative. All rights reserved.</p>
              <p className="text-gray-500 max-w-xl">Disclaimer: This tool is for research purposes only. Generated sequences must be validated in vitro before any practical application.</p>
            </div>
            <div className="flex space-x-6">
              <span className="flex items-center space-x-1"><Shield className="w-3 h-3"/> <span>Biosecurity Active</span></span>
              <span>v2.0.0</span>
              <span className="text-alpha-success">Status: Operational</span>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
