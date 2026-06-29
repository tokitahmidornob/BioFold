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

    // We'll use a sample mock PDB string if none is provided
    const defaultPdb = `
HEADER    EXTRACELLULAR MATRIX                    22-JAN-98   1A3I
TITLE     X-RAY STRUCTURE OF THE LEUCINE-RICH REPEAT DOMAIN OF
TITLE    2 INTERNALIN B
REMARK   3
ATOM      1  N   MET A   1      18.423  16.484  22.181  1.00 48.65           N
ATOM      2  CA  MET A   1      19.011  15.228  21.656  1.00 47.93           C
ATOM      3  C   MET A   1      20.470  15.109  22.100  1.00 47.74           C
ATOM      4  O   MET A   1      21.326  15.867  21.642  1.00 48.06           O
ATOM      5  CB  MET A   1      18.232  14.004  22.133  1.00 48.14           C
ATOM      6  CG  MET A   1      16.711  14.175  22.029  1.00 48.87           C
ATOM      7  SD  MET A   1      15.932  12.635  22.569  1.00 52.88           S
ATOM      8  CE  MET A   1      16.516  11.536  21.282  1.00 52.02           C
ATOM      9  N   GLU A   2      20.757  14.173  23.013  1.00 46.54           N
ATOM     10  CA  GLU A   2      22.108  13.918  23.518  1.00 45.47           C
ATOM     11  C   GLU A   2      22.651  12.566  23.045  1.00 43.14           C
ATOM     12  O   GLU A   2      23.864  12.441  22.846  1.00 41.77           O
    `;

    const dataToLoad = pdbData || defaultPdb;
    
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
