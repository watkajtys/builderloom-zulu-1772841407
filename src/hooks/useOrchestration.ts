import { useState, useEffect } from 'react';
import { DockerContainer, AgentStatus, OrchestrationMetrics } from '../types/orchestration';
import { fetchContainers, fetchAgentStatus, fetchSystemMetrics } from '../services/api';

export function useOrchestration() {
  const [containers, setContainers] = useState<DockerContainer[]>([]);
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [metrics, setMetrics] = useState<OrchestrationMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [c, a, m] = await Promise.all([
          fetchContainers(),
          fetchAgentStatus(),
          fetchSystemMetrics()
        ]);
        
        if (mounted) {
          setContainers(c);
          setAgents(a);
          setMetrics(m);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load orchestration data from the factory.');
          console.error('Failed to load orchestration data', err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    // Set up polling for real-time updates (simulated)
    const interval = setInterval(loadData, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { containers, agents, metrics, loading, error };
}
