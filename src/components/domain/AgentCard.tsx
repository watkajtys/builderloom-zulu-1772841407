import { AgentStatus } from '../../types/orchestration';
import { Users } from 'lucide-react';

interface AgentCardProps {
  agent: AgentStatus;
  compact?: boolean;
}

export default function AgentCard({ agent, compact = false }: AgentCardProps) {
  if (compact) {
    return (
      <li className="p-4 hover:bg-slate-800/50 transition-colors flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Users size={16} />
            </div>
            <span className="font-mono text-sm text-slate-200">{agent.agentId}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            Score: {agent.happinessScore}
          </span>
        </div>
        <div className="bg-slate-950 p-3 rounded border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Status</span>
            <span className="text-xs font-mono text-fuchsia-400 flex items-center gap-2">
              {agent.state === 'coding' && <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse"></span>}
              {agent.state}
            </span>
          </div>
          {agent.currentTask && (
            <div className="border-l-2 border-slate-700 pl-3">
              <p className="text-xs text-slate-400 font-mono italic">"{agent.currentTask}"</p>
            </div>
          )}
        </div>
      </li>
    );
  }

  // Expanded version
  return (
    <li className="p-6 hover:bg-slate-800/50 transition-colors">
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
  );
}
