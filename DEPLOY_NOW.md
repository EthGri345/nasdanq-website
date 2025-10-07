# 🚀 Deploy NASDANQ Now - Final Steps

## Your API Key is Configured! ✅

Your Helius RPC endpoint is set up and working.

---

## Quick Deploy (3 Steps):

### 1. Deploy to Vercel

```bash
cd /home/ethan-griffin/nasdanq-website
vercel
```

When prompted:
- **Set up and deploy?** → Yes
- **Link to existing project?** → No (unless you already created one)
- **Project name?** → nasdanq-website (or your choice)
- **Directory?** → ./ (current directory)

After first deploy, for production:
```bash
vercel --prod
```

---

### 2. Add Environment Variable in Vercel

**Important:** Add your Helius RPC key to Vercel:

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add this variable:

   **Name:**
   ```
   NEXT_PUBLIC_RPC_URL
   ```

   **Value:**
   ```
   https://mainnet.helius-rpc.com/?api-key=5dd053ba-80ca-42bd-89f4-0cd3826ae114
   ```

   **Environment:** Select all (Production, Preview, Development)

5. Click **Save**

6. **Redeploy:**
   - Go to **Deployments** tab
   - Click latest deployment
   - Click **"..."** menu → **Redeploy**

---

### 3. Configure Domain (Optional but Recommended)

**If you have nasdanq.xyz:**

1. In Vercel dashboard → **Settings** → **Domains**
2. Add `nasdanq.xyz`
3. Vercel will show you DNS records

**In your domain registrar (NameCheap, GoDaddy, etc.):**

Add these records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Wait 5-60 minutes for DNS to propagate.

---

## What You Get:

### ✅ Working Right Now:
- Real token data from DexScreener (FREE)
- All 14 videos playing
- Your artwork in gallery
- Mobile responsive
- SEO optimized

### ✅ With Your Helius Key:
- Faster blockchain queries
- Enhanced RPC performance
- Better reliability

---

## Test Locally First (Optional):

```bash
pnpm dev
```

Visit: http://localhost:3000

Check:
- Videos play on homepage and lore page
- Leaderboard shows tokens (real data!)
- Art gallery displays your image
- Everything looks good on mobile (resize browser)

---

## Cost Summary:

| Service | Cost | Status |
|---------|------|--------|
| DexScreener API | **$0/mo** | ✅ Active |
| Helius RPC (your key) | **Free tier** | ✅ Configured |
| Vercel Hosting | **$0/mo** | Ready to deploy |
| Domain (nasdanq.xyz) | ~$12/yr | Your choice |
| **TOTAL** | **$0/month** | 🎉 |

---

## Deployment Checklist:

- [x] Code complete
- [x] Videos integrated
- [x] Artwork integrated
- [x] Free API working
- [x] RPC endpoint configured
- [ ] **Deploy to Vercel** ← You are here
- [ ] Add environment variable
- [ ] Configure domain (optional)
- [ ] Test live site
- [ ] Launch! 🚀

---

## Commands Reference:

```bash
# Deploy (first time)
vercel

# Deploy to production
vercel --prod

# Test locally
pnpm dev

# Check for errors
pnpm type-check
pnpm build
```

---

## After Deployment:

### Verify Everything Works:

1. Visit your Vercel URL (shows in terminal after deploy)
2. Check homepage → hero video plays
3. Check leaderboard → shows real tokens
4. Check lore page → video gallery works
5. Check art page → your artwork displays
6. Test on mobile (real phone or browser DevTools)

### If Something's Wrong:

**Videos don't play?**
- Check Vercel deployment logs
- Verify files uploaded correctly
- Try hard refresh (Ctrl+Shift+R)

**No token data?**
- Check environment variable is set in Vercel
- Verify you redeployed after adding variable
- Check browser console for errors

**Domain not working?**
- Wait longer (DNS can take up to 48 hours, usually <1 hour)
- Verify DNS records in your registrar
- Use `dig nasdanq.xyz` to check propagation

---

## Support:

**Documentation:**
- Main guide: `README.md`
- Deployment details: `docs/DEPLOYMENT_GUIDE.md`
- API info: `FREE_API_SETUP.md`

**Common Issues:**
All covered in `README.md` → Troubleshooting section

---

## Your Credentials (Keep Private):

**Helius RPC URL:**
```
https://mainnet.helius-rpc.com/?api-key=5dd053ba-80ca-42bd-89f4-0cd3826ae114
```

**Important:**
- ✅ Already in `.env.local` (ignored by git)
- ✅ Add to Vercel environment variables
- ❌ Don't commit to public repo
- ❌ Don't share publicly

---

## Ready to Deploy?

Run this now:

```bash
vercel
```

Then follow the prompts. Your site will be live in ~3 minutes!

---

**Everything is configured. Just run `vercel` and you're live! 🚀**
