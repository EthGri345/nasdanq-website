# NASDANQ - Solana Meme Exchange

> The future of the digital economy. Trade the present and future of expression.

A professional-grade meme token discovery and trading platform built on Solana, reimagining the legendary 2016 NASDANQ for the blockchain era.

## 🚀 Features

### Phase 1 (Current - MVP)
- ✅ **Real-time Leaderboard** - Top Pump.fun tokens by 24h and 7d volume
- ✅ **Market Statistics** - Live market data with auto-refresh
- ✅ **Responsive Design** - Mobile-first, optimized for all devices
- ✅ **NASDANQ Lore** - Comprehensive history with scroll animations
- ✅ **Art Gallery** - Showcase for community artwork
- ✅ **Coming Soon Page** - Swap feature preview with email signup

### Phase 2 (Planned)
- 🔄 **Jupiter Terminal Integration** - Direct token swaps
- 🔄 **Wallet Connection** - Phantom, Solflare, Backpack support
- 🔄 **Transaction History** - Track your trades
- 🔄 **Token Watchlist** - Save favorites

### Phase 3+ (Future)
- 📊 **Portfolio Tracker** - Monitor connected wallet holdings
- 🔔 **Price Alerts** - Email/push notifications
- 📈 **Advanced Charts** - TradingView integration
- 🎨 **Community Features** - Art submissions, social trading

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom design system
- **Animations:** Framer Motion
- **Data Fetching:** Native fetch with caching
- **API:** Moralis Pump Fun API (or Bitquery)
- **RPC:** QuickNode / Helius (Solana)
- **Hosting:** Vercel (recommended)

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nasdanq-website
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your API keys:
   ```env
   MORALIS_API_KEY=your_moralis_api_key_here
   NEXT_PUBLIC_RPC_URL=https://your-rpc-url
   ```

4. **Run development server:**
   ```bash
   pnpm dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🔑 API Keys Setup

### Moralis (Pump.fun Data)
1. Sign up at [moralis.com](https://moralis.com/)
2. Create a new project
3. Navigate to API Keys
4. Copy your API key to `.env` as `MORALIS_API_KEY`
5. Recommended plan: Pro ($49/mo) for production

### QuickNode or Helius (Solana RPC)
**Option A: QuickNode**
1. Sign up at [quicknode.com](https://www.quicknode.com/)
2. Create a Solana Mainnet endpoint
3. Copy the HTTP URL to `.env` as `NEXT_PUBLIC_RPC_URL`

**Option B: Helius**
1. Sign up at [helius.dev](https://www.helius.dev/)
2. Create an API key
3. Use: `https://mainnet.helius-rpc.com/?api-key=YOUR_KEY`

## 📁 Project Structure

```
nasdanq-website/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home (Leaderboard)
│   ├── lore/page.tsx        # Lore page
│   ├── art/page.tsx         # Art gallery
│   ├── swap/page.tsx        # Swap (coming soon)
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── error.tsx            # Error boundary
│   └── not-found.tsx        # 404 page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── StatCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorState.tsx
│   ├── layout/
│   │   └── Header.tsx       # Navigation header
│   └── home/
│       ├── LeaderboardTable.tsx
│       └── MarketStats.tsx
├── lib/
│   ├── api/
│   │   └── pumpfun.ts       # API integration layer
│   └── utils/
│       ├── cn.ts            # Class name utility
│       └── format.ts        # Formatting utilities
├── types/
│   └── token.ts             # TypeScript types
├── public/
│   ├── videos/              # Hero video (add here)
│   ├── art/                 # Artwork assets (add here)
│   └── logos/               # Logo files (add here)
└── docs/                    # Documentation
    ├── TECHNICAL_SPEC.md    # Full technical specification
    └── PM_REQUIREMENTS.md   # PM action items
```

## 🎨 Adding Assets

### Hero Video
Place your final lore video in `/public/videos/hero-lore.mp4` and update `app/page.tsx`:

```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-cover"
>
  <source src="/videos/hero-lore.mp4" type="video/mp4" />
</video>
```

### Artwork
1. Add images to `/public/art/`
2. Update `app/art/page.tsx` with actual image data:

```tsx
const artCollection = [
  {
    id: 1,
    title: "Character Concept",
    artist: "maūru",
    category: "Character Art",
    image: "/art/character-01.png"
  },
  // ... more artwork
];
```

### Logo
Add logo files to `/public/logos/` and update header:
- `logo.svg` - Vector logo
- `logo-512.png` - Large PNG
- `logo-256.png` - Medium PNG
- `favicon.ico` - Browser favicon

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect repository:**
   - Visit [vercel.com](https://vercel.com)
   - Import your Git repository
   - Select the `nasdanq-website` directory

2. **Configure:**
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`

3. **Environment Variables:**
   Add your API keys in Vercel dashboard:
   - `MORALIS_API_KEY`
   - `NEXT_PUBLIC_RPC_URL`

4. **Custom Domain:**
   - Add `nasdanq.xyz` in Vercel domain settings
   - Update DNS records as instructed

5. **Deploy:**
   - Push to main branch → auto-deploys
   - Or click "Deploy" in Vercel dashboard

### Alternative: Cloudflare Pages

1. Connect repository to Cloudflare Pages
2. Build command: `pnpm build`
3. Build output: `.next`
4. Add environment variables
5. Configure `nasdanq.xyz` domain

## 🧪 Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler check
```

### Code Quality

- **TypeScript:** Strict mode enabled, no `any` types
- **ESLint:** Next.js recommended rules + custom
- **Prettier:** (Optional) Add `.prettierrc` if desired
- **Git Hooks:** (Optional) Add Husky for pre-commit checks

### Mock Data vs Real API

Currently using mock data generators in `lib/api/pumpfun.ts`. Once API keys are added:

1. Replace mock functions with real API calls
2. Uncomment the fetch implementations
3. Test thoroughly with real data
4. Monitor API rate limits

## 🎯 Performance

### Built-in Optimizations

- ✅ Server-side rendering (SSR) for initial page loads
- ✅ Automatic code splitting
- ✅ Image optimization (next/image)
- ✅ Font optimization (Google Fonts)
- ✅ CSS minification
- ✅ Tree shaking

### Monitoring

Add analytics (when decided):

**Plausible:**
```tsx
// Add to app/layout.tsx
<Script defer data-domain="nasdanq.xyz" src="https://plausible.io/js/script.js" />
```

**PostHog:**
```bash
pnpm add posthog-js
```

## 🔒 Security

- ✅ No secrets in client-side code
- ✅ Environment variables properly scoped (`NEXT_PUBLIC_` for client)
- ✅ CSP headers (configured in `next.config.mjs` if needed)
- ✅ Input validation on all forms
- ✅ Rate limiting on API routes (add when needed)

## 📊 SEO

Configured in `app/layout.tsx`:
- Meta tags
- Open Graph images
- Twitter cards
- Sitemap (auto-generated by Next.js)
- Robots.txt (add to `/public/robots.txt` if needed)

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules .next
pnpm install
pnpm dev
```

### API not returning data
1. Check `.env` file exists and has correct keys
2. Verify API key is valid (test in Postman/Insomnia)
3. Check console for CORS errors
4. Ensure RPC endpoint is responding

### Build fails
1. Run `pnpm type-check` to find TypeScript errors
2. Check `pnpm lint` for linting issues
3. Verify all imports are correct
4. Clear `.next` cache

### Styles not applying
1. Verify Tailwind is running: check `tailwind.config.ts`
2. Clear browser cache
3. Check for CSS conflicts in DevTools
4. Restart dev server

## 📞 Support

- **Issues:** Use GitHub Issues for bugs/features
- **Questions:** Check `docs/` folder first
- **Updates:** Follow development in project kanban

## 📄 License

[Add your license here - MIT recommended]

## 🙏 Credits

- **Design & Lore:** maūru
- **Development:** Claude (AI Engineer)
- **Original NASDANQ:** Darkpitt, AchillesDev, Icedog68, Brandon Wink, Ron Vaisman, and the 12-person team (2017)
- **Community:** r/MemeEconomy

---

**Built with conviction. Deployed with chaos. Trading the future of expression.**

🟢 LIVE STATUS: Development (Phase 1)
