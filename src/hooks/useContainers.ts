import { useQuery } from '@tanstack/react-query';
import { fetchContainers } from '../services/api';

export function useContainers() {
  return useQuery({
    queryKey: ['containers'],
    queryFn: fetchContainers,
    refetchInterval: 5000,
  });
}
