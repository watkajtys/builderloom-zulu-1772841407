import { useQuery } from '@tanstack/react-query';
import { fetchState } from '../services/api';

export function useContainers() {
  return useQuery({
    queryKey: ['orchestrationState'],
    queryFn: fetchState,
    select: (state) => state.ui_containers,
    refetchInterval: 5000,
  });
}
