import type { ConversionResult as ConversionResultType } from '../../../types/currency';
import { RATE_DECIMAL_PLACES } from '../constants';

interface ConversionResultProps {
  result: ConversionResultType;
  amount: number;
}

function formatAmount(amount: number, decimalPlaces: number): string {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(amount);
}

export function ConversionResult({ result, amount }: ConversionResultProps) {
  const { convertedAmount, inverseRate, fromCurrencyInfo, toCurrencyInfo } =
    result;

  const formattedInput = formatAmount(amount, fromCurrencyInfo.decimal_places);
  const formattedConverted = formatAmount(convertedAmount, RATE_DECIMAL_PLACES);
  const formattedInverse = formatAmount(inverseRate, RATE_DECIMAL_PLACES);

  return (
    <div aria-live="polite">
      <p className="text-text-primary text-2xl font-bold break-all md:text-3xl">
        {formattedInput} {fromCurrencyInfo.name} =
      </p>
      <p className="text-text-primary text-2xl font-bold break-all md:text-3xl">
        {formattedConverted} {toCurrencyInfo.name}
      </p>
      <p className="text-text-secondary text-sm md:pt-2">
        1 {toCurrencyInfo.name} = {formattedInverse} {fromCurrencyInfo.name}
      </p>
    </div>
  );
}
