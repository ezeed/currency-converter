interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
    >
      <p className="font-bold">Error!</p>
      <p>{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 cursor-pointer rounded-md border border-red-400 bg-white px-2 py-1 hover:bg-gray-100 active:bg-gray-200"
        >
          Try again
        </button>
      )}
    </div>
  );
}
