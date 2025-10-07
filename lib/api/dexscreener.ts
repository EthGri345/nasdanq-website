import type {
  PumpFunToken,
  LeaderboardToken,
  TokenStats,
  ApiResponse,
} from "@/types/token";

/**
 * DexScreener API Integration (FREE - 300 req/min)
 * Docs: https://docs.dexscreener.com/api/reference
 */

const DEXSCREENER_BASE = "https://api.dexscreener.com/latest";
const PUMP_FUN_PROGRAM = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"; // Pump.fun program ID

interface DexPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity?: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv?: number;
  marketCap?: number;
  pairCreatedAt?: number;
}

interface DexScreenerResponse {
  schemaVersion: string;
  pairs: DexPair[];
}

/**
 * Fetch top Pump.fun tokens from DexScreener
 * FREE API - No key required!
 */
async function fetchPumpFunTokens(): Promise<DexPair[]> {
  try {
    // Get recent Solana pairs (includes Pump.fun tokens)
    const response = await fetch(
      `${DEXSCREENER_BASE}/dex/tokens/So11111111111111111111111111111111111111112`,
      {
        next: { revalidate: 30 }, // Cache for 30 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`DexScreener API error: ${response.status}`);
    }

    const data: DexScreenerResponse = await response.json();

    // Filter for Pump.fun tokens (they use specific DEX IDs)
    const pumpFunPairs = data.pairs.filter(
      (pair) =>
        pair.chainId === "solana" &&
        (pair.dexId === "raydium" || pair.dexId === "pumpfun") &&
        pair.volume.h24 > 0 // Has trading volume
    );

    return pumpFunPairs;
  } catch (error) {
    console.error("Error fetching from DexScreener:", error);
    return [];
  }
}

/**
 * Convert DexScreener pair to our LeaderboardToken format
 */
function convertToLeaderboardToken(
  pair: DexPair,
  rank: number
): LeaderboardToken {
  return {
    rank,
    address: pair.baseToken.address,
    name: pair.baseToken.name,
    symbol: pair.baseToken.symbol,
    priceUsd: parseFloat(pair.priceUsd || "0"),
    priceChange24h: pair.priceChange.h24 || 0,
    priceChange7d: undefined, // DexScreener doesn't provide 7d by default
    volume24h: pair.volume.h24 || 0,
    marketCap: pair.marketCap || pair.fdv || 0,
    liquidity: pair.liquidity?.usd,
    holders: undefined,
    createdAt: pair.pairCreatedAt,
  };
}

/**
 * Get top tokens by 24h volume
 */
export async function getTop24hTokens(
  limit: number = 25
): Promise<ApiResponse<LeaderboardToken[]>> {
  try {
    const pairs = await fetchPumpFunTokens();

    if (pairs.length === 0) {
      // Fallback to mock data if API fails
      const { getTop24hTokens: getMockData } = await import("./pumpfun");
      return getMockData(limit);
    }

    // Sort by 24h volume
    const sorted = pairs
      .sort((a, b) => (b.volume.h24 || 0) - (a.volume.h24 || 0))
      .slice(0, limit)
      .map((pair, index) => convertToLeaderboardToken(pair, index + 1));

    return {
      data: sorted,
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error in getTop24hTokens:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Get top tokens by price change (7d approximation using 24h)
 */
export async function getTop7dTokens(
  limit: number = 25
): Promise<ApiResponse<LeaderboardToken[]>> {
  try {
    const pairs = await fetchPumpFunTokens();

    if (pairs.length === 0) {
      const { getTop7dTokens: getMockData } = await import("./pumpfun");
      return getMockData(limit);
    }

    // Sort by 24h price change (approximation for 7d)
    const sorted = pairs
      .sort((a, b) => (b.priceChange.h24 || 0) - (a.priceChange.h24 || 0))
      .slice(0, limit)
      .map((pair, index) => convertToLeaderboardToken(pair, index + 1));

    return {
      data: sorted,
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error in getTop7dTokens:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Get market statistics
 */
export async function getMarketStats(): Promise<ApiResponse<TokenStats>> {
  try {
    const pairs = await fetchPumpFunTokens();

    if (pairs.length === 0) {
      const { getMarketStats: getMockData } = await import("./pumpfun");
      return getMockData();
    }

    // Calculate stats from pairs
    const totalVolume = pairs.reduce((sum, pair) => sum + (pair.volume.h24 || 0), 0);
    const activeTokens = pairs.length;

    // Find top gainer
    const topGainer = pairs.reduce((best, pair) => {
      const change = pair.priceChange.h24 || 0;
      return change > (best.change || 0) ? { symbol: pair.baseToken.symbol, change } : best;
    }, { symbol: "", change: 0 });

    return {
      data: {
        totalVolume24h: totalVolume,
        activeTokens,
        topGainer,
      },
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error in getMarketStats:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Get token details by address
 */
export async function getTokenDetails(
  address: string
): Promise<ApiResponse<PumpFunToken>> {
  try {
    const response = await fetch(`${DEXSCREENER_BASE}/dex/tokens/${address}`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error(`DexScreener API error: ${response.status}`);
    }

    const data: DexScreenerResponse = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      throw new Error("Token not found");
    }

    const pair = data.pairs[0];

    return {
      data: {
        address: pair.baseToken.address,
        name: pair.baseToken.name,
        symbol: pair.baseToken.symbol,
        priceUsd: parseFloat(pair.priceUsd || "0"),
        priceChange24h: pair.priceChange.h24 || 0,
        volume24h: pair.volume.h24 || 0,
        marketCap: pair.marketCap || pair.fdv || 0,
        liquidity: pair.liquidity?.usd,
        createdAt: pair.pairCreatedAt,
      },
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error in getTokenDetails:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}
