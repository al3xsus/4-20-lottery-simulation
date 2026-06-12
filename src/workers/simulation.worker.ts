export interface SimulationParams {
  selectedNumbers: number[];
  ticketCost: number;
  drawsPerWeek: number;
  yearsToSimulate: number;
}

export interface DrawResult {
  drawIndex: number;
  won: number;
  netBalance: number;
}

export interface SimulationSummary {
  totalInvested: number;
  totalWon: number;
  netBalance: number;
  roi: number;
  matchCounts: Record<number, number>;
}

export interface WorkerMessage {
  type: 'PROGRESS' | 'COMPLETE';
  payload: DrawResult[] | SimulationSummary;
  batchIndex?: number;
}

self.onmessage = async (e: MessageEvent<SimulationParams>) => {
  const { selectedNumbers, ticketCost, drawsPerWeek, yearsToSimulate } = e.data;
  const totalDraws = yearsToSimulate * 52;
  const selectedSet = new Set(selectedNumbers);

  let totalInvested = 0;
  let totalWon = 0;
  let netBalance = 0;
  const matchCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

  const PRIZES: Record<number, number> = {
    0: 0,
    1: 0,
    2: 4,
    3: 100,
    4: 20000,
  };

  const BATCH_SIZE = 52; // Send updates every simulated "year"
  let currentBatch: DrawResult[] = [];

  for (let i = 1; i <= totalDraws; i++) {
    for (let t = 0; t < drawsPerWeek; t++) {
      const draw = generateDraw();
      let matches = 0;
      for (const num of draw) {
        if (selectedSet.has(num)) {
          matches++;
        }
      }

      const won = PRIZES[matches];
      totalInvested += ticketCost;
      totalWon += won;
      netBalance = totalWon - totalInvested;
      matchCounts[matches]++;
    }

    currentBatch.push({
      drawIndex: i,
      won: totalWon,
      netBalance: netBalance,
    });

    if (i % BATCH_SIZE === 0 || i === totalDraws) {
      self.postMessage({
        type: 'PROGRESS',
        payload: currentBatch,
        batchIndex: Math.floor(i / BATCH_SIZE),
      });
      currentBatch = [];

      // Artificial delay to allow for visible animation/streaming
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  }

  const summary: SimulationSummary = {
    totalInvested,
    totalWon,
    netBalance,
    roi: ((totalWon - totalInvested) / totalInvested) * 100,
    matchCounts,
  };

  self.postMessage({
    type: 'COMPLETE',
    payload: summary,
  });
};

function generateDraw(): number[] {
  const nums = new Set<number>();
  while (nums.size < 4) {
    nums.add(Math.floor(Math.random() * 20) + 1);
  }
  return Array.from(nums);
}
