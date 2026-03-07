export interface DockerContainer {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'crashed' | 'starting';
  image: string;
  ports: string[];
}

export interface AgentStatus {
  agentId: string;
  state: 'idle' | 'coding' | 'reflecting' | 'error' | 'initializing';
  currentTask?: string;
  happinessScore: number;
}

export interface OrchestrationMetrics {
  activeContainers: number;
  agentCount: number;
  systemHealth: number; // 0-100
}
