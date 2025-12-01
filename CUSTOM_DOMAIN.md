# Adding a Custom Domain to Vercel

## Current Domain
Your site is currently at: `arjunkocharla-github-io.vercel.app` (or similar)

## Option 1: Use a Vercel Subdomain (Free, Instant)
You can change it to a cleaner Vercel subdomain:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Domains**
3. Click **Add Domain**
4. Enter a custom subdomain like:
   - `arjun-kocharla.vercel.app`
   - `arjun-portfolio.vercel.app`
   - `arjun.vercel.app` (if available)
5. Click **Add**
6. Done! Your site will be available at the new domain

## Option 2: Use Your Own Custom Domain (Free SSL Included)

### Step 1: Buy a Domain (if you don't have one)
Popular domain registrars:
- **Namecheap** - https://namecheap.com (~$10-15/year)
- **Google Domains** - https://domains.google (~$12/year)
- **Cloudflare** - https://cloudflare.com/products/registrar (~$8-10/year)

Recommended domains:
- `arjunkocharla.com`
- `arjunkocharla.dev`
- `arjun.dev`
- `arjun.tech`

### Step 2: Add Domain to Vercel

1. Go to your Vercel project
2. Click **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your domain (e.g., `arjunkocharla.com`)
5. Click **Add**

### Step 3: Configure DNS

Vercel will show you DNS records to add. You need to add these at your domain registrar:

#### For Root Domain (arjunkocharla.com):
```
Type: A
Name: @
Value: 76.76.21.21
```

#### For WWW Subdomain (www.arjunkocharla.com):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**OR** use Vercel's nameservers (easier):
```
Nameserver 1: ns1.vercel-dns.com
Nameserver 2: ns2.vercel-dns.com
```

### Step 4: Wait for DNS Propagation
- Usually takes 5-60 minutes
- Can take up to 24 hours in rare cases
- Vercel will show status: "Valid Configuration" when ready

### Step 5: SSL Certificate
- Vercel automatically provides **free SSL** (HTTPS)
- No additional configuration needed
- Certificate is automatically renewed

## Option 3: Use GitHub Pages Domain (if you want)
If you want to use `arjunkocharla.github.io`:
- You'd need to switch from Vercel to GitHub Pages
- But you'd lose API route support
- **Not recommended** since you're already on Vercel

## Recommended: Option 2 (Custom Domain)

Benefits:
- ✅ Professional domain name
- ✅ Free SSL included
- ✅ Better for SEO
- ✅ More memorable
- ✅ Can add email later (e.g., contact@arjunkocharla.com)

## Quick Setup Example

If you buy `arjunkocharla.com`:

1. **Buy domain** from Namecheap/Google/Cloudflare
2. **In Vercel**: Settings → Domains → Add `arjunkocharla.com`
3. **At domain registrar**: Add DNS records Vercel provides
4. **Wait 5-60 minutes** for DNS propagation
5. **Done!** Your site is live at `https://arjunkocharla.com`

## Cost
- **Vercel**: Free (includes SSL)
- **Domain**: ~$10-15/year
- **Total**: ~$1/month

## Need Help?
- Vercel DNS docs: https://vercel.com/docs/concepts/projects/domains
- Or ask me and I can help with specific steps!

