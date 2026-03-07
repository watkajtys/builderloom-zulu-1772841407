import { useQuery } from '@tanstack/react-query';
import { fetchState } from '../services/api';

export function useMetrics() {
  return useQuery({
    queryKey: ['orchestrationState'],
    queryFn: fetchState,
    select: (state) => state.ui_metrics,
    refetchInterval: 5000,
  });
}
