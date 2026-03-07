import { useQuery } from '@tanstack/react-query';
import { fetchAgentStatus } from '../services/api';

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: fetchAgentStatus,
    refetchInterval: 5000,
  });
}
