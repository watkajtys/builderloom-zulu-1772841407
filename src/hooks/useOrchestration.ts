import { useState, useEffect } from 'react';
import { DockerContainer, AgentStatus, OrchestrationMetrics } from '../types/orchestration';
import { fetchContainers, fetchAgentStatus, fetchSystemMetrics } from '../services/api';

export function useOrchestration() {
  const [containers, setContainers] = useState<DockerContainer[]>([]);
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [metrics, setMetrics] = useState<OrchestrationMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
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
      } catch (error) {
        console.error('Failed to load orchestration data', error);
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

  return { containers, agents, metrics, loading };
}
