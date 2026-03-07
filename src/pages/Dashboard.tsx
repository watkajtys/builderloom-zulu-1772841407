import { useOrchestration } from '../hooks/useOrchestration';
import StatCard from '../components/StatCard';
import { Server, Users, Activity, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { containers, agents, metrics, loading } = useOrchestration();

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-full text-blue-400">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Orchestration Dashboard</h1>
          <p className="text-slate-400 text-sm">Monitoring system metrics and agent performance.</p>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Active Containers"
          value={metrics?.activeContainers || 0}
          icon={<Server size={24} />}
          trend="2 today"
          trendUp={true}
        />
        <StatCard
          title="Agent Instances"
          value={metrics?.agentCount || 0}
          icon={<Users size={24} />}
        />
        <StatCard
          title="System Health"
          value={`${metrics?.systemHealth || 0}%`}
          icon={<Activity size={24} />}
          trend="Stable"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Docker Containers Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">Container Infrastructure</h2>
            <span className="px-2 py-1 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {containers.length} nodes
            </span>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-slate-800">
              {containers.map((container) => (
                <li key={container.id} className="p-4 hover:bg-slate-800/50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${container.status === 'running' ? 'bg-emerald-400 text-emerald-400' : 'bg-red-400 text-red-400'}`}></div>
                    <div>
                      <p className="font-mono text-sm text-slate-200">{container.name}</p>
                      <p className="text-xs text-slate-500 font-mono mt-1">{container.image}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${container.status === 'running' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {container.status}
                    </span>
                    <span className="text-xs text-slate-600 font-mono">{container.ports.join(', ')}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Agents Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">Active Agents</h2>
          </div>
          <div className="p-0">
            <ul className="divide-y divide-slate-800">
              {agents.map((agent) => (
                <li key={agent.agentId} className="p-4 hover:bg-slate-800/50 transition-colors flex flex-col gap-3">
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
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
