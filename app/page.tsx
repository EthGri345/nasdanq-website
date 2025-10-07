"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MarketStats } from "@/components/home/MarketStats";
import { LeaderboardTable } from "@/components/home/LeaderboardTable";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";
import { getTop24hTokens, getTop7dTokens } from "@/lib/api/dexscreener";
import type { LeaderboardToken, LeaderboardPeriod } from "@/types/token";

export default function HomePage() {
  const [period, setPeriod] = useState<LeaderboardPeriod>("24h");
  const [tokens, setTokens] = useState<LeaderboardToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response =
        period === "24h" ? await getTop24hTokens(50) : await getTop7dTokens(50);

      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setTokens(response.data);
      }
    } catch (err) {
      setError("Failed to fetch token data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchTokens, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background-secondary to-background-primary">
        <div className="container-custom py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display">
              <span className="text-gradient-green">NASDANQ</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              The future of the digital economy.{" "}
              <span className="text-accent-green">
                Trade the present and future of expression.
              </span>
            </p>

            {/* Hero Video */}
            <div className="relative mx-auto mt-8 max-w-4xl rounded-lg overflow-hidden border border-border bg-background-card aspect-video">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/3635333496911377835.mov" type="video/quicktime" />
                <source src="/videos/8872483471728788470.mov" type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("leaderboard")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Tokens
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
      </section>

      {/* Market Stats */}
      <section className="container-custom py-12 md:py-16">
        <MarketStats />
      </section>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="container-custom py-12 md:py-16">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                Top Tokens
              </h2>
              <p className="text-text-secondary mt-2">
                Real-time leaderboard from Pump.fun
              </p>
            </div>

            {/* Period Toggle */}
            <div className="flex items-center space-x-2 bg-background-card border border-border rounded-lg p-1">
              <button
                onClick={() => setPeriod("24h")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  period === "24h"
                    ? "bg-accent-green text-background-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                24 Hours
              </button>
              <button
                onClick={() => setPeriod("7d")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  period === "7d"
                    ? "bg-accent-green text-background-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                7 Days
              </button>
            </div>
          </div>

          {error ? (
            <ErrorState message={error} onRetry={fetchTokens} />
          ) : (
            <LeaderboardTable tokens={tokens} isLoading={isLoading} />
          )}

          {/* Last updated indicator */}
          {!isLoading && !error && (
            <div className="flex items-center justify-center space-x-2 text-xs text-text-tertiary">
              <div className="h-2 w-2 rounded-full bg-accent-green animate-glow-pulse" />
              <span>Auto-updating every 30 seconds</span>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-background-secondary">
        <div className="container-custom py-16 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary">
              One repost can change your{" "}
              <span className="text-gradient-green">portfolio forever</span>
            </h2>
            <p className="text-lg text-text-secondary">
              Conviction isn't clicking like. It's living the meme.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" onClick={() => (window.location.href = "/swap")}>
                Start Trading
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => (window.location.href = "/lore")}
              >
                Learn the Lore
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
