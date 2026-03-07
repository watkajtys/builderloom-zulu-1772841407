import { DockerContainer, AgentStatus, OrchestrationMetrics } from '../types/orchestration';

const fetchState = async () => {
  const response = await fetch('/session_state.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchContainers = async (): Promise<DockerContainer[]> => {
  // We extract logic from python backend state or default to these based on the state
  const state = await fetchState();
  
  // BuilderLoom containers mock using state health
  return [
    { id: '1', name: 'loom-pocketbase', status: state.systemHealth > 0 ? 'running' : 'stopped', image: 'pocketbase/pocketbase', ports: ['8090:8090'] },
    { id: '2', name: 'loom-python', status: 'running', image: 'python:3.11-slim', ports: ['8080:8080'] },
    { id: '3', name: 'loom-react', status: state.shutdown_requested ? 'stopped' : 'running', image: 'node:20-alpine', ports: ['5173:5173'] }
  ];
};

export const fetchAgentStatus = async (): Promise<AgentStatus[]> => {
  const state = await fetchState();
  
  // Map actual execution state to agents
  const agents: AgentStatus[] = [];
  
  if (state.active_jules_action || state.current_status === 'Active') {
    agents.push({
      agentId: 'jules-alpha',
      state: state.active_jules_action ? 'coding' : 'idle',
      currentTask: state.active_task_id ? `Task ${state.active_task_id}` : state.current_phase,
      happinessScore: state.history && state.history.length > 0 ? state.history[state.history.length - 1].happinessScore : 8
    });
  } else {
    agents.push({
      agentId: 'jules-alpha',
      state: 'idle',
      currentTask: 'Waiting for task',
      happinessScore: 10
    });
  }

  agents.push({
    agentId: 'overseer-beta',
    state: state.current_phase === 'Reflection' ? 'reflecting' : 'idle',
    currentTask: `Phase: ${state.current_phase}`,
    happinessScore: 10
  });

  return agents;
};

export const fetchSystemMetrics = async (): Promise<OrchestrationMetrics> => {
  const state = await fetchState();
  
  return {
    activeContainers: state.shutdown_requested ? 1 : 3,
    agentCount: 2,
    systemHealth: state.shutdown_requested ? 0 : 100
  };
};
