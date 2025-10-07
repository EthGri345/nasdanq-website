# API Keys Guide for NASDANQ

## What API Keys Do You Need?

You need **2 API keys** to make the leaderboard show real Pump.fun data instead of mock data:

---

## 1. Moralis API Key (Pump.fun Data)

**What it does:** Fetches real-time token data from Pump.fun (prices, volume, rankings)

**Cost:** ~$49/month (Pro plan recommended for production)

### How to Get It:

1. **Sign up:** Go to [moralis.com](https://moralis.com)
2. **Create account:** Use your email
3. **Create a project:**
   - Click "Create New Project"
   - Name it "NASDANQ"
   - Select "Solana" as the chain
4. **Get API Key:**
   - Go to "Settings" → "API Keys"
   - Copy the API key (looks like: `eyJhbG...`)
5. **Save it:** You'll add this to Vercel later

**Alternative:** [Bitquery](https://bitquery.io/) also works (similar pricing)

---

## 2. Solana RPC Endpoint (Blockchain Access)

**What it does:** Connects to Solana blockchain for transaction data

**Cost:** FREE tier works fine initially

### Option A: QuickNode (Recommended)

1. **Sign up:** [quicknode.com](https://www.quicknode.com/)
2. **Create endpoint:**
   - Click "Create Endpoint"
   - Select "Solana" → "Mainnet"
   - Choose free tier
3. **Copy URL:** Will look like:
   ```
   https://example-name.solana-mainnet.quiknode.pro/abc123/
   ```

### Option B: Helius

1. **Sign up:** [helius.dev](https://www.helius.dev/)
2. **Create API key**
3. **Your RPC URL:**
   ```
   https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
   ```

---

## How to Add Them to the Site

### For Local Development:

1. **Create `.env` file** in project root:
   ```bash
   cd /home/ethan-griffin/nasdanq-website
   cp .env.example .env
   nano .env
   ```

2. **Add your keys:**
   ```env
   MORALIS_API_KEY=your_moralis_key_here
   NEXT_PUBLIC_RPC_URL=https://your-rpc-url-here
   ```

3. **Save and restart:**
   ```bash
   pnpm dev
   ```

### For Production (Vercel):

1. **Go to Vercel Dashboard**
2. **Your Project → Settings → Environment Variables**
3. **Add two variables:**
   - Name: `MORALIS_API_KEY`
     Value: `your_moralis_key_here`

   - Name: `NEXT_PUBLIC_RPC_URL`
     Value: `https://your-rpc-url-here`

4. **Redeploy:**
   - Go to Deployments
   - Click on latest deployment → "..." → "Redeploy"

---

## How to Test If They're Working

### After adding keys locally:

```bash
pnpm dev
```

Then:
1. Visit http://localhost:3000
2. Open browser DevTools (F12)
3. Go to "Network" tab
4. Refresh page
5. Look for API calls to Moralis
6. Check if token names are real (not "Pepe Classic", "Doge Killer" etc - those are mock)

### After deploying:

1. Visit your live site
2. Check leaderboard shows real tokens
3. Verify prices update every 30 seconds

---

## What Happens Without API Keys?

**The site still works!** It just shows mock data:
- Fake token names ("Moon Lambo", "Chad Coin")
- Random prices
- Simulated volume

This is perfect for:
- Testing the design
- Showing stakeholders
- Development

Once you add real API keys, it automatically switches to real Pump.fun data.

---

## Cost Breakdown

| Service | Free Tier | Paid (Recommended) |
|---------|-----------|-------------------|
| Moralis | 40K requests/mo | $49/mo (1M requests) |
| QuickNode | 10M requests/mo | $49/mo (unlimited) |
| Helius | 100K requests/day | $99/mo (5M/day) |

**Recommended setup for launch:**
- Moralis Pro: $49/mo
- QuickNode Free: $0/mo
- **Total: $49/mo**

---

## Troubleshooting

### "API key invalid"
- Check for typos
- Verify key has correct permissions in Moralis dashboard
- Try regenerating the key

### "Rate limit exceeded"
- Upgrade Moralis plan
- Add caching (already built-in, 30s refresh)
- Switch to Bitquery (higher limits)

### "RPC endpoint not responding"
- Check RPC URL is correct
- Try alternative provider (QuickNode vs Helius)
- Check provider status page

### "Still showing mock data"
- Verify `.env` file exists and has correct keys
- Restart dev server
- Check environment variables in Vercel
- Clear browser cache

---

## Security Notes

✅ **Safe to share:**
- RPC URL (public endpoint)

❌ **NEVER share publicly:**
- Moralis API key
- Any key in `.env` file

✅ **Best practices:**
- Keep `.env` in `.gitignore` (already done)
- Only add keys to Vercel env vars (not in code)
- Rotate keys if accidentally exposed

---

## Summary

**To get your site showing real data:**

1. ✅ Get Moralis API key (~10 minutes)
2. ✅ Get Solana RPC URL (~5 minutes)
3. ✅ Add to Vercel environment variables
4. ✅ Redeploy
5. ✅ Test leaderboard shows real tokens

**Total time:** ~20 minutes
**Total cost:** $49/month

---

**Questions?** Check the main README.md or docs/DEPLOYMENT_GUIDE.md
