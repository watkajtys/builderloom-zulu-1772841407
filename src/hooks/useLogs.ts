import { useEffect, useState } from 'react';

export function useLogs() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Connect to SSE endpoint
    const eventSource = new EventSource('/api/logs/stream');
    
    eventSource.onmessage = (event) => {
      try {
        const newLogs = JSON.parse(event.data);
        if (Array.isArray(newLogs) && newLogs.length > 0) {
          setLogs(prev => {
            const combined = [...prev, ...newLogs];
            // keep max 500 logs
            if (combined.length > 500) {
              return combined.slice(-500);
            }
            return combined;
          });
        }
      } catch (e) {
        console.error("Failed to parse logs", e);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error", err);
      // EventSource automatically reconnects
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return { logs };
}
