import type {
  LeaderboardToken,
  TokenStats,
  ApiResponse,
} from "@/types/token";

/**
 * Dune Analytics API Integration
 * Fetches real Pump.fun data from Memecoin Wars dashboard
 * Docs: https://docs.dune.com/api-reference/overview/introduction
 */

const DUNE_API_KEY = process.env.NEXT_PUBLIC_DUNE_API_KEY || "9FxCuOQdIuB3Zix3S5Djz4oAflzIlJk5";
const DUNE_BASE = "https://api.dune.com/api/v1";

// Query IDs from Memecoin Wars dashboard
const QUERY_24H = "5137851"; // 24 hour top tokens
const QUERY_7D = "5138002"; // 7 day top tokens

interface DuneRow {
  asset: string;
  asset_with_chart: string;
  market_cap: number;
  platform: string;
  rank: number;
  token_address_with_chart: string;
  total_supply: number;
  trade_count: number;
  vwap_token_price: number;
}

interface DuneResult {
  result: {
    rows: DuneRow[];
  };
}

/**
 * Extract token address from Dune HTML link
 */
function extractTokenAddress(html: string): string {
  const match = html.match(/\/t\/([a-zA-Z0-9]+)@/);
  return match ? match[1] : "";
}

/**
 * Convert Dune row to LeaderboardToken
 */
function convertDuneToToken(row: DuneRow): LeaderboardToken {
  const tokenAddress = extractTokenAddress(row.token_address_with_chart);

  return {
    rank: row.rank,
    address: tokenAddress,
    name: row.asset,
    symbol: row.asset,
    priceUsd: row.vwap_token_price,
    priceChange24h: 0, // Dune doesn't provide this directly
    priceChange7d: undefined,
    volume24h: 0, // Would need to calculate from trade_count
    marketCap: row.market_cap,
    liquidity: undefined,
    holders: undefined,
    createdAt: undefined,
  };
}

/**
 * Fetch data from Dune query
 */
async function fetchDuneQuery(queryId: string, limit: number = 50): Promise<DuneRow[]> {
  try {
    console.log(`[Dune] Fetching query ${queryId}...`);

    const response = await fetch(
      `${DUNE_BASE}/query/${queryId}/results?limit=${limit}`,
      {
        headers: {
          "X-Dune-API-Key": DUNE_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Dune API error: ${response.status}`);
    }

    const data: DuneResult = await response.json();

    if (!data.result || !data.result.rows) {
      console.warn("[Dune] No data returned from query");
      return [];
    }

    console.log(`[Dune] Fetched ${data.result.rows.length} tokens`);

    return data.result.rows;
  } catch (error) {
    console.error("[Dune] Error fetching query:", error);
    return [];
  }
}

/**
 * Get top tokens by market cap (24h period)
 */
export async function getTop24hTokens(
  limit: number = 50
): Promise<ApiResponse<LeaderboardToken[]>> {
  try {
    console.log("[Dune] Fetching 24h top tokens...");
    const rows = await fetchDuneQuery(QUERY_24H, limit);

    if (rows.length === 0) {
      return {
        data: [],
        error: "No tokens found",
        timestamp: Date.now(),
      };
    }

    const tokens = rows.map(convertDuneToToken);

    console.log(`[Dune] Returning ${tokens.length} tokens for 24h view`);

    return {
      data: tokens,
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("[Dune] Error in getTop24hTokens:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Get top tokens by market cap (7d period)
 */
export async function getTop7dTokens(
  limit: number = 50
): Promise<ApiResponse<LeaderboardToken[]>> {
  try {
    console.log("[Dune] Fetching 7d top tokens...");
    const rows = await fetchDuneQuery(QUERY_7D, limit);

    if (rows.length === 0) {
      return {
        data: [],
        error: "No tokens found",
        timestamp: Date.now(),
      };
    }

    const tokens = rows.map(convertDuneToToken);

    console.log(`[Dune] Returning ${tokens.length} tokens for 7d view`);

    return {
      data: tokens,
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("[Dune] Error in getTop7dTokens:", error);
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
    console.log("[Dune] Fetching market stats...");
    const rows = await fetchDuneQuery(QUERY_24H, 100);

    if (rows.length === 0) {
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

    // Calculate total market cap as volume proxy
    const totalVolume = rows.reduce((sum, row) => sum + row.market_cap, 0);
    const activeTokens = rows.length;

    // Top token by market cap
    const topToken = rows[0];

    return {
      data: {
        totalVolume24h: totalVolume,
        activeTokens,
        topGainer: {
          symbol: topToken.asset,
          change: 0, // Would need historical data
        },
      },
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("[Dune] Error in getMarketStats:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}
