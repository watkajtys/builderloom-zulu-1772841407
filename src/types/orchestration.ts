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

export interface BacklogTask {
  id: string;
  type: 'feature' | 'refactor' | 'bugfix';
  priority: number;
  description: string;
  target_route: string;
  data_model?: string | null;
  requires_design: boolean;
  test_scenario: string;
  context: string;
  status: string;
}

export interface AttemptRecord {
  attempt_number: number;
  prompt_used: string;
  app_screenshot_path?: string | null;
  jules_patch_path?: string | null;
  jules_url?: string | null;
  jules_action?: string | null;
  score: number;
  critique: string;
}

export interface LoopIteration {
  id: number;
  timestamp: string;
  goal: string;
  target_route: string;
  data_model?: string | null;
  requires_design: boolean;
  test_scenario?: string | null;
  negative_history: string[];
  brainstorming_output?: string | null;
  base_briefs: string[];
  base_seed_paths: (string | null)[];
  base_variants_data?: any[] | null;
  seed_review_critique?: string | null;
  design_screenshot_path?: string | null;
  design_variants_paths: (string | null)[];
  layout_review_critique?: string | null;
  chosen_design_path?: string | null;
  design_review_critique?: string | null;
  theme_variants_paths: (string | null)[];
  chosen_theme_path?: string | null;
  theme_review_critique?: string | null;
  attempts: AttemptRecord[];
  happiness_score: number;
  successful_branch?: string | null;
  abandoned: boolean;
  architectural_critique?: string | null;
  reflection_learnings?: string | null;
  git_commit?: string | null;
}

export interface ProductState {
  schema_version: string;
  project_name: string;
  app_meta: string;
  product_phase: string;
  product_roadmap: string;
  repo_memory: Record<string, any>;
  current_iteration: number;
  active_branch: string;
  
  backlog: BacklogTask[];
  active_task_id: string | null;
  
  inspiration_goal: string;
  inspiration_target_route: string;
  inspiration_data_model: string | null;
  inspiration_requires_design: boolean;
  inspiration_mode: string;
  inspiration_test_scenario: string;
  
  history: LoopIteration[];
  stitch_project_id: string | null;
  stitch_screen_id: string | null;
  active_jules_prompt: string | null;
  active_jules_url: string | null;
  active_jules_action: string | null;
  current_status: string;
  current_phase: string;
  pending_steer: string[];
  steering_history: Record<string, any>[];
  live_logs: string[];
  shutdown_requested: boolean;
  update_scheduled: boolean;
  db_stats: Record<string, number>;
}

export interface ExecutionState {
  schema_version: string;
  ui_containers: DockerContainer[];
  ui_agents: AgentStatus[];
  ui_metrics: OrchestrationMetrics;
}

// Keep SessionState as a union for backward compatibility in components if needed
export type SessionState = ProductState & ExecutionState;
