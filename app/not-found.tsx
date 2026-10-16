import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-sm text-muted">404</p>
      <h1 className="h2 mb-3 text-4xl font-semibold">Page not found</h1>
      <p className="mb-8 max-w-sm text-base text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="font-medium text-accent underline-offset-4 transition-colors hover:underline"
      >
        Back to home
      </Link>
    </main>
  );
}
