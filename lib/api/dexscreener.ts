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
const PUMP_FUN_UPDATE_AUTHORITY = "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM"; // All pump tokens have this

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
 * Fetch actual Pump.fun tokens from DexScreener
 * Uses token-profiles API to get latest Pump.fun launches
 * FREE API - No key required!
 */
async function fetchPumpFunTokens(): Promise<DexPair[]> {
  try {
    console.log("[DexScreener] Fetching latest token profiles...");

    // Get latest token profiles - these include newly launched tokens
    const profilesResponse = await fetch(
      "https://api.dexscreener.com/token-profiles/latest/v1"
    );

    if (!profilesResponse.ok) {
      throw new Error(`Profiles API error: ${profilesResponse.status}`);
    }

    const profiles = await profilesResponse.json();

    // Filter for Solana tokens with "pump" in address (Pump.fun tokens)
    const pumpTokenAddresses = profiles
      .filter((p: any) =>
        p.chainId === "solana" &&
        p.tokenAddress &&
        p.tokenAddress.toLowerCase().includes("pump")
      )
      .map((p: any) => p.tokenAddress);

    console.log(`[DexScreener] Found ${pumpTokenAddresses.length} Pump.fun token addresses`);

    if (pumpTokenAddresses.length === 0) {
      console.warn("[DexScreener] No Pump.fun tokens found in profiles");
      return [];
    }

    // Fetch pair data for each token
    const allPairs: DexPair[] = [];

    // Fetch in batches to avoid rate limits
    for (let i = 0; i < Math.min(pumpTokenAddresses.length, 100); i++) {
      const address = pumpTokenAddresses[i];

      try {
        const response = await fetch(
          `${DEXSCREENER_BASE}/dex/tokens/${address}`
        );

        if (response.ok) {
          const data: DexScreenerResponse = await response.json();
          if (data.pairs && data.pairs.length > 0) {
            // Get the pair with highest liquidity for this token
            const bestPair = data.pairs
              .filter(p => p.chainId === "solana")
              .sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0];

            if (bestPair) {
              allPairs.push(bestPair);
            }
          }
        }

        // Small delay to avoid rate limiting
        if (i % 10 === 0 && i > 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (err) {
        console.warn(`[DexScreener] Failed to fetch token ${address}:`, err);
      }
    }

    console.log(`[DexScreener] Fetched ${allPairs.length} token pairs`);

    // Filter for valid Pump.fun tokens
    const pumpFunPairs = allPairs.filter((pair) => {
      const isOnSolana = pair.chainId === "solana";
      const isPumpFun = pair.dexId === "pumpfun" || pair.dexId === "raydium" || pair.dexId === "pumpswap";
      const hasMinCap = pair.marketCap && pair.marketCap > 1000; // At least $1k
      const hasMinVolume = pair.volume && pair.volume.h24 > 100; // At least $100 volume
      const notWrappedSol =
        pair.baseToken.symbol !== "SOL" &&
        pair.baseToken.symbol !== "WSOL";

      return isOnSolana && isPumpFun && hasMinCap && hasMinVolume && notWrappedSol;
    });

    console.log(`[DexScreener] Filtered to ${pumpFunPairs.length} valid Pump.fun tokens`);

    return pumpFunPairs;
  } catch (error) {
    console.error("[DexScreener] Error fetching Pump.fun tokens:", error);
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
 * Get top tokens by market cap (24h period)
 */
export async function getTop24hTokens(
  limit: number = 50
): Promise<ApiResponse<LeaderboardToken[]>> {
  try {
    console.log("[DexScreener] Fetching Pump.fun tokens...");
    const pairs = await fetchPumpFunTokens();
    console.log(`[DexScreener] Got ${pairs.length} pairs`);

    if (pairs.length === 0) {
      console.warn("[DexScreener] No pairs found, returning empty result");
      return {
        data: [],
        error: "No tokens found matching criteria",
        timestamp: Date.now(),
      };
    }

    // Sort by market cap (descending)
    const sorted = pairs
      .filter((pair) => pair.marketCap && pair.marketCap > 0)
      .sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0))
      .slice(0, limit)
      .map((pair, index) => convertToLeaderboardToken(pair, index + 1));

    console.log(`[DexScreener] Returning ${sorted.length} sorted tokens`);

    return {
      data: sorted,
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("[DexScreener] Error in getTop24hTokens:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Get top tokens by 24h volume (7d period view)
 */
export async function getTop7dTokens(
  limit: number = 50
): Promise<ApiResponse<LeaderboardToken[]>> {
  try {
    console.log("[DexScreener] Fetching 7d tokens (sorted by volume)...");
    const pairs = await fetchPumpFunTokens();

    if (pairs.length === 0) {
      return {
        data: [],
        error: "No tokens found matching criteria",
        timestamp: Date.now(),
      };
    }

    // Sort by 24h volume (descending) to show most actively traded
    const sorted = pairs
      .filter((pair) => pair.volume && pair.volume.h24 > 0)
      .sort((a, b) => (b.volume.h24 || 0) - (a.volume.h24 || 0))
      .slice(0, limit)
      .map((pair, index) => convertToLeaderboardToken(pair, index + 1));

    console.log(`[DexScreener] Returning ${sorted.length} tokens sorted by volume`);

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
      return {
        data: {
          totalVolume24h: 0,
          activeTokens: 0,
          topGainer: { symbol: "--", change: 0 },
        },
        error: null,
        timestamp: Date.now(),
      };
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
