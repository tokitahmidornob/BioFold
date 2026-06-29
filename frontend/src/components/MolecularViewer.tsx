import React, { useEffect, useRef, useState } from 'react';
import * as $3Dmol from '3dmol';
import { RefreshCw, Download } from 'lucide-react';

interface MolecularViewerProps {
  pdbData?: string;
}

export const MolecularViewer: React.FC<MolecularViewerProps> = ({ pdbData }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!viewerRef.current) return;
    setHasError(false);

    // Initialize the viewer
    const viewer = $3Dmol.createViewer(viewerRef.current, {
      backgroundColor: '#0A192F'
    });

    const dataToLoad = pdbData;
    
    if (!dataToLoad) {
      setHasError(true);
      return;
    }
    
    try {
      viewer.addModel(dataToLoad, 'pdb');
      viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
      viewer.zoomTo();
      viewer.render();
    } catch (e) {
      console.error("Failed to load PDB data:", e);
      setHasError(true);
    }
    
    return () => {
      viewer.clear();
    };
  }, [pdbData]);

  return (
    <div className="relative w-full h-[500px] border border-alpha-border rounded-sm overflow-hidden bg-alpha-dark">
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-alpha-dark/50 bg-alpha-bg">
          <p className="font-bold text-sm tracking-wide uppercase">Preview Unavailable</p>
          <p className="text-xs">The generated structure data could not be visualized.</p>
        </div>
      ) : (
        <>
          <div 
            ref={viewerRef} 
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <div className="bg-alpha-dark/80 backdrop-blur-sm px-3 py-1.5 rounded-sm text-xs font-bold tracking-wider uppercase text-white shadow-sm border border-white/10">
              Interactive 3D Viewer
            </div>
            <div className="flex space-x-2">
              <button className="bg-alpha-dark/80 backdrop-blur-sm p-1.5 rounded-sm border border-white/10 text-white hover:bg-white/10 transition-colors" title="Reset View">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="bg-alpha-dark/80 backdrop-blur-sm p-1.5 rounded-sm border border-white/10 text-white hover:bg-white/10 transition-colors" title="Download PDB">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
