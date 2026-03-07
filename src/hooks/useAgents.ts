import { useQuery } from '@tanstack/react-query';
import { fetchState } from '../services/api';

export function useAgents() {
  return useQuery({
    queryKey: ['orchestrationState'],
    queryFn: fetchState,
    select: (state) => state.ui_agents,
    refetchInterval: 5000,
  });
}
