"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-8xl">⚠️</div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-text-primary">
            Something went wrong
          </h1>
          <p className="text-text-secondary">
            We encountered an unexpected error. This has been logged and we'll look
            into it.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-4 rounded-lg bg-background-card border border-accent-pink/30 text-left">
              <p className="text-xs font-mono text-accent-pink break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="secondary" onClick={() => (window.location.href = "/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
