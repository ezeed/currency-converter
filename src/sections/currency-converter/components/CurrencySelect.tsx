import { useMemo } from 'react';
import ChevronDown from '../../../assets/ChevronDown.svg?react';
import type { CurrenciesResponse } from '../../../types/currency';

interface CurrencySelectProps {
  value: string;
  onChange: (code: string) => void;
  currencies: CurrenciesResponse;
  label: string;
}

export function CurrencySelect({
  value,
  onChange,
  currencies,
  label,
}: CurrencySelectProps) {
  const sortedCurrencies = useMemo(
    () => Object.entries(currencies).sort(([a], [b]) => a.localeCompare(b)),
    [currencies]
  );

  return (
    <div className="flex flex-1 flex-col gap-1">
      <label
        htmlFor={`currency-${label}`}
        className="text-text-secondary text-xs font-medium"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={`currency-${label}`}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="border-border bg-card text-text-primary focus:border-purple focus:ring-purple min-h-11 w-full appearance-none rounded-md border py-2.5 pr-8 pl-3 text-sm focus:ring-1 focus:outline-none"
        >
          {sortedCurrencies.map(([code, info]) => (
            <option key={code} value={code}>
              {info.name}
            </option>
          ))}
        </select>
        <ChevronDown
          width={16}
          className="text-text-secondary pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
