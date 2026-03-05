import { type ReactNode } from 'react';

export function Content({
  children,
  pulse = false,
}: {
  children: ReactNode;
  pulse?: boolean;
}) {
  return (
    <>
      <section className="bg-purple px-6 pt-15 pb-38" />
      <div className="px-4 pb-8 md:px-8">
        <div className="mx-auto -mt-20 max-w-4xl">
          <div
            className={`bg-card rounded-md p-6 shadow-md${pulse ? ' animate-pulse' : ''}`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
