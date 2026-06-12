import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  selectedNumbers: number[];
  onToggle: (num: number) => void;
  disabled?: boolean;
}

const LotteryGrid: React.FC<Props> = ({ selectedNumbers, onToggle, disabled }) => {
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-5 gap-2">
      {numbers.map((num) => {
        const isSelected = selectedNumbers.includes(num);
        return (
          <button
            key={num}
            onClick={() => onToggle(num)}
            disabled={disabled && !isSelected}
            className={cn(
              "h-12 w-12 rounded-lg font-bold transition-all duration-200 border-2",
              isSelected
                ? "bg-blue-500 border-blue-600 text-white shadow-lg scale-105"
                : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50",
              disabled && !isSelected && "opacity-50 cursor-not-allowed"
            )}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
};

export default LotteryGrid;
