import { useSuspenseQuery } from '@tanstack/react-query';
import type { ConversionResult, RatesResponse } from '../../../types/currency';
import { API_BASE_URL, RATES_GC_TIME_MS, RATES_STALE_TIME_MS } from '../constants';
import { useCurrencies } from './useCurrencies';

const fetchRate = async (base: string, to: string): Promise<RatesResponse> => {
  const res = await fetch(`${API_BASE_URL}/rates?base=${base}&symbols=${to}`);
  if (!res.ok) throw new Error(`Failed to fetch rate: ${res.status}`);
  return res.json();
};

export function useConversionRate(
  amount: string,
  fromCurrency: string,
  toCurrency: string
) {
  const { data: currencies } = useCurrencies();
  const { data: ratesData } = useSuspenseQuery({
    queryKey: ['rates', fromCurrency, toCurrency],
    queryFn: () => fetchRate(fromCurrency, toCurrency),
    staleTime: RATES_STALE_TIME_MS,
    gcTime: RATES_GC_TIME_MS,
  });

  const numericAmount = parseFloat(amount);
  const isValidAmount = !isNaN(numericAmount) && numericAmount > 0;
  const rate = ratesData.rates[toCurrency];

  const conversionResult: ConversionResult | undefined =
    isValidAmount && rate !== undefined
      ? {
          convertedAmount: numericAmount * rate,
          rate,
          inverseRate: 1 / rate,
          date: ratesData.date,
          fromCurrency,
          toCurrency,
          fromCurrencyInfo: currencies[fromCurrency],
          toCurrencyInfo: currencies[toCurrency],
        }
      : undefined;

  const rateUnavailable = isValidAmount && rate === undefined;

  return { conversionResult, rateUnavailable };
}
