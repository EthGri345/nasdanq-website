# NASDANQ Quick Start Guide

Get the site running locally in under 2 minutes.

## Prerequisites

- Node.js 18+ installed
- Terminal/Command line access

## Steps

### 1. Navigate to Project

```bash
cd /home/ethan-griffin/nasdanq-website
```

### 2. Install Dependencies (First Time Only)

```bash
pnpm install
```

*Don't have pnpm? Install it:*
```bash
npm install -g pnpm
```

### 3. Start Development Server

```bash
pnpm dev
```

### 4. Open in Browser

Visit: **http://localhost:3000**

---

## What You'll See

- **Home (/)** - Token leaderboard with mock data
- **Lore (/lore)** - NASDANQ history and mythology
- **Art (/art)** - Gallery (awaiting artwork assets)
- **Swap (/swap)** - Coming soon page with countdown

---

## Common Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Build for production
pnpm start        # Run production build
pnpm type-check   # Check TypeScript
pnpm lint         # Run linter
```

---

## Making Changes

1. Edit files in `/app`, `/components`, or `/lib`
2. Save
3. Browser auto-refreshes (Fast Refresh)
4. See changes instantly

### Example: Change Home Page

```bash
# Edit the home page
nano app/page.tsx

# Or use your preferred editor
code app/page.tsx
```

---

## Adding Assets

### Hero Video
```bash
# Place video in public folder
cp ~/path/to/video.mp4 public/videos/hero-lore.mp4

# Update app/page.tsx to use it (search for "video")
```

### Artwork
```bash
# Add to public/art
cp ~/path/to/art/* public/art/

# Update app/art/page.tsx with image paths
```

### Logo
```bash
# Add to public/logos
cp ~/path/to/logo.svg public/logos/

# Update components/layout/Header.tsx
```

---

## Next Steps

### To Deploy:
1. Read `docs/DEPLOYMENT_GUIDE.md`
2. Get API keys (Moralis, RPC)
3. Deploy to Vercel
4. Configure domain

### To Add Real API:
1. Get Moralis API key
2. Get Solana RPC URL
3. Create `.env` file:
   ```bash
   cp .env.example .env
   nano .env
   ```
4. Add your keys
5. Restart dev server

---

## Troubleshooting

**Port 3000 already in use?**
```bash
# Kill existing process
lsof -ti:3000 | xargs kill

# Or use different port
pnpm dev -- -p 3001
```

**Module not found errors?**
```bash
rm -rf node_modules .next
pnpm install
pnpm dev
```

**Changes not showing?**
```bash
# Hard refresh in browser
# Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
# Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
```

---

## Help

- **Documentation:** See `README.md`
- **Full Guide:** See `docs/TECHNICAL_SPEC.md`
- **Deployment:** See `docs/DEPLOYMENT_GUIDE.md`

---

**That's it! You're running NASDANQ locally. 🚀**
