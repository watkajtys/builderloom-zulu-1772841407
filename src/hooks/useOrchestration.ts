import { useQuery } from '@tanstack/react-query';
import { fetchProductState, fetchExecutionState } from '../services/api';
import { ProductState, ExecutionState } from '../types/orchestration';

export const productQueryOptions = {
  queryKey: ['productState'],
  queryFn: fetchProductState,
  refetchInterval: 5000,
};

export const executionQueryOptions = {
  queryKey: ['executionState'],
  queryFn: fetchExecutionState,
  refetchInterval: 5000,
};

export function useOrchestration() {
  // Returns combined state to keep Dashboard from needing extensive changes
  const { data: productData, ...productQuery } = useQuery<ProductState>(productQueryOptions);
  const { data: executionData, ...executionQuery } = useQuery<ExecutionState>(executionQueryOptions);
  
  return {
    data: productData && executionData ? { ...productData, ...executionData } : undefined,
    isLoading: productQuery.isLoading || executionQuery.isLoading,
    error: productQuery.error || executionQuery.error
  };
}
