import { useOrchestration } from '../hooks/useOrchestration';
import AgentList from '../components/domain/AgentList';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Agents() {
  const { agents, loading, error } = useOrchestration();

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
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3 text-red-400">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold">Orchestration Error</h3>
            <p className="text-xs text-red-400/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      <AgentList agents={agents} compact={false} />
    </div>
  );
}
