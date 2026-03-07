import { useOrchestration } from '../hooks/useOrchestration';
import StatCard from '../components/StatCard';
import ContainerList from '../components/domain/ContainerList';
import AgentList from '../components/domain/AgentList';
import { Server, Users, Activity, Loader2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { containers, agents, metrics, loading, error } = useOrchestration();

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

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3 text-red-400">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold">Orchestration Error</h3>
            <p className="text-xs text-red-400/80 mt-1">{error}</p>
          </div>
        </div>
      )}

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
        <ContainerList containers={containers} />

        {/* Agents Card */}
        <AgentList agents={agents} compact={true} />
      </div>
    </div>
  );
}
