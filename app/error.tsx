"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-sm text-muted">500</p>
      <h1 className="h2 mb-3 text-4xl font-semibold">Something went wrong</h1>
      <p className="mb-8 max-w-sm text-base text-muted">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="font-medium text-accent underline-offset-4 transition-colors hover:underline"
      >
        Try again
      </button>
    </main>
  );
}
