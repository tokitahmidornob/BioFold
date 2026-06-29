import React from 'react';
import { Hexagon, Activity, Network, Server } from 'lucide-react';

export const IdleState: React.FC = () => {
  return (
    <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-sm border border-white/10 shadow-sm p-8 text-center animate-in fade-in duration-700">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
        <Hexagon className="w-16 h-16 text-cyan-400 animate-pulse relative z-10" strokeWidth={1} />
      </div>
      
      <h3 className="font-mono text-sm tracking-widest text-cyan-400 uppercase mb-8">
        System Standby: Awaiting Target Constraints...
      </h3>

      <div className="w-full max-w-xs space-y-3 text-left">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center space-x-2 text-gray-400">
            <Network className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Swarm Agents</span>
          </div>
          <span className="text-xs font-mono text-emerald-400">Online</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center space-x-2 text-gray-400">
            <Server className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">ESMFold API</span>
          </div>
          <span className="text-xs font-mono text-emerald-400">Ready</span>
        </div>

        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center space-x-2 text-gray-400">
            <Activity className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Telemetry</span>
          </div>
          <span className="text-xs font-mono text-cyan-400 animate-pulse">Awaiting Signal</span>
        </div>
      </div>
    </div>
  );
};
