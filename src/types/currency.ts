export interface CurrencyInfo {
  name: string;
  symbol: string; // ISO code e.g. "USD"
  currency_symbol: string; // e.g. "$"
  decimal_places: number;
  countries: string[];
}

export type CurrenciesResponse = Record<string, CurrencyInfo>;

export interface RatesResponse {
  date: string; // "2026-02-20"
  base: string;
  rates: Record<string, number>;
}

export interface ConversionResult {
  convertedAmount: number;
  rate: number; // toCurrency per 1 fromCurrency
  inverseRate: number; // fromCurrency per 1 toCurrency (= 1/rate)
  date: string;
  fromCurrency: string;
  toCurrency: string;
  fromCurrencyInfo: CurrencyInfo;
  toCurrencyInfo: CurrencyInfo;
}
