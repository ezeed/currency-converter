import type { CurrencyInfo } from '../../../types/currency';

interface TitleDetailedProps {
  amount: number;
  fromCurrencyInfo: CurrencyInfo;
  toCurrencyInfo: CurrencyInfo;
}

export function TitleDetailed({
  amount,
  fromCurrencyInfo,
  toCurrencyInfo,
}: TitleDetailedProps) {
  return (
    <section className="bg-purple px-6 pt-15 pb-30 text-center text-white">
      <h2 className="text-xl font-semibold md:text-2xl">
        {amount} {fromCurrencyInfo.symbol} to {toCurrencyInfo.symbol}
        {' – '}Convert {fromCurrencyInfo.name} to {toCurrencyInfo.name}
      </h2>
    </section>
  );
}
