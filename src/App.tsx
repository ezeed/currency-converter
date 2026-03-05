import { Suspense } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { useQueryClient } from '@tanstack/react-query';
import { Header } from './components/Header';
import { ErrorMessage } from './components/ErrorMessage';
import { CurrencyConverterSection } from './sections/currency-converter/components/CurrencyConverterSection';
import { Content } from './components/Content';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Content pulse={false}>
      <div className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-4xl">
          <ErrorMessage
            message={
              error instanceof Error
                ? error.message
                : 'Something went wrong. Please try again.'
            }
            onRetry={resetErrorBoundary}
          />
        </div>
      </div>
    </Content>
  );
}

function ConverterSkeleton() {
  return (
    <Content pulse={true}>
      <>
        {/* inputs row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex flex-1 flex-col gap-1">
            <div className="bg-border h-3 w-12 rounded" />
            <div className="bg-border h-11 rounded-md" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="bg-border h-3 w-10 rounded" />
            <div className="bg-border h-11 rounded-md" />
          </div>
          <div className="bg-border h-10 w-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-1">
            <div className="bg-border h-3 w-6 rounded" />
            <div className="bg-border h-11 rounded-md" />
          </div>
        </div>
        {/* result row — mirrors grid-cols-2 */}
        <div className="mt-6 grid min-h-48 grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-3">
            <div className="bg-border h-9 w-full rounded-md" />
            <div className="bg-border h-9 w-3/4 rounded-md" />
            <div className="bg-border h-4 w-1/2 rounded-md" />
          </div>
          <div className="flex flex-col justify-end gap-3">
            <div className="bg-border h-20 rounded-md" />
            <div className="bg-border h-3 w-full rounded" />
          </div>
        </div>
      </>
    </Content>
  );
}

function AppContent() {
  const queryClient = useQueryClient();
  const handleReset = () => queryClient.resetQueries();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      <Suspense fallback={<ConverterSkeleton />}>
        <CurrencyConverterSection />
      </Suspense>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <div className="bg-surface flex min-h-screen flex-col">
      <Header />
      <div className="bg-surface flex-1">
        <AppContent />
      </div>
    </div>
  );
}

export default App;
