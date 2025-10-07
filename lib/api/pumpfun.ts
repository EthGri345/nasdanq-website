import type {
  PumpFunToken,
  LeaderboardToken,
  TokenStats,
  ApiResponse,
  LeaderboardPeriod,
} from "@/types/token";

/**
 * Mock data generator for development (until API keys are provided)
 * This will be replaced with real Moralis/Bitquery API calls
 */

const MOCK_TOKEN_NAMES = [
  "Pepe Classic",
  "Doge Killer",
  "Moon Lambo",
  "Wojak Finance",
  "Chad Coin",
  "Diamond Hands",
  "Ape Together",
  "Rocket Fuel",
  "Tendies Token",
  "Based God",
  "Gigachad",
  "Normie Destroyer",
  "Cope Coin",
  "Hopium",
  "Wagmi Forever",
  "Ngmi Reversal",
  "Honk Honk",
  "Clown World",
  "Meme Magic",
  "Kek Currency",
];

const MOCK_TOKEN_SYMBOLS = [
  "PEPE2",
  "DOGK",
  "LAMBO",
  "WOJAK",
  "CHAD",
  "DIAMOND",
  "APE",
  "ROCKET",
  "TEND",
  "BASED",
  "GIGA",
  "NORM",
  "COPE",
  "HOPE",
  "WAGMI",
  "NGMI",
  "HONK",
  "CLWN",
  "MAGIC",
  "KEK",
];

function generateMockToken(index: number): LeaderboardToken {
  const priceChange24h = (Math.random() - 0.5) * 200; // -100% to +100%
  const priceChange7d = (Math.random() - 0.5) * 300;
  const priceUsd = Math.random() * 0.01;
  const volume24h = Math.random() * 5_000_000;
  const marketCap = volume24h * (Math.random() * 10 + 5);

  return {
    rank: index + 1,
    address: `${index}x${Math.random().toString(36).substring(2, 15)}mock`,
    name: MOCK_TOKEN_NAMES[index % MOCK_TOKEN_NAMES.length],
    symbol: MOCK_TOKEN_SYMBOLS[index % MOCK_TOKEN_SYMBOLS.length],
    priceUsd,
    priceChange24h,
    priceChange7d,
    volume24h,
    marketCap,
    liquidity: marketCap * 0.15,
    holders: Math.floor(Math.random() * 10000) + 100,
    createdAt: Date.now() - Math.random() * 86400000 * 30, // Random within last 30 days
    priceHistory: Array.from({ length: 20 }, () => priceUsd * (0.8 + Math.random() * 0.4)),
  };
}

/**
 * Fetch top tokens by 24h volume
 * @param limit - Number of tokens to return
 * @returns API response with token array
 */
export async function getTop24hTokens(
  limit: number = 25
): Promise<ApiResponse<LeaderboardToken[]>> {
  try {
    // TODO: Replace with real Moralis API call when key is provided
    // const response = await fetch(`https://solana-api.moralis.io/v1/...`, {
    //   headers: { 'X-API-Key': process.env.MORALIS_API_KEY! }
    // });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockData: LeaderboardToken[] = Array.from({ length: limit }, (_, i) =>
      generateMockToken(i)
    ).sort((a, b) => b.volume24h - a.volume24h);

    return {
      data: mockData,
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error fetching 24h tokens:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Fetch top tokens by 7d volume
 * @param limit - Number of tokens to return
 * @returns API response with token array
 */
export async function getTop7dTokens(
  limit: number = 25
): Promise<ApiResponse<LeaderboardToken[]>> {
  try {
    // TODO: Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockData: LeaderboardToken[] = Array.from({ length: limit }, (_, i) =>
      generateMockToken(i + 100)
    ).sort((a, b) => (b.priceChange7d || 0) - (a.priceChange7d || 0));

    return {
      data: mockData,
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error fetching 7d tokens:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Fetch market statistics
 * @returns API response with stats
 */
export async function getMarketStats(): Promise<ApiResponse<TokenStats>> {
  try {
    // TODO: Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 200));

    const mockStats: TokenStats = {
      totalVolume24h: Math.random() * 50_000_000 + 10_000_000,
      activeTokens: Math.floor(Math.random() * 500) + 200,
      topGainer: {
        symbol: MOCK_TOKEN_SYMBOLS[Math.floor(Math.random() * MOCK_TOKEN_SYMBOLS.length)],
        change: Math.random() * 150 + 50,
      },
    };

    return {
      data: mockStats,
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error fetching market stats:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Fetch token details by address
 * @param address - Token mint address
 * @returns API response with token data
 */
export async function getTokenDetails(
  address: string
): Promise<ApiResponse<PumpFunToken>> {
  try {
    // TODO: Replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 200));

    const mockToken: PumpFunToken = {
      address,
      name: MOCK_TOKEN_NAMES[0],
      symbol: MOCK_TOKEN_SYMBOLS[0],
      priceUsd: Math.random() * 0.01,
      priceChange24h: (Math.random() - 0.5) * 200,
      volume24h: Math.random() * 5_000_000,
      marketCap: Math.random() * 50_000_000,
      liquidity: Math.random() * 5_000_000,
      holders: Math.floor(Math.random() * 10000) + 100,
      createdAt: Date.now() - Math.random() * 86400000 * 30,
    };

    return {
      data: mockToken,
      error: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error fetching token details:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Client-side data fetcher with caching
 * Uses SWR-like pattern for real-time updates
 */
export const tokenFetcher = {
  top24h: () => getTop24hTokens(),
  top7d: () => getTop7dTokens(),
  stats: () => getMarketStats(),
  details: (address: string) => getTokenDetails(address),
};
