import { useState } from 'react';
import {
  DEFAULT_AMOUNT,
  DEFAULT_FROM_CURRENCY,
  DEFAULT_TO_CURRENCY,
} from '../constants';
import { useCurrencies } from '../hooks/useCurrencies';
import { useConversionRate } from '../hooks/useConversionRate';
import { TitleDetailed } from './TitleDetailed';
import { AmountInput } from './AmountInput';
import { CurrencySelect } from './CurrencySelect';
import { SwapButton } from './SwapButton';
import { ConversionResult } from './ConversionResult';
import { LastUpdated } from './LastUpdated';

export function CurrencyConverterSection() {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM_CURRENCY);
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO_CURRENCY);

  const numericAmount = parseFloat(amount) || 1;

  const { data: currencies } = useCurrencies();
  const { conversionResult } = useConversionRate(
    amount,
    fromCurrency,
    toCurrency
  );

  const handleCurrencyChange = (side: 'from' | 'to') => (code: string) => {
    if (side === 'from') {
      if (code === toCurrency) setToCurrency(fromCurrency);
      setFromCurrency(code);
    } else {
      if (code === fromCurrency) setFromCurrency(toCurrency);
      setToCurrency(code);
    }
  };

  const handleSwap = () => {
    // Granular save integrity saved
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <>
      <TitleDetailed
        amount={numericAmount}
        fromCurrencyInfo={currencies[fromCurrency]}
        toCurrencyInfo={currencies[toCurrency]}
      />
      <div className="px-4 pb-8 md:px-8">
        <div className="mx-auto -mt-20 max-w-4xl">
          <div className="bg-card rounded-md p-6 shadow-md md:px-6 md:pt-6 md:pb-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <AmountInput
                value={amount}
                onChange={setAmount}
                currencySymbol={currencies[fromCurrency].currency_symbol}
              />
              <CurrencySelect
                value={fromCurrency}
                onChange={handleCurrencyChange('from')}
                currencies={currencies}
                label="From"
              />
              <SwapButton onSwap={handleSwap} />
              <CurrencySelect
                value={toCurrency}
                onChange={handleCurrencyChange('to')}
                currencies={currencies}
                label="To"
              />
            </div>
            {conversionResult && (
              <div className="mt-6 grid min-h-48 grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex items-center">
                  <ConversionResult
                    result={conversionResult}
                    amount={numericAmount}
                  />
                </div>
                <div className="flex flex-col justify-end gap-3">
                  <div className="bg-info text-text-secondary rounded-md p-4 text-[10px] md:text-[11px]">
                    <p className="md:leading-6">
                      We use the mid-market rate for our Converter. This is for
                      informational purposes only. You won't receive this rate
                      when sending money.
                    </p>
                  </div>
                  <LastUpdated result={conversionResult} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
