import { useSuspenseQuery } from '@tanstack/react-query';
import type { CurrenciesResponse } from '../../../types/currency';
import { API_BASE_URL, CURRENCIES_GC_TIME, CURRENCIES_STALE_TIME } from '../constants';

const fetchCurrencies = async (): Promise<CurrenciesResponse> => {
  const res = await fetch(`${API_BASE_URL}/currencies`);
  if (!res.ok) throw new Error(`Failed to fetch currencies: ${res.status}`);
  return res.json();
};

export function useCurrencies() {
  return useSuspenseQuery({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
    staleTime: CURRENCIES_STALE_TIME,
    gcTime: CURRENCIES_GC_TIME,
  });
}
