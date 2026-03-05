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
| All timing and default constants in `constants.ts` | As specified |
| `useCurrencies` — `staleTime: Infinity`, `gcTime: Infinity`, fetches once | As specified |
| `useConversionRate` — no debounce, amount not in query key | As specified |
| `inverseRate: 1 / rate` computed in hook | As specified |
| `Header` — `bg-header`, white `<h1>`, compact | As specified |
| `ErrorMessage` — `role="alert"`, message + optional retry | As specified |
| `TitleDetailed` — dynamic `<h2>`, purple section, extra bottom padding for overlap | As specified |
| `AmountInput` — `type="text"`, `inputMode="decimal"`, currency symbol prefix, `sanitize()`, label | As specified |
| `CurrencySelect` — native `<select>`, sorted A-Z, full currency name, label | As specified |
| `SwapButton` — circular, `aria-label="Swap currencies"`, `type="button"` | As specified |
| `ConversionInfoBox` — static, `bg-info`, mid-market disclaimer | As specified |
| `ConversionResult` — `aria-live="polite"`, large result + rates | As specified |
| `LastUpdated` — UTC date format, underlined currency names | As specified |
| `CurrencyConverterSection` — owns state, renders TitleDetailed + card | As specified |
| Card overlaps TitleDetailed via negative margin (`-mt-20`) | As specified |
| `App.tsx` — thin shell, `Header` + `Suspense` + `ErrorBoundary` | As specified |
| `document.title` update in `useEffect` | As specified |
| Two-column result layout on desktop (`grid-cols-2`), stacked on mobile | As specified |
| `min-h-11` (44px) touch targets on all interactive elements | As specified |
| `ErrorBoundary` with `queryClient.resetQueries()` on retry | As specified |
| Empty/invalid amount → `conversionResult: undefined` → result hidden | As specified |
| `pnpm build` clean with no TypeScript errors | As specified |

---

## ❌ Removed from plan (intentional decisions)

| Plan item | What changed | Reason |
|---|---|---|
| `autoFocus` on amount input | Removed entirely | Fires on mobile before user sees the page — keyboard pops up immediately |
| `lucide-react` for swap icon | Replaced with custom SVG (`ArrowLeftRight.svg`) + `vite-plugin-svgr` | Custom currency-themed icon better fits the design |
| `ChevronDown` from lucide | Replaced with custom SVG (`ChevronDown.svg`) | Consistent with custom SVG approach |
| `SwapButton` receiving `fromCurrency` + `toCurrency` props | Simplified to `onSwap: () => void` only | Props were only passed back inverted — unnecessary round-trip |
| `document.title` useEffect | Removed from final `CurrencyConverterSection` | Dropped during refactoring |
| Date parsed as local time with `T00:00:00` | Changed to `T00:00:00Z` + `timeZone: 'UTC'` | Local parse + UTC label was factually wrong for UTC-X users |
| `dateStyle: 'long'` + `timeStyle: 'short'` | Split into separate `Intl.DateTimeFormat` calls | Avoids the locale-specific "at" connector between date and time |
| `formattedConverted` using `toCurrencyInfo.decimal_places` | Was initially set to hardcoded 6, then corrected back | JPY (`decimal_places: 0`) showed "1,234.000000 Yen" |
| `break-all` on result text | Kept as `break-all` (not changed to `break-words`) | Input is numeric-only — no word boundaries exist, `break-all` is correct |

---

## ➕ Added beyond the plan

| Addition | Where | Why |
|---|---|---|
| `ConverterSkeleton` with purple placeholder section | `App.tsx` | Without it, the loading skeleton renders against the dark header instead of the purple section |
| `vite-plugin-svgr` + `svgr()` in `vite.config.ts` | Build config | Required to import SVGs as React components via `?react` suffix |
| `appearance-none` + custom `ChevronDown` overlay on `<select>` | `CurrencySelect` | Safari renders native OS double-arrow that ignores custom styles |
| Dynamic `paddingLeft` on amount input (`symbolPaddingLeft()`) | `AmountInput` | Fixed currency symbols like "SGD" were overlapping the typed amount |
| Same-currency guard (`handleFromChange` / `handleToChange`) | `CurrencyConverterSection` | Prevented confusing "1 USD = 1.000000 USD" result and unnecessary API call |
| `active:ring-*` + `focus-visible:ring-*` on `SwapButton` | `SwapButton` | `focus:ring-*` persisted after click — ring now shows only while pressed (active) or on keyboard nav (focus-visible) |
| `useMemo` for sorted currencies | `CurrencySelect` | Avoids re-sorting ~170 items on every render (user added) |
| `ConversionResult` always in `grid-cols-2` layout owned by parent | `CurrencyConverterSection` | `ConversionResult` previously owned the grid internally with one child — layout moved to section |
| `conversionResult &&` conditional for entire bottom section | `CurrencyConverterSection` | Hides info box and last updated when no valid result, not just the result numbers |
| `justify-end` on right column | `CurrencyConverterSection` | Aligns info box to bottom of the grid row matching the design |
| `flex items-center` wrapper on left column | `CurrencyConverterSection` | Vertically centers result text within the grid row |
| `break-all` on large result numbers | `ConversionResult` | Prevents very large formatted numbers from overflowing into the right column |
| `pb-8` on card wrapper | `CurrencyConverterSection` | Shadow was clipping at viewport edge on mobile — gives breathing room |
| `html, body { background-color }` in `index.css` | CSS | Prevents white flash/bleed on mobile when `min-h-screen` doesn't cover dynamic browser toolbar area |
| `API_BASE_URL` constant + `.env.development` / `.env.production` | `constants.ts` + env files | Vite proxy only works in dev — production points directly to `api.vatcomply.com` |
| `.gitignore` audit | Root | Confirmed Vite-generated `.gitignore` already covers `node_modules`, `dist`, `*.local` |
| `leading-relaxed` on info box text | `ConversionInfoBox` | Matches the design's airy line spacing between the two visual text lines |
| `text-[10px]` / `text-[11px]` for small text | `LastUpdated`, `ConversionInfoBox` | `text-xs` (12px) was too large — Tailwind has no named size below `xs` |
| `en-US` locale hardcoded in `LastUpdated` | `LastUpdated` | Required for predictable "Feb 20, 2026 12:00 AM UTC" format regardless of user's system locale |
