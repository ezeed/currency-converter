# Following design reference

Taking the img @design-reference.png as reference. The app should contain the folliwing structure:

- Header - dark background with <h1>Currency Converter</h2>
- <Main>
  - <TitleDetailed> background oklch(0.53 0.27 281.04) font white, dynamic title with the amount and the from and to currencies names
  - <CurrencyConverter> this have the overlaped effect with <TitleDetailed> with rounded-md and shadow-md

# Task 2 — Design Tokens (src/index.css)

Update the tokens settings following @design-reference.png

# Task 6 — useConversionRate hook

Avoid magic numbers and set staleTime and gcTime with separated constants to and add comment justification

# Task 8 — Feature Components

8e ConversionResult.tsx: Confirmed Suspense strategy

# Task 9 — CurrencyConverter.tsx

Avoid magic numbers and add CONSTANTS for default values Owns state: amount="1", fromCurrency="USD", toCurrency="EUR"
