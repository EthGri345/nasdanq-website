/**
 * Pump.fun token data types
 */

export interface PumpFunToken {
  /** Token mint address */
  address: string;
  /** Token name */
  name: string;
  /** Token symbol/ticker */
  symbol: string;
  /** Token logo URL */
  image?: string;
  /** Current price in USD */
  priceUsd: number;
  /** Price change percentage (24h) */
  priceChange24h: number;
  /** Price change percentage (7d) */
  priceChange7d?: number;
  /** 24h trading volume in USD */
  volume24h: number;
  /** Market capitalization in USD */
  marketCap: number;
  /** Total liquidity in USD */
  liquidity?: number;
  /** Number of token holders */
  holders?: number;
  /** Token creation timestamp */
  createdAt?: number;
  /** Whether token is bonded (graduated from pump.fun) */
  bonded?: boolean;
}

export interface LeaderboardToken extends PumpFunToken {
  /** Rank position */
  rank: number;
  /** Price history for sparkline chart */
  priceHistory?: number[];
}

export interface TokenStats {
  /** Total 24h volume across all tokens */
  totalVolume24h: number;
  /** Number of active tokens */
  activeTokens: number;
  /** Top gainer token info */
  topGainer: {
    symbol: string;
    change: number;
  };
  /** Top loser token info */
  topLoser?: {
    symbol: string;
    change: number;
  };
}

/**
 * API response wrapper with error handling
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  timestamp: number;
}

/**
 * Leaderboard time period filter
 */
export type LeaderboardPeriod = "24h" | "7d";

/**
 * Table sort direction
 */
export type SortDirection = "asc" | "desc";

/**
 * Table sort configuration
 */
export interface SortConfig {
  key: keyof LeaderboardToken;
  direction: SortDirection;
}
