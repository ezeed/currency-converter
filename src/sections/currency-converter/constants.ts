export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api.vatcomply.com';

// Default converter state shown on initial load
export const DEFAULT_AMOUNT = '1';
export const DEFAULT_FROM_CURRENCY = 'USD';
export const DEFAULT_TO_CURRENCY = 'EUR';

// Rates cache: considered fresh for 1 minute — after that TQ refetches in the
// background on next access. Balances data freshness vs. redundant API calls.
// This saves the inediate equal calls but leave a window of 30 seconds to
// refetch a fresh value
export const RATES_STALE_TIME_MS = 30_000; // 30 seconds

// Keep cached rates in memory for 2.5 minutes after the last subscriber unmounts.
// Swapping back to a previously seen pair serves cached data instantly.
export const RATES_GC_TIME_MS = 5 * 30_000; // 5 minutes

// The currency list never changes mid-session — fetch once and keep forever.
export const CURRENCIES_STALE_TIME = Infinity;
export const CURRENCIES_GC_TIME = Infinity;

// Decimal places used when displaying exchange rates (e.g. 0.849834)
export const RATE_DECIMAL_PLACES = 6;
