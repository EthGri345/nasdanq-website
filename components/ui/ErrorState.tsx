import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Button";

export interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error loading this data.",
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4 rounded-lg border border-accent-pink/20 bg-accent-pink/5 p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="rounded-full bg-accent-pink/10 p-3">
        <svg
          className="h-6 w-6 text-accent-pink"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary max-w-md">{message}</p>
      </div>

      {onRetry && (
        <Button variant="secondary" onClick={onRetry} size="sm">
          Try Again
        </Button>
      )}
    </div>
  );
}
