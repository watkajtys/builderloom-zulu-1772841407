import { useQuery } from '@tanstack/react-query';
import { fetchSystemMetrics } from '../services/api';

export function useMetrics() {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: fetchSystemMetrics,
    refetchInterval: 5000,
  });
}
