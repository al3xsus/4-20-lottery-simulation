import React, { useState } from 'react';
import { useLotterySimulation } from './hooks/useLotterySimulation';
import LotteryGrid from './components/LotteryGrid';
import SimulationChart from './components/SimulationChart';
import MetricsPanel from './components/MetricsPanel';
import { Play, RotateCcw, Settings2, Info } from 'lucide-react';

const App: React.FC = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [ticketCost, setTicketCost] = useState(2);
  const [drawsPerWeek, setDrawsPerWeek] = useState(2);
  const [years, setYears] = useState(10);

  const { isRunning, progressData, summary, startSimulation, resetSimulation } = useLotterySimulation();

  const handleToggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < 4) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const handleRun = () => {
    if (selectedNumbers.length === 4) {
      startSimulation({
        selectedNumbers,
        ticketCost,
        drawsPerWeek,
        yearsToSimulate: years,
      });
    }
  };

  const handleReset = () => {
    setSelectedNumbers([]);
    resetSimulation();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8" role="banner">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Lottery <span className="text-blue-600">Strategy Sandbox</span>
          </h1>
          <p className="text-slate-500 max-w-2xl">
            Pick 4 numbers and simulate years of draws to see the mathematical reality of lottery odds.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Setup */}
          <aside className="lg:col-span-4 space-y-6" aria-label="Simulation Configuration">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Settings2 size={20} className="text-blue-600" aria-hidden="true" />
                Step 1: Pick 4 Numbers
              </h2>
              <LotteryGrid
                selectedNumbers={selectedNumbers}
                onToggle={handleToggleNumber}
                disabled={isRunning}
              />
              <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-3">
                <Info className="text-blue-500 shrink-0 mt-0.5" size={16} aria-hidden="true" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Choose exactly 4 unique numbers from 1 to 20 to begin the simulation.
                </p>
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Settings2 size={20} className="text-blue-600" aria-hidden="true" />
                Step 2: Configuration
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="ticket-cost" className="block text-sm font-medium text-slate-700 mb-1">
                    Ticket Cost ($)
                  </label>
                  <input
                    id="ticket-cost"
                    type="number"
                    value={ticketCost}
                    onChange={(e) => setTicketCost(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={isRunning}
                  />
                </div>
                <div>
                  <label htmlFor="draws-per-week" className="block text-sm font-medium text-slate-700 mb-1">
                    Draws Per Week
                  </label>
                  <input
                    id="draws-per-week"
                    type="number"
                    value={drawsPerWeek}
                    onChange={(e) => setDrawsPerWeek(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    disabled={isRunning}
                  />
                </div>
                <div>
                  <label htmlFor="years-slider" className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
                    Years to Simulate <span>{years}y</span>
                  </label>
                  <input
                    id="years-slider"
                    type="range"
                    min="1"
                    max="50"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    disabled={isRunning}
                    aria-valuemin={1}
                    aria-valuemax={50}
                    aria-valuenow={years}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <button
                  onClick={handleRun}
                  disabled={selectedNumbers.length !== 4 || isRunning}
                  aria-busy={isRunning}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:shadow-none"
                >
                  {isRunning ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                  ) : (
                    <Play size={18} fill="currentColor" aria-hidden="true" />
                  )}
                  {isRunning ? 'Running...' : 'Run Simulation'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3 px-4 rounded-xl transition-all"
                >
                  <RotateCcw size={18} aria-hidden="true" />
                  Reset
                </button>
              </div>
            </section>
          </aside>

          {/* Right Column: Results */}
          <article className="lg:col-span-8 space-y-6" aria-live="polite">
            {(progressData.length > 0 || summary) ? (
              <>
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h2 className="text-lg font-bold mb-4">Net Balance Over Time</h2>
                  <SimulationChart data={progressData} />
                </section>

                {summary && (
                  <MetricsPanel summary={summary} />
                )}

                {isRunning && !summary && (
                  <div className="bg-blue-600 p-4 rounded-xl text-white flex items-center justify-between animate-pulse" role="status">
                    <span className="font-medium italic">Simulating thousands of draws...</span>
                    <span className="text-sm opacity-80">{Math.round((progressData.length / (years * 52)) * 100)}%</span>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Play size={32} className="text-slate-300 ml-1" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Simulation Active</h3>
                <p className="text-slate-500 max-w-sm">
                  Configure your ticket and hit "Run Simulation" to visualize the results of your strategy.
                </p>
              </div>
            )}
          </article>
        </main>
      </div>
    </div>
  );
};

export default App;
