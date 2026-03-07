import { SessionState, ProductState, ExecutionState } from '../types/orchestration';

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
    fetchExecutionState().catch(() => ({
      // Provide fallback if execution state isn't written yet
      schema_version: productState.schema_version || "1.0.0",
      ui_containers: [],
      ui_agents: [],
      ui_metrics: { activeContainers: 0, agentCount: 0, systemHealth: 0 }
    }))
  ]);
  
  return { ...productState, ...executionState } as SessionState;
};
