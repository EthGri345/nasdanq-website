"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { getMarketStats } from "@/lib/api/dune";
import { formatCompactNumber } from "@/lib/utils/format";
import type { TokenStats } from "@/types/token";

export function MarketStats() {
  const [stats, setStats] = useState<TokenStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await getMarketStats();
      if (response.data) {
        setStats(response.data);
      }
      setIsLoading(false);
    };

    fetchStats();

    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="24H Volume"
        value={stats ? `$${formatCompactNumber(stats.totalVolume24h)}` : "--"}
        subtitle="Total Pump.fun volume"
        isLoading={isLoading}
      />

      <StatCard
        label="Active Tokens"
        value={stats ? formatCompactNumber(stats.activeTokens) : "--"}
        subtitle="Tokens traded today"
        isLoading={isLoading}
      />

      <StatCard
        label="Top Gainer"
        value={
          stats
            ? `${stats.topGainer.symbol} ${stats.topGainer.change.toFixed(0)}%`
            : "--"
        }
        subtitle="Best performer (24h)"
        trend={stats ? "up" : undefined}
        isLoading={isLoading}
      />
    </div>
  );
}
