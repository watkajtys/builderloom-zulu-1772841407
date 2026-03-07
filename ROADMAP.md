# BuilderLoom Zulu: Self-Improvement Roadmap

## Core Objective
Evolve BuilderLoom Zulu from a brittle, monolithic script into a robust, observable, and self-healing autonomous engineering system capable of safely testing and refining its own architecture.

---

### Phase 1: Telemetry & Observability
**Goal:** Give the Overseer and Agents visibility into their own execution and failures.
- **Task:** Implement structured JSON logging across all Python agents (overseer.py, jules.py, etc.). Replace generic logger.info with structured events.
- **Task:** Update the React Viewer UI to consume and display these structured logs dynamically, allowing a human observer to easily filter agent thought processes vs system errors.

### Phase 2: Agent Refinement & Strictness
**Goal:** Enhance the Architect's ability to catch logic errors before they compound.
- **Task:** Refactor the ArchitectAgent to run static analysis tools (like pylint and mypy for Python, eslint for React) and parse their output, penalizing the score for violations.
- **Task:** Update the React UI to display the Architect's findings in a dedicated "System Health" or "Code Quality" tab.

### Phase 3: Robust State Management
**Goal:** Move away from brittle JSON files for core factory state.
- **Task:** Migrate the core ConductorState load/save mechanisms in state.py to use PocketBase instead of session_state.json. 
- **Task:** Update the React Viewer UI to fetch state directly from PocketBase collections instead of the static API endpoints.

### Phase 4: Human-in-the-Loop Interactivity (Steering)
**Goal:** Allow human operators to easily course-correct the factory without SSHing into the VPS.
- **Task:** Add a "Steering" command box to the React Viewer UI that submits text directives (e.g., "Stop working on UI and fix the DB first") to the backend API.
- **Task:** Make the Kanban board fully interactive: users must be able to drag-and-drop to reorder tasks, click to edit task descriptions/prompts, delete hallucinated tasks, and manually inject custom P0_CRITICAL tasks directly from the UI.
- **Task:** Add an editable "Roadmap" tab to the Viewer UI so the overarching product vision can be updated on the fly.
- **Task:** Implement "Approval Gates" in overseer.py and the UI. Allow users to toggle a mode where the factory pauses after the Design and Validation phases to wait for a human "Approve" or "Reject" click.
- **Task:** Add "Abort" and "Retry" buttons to the active task view. "Abort" immediately kills the process and reverts the branch. "Retry" clears the iteration history and forces Jules to start over from attempt 1.

### Phase 5: Self-Healing & Rollbacks
**Goal:** Prevent the factory from getting stuck in infinite failure loops.
- **Task:** Implement an auto-rollback feature in overseer.py. If a task fails to reach a score of 8 after 10 attempts, the Overseer should automatically git revert the branch, delete it, and generate a retrospective learning before moving on.

### Phase 6: Execution Sandboxing (Stack Adapters)
**Goal:** Decouple the factory logic from the specific tech stack being built so the factory doesn't crash when the target app fails to build.
- **Task:** Introduce a StackAdapter interface in Python to abstract away 
pm build and 
pm test commands. 
- **Task:** Refactor overseer.py to run build and test commands inside isolated Docker sub-containers (using the Docker SDK) instead of running them natively on the host filesystem. This prevents a bad 
pm install from corrupting the Zulu instance itself.

### Phase 7: Test-Driven Generation (TDD)
**Goal:** Ensure the AI factory writes verifiable code by enforcing test creation *before* implementation.
- **Task:** Update the PMAgent to not just write task descriptions, but to generate explicit, failing Playwright test snippets in the 	est_scenario field of the backlog.
- **Task:** Update the Jules prompt logic so that if a 	est_scenario exists, it is strictly instructed to implement the code necessary to make that specific test pass, creating a closed-loop validation cycle.

### Phase 8: Deterministic Caching & Cost Control
**Goal:** Prevent redundant LLM calls for code that hasn't changed.
- **Task:** Implement AST hashing in the ArchitectAgent. If the dependency graph hash hasn't changed since the last run, skip the LLM call and return the cached score.
- **Task:** Implement visual hashing in the VisionAgent. If the Playwright screenshot matches the previous screenshot by 99% structural similarity (SSIM), skip the LLM visual critique.

### Phase 9: Hybrid Knowledge Graph (GraphRAG)
**Goal:** Fix the "amnesia" problem where Jules forgets architectural lessons after 3 iterations because the prompt sliding window pushes them out. Provide context-aware memory.
- **Task:** Implement a Graph Database (or simulate one in PocketBase) to store architectural constraints and past learnings as connected nodes (e.g., [Learning: Don't mutate state] -> [Concept: React State]).
- **Task:** Refactor overseer.py to query this Knowledge Graph based on the files touched in the current task, retrieving semantically and structurally relevant past learnings to inject into the Jules prompt.
