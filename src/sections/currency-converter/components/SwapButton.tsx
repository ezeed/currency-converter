import ArrowLeftRight from '../../../assets/ArrowLeftRight.svg?react';

interface SwapButtonProps {
  onSwap: () => void;
}

export function SwapButton({ onSwap }: SwapButtonProps) {
  return (
    <div className="flex items-end pb-0.5">
      <button
        type="button"
        aria-label="Swap currencies"
        onClick={onSwap}
        className="border-purple text-purple active:ring-purple focus-visible:ring-purple flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-full border-2 transition-transform duration-300 hover:rotate-180 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:ring-2 active:ring-offset-2"
      >
        <ArrowLeftRight width={20} height={20} />
      </button>
    </div>
  );
}
