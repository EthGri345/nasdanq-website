"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { LeaderboardToken, SortConfig } from "@/types/token";
import { formatCurrency, formatCompactNumber, formatPercentage } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export interface LeaderboardTableProps {
  tokens: LeaderboardToken[];
  isLoading?: boolean;
}

export function LeaderboardTable({ tokens, isLoading = false }: LeaderboardTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "volume24h",
    direction: "desc",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Sorting logic
  const sortedTokens = useMemo(() => {
    const sorted = [...tokens];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    return sorted;
  }, [tokens, sortConfig]);

  // Search filtering
  const filteredTokens = useMemo(() => {
    if (!searchQuery) return sortedTokens;

    const query = searchQuery.toLowerCase();
    return sortedTokens.filter(
      (token) =>
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query) ||
        token.address.toLowerCase().includes(query)
    );
  }, [sortedTokens, searchQuery]);

  const handleSort = (key: keyof LeaderboardToken) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof LeaderboardToken }) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="h-4 w-4 text-text-tertiary" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }

    return sortConfig.direction === "desc" ? (
      <svg className="h-4 w-4 text-accent-green" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    ) : (
      <svg className="h-4 w-4 text-accent-green" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-16 rounded-lg bg-background-card shimmer"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-background-card px-4 py-3 pl-10 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-green focus:outline-none focus:ring-1 focus:ring-accent-green"
        />
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-tertiary"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-background-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background-secondary/50">
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("rank")}
                  className="flex items-center space-x-1 text-xs font-semibold uppercase tracking-wide text-text-secondary hover:text-accent-green transition-colors"
                >
                  <span>#</span>
                  <SortIcon columnKey="rank" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center space-x-1 text-xs font-semibold uppercase tracking-wide text-text-secondary hover:text-accent-green transition-colors"
                >
                  <span>Token</span>
                  <SortIcon columnKey="name" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort("priceUsd")}
                  className="flex items-center justify-end space-x-1 text-xs font-semibold uppercase tracking-wide text-text-secondary hover:text-accent-green transition-colors ml-auto"
                >
                  <span>Price</span>
                  <SortIcon columnKey="priceUsd" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort("marketCap")}
                  className="flex items-center justify-end space-x-1 text-xs font-semibold uppercase tracking-wide text-text-secondary hover:text-accent-green transition-colors ml-auto"
                >
                  <span>Market Cap</span>
                  <SortIcon columnKey="marketCap" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.map((token, index) => (
              <motion.tr
                key={token.address}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                onClick={() =>
                  window.open(
                    `https://dexscreener.com/solana/${token.address}`,
                    "_blank"
                  )
                }
                className="group cursor-pointer border-b border-border/50 transition-all hover:bg-background-secondary/30"
              >
                <td className="px-4 py-4">
                  <span className="font-mono text-sm text-text-tertiary">
                    {token.rank}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-background-secondary flex items-center justify-center text-xs font-bold text-accent-green">
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-text-primary group-hover:text-accent-green transition-colors">
                        {token.name}
                      </div>
                      <div className="text-xs text-text-tertiary">
                        ${token.symbol}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-mono text-sm text-text-primary">
                    {formatCurrency(token.priceUsd, {
                      minimumFractionDigits: 6,
                      maximumFractionDigits: 6,
                    })}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-mono text-sm text-text-primary">
                    ${formatCompactNumber(token.marketCap)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredTokens.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-text-secondary">No tokens found</p>
          </div>
        )}
      </div>
    </div>
  );
}
