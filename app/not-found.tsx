import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-8xl">404</div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-text-primary">Page Not Found</h1>
          <p className="text-text-secondary">
            This page doesn't exist in the meme economy. Try navigating back to
            familiar territory.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
          <Link href="/lore">
            <Button variant="secondary">Read the Lore</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
