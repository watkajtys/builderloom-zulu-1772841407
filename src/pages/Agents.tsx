import { useOrchestration } from '../hooks/useOrchestration';
import { Users, Loader2 } from 'lucide-react';

export default function Agents() {
  const { agents, loading } = useOrchestration();

  if (loading && !agents.length) {
    return (
      <div className="flex items-center justify-center h-full text-blue-400">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Agent Fleet</h1>
        <p className="text-slate-400 text-sm">Manage and inspect autonomous agent instances.</p>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-0">
          <ul className="divide-y divide-slate-800">
            {agents.map((agent) => (
              <li key={agent.agentId} className="p-6 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-bold text-slate-200">{agent.agentId}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-slate-950 text-slate-400 border border-slate-800">
                          {agent.state}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase font-mono mb-1">Happiness</p>
                    <p className="text-xl font-bold text-emerald-400">{agent.happinessScore}/10</p>
                  </div>
                </div>
                
                {agent.currentTask && (
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <p className="text-xs text-slate-500 font-mono mb-2 uppercase tracking-widest">Current Task</p>
                    <p className="text-sm text-slate-300 font-mono">
                      {agent.currentTask}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
