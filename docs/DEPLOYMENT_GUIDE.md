# NASDANQ Deployment Guide

Complete guide to deploying NASDANQ to production.

## Pre-Deployment Checklist

### Required Assets
- [ ] Hero lore video (MP4/WebM in `/public/videos/`)
- [ ] Artwork files (PNG/SVG in `/public/art/`)
- [ ] Logo files (SVG + PNGs in `/public/logos/`)
- [ ] Favicon (`.ico` in `/public/`)
- [ ] OG image for social sharing (`/public/og-image.png` - 1200x630px)

### Required Credentials
- [ ] Moralis API key
- [ ] Solana RPC endpoint (QuickNode or Helius)
- [ ] Domain registered (nasdanq.xyz)
- [ ] Vercel account created

### Optional Setup
- [ ] Analytics service configured (Plausible/PostHog)
- [ ] Email service for swap waitlist (Mailchimp/ConvertKit/Resend)
- [ ] Twitter handle for social metadata

---

## Deployment Steps

### 1. Prepare Repository

```bash
# From project root
cd nasdanq-website

# Ensure all files are committed
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Fastest)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: nasdanq-website
# - Directory: ./
# - Framework: Next.js (auto-detected)
# - Build settings: Default

# Deploy to production
vercel --prod
```

#### Option B: Vercel Dashboard (Recommended for First Time)

1. Visit [vercel.com/new](https://vercel.com/new)
2. Import Git repository
3. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (or `nasdanq-website` if monorepo)
   - **Build Command:** `pnpm build`
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`

4. **Environment Variables:**
   Click "Environment Variables" and add:
   ```
   MORALIS_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_RPC_URL=https://your-rpc-endpoint
   ```

5. Click **Deploy**

6. Wait 2-3 minutes for build to complete

---

### 3. Configure Custom Domain

#### In Vercel Dashboard:

1. Go to your project → Settings → Domains
2. Add domain: `nasdanq.xyz`
3. Vercel will provide DNS records

#### In Your Domain Registrar (NameCheap, GoDaddy, Cloudflare, etc.):

**Option A: Nameservers (Easiest)**
1. Point nameservers to Vercel:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

**Option B: DNS Records**
Add these records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

3. Wait for DNS propagation (5-60 minutes)
4. Vercel will auto-issue SSL certificate

---

### 4. Verify Deployment

Visit your live site checklist:

- [ ] Homepage loads
- [ ] Leaderboard displays (with mock data initially)
- [ ] Navigation works (all 4 pages)
- [ ] Lore page animations work
- [ ] Mobile responsive design looks good
- [ ] Hero video placeholder visible (will replace with real video)
- [ ] No console errors in DevTools
- [ ] SSL certificate active (🔒 in browser)

---

### 5. Add Real API Keys

#### Update Environment Variables in Vercel:

1. Dashboard → Project → Settings → Environment Variables
2. Click "Edit" on existing variables:
   ```
   MORALIS_API_KEY=your_real_moralis_key
   NEXT_PUBLIC_RPC_URL=https://your-real-rpc-url
   ```
3. Click "Save"
4. **Redeploy:** Dashboard → Deployments → (latest) → ⋯ → Redeploy

#### Verify API Integration:

1. Visit homepage leaderboard
2. Open DevTools → Network tab
3. Look for API calls to Moralis
4. Check data is real (not mock tokens)

---

### 6. Upload Assets

#### Via Git (Recommended):

```bash
# Add your assets to local project
cp ~/path/to/hero-video.mp4 public/videos/hero-lore.mp4
cp ~/path/to/artwork/* public/art/
cp ~/path/to/logo.svg public/logos/

# Update code to reference real files
# Edit app/page.tsx, app/art/page.tsx as needed

# Commit and push
git add public/
git commit -m "Add production assets"
git push origin main

# Vercel auto-deploys
```

#### Via Vercel Dashboard:

Not recommended for large files. Use Git method above.

---

### 7. Performance Optimization

#### Enable Vercel Analytics (Optional):

```bash
pnpm add @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Add External Analytics:

**Plausible:**
1. Sign up at plausible.io
2. Add script to `app/layout.tsx`:
```tsx
import Script from 'next/script'

<Script defer data-domain="nasdanq.xyz" src="https://plausible.io/js/script.js" />
```

**PostHog:**
```bash
pnpm add posthog-js
```

Follow PostHog Next.js integration guide.

---

### 8. Post-Launch Monitoring

#### Vercel Dashboard:

- **Analytics:** Track page views, visitors
- **Speed Insights:** Monitor Core Web Vitals
- **Logs:** Check for runtime errors
- **Deployments:** View build history

#### External Monitoring:

- **Uptime:** UptimeRobot (free, monitors site availability)
- **Lighthouse:** Run weekly audits (performance, SEO, accessibility)
- **API Monitoring:** Monitor Moralis usage in their dashboard

---

## Continuous Deployment

Vercel automatically deploys on every push to `main`. Workflow:

1. Make changes locally
2. Test: `pnpm dev`
3. Build: `pnpm build` (ensure no errors)
4. Commit: `git add . && git commit -m "Description"`
5. Push: `git push origin main`
6. Vercel builds & deploys automatically (~2 mins)
7. Check deployment URL in Vercel dashboard

### Preview Deployments:

Every branch/PR gets its own preview URL:
```bash
git checkout -b feature/new-page
# Make changes
git push origin feature/new-page
# Vercel creates preview at: nasdanq-website-git-feature-new-page-yourname.vercel.app
```

---

## Rollback Procedure

If deployment breaks:

1. Vercel Dashboard → Deployments
2. Find last working deployment
3. Click ⋯ → "Promote to Production"
4. Site reverts instantly

Or via CLI:
```bash
vercel rollback
```

---

## Troubleshooting

### Build Fails

**Error:** "Type check failed"
```bash
# Run locally first
pnpm type-check
# Fix errors, then commit
```

**Error:** "Module not found"
```bash
# Check imports are correct
# Ensure all files committed to Git
# Verify package.json has all dependencies
```

### Site Loads But Shows Errors

**Check Vercel Logs:**
1. Dashboard → Deployments → (latest) → "Function Logs"
2. Look for runtime errors
3. Common issues:
   - Missing environment variables
   - API key invalid
   - RPC endpoint unreachable

**Fix:**
1. Update environment variables
2. Redeploy

### API Returns No Data

**Check:**
- [ ] `MORALIS_API_KEY` set in Vercel env vars
- [ ] API key valid (test in Postman)
- [ ] Rate limits not exceeded (check Moralis dashboard)
- [ ] RPC endpoint responding

**Fallback to Mock Data:**
If API issues persist, site still works with mock data (already implemented).

### Domain Not Resolving

**Wait longer:** DNS can take up to 48 hours (usually <1 hour)

**Check DNS:**
```bash
dig nasdanq.xyz
nslookup nasdanq.xyz
```

Should point to Vercel IPs.

**Verify in Registrar:**
- Nameservers correct
- No typos in records

---

## Security Checklist

- [ ] API keys stored in Vercel env vars (never in code)
- [ ] `.env.local` in `.gitignore`
- [ ] No sensitive data in client-side code
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] CORS properly configured (if needed for Phase 2)

---

## Future Phase Deployments

### Phase 2: Swap Feature

1. Install Jupiter Terminal:
   ```bash
   pnpm add @jup-ag/terminal
   ```

2. Add Solana wallet adapters:
   ```bash
   pnpm add @solana/wallet-adapter-react @solana/wallet-adapter-wallets
   ```

3. Update `/app/swap/page.tsx` with actual swap UI

4. Test thoroughly on devnet first

5. Deploy to production

6. Announce launch 🚀

---

## Support

**Deployment Issues:**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: support.vercel.com
- Next.js Docs: https://nextjs.org/docs

**Build Errors:**
Check `README.md` troubleshooting section

**Can't solve it?**
Create GitHub issue with:
- Error message
- Build logs
- Steps to reproduce

---

**Deployment Checklist Summary:**

1. ✅ Assets ready
2. ✅ API keys obtained
3. ✅ Domain registered
4. ✅ Deploy to Vercel
5. ✅ Configure DNS
6. ✅ Verify live site
7. ✅ Add real API keys
8. ✅ Upload assets
9. ✅ Enable analytics
10. ✅ Monitor performance

**Estimated time: 1-2 hours (mostly DNS wait time)**

---

**You're live! Now go trade some memes. 🚀**
