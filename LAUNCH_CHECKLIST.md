# NASDANQ Launch Checklist

Complete this checklist before going live. Check off each item as you complete it.

---

## Phase 1: Pre-Development (✅ COMPLETE)

- [x] Technical specification written
- [x] Design system defined
- [x] Project structure planned
- [x] Requirements documented

---

## Phase 2: Development (✅ COMPLETE)

### Core Infrastructure
- [x] Next.js 14 initialized
- [x] TypeScript configured (strict mode)
- [x] Tailwind CSS configured with custom theme
- [x] ESLint & type checking setup
- [x] Project structure created

### Components
- [x] UI component library (Button, Card, etc.)
- [x] Header navigation with routing
- [x] Loading states
- [x] Error boundaries
- [x] 404 page

### Pages
- [x] Home page with leaderboard
- [x] Lore page with scroll animations
- [x] Art gallery page
- [x] Swap coming soon page

### Features
- [x] API integration layer (ready for real API)
- [x] Mock data generators
- [x] Real-time data refresh (30s intervals)
- [x] Sortable, searchable tables
- [x] Mobile responsive design
- [x] SEO optimization

### Quality Assurance
- [x] TypeScript compiles with zero errors
- [x] Production build succeeds
- [x] No console errors
- [x] All pages render correctly
- [x] Mobile testing passed

---

## Phase 3: Asset Collection (⏳ IN PROGRESS)

### Required Assets

#### Video
- [ ] Hero lore video file obtained from maūru
  - Format: MP4 or WebM
  - Resolution: 1920x1080 minimum
  - File size: <50MB preferred
  - Saved to: `/public/videos/hero-lore.mp4`

#### Artwork
- [ ] All character art collected
  - Format: PNG with transparent background
  - Resolution: 2000px+ on longest side
  - Saved to: `/public/art/character-*.png`

- [ ] Logo files obtained
  - [ ] SVG vector logo → `/public/logos/logo.svg`
  - [ ] 512x512 PNG → `/public/logos/logo-512.png`
  - [ ] 256x256 PNG → `/public/logos/logo-256.png`
  - [ ] 64x64 PNG → `/public/logos/logo-64.png`

#### Social Media
- [ ] OG image created (1200x630px)
  - Includes NASDANQ branding
  - Includes tagline
  - Saved to: `/public/og-image.png`

- [ ] Favicon created
  - 32x32 .ico file
  - Saved to: `/public/favicon.ico`

---

## Phase 4: API Setup (⏳ PENDING)

### Moralis (Pump.fun Data)
- [ ] Sign up at [moralis.com](https://moralis.com)
- [ ] Create new project
- [ ] Select Pro plan ($49/mo recommended)
- [ ] Copy API key
- [ ] Test API key (use Postman/Insomnia)

### Solana RPC
- [ ] Choose provider:
  - [ ] QuickNode ([quicknode.com](https://quicknode.com))
  - [ ] Helius ([helius.dev](https://helius.dev))
- [ ] Create Solana Mainnet endpoint
- [ ] Copy RPC URL
- [ ] Test RPC endpoint

### Environment Variables
- [ ] Create `.env` file in project root
- [ ] Add `MORALIS_API_KEY=your_key_here`
- [ ] Add `NEXT_PUBLIC_RPC_URL=your_rpc_url`
- [ ] Test locally with real API

---

## Phase 5: Domain & Hosting (⏳ PENDING)

### Domain Registration
- [ ] Purchase `nasdanq.xyz`
  - Recommended: NameCheap, Cloudflare, or GoDaddy
- [ ] Access to domain DNS settings confirmed

### Vercel Setup
- [ ] Create Vercel account ([vercel.com](https://vercel.com))
- [ ] Install Vercel CLI: `pnpm add -g vercel`
- [ ] Link GitHub/GitLab repository (if using Git)

---

## Phase 6: Deployment (⏳ PENDING)

### Pre-Deployment
- [ ] All assets added to `/public/` folder
- [ ] Asset paths updated in code:
  - [ ] `app/page.tsx` - hero video source
  - [ ] `app/art/page.tsx` - artwork array
  - [ ] `components/layout/Header.tsx` - logo image
- [ ] Environment variables ready
- [ ] Local build tested: `pnpm build`
- [ ] Local production tested: `pnpm start`

### Deploy to Vercel
- [ ] Run `vercel` command OR import in dashboard
- [ ] Add environment variables in Vercel settings:
  - [ ] `MORALIS_API_KEY`
  - [ ] `NEXT_PUBLIC_RPC_URL`
- [ ] Verify build succeeds
- [ ] Test preview URL

### Domain Configuration
- [ ] Add `nasdanq.xyz` in Vercel domains
- [ ] Update DNS records in registrar:
  - [ ] Option A: Point nameservers to Vercel
  - [ ] Option B: Add A/CNAME records
- [ ] Wait for DNS propagation (5-60 minutes)
- [ ] Verify SSL certificate issued
- [ ] Test HTTPS works

### Post-Deployment Verification
- [ ] Visit https://nasdanq.xyz
- [ ] Test all 4 pages load
- [ ] Test mobile responsive design
- [ ] Test navigation works
- [ ] Verify hero video plays
- [ ] Check leaderboard shows real data (not mock)
- [ ] Test error pages (404, error boundary)
- [ ] Run Lighthouse audit (should score 90+)
- [ ] Check console for errors (should be clean)

---

## Phase 7: Analytics & Monitoring (🔄 OPTIONAL)

### Analytics
- [ ] Choose analytics platform:
  - [ ] Plausible (privacy-focused, $9/mo)
  - [ ] PostHog (open-source, free tier)
  - [ ] Vercel Analytics (built-in)
- [ ] Install tracking script
- [ ] Verify data collection

### Monitoring
- [ ] Set up uptime monitoring (UptimeRobot free tier)
- [ ] Configure error tracking (Sentry optional)
- [ ] Monitor Moralis API usage dashboard
- [ ] Set up API rate limit alerts

---

## Phase 8: Content & Marketing (🔄 OPTIONAL)

### Social Media
- [ ] Update Twitter handle in metadata
- [ ] Create launch announcement
- [ ] Prepare social media graphics
- [ ] Schedule launch posts

### Community
- [ ] Announce in Discord
- [ ] Post on relevant subreddits (r/solana, r/memeeconomy)
- [ ] Reach out to crypto influencers
- [ ] Submit to crypto directories

### Email
- [ ] Configure email service (Mailchimp/Resend)
- [ ] Connect to swap waitlist form
- [ ] Test email signup flow

---

## Phase 9: Testing & QA (⏳ PENDING)

### Functional Testing
- [ ] All links work
- [ ] Navigation functions correctly
- [ ] Tables sort properly
- [ ] Search filters work
- [ ] Mobile menu opens/closes
- [ ] Forms submit (email signup)

### Performance Testing
- [ ] Page load <2 seconds
- [ ] No layout shift (CLS score)
- [ ] Images load properly
- [ ] Fonts load without FOUT
- [ ] API calls don't timeout

### Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (Mac/iOS)
- [ ] Edge

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768px)
- [ ] Mobile (375px iPhone, 360px Android)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Sufficient color contrast
- [ ] Focus indicators visible

---

## Phase 10: Launch (⏳ READY WHEN YOU ARE)

### Launch Day
- [ ] Final build deployed
- [ ] DNS fully propagated
- [ ] All assets loading
- [ ] Analytics tracking
- [ ] Error monitoring active

### Announcement
- [ ] Post launch announcement
- [ ] Share on social media
- [ ] Notify community
- [ ] Monitor for issues

### First 24 Hours
- [ ] Monitor analytics
- [ ] Check error logs
- [ ] Respond to community feedback
- [ ] Fix any critical bugs immediately

---

## Phase 11: Post-Launch (🔮 FUTURE)

### Week 1
- [ ] Review analytics data
- [ ] Gather user feedback
- [ ] Fix reported bugs
- [ ] Optimize based on metrics

### Month 1
- [ ] Plan Phase 2 (Swap feature)
- [ ] Review performance metrics
- [ ] Implement quick wins
- [ ] Consider new features

---

## Quick Reference

### Current Status
✅ **Complete:** Development (Phase 1-2)
⏳ **In Progress:** Asset collection, API setup
🔄 **Optional:** Analytics, marketing
🔮 **Future:** Phase 2+ features

### Blocking Items (Cannot deploy without)
1. API keys (Moralis + RPC)
2. Domain access
3. Vercel account

### Nice-to-Have Items (Can deploy without)
1. Hero video (has placeholder)
2. Artwork (has placeholders)
3. Analytics
4. Email service

### Time Estimates
- **Asset collection:** 1-2 hours
- **API setup:** 30 minutes
- **Domain & hosting:** 1 hour
- **Deployment:** 30 minutes
- **DNS propagation:** 5-60 minutes
- **Testing:** 1-2 hours

**Total:** 4-6 hours to launch

---

## Emergency Contacts

### Documentation
- Main docs: `README.md`
- Technical spec: `docs/TECHNICAL_SPEC.md`
- Deployment guide: `docs/DEPLOYMENT_GUIDE.md`
- Quick start: `QUICK_START.md`

### Support Resources
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Moralis Docs: https://docs.moralis.io
- Tailwind Docs: https://tailwindcss.com/docs

### Troubleshooting
- Check `README.md` troubleshooting section
- Review build logs in Vercel
- Check browser console for errors
- Test API endpoints manually

---

## Sign-Off

When all items above are checked:

- [ ] **Development Team:** All code complete and tested
- [ ] **Product Manager:** All assets provided and approved
- [ ] **QA:** All tests passed
- [ ] **Stakeholders:** Final approval given

**Launch approved by:** ________________

**Launch date:** ________________

---

**You're ready to launch when all Phase 1-6 items are checked. Everything else can be added post-launch. 🚀**
