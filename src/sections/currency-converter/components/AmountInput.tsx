interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  currencySymbol: string;
}

function sanitize(raw: string): string {
  // Allow digits and a single decimal point only
  const onlyNumbersAndPoints = raw.replace(/[^0-9.]/g, '');
  const onlyOnePointAllowed = onlyNumbersAndPoints.replace(
    /^(\d*\.?\d*).*/,
    '$1'
  );
  return onlyOnePointAllowed;
}

// Adapt padding to symbol length
function symbolPaddingLeft(symbol: string): string {
  return `${symbol.length * 7.5 + 20}px`;
}

export function AmountInput({
  value,
  onChange,
  currencySymbol,
}: AmountInputProps) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <label
        htmlFor="amount"
        className="text-text-secondary text-xs font-medium"
      >
        Amount
      </label>
      <div className="relative">
        <span className="text-text-secondary absolute top-1/2 left-3 -translate-y-1/2 text-sm">
          {currencySymbol}
        </span>
        <input
          placeholder="Enter amount"
          id="amount"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={e => onChange(sanitize(e.target.value))}
          style={{ paddingLeft: symbolPaddingLeft(currencySymbol) }}
          className="border-border text-text-primary focus:border-purple focus:ring-purple min-h-11 w-full rounded-md border py-2.5 pr-3 text-sm focus:ring-1 focus:outline-none"
        />
      </div>
    </div>
  );
}
