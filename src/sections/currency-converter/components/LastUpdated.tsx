import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { ConversionResult } from '../../../types/currency';

dayjs.extend(utc);

interface LastUpdatedProps {
  result: ConversionResult;
}

export function LastUpdated({ result }: LastUpdatedProps) {
  const { date, fromCurrencyInfo, toCurrencyInfo } = result;

  const formatted = dayjs.utc(date).format('MMM D, YYYY h:mm A') + ' UTC';

  return (
    <p className="text-text-secondary text-[10px] md:text-right">
      <span className="underline">{fromCurrencyInfo.name}</span> to{' '}
      <span className="underline">{toCurrencyInfo.name}</span> conversion — Last
      updated {formatted}
    </p>
  );
}
