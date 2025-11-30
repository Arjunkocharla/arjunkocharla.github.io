# Deployment Guide for GitHub Pages

This guide will help you deploy your Next.js portfolio to GitHub Pages at `arjunkocharla.github.io`.

## Prerequisites

1. A GitHub account
2. A repository named `arjunkocharla.github.io` (or your username)
3. Git installed on your local machine

## Step 1: Create/Configure GitHub Repository

1. Go to GitHub and create a new repository named `arjunkocharla.github.io`
   - Make it **public** (required for free GitHub Pages)
   - Don't initialize with README (if you already have code)

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
4. Save the settings

## Step 3: Push Your Code

```bash
# Initialize git if not already done
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/arjunkocharla/arjunkocharla.github.io.git

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio deployment"

# Push to main branch
git push -u origin main
```

## Step 4: Automatic Deployment

Once you push to the `main` branch, GitHub Actions will automatically:
1. Build your Next.js app
2. Export it as static files
3. Deploy to GitHub Pages

You can monitor the deployment in the **Actions** tab of your repository.

## Step 5: Access Your Site

After deployment completes (usually 2-5 minutes), your site will be available at:
- **https://arjunkocharla.github.io/**

## Important Notes

### API Routes
- The chatbot API route (`/api/chat`) won't work on GitHub Pages (static hosting)
- The chatbot now uses client-side fallback responses
- If you need full API functionality, consider using:
  - Vercel (recommended for Next.js)
  - Netlify
  - Or a separate backend service

### Environment Variables
- GitHub Pages doesn't support server-side environment variables
- Any API keys should be handled client-side (not recommended) or use a separate backend

### Custom Domain (Optional)
If you want to use a custom domain:
1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings with your custom domain

## Troubleshooting

### Build Fails
- Check the Actions tab for error messages
- Ensure all dependencies are in `package.json`
- Verify `next.config.js` has `output: 'export'`

### Site Not Updating
- Clear browser cache
- Check if Actions workflow completed successfully
- Wait a few minutes for DNS propagation

### 404 Errors
- Ensure all internal links use relative paths
- Check that `next.config.js` is properly configured

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the static export
npm run build

# The output will be in the 'out' folder
# Push the 'out' folder contents to the 'gh-pages' branch
```

But the GitHub Actions workflow is recommended as it's automatic!

