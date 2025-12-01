# Setting Up arjunkocharla.com on Vercel

## Step 1: Add Domain to Vercel

1. Go to your Vercel project dashboard
2. Click on your project (arjunkocharla-github-io)
3. Go to **Settings** tab
4. Click **Domains** in the left sidebar
5. Click **Add Domain** button
6. Enter: `arjunkocharla.com`
7. Click **Add**

## Step 2: Add www Subdomain (Optional but Recommended)

1. Still in **Settings** → **Domains**
2. Click **Add Domain** again
3. Enter: `www.arjunkocharla.com`
4. Click **Add**

This ensures both `arjunkocharla.com` and `www.arjunkocharla.com` work!

## Step 3: Configure DNS Records

Vercel will show you DNS records to add. You need to add these at your domain registrar.

### Option A: Use Vercel's Nameservers (Easiest)

1. Go to your domain registrar (where you bought the domain)
2. Find **DNS Settings** or **Nameservers**
3. Change nameservers to:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. Save changes
5. Go back to Vercel and click **Refresh** or wait a few minutes

### Option B: Add DNS Records Manually

If you prefer to keep your registrar's nameservers, add these records:

**For Root Domain (arjunkocharla.com):**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: Auto (or 3600)
```

**For www Subdomain (www.arjunkocharla.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto (or 3600)
```

## Step 4: Wait for DNS Propagation

- Usually takes **5-60 minutes**
- Can take up to 24 hours in rare cases
- Vercel will show status:
  - ⏳ "Pending" → Waiting for DNS
  - ✅ "Valid Configuration" → Ready!
  - ❌ "Invalid Configuration" → Check DNS records

## Step 5: Verify It Works

Once Vercel shows "Valid Configuration":
1. Visit `https://arjunkocharla.com`
2. Visit `https://www.arjunkocharla.com`
3. Both should show your portfolio!

## Step 6: SSL Certificate

- ✅ Vercel automatically provides **free SSL**
- ✅ Your site will use HTTPS automatically
- ✅ No additional setup needed
- ✅ Certificate auto-renews

## Troubleshooting

### DNS Not Working?
- Double-check DNS records match exactly
- Wait a bit longer (DNS can be slow)
- Clear browser cache
- Try incognito/private window

### Still Showing Old Site?
- DNS propagation can take time
- Try: `https://arjunkocharla.com/?v=2` to bypass cache
- Check Vercel dashboard for status

### Need Help?
- Check Vercel docs: https://vercel.com/docs/concepts/projects/domains
- Or ask me!

## What Registrar Did You Use?

Let me know which registrar you used and I can give you specific instructions for that one!

Common ones:
- Namecheap
- Cloudflare
- IONOS
- GoDaddy
- Google Domains

