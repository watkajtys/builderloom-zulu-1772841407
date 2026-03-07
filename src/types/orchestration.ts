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

export interface SessionState {
  schema_version: string;
  project_name: string;
  app_meta: string;
  product_phase: string;
  product_roadmap: string;
  repo_memory: Record<string, any>;
  current_iteration: number;
  active_branch: string;
  
  backlog: any[];
  active_task_id: string | null;
  
  inspiration_goal: string;
  inspiration_target_route: string;
  inspiration_data_model: string | null;
  inspiration_requires_design: boolean;
  inspiration_mode: string;
  inspiration_test_scenario: string;
  
  history: any[];
  stitch_project_id: string | null;
  stitch_screen_id: string | null;
  active_jules_prompt: string | null;
  active_jules_url: string | null;
  active_jules_action: string | null;
  current_status: string;
  current_phase: string;
  pending_steer: string[];
  steering_history: any[];
  live_logs: string[];
  shutdown_requested: boolean;
  update_scheduled: boolean;
  db_stats: Record<string, any>;
  
  ui_containers: DockerContainer[];
  ui_agents: AgentStatus[];
  ui_metrics: OrchestrationMetrics;
}
