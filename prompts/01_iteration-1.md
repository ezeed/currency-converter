# Project Structure

- Do not assume the project as a signle feature app. Should have a section/ folder and have a separated concerns about witch components are for the specific implementation (currency-converter) and witch one are from the general Project. The idea is be prepared to add future sections or components
- Special attention on the design because the currency-converter container should be overlaped to the main title component. Implement a negative margin to implement this effect, on mobile should be present to, just add a x-p to see the effect.

# Task 6 useConversionRate hook

The refetch only triggers when change fromCurrency or toCurrency (or when touch the swap button) so the debounce on the input is useless because change that value not refetch so consider remove the debounce and inmediatly apply the calculus with the fetched currency data on change amount without delay.

# Task 7 Leaf Components

7a Header.tsx: There is no icon icon, just the name in <header>

7c CurrencySelect.tsx: Nice to have in the label of every option `${name}${currency_symbol}"` example "USD $" "Japanesse Yen ¥"

7d SwapButton.tsx: Use lucide-react and add to the tech stack list. This component should contain the logic to swap currencies and trigger the fetch.

7f ConversionResult.tsx: Evaluate implement <Suspense> witch is the easyest and better fit. Also the result have two lines, the big size result and the convertion detail smaller. Implement both

# Task 10 — Responsive Design Polish

The result and the exta information text also sould be in stack mode for mobile. First big size result conversion and down the small size detail conversion rate.
