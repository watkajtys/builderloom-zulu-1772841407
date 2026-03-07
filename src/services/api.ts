import { SessionState } from '../types/orchestration';

export const fetchState = async (): Promise<SessionState> => {
  const response = await fetch('/session_state.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
