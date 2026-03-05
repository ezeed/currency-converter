# Implementation Audit — Plan vs Final State

## ✅ Done as planned

| Plan item | Notes |
|---|---|
| React + Vite + TypeScript | As specified |
| Tailwind CSS v4 with `@theme {}` in `index.css`, no config file | As specified |
| TanStack Query v5 with `useSuspenseQuery` | As specified |
| `react-error-boundary` wrapping `AppContent` | As specified |
| `pnpm` as package manager | As specified |
| All design tokens in `index.css` (`bg-header`, `bg-purple`, `bg-info`, etc.) | As specified |
| Inter font via CDN in `index.html` | As specified |
| All TypeScript types in `src/types/currency.ts` | As specified |
| `QueryClient` with `retry: 2`, `staleTime: 30_000`, `refetchOnWindowFocus: false` | As specified |
| `ReactQueryDevtools` gated behind `import.meta.env.DEV` | As specified |
| Default constants in `constants.ts` (`DEFAULT_AMOUNT`, `DEFAULT_FROM_CURRENCY`, etc.) | As specified |
| `useCurrencies` — `staleTime: Infinity`, `gcTime: Infinity`, fetches once | As specified |
| `useConversionRate` — no debounce, amount not in query key | As specified |
| `inverseRate: 1 / rate` computed in hook | As specified |
| `Header` — `bg-header`, white `<h1>`, compact | As specified |
| `ErrorMessage` — `role="alert"`, message + optional retry | As specified |
| `TitleDetailed` — dynamic `<h2>`, purple section, extra bottom padding for overlap | As specified |
| `AmountInput` — `type="text"`, `inputMode="decimal"`, currency symbol prefix, `sanitize()`, label | As specified |
| `CurrencySelect` — native `<select>`, sorted A-Z, full currency name, label | As specified |
| `SwapButton` — circular, `aria-label="Swap currencies"`, `type="button"` | As specified |
| `ConversionResult` — `aria-live="polite"`, large result + rates | As specified |
| `LastUpdated` — UTC date format, underlined currency names | As specified |
| `CurrencyConverterSection` — owns state, renders TitleDetailed + card | As specified |
| Card overlaps TitleDetailed via negative margin (`-mt-20`) | As specified |
| `App.tsx` — thin shell, `Header` + `Suspense` + `ErrorBoundary` | As specified |
| Two-column result layout on desktop (`grid-cols-2`), stacked on mobile | As specified |
| `min-h-11` (44px) touch targets on all interactive elements | As specified |
| `ErrorBoundary` with `queryClient.resetQueries()` on retry | As specified |
| Empty/invalid amount → result hidden | As specified |
| `pnpm build` clean with no TypeScript errors | As specified |

---

## ❌ Removed from plan (intentional decisions)

| Plan item | What changed | Reason |
|---|---|---|
| `autoFocus` on amount input | Removed entirely | Fires on mobile before user sees the page — keyboard pops up immediately |
| `lucide-react` for swap icon | Replaced with custom SVG (`ArrowLeftRight.svg`) + `vite-plugin-svgr` | Custom icon better fits the design; `lucide-react` dep removed |
| `ChevronDown` from lucide | Replaced with custom SVG (`ChevronDown.svg`) | Consistent with custom SVG approach |
| `SwapButton` receiving `fromCurrency` + `toCurrency` props | Simplified to `onSwap: () => void` only | Props were only passed back inverted — unnecessary round-trip |
| `document.title` useEffect | Removed from `CurrencyConverterSection` | Dropped during refactoring; not part of the visible design |
| `isValidAmount` returned from `useConversionRate` | Replaced by `rateUnavailable` flag | `isValidAmount` was redundant — callers only needed to know if the rate itself was missing |
| Date parsed as local time with `T00:00:00` | Replaced with `dayjs.utc(date).format(...)` | Local parse + UTC label was wrong for UTC-X users; two `Intl.DateTimeFormat` instances also removed |
| `LastUpdated` prop `result: ConversionResult \| undefined` | Changed to non-optional `result: ConversionResult` | Undefined guard moved to parent (`conversionResult &&`); component is simpler when it only renders with data |
| `ConversionResult` prop `result: ConversionResult \| undefined` | Changed to non-optional `result: ConversionResult`, added `amount: number` prop | Same rationale — parent conditionally renders; component itself no longer handles undefined |
| `ConversionInfoBox` as a separate component | Inlined JSX inside `CurrencyConverterSection` | Single use, two lines of text — not worth a dedicated file |
| `RATES_STALE_TIME_MS = 60_000` | Changed to `30_000` (30 seconds) | 60s was too long — 30s balances freshness with avoiding redundant calls |
| `TitleDetailed` `amount` prop as `string` | Changed to `number` | `numericAmount = parseFloat(amount) \|\| 1` derived in section; title always shows a valid number |
| `"formattedConverted"` using `toCurrencyInfo.decimal_places` | Changed to use `RATE_DECIMAL_PLACES` (6) for both converted and inverse rate | JPY (`decimal_places: 0`) showed "1,234 Yen" — 6 decimals better for exchange rate precision |

---

## ➕ Added beyond the plan

| Addition | Where | Why |
|---|---|---|
| `ConverterSkeleton` with purple placeholder section | `App.tsx` | Without it, the loading skeleton renders against the dark header instead of the purple section |
| `Content` shared layout wrapper (`pulse?: boolean`) | `src/components/Content.tsx` | DRY: both skeleton and error fallback share the same purple-section + white-card layout structure |
| `vite-plugin-svgr` + `svgr()` in `vite.config.ts` | Build config | Required to import SVGs as React components via `?react` suffix |
| `appearance-none` + custom `ChevronDown` overlay on `<select>` | `CurrencySelect` | Safari renders native OS double-arrow that ignores custom styles |
| Dynamic `paddingLeft` on amount input (`symbolPaddingLeft()`) | `AmountInput` | Fixed-length symbols like "SGD" would overlap the typed amount with a static offset |
| `handleCurrencyChange` curried handler | `CurrencyConverterSection` | Single handler replaces two; also swaps the opposite side automatically when the new code matches it (collision guard) |
| `numericAmount = parseFloat(amount) \|\| 1` | `CurrencyConverterSection` | Derived once at the section level; passed to `TitleDetailed` and `ConversionResult` — eliminates repeated `parseFloat` |
| Same-currency collision guard inside `handleCurrencyChange` | `CurrencyConverterSection` | Prevented "1 USD = 1.000000 USD" result and redundant API call when user selects the same currency on both sides |
| `rateUnavailable` flag in `useConversionRate` | `useConversionRate` hook | API returns `rates: {}` for some pairs (e.g. RUB). Without this, an invalid amount would silently show nothing; now a clear message is displayed |
| `rateUnavailable` message in section | `CurrencyConverterSection` | Shows "No rate available for this currency pair." instead of blank UI when `rateUnavailable` is true |
| `dayjs` + `dayjs/plugin/utc` | `LastUpdated` | Replaces two `Intl.DateTimeFormat` instances; simpler API, consistent UTC output regardless of user locale |
| `RATE_DECIMAL_PLACES = 6` constant | `constants.ts` | Single source of truth for exchange rate display precision; was hardcoded `6` repeated 3× in components |
| `API_BASE_URL` constant with `?? 'https://api.vatcomply.com'` fallback | `constants.ts` | `import.meta.env.VITE_API_BASE_URL` is `undefined` if the env var is not set — fallback avoids silent runtime errors |
| `.env.development` + `.env.production` both `VITE_API_BASE_URL=/api` | Root | Dev uses Vite proxy (`/api` → `https://api.vatcomply.com`); prod uses Vercel rewrite — same env var, different transport |
| `vercel.json` with `/api/:path*` rewrite | Root | Vite proxy is dev-only; production needs a server-side rewrite to avoid CORS. Vercel ignores `.env` dashboard vars when `.env.production` exists — rewrite is the reliable fix |
| `engines: { "node": ">=18" }` in `package.json` | `package.json` | Documents the minimum Node requirement; Vercel also reads this to select the right runtime |
| `active:ring-*` + `focus-visible:ring-*` on `SwapButton` | `SwapButton` | `focus:ring-*` persisted after click — ring now shows only while pressed (active) or on keyboard nav (focus-visible) |
| `useMemo` for sorted currencies | `CurrencySelect` | Avoids re-sorting ~170 items on every render |
| `conversionResult &&` conditional for entire bottom section | `CurrencyConverterSection` | Hides info box and last updated when no valid result, not just the result numbers |
| `justify-end` on right column | `CurrencyConverterSection` | Aligns info box to bottom of the grid row matching the design |
| `flex items-center` wrapper on left column | `CurrencyConverterSection` | Vertically centers result text within the grid row |
| `break-all` on large result numbers | `ConversionResult` | Prevents very large formatted numbers from overflowing into the right column |
| `pb-8` on card wrapper | `CurrencyConverterSection` | Shadow was clipping at viewport edge on mobile |
| `html, body { background-color }` in `index.css` | CSS | Prevents white flash/bleed on mobile when `min-h-screen` doesn't cover dynamic browser toolbar area |
| `leading-relaxed` / `md:leading-6` on info box text | Inlined info box | Matches the design's airy line spacing |
| `text-[10px]` / `text-[11px]` for small text | `LastUpdated`, info box | `text-xs` (12px) was too large — Tailwind has no named size below `xs` |
| `en-US` locale hardcoded in date format (via dayjs) | `LastUpdated` | Required for predictable "Feb 20, 2026 12:00 AM UTC" format regardless of user's system locale |
