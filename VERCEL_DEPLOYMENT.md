# Deploy to Vercel - Step by Step Guide

Vercel is the **recommended** platform for Next.js applications. It supports all Next.js features including API routes, server functions, and more.

## Why Vercel?

✅ **Full Next.js Support** - API routes, server components, everything works  
✅ **Automatic Deployments** - Deploys on every push to GitHub  
✅ **Free Tier** - Perfect for portfolios  
✅ **Custom Domain** - Free SSL included  
✅ **Fast CDN** - Global edge network  
✅ **Environment Variables** - Secure API key management  

## Step 1: Push Your Code to GitHub

First, make sure your code is on GitHub:

```bash
# If not already a git repository
git init

# Add all files
git add .

# Commit
git commit -m "Portfolio ready for Vercel deployment"

# Create repository on GitHub first, then:
git remote add origin https://github.com/arjunkocharla/arjun-portfolio.git
# (or use your existing repository)

# Push to main branch
git push -u origin main
```

## Step 2: Sign Up / Login to Vercel

1. Go to **https://vercel.com**
2. Click **Sign Up** (or **Log In** if you have an account)
3. Sign up with **GitHub** (recommended - easiest integration)

## Step 3: Import Your Project

1. After logging in, click **Add New...** → **Project**
2. You'll see a list of your GitHub repositories
3. Find and click **Import** next to your portfolio repository
4. Vercel will auto-detect it's a Next.js project

## Step 4: Configure Project Settings

Vercel will show you configuration options:

### Framework Preset
- Should auto-detect: **Next.js**
- If not, select it manually

### Root Directory
- Leave as **`./`** (root of repository)

### Build Command
- Auto-filled: **`npm run build`**
- Leave as is

### Output Directory
- Auto-filled: **`.next`**
- Leave as is

### Install Command
- Auto-filled: **`npm install`**
- Leave as is

## Step 5: Environment Variables (Optional)

If you want to use OpenAI API for the chatbot:

1. Click **Environment Variables**
2. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environment**: Production, Preview, Development (select all)
3. Click **Save**

> **Note**: Without this, the chatbot will use fallback responses (which still work great!)

## Step 6: Deploy!

1. Click **Deploy** button
2. Wait 1-2 minutes for build to complete
3. 🎉 Your site is live!

## Step 7: Your Live URL

After deployment, you'll get:
- **Production URL**: `https://arjun-portfolio.vercel.app` (or similar)
- You can also add a **custom domain** for free!

## Step 8: Custom Domain (Optional)

1. Go to your project on Vercel
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `arjunkocharla.com`)
4. Follow DNS configuration instructions
5. Vercel provides free SSL automatically!

## Automatic Deployments

✅ **Every push to `main`** → Deploys to production  
✅ **Pull requests** → Creates preview deployments  
✅ **Instant rollback** → One-click revert to previous version  

## Environment Variables

To add environment variables later:
1. Go to **Settings** → **Environment Variables**
2. Add your variables
3. Redeploy (or wait for next push)

## Monitoring & Analytics

Vercel provides:
- **Analytics** - See visitor stats
- **Speed Insights** - Performance metrics
- **Logs** - Debug issues easily

## Troubleshooting

### Build Fails
- Check the **Deployments** tab for error logs
- Common issues:
  - Missing dependencies in `package.json`
  - TypeScript errors
  - Environment variable issues

### API Routes Not Working
- Make sure you're not using `output: 'export'` in `next.config.js`
- API routes work automatically on Vercel

### Environment Variables Not Working
- Make sure you selected all environments (Production, Preview, Development)
- Redeploy after adding variables

## Comparison: Vercel vs GitHub Pages

| Feature | Vercel | GitHub Pages |
|---------|--------|--------------|
| Next.js API Routes | ✅ Yes | ❌ No |
| Server Functions | ✅ Yes | ❌ No |
| Automatic Deployments | ✅ Yes | ✅ Yes |
| Custom Domain | ✅ Free | ✅ Free |
| Environment Variables | ✅ Yes | ❌ Limited |
| Build Time | ~1-2 min | ~3-5 min |
| **Best For** | **Next.js Apps** | Static Sites |

## Next Steps

1. ✅ Deploy to Vercel (follow steps above)
2. ✅ Share your portfolio URL
3. ✅ Add custom domain (optional)
4. ✅ Set up analytics (optional)

Your portfolio will be live in minutes! 🚀

