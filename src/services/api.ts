import { SessionState, ProductState, ExecutionState } from '../types/product';

export const fetchProductState = async (): Promise<ProductState> => {
  const response = await fetch('/session_state.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchExecutionState = async (): Promise<ExecutionState> => {
  const response = await fetch('/execution_state.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchState = async (): Promise<SessionState> => {
  const [productState, executionState] = await Promise.all([
    fetchProductState(),
    fetchExecutionState()
  ]);
  
  return { ...productState, ...executionState } as SessionState;
};
