import React from 'react';
import { SimulationSummary } from '../workers/simulation.worker';
import { TrendingDown, TrendingUp, Target, DollarSign } from 'lucide-react';

interface Props {
  summary: SimulationSummary;
}

const MetricsPanel: React.FC<Props> = ({ summary }) => {
  const isProfit = summary.netBalance > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <DollarSign size={20} />
          </div>
          <span className="text-sm font-medium text-slate-500">Total Invested</span>
        </div>
        <div className="text-2xl font-bold text-slate-900">
          ${summary.totalInvested.toLocaleString()}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className={isProfit ? "p-2 bg-green-100 rounded-lg text-green-600" : "p-2 bg-red-100 rounded-lg text-red-600"}>
            {isProfit ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </div>
          <span className="text-sm font-medium text-slate-500">Net Balance</span>
        </div>
        <div className={`text-2xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
          ${summary.netBalance.toLocaleString()}
        </div>
        <div className="text-xs font-semibold mt-1 opacity-70">
          ROI: {summary.roi.toFixed(2)}%
        </div>
      </div>

      <div className="md:col-span-2 bg-slate-900 p-6 rounded-xl text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Target className="text-blue-400" size={24} />
          <h3 className="font-bold text-lg">Match Results</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">2 Matches</div>
            <div className="text-xl font-mono">{summary.matchCounts[2]}</div>
          </div>
          <div className="text-center border-x border-slate-800">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">3 Matches</div>
            <div className="text-xl font-mono text-blue-400">{summary.matchCounts[3]}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">JACKPOT</div>
            <div className={`text-xl font-mono ${summary.matchCounts[4] > 0 ? 'text-yellow-400 animate-pulse' : 'text-slate-600'}`}>
              {summary.matchCounts[4]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;
