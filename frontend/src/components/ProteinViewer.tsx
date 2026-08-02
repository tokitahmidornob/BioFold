import React, { useEffect, useRef } from 'react';

interface ProteinViewerProps {
  pdbString: string;
}

export const ProteinViewer: React.FC<ProteinViewerProps> = ({ pdbString }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pdbString || !viewerRef.current) return;

    let isMounted = true;

    const load3Dmol = async () => {
      if (!(window as any).$3Dmol) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.0.1/3Dmol-min.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise<void>((resolve) => {
          script.onload = () => resolve();
        });
      }

      if (!isMounted) return;

      const element = viewerRef.current;
      if (element && (window as any).$3Dmol) {
        element.innerHTML = '';
        const viewer = (window as any).$3Dmol.createViewer(element, {
          backgroundColor: '#0a0f1c'
        });
        viewer.addModel(pdbString, 'pdb');
        viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
        viewer.zoomTo();
        viewer.render();
      }
    };

    load3Dmol();

    return () => {
      isMounted = false;
    };
  }, [pdbString]);

  return (
    <div style={{ 
      background: 'transparent', 
      border: '1px solid rgba(0, 242, 254, 0.2)', 
      borderRadius: '8px', 
      padding: '15px' 
    }}>
      <h3 style={{ 
        color: '#00f2fe', 
        fontSize: '0.75rem', 
        fontWeight: 'bold', 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em', 
        marginBottom: '0.5rem' 
      }}>
        3D STRUCTURAL MODEL
      </h3>
      <div 
        ref={viewerRef} 
        style={{ height: '350px', width: '100%', position: 'relative' }}
      />
    </div>
  );
};
