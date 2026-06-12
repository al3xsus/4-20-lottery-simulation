import { useState, useCallback, useRef, useEffect } from 'react';
import { DrawResult, SimulationParams, SimulationSummary, WorkerMessage } from '../workers/simulation.worker';

export const useLotterySimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progressData, setProgressData] = useState<DrawResult[]>([]);
  const [summary, setSummary] = useState<SimulationSummary | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const startSimulation = useCallback((params: SimulationParams) => {
    setIsRunning(true);
    setProgressData([]);
    setSummary(null);

    if (workerRef.current) {
      workerRef.current.terminate();
    }

    workerRef.current = new Worker(
      new URL('../workers/simulation.worker.ts', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.onmessage = (e: MessageEvent<WorkerMessage>) => {
      const { type, payload } = e.data;

      if (type === 'PROGRESS') {
        setProgressData((prev) => [...prev, ...(payload as DrawResult[])]);
      } else if (type === 'COMPLETE') {
        setSummary(payload as SimulationSummary);
        setIsRunning(false);
        workerRef.current?.terminate();
        workerRef.current = null;
      }
    };

    workerRef.current.postMessage(params);
  }, []);

  const resetSimulation = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    setIsRunning(false);
    setProgressData([]);
    setSummary(null);
  }, []);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  return {
    isRunning,
    progressData,
    summary,
    startSimulation,
    resetSimulation,
  };
};
