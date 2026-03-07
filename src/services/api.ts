import { DockerContainer, AgentStatus, OrchestrationMetrics } from '../types/orchestration';

// Mock Implementation for BuilderLoom Zulu
// This serves as the Python/Docker Orchestration Service Stub

export const fetchContainers = async (): Promise<DockerContainer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'loom-pocketbase', status: 'running', image: 'pocketbase/pocketbase', ports: ['8090:8090'] },
        { id: '2', name: 'loom-python', status: 'running', image: 'python:3.11-slim', ports: ['8080:8080'] },
        { id: '3', name: 'loom-react', status: 'stopped', image: 'node:20-alpine', ports: ['5173:5173'] }
      ]);
    }, 300);
  });
};

export const fetchAgentStatus = async (): Promise<AgentStatus[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { agentId: 'jules-alpha', state: 'coding', currentTask: 'Refactoring React Architecture', happinessScore: 8 },
        { agentId: 'overseer-beta', state: 'reflecting', currentTask: 'Analyzing iteration metrics', happinessScore: 10 }
      ]);
    }, 400);
  });
};

export const fetchSystemMetrics = async (): Promise<OrchestrationMetrics> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeContainers: 2,
        agentCount: 2,
        systemHealth: 95
      });
    }, 200);
  });
};
