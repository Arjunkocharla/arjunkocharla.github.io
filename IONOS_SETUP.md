# Setting Up arjunkocharla.com with IONOS

## Step 1: Add Domain to Vercel First

1. Go to your Vercel project dashboard
2. Click **Settings** → **Domains**
3. Click **Add Domain**
4. Enter: `arjunkocharla.com`
5. Click **Add**
6. Vercel will show you DNS configuration options

## Step 2: Configure DNS in IONOS

### Option A: Use Vercel Nameservers (Recommended - Easiest)

1. **Log in to IONOS**
   - Go to: https://www.ionos.com
   - Log in to your account

2. **Navigate to Domain Settings**
   - Click on **Domains & SSL** in the left menu
   - Find `arjunkocharla.com`
   - Click on it

3. **Change Nameservers**
   - Look for **"Nameservers"** or **"DNS"** section
   - Click **"Edit"** or **"Change Nameservers"**
   - Select **"Custom Nameservers"** or **"Use Custom Nameservers"**
   - Enter:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```
   - Click **Save** or **Apply**

4. **Wait for Propagation**
   - Usually takes 5-60 minutes
   - IONOS will show confirmation
   - Vercel will automatically detect when DNS is ready

### Option B: Add DNS Records Manually (If you prefer)

1. **Log in to IONOS**
   - Go to: https://www.ionos.com
   - Log in to your account

2. **Navigate to DNS Settings**
   - Click on **Domains & SSL**
   - Find `arjunkocharla.com`
   - Click on it
   - Go to **DNS** or **DNS Records** tab

3. **Add A Record for Root Domain**
   - Click **Add Record** or **+**
   - Type: **A**
   - Name/Host: **@** (or leave blank)
   - Value/Points to: **76.76.21.21**
   - TTL: **3600** (or Auto)
   - Click **Save**

4. **Add CNAME Record for www**
   - Click **Add Record** or **+**
   - Type: **CNAME**
   - Name/Host: **www**
   - Value/Points to: **cname.vercel-dns.com**
   - TTL: **3600** (or Auto)
   - Click **Save**

## Step 3: Verify in Vercel

1. Go back to Vercel dashboard
2. Go to **Settings** → **Domains**
3. You should see `arjunkocharla.com`
4. Status will show:
   - ⏳ **"Pending"** → Waiting for DNS (normal, wait 5-60 min)
   - ✅ **"Valid Configuration"** → Ready! Your site is live!

## Step 4: Test Your Site

Once Vercel shows "Valid Configuration":
- Visit: `https://arjunkocharla.com`
- Visit: `https://www.arjunkocharla.com`
- Both should work!

## IONOS Interface Guide

### Finding Nameservers in IONOS:
1. Log in → **Domains & SSL**
2. Click on your domain
3. Look for **"Nameservers"** or **"DNS"** tab
4. Should be near the top of the domain settings

### Finding DNS Records in IONOS:
1. Log in → **Domains & SSL**
2. Click on your domain
3. Click **"DNS"** tab
4. You'll see a list of DNS records
5. Click **"Add Record"** or **"+"** button

## Troubleshooting

### Can't Find Nameservers Option?
- Look for **"DNS Settings"** or **"Advanced DNS"**
- Some IONOS interfaces call it **"Name Server"**
- If stuck, use Option B (DNS Records)

### DNS Not Working?
- Double-check you entered nameservers correctly
- Wait a bit longer (can take up to 60 minutes)
- Check Vercel dashboard for error messages
- Try clearing browser cache

### Still Having Issues?
- IONOS support: https://www.ionos.com/help
- Or ask me and I can help troubleshoot!

## Quick Checklist

- [ ] Added domain in Vercel
- [ ] Changed nameservers in IONOS (or added DNS records)
- [ ] Waited 5-60 minutes
- [ ] Checked Vercel shows "Valid Configuration"
- [ ] Tested `https://arjunkocharla.com`

## Expected Timeline

- **DNS Propagation**: 5-60 minutes (usually 15-30 min)
- **Vercel SSL**: Automatic (happens after DNS is ready)
- **Total Time**: Usually ready within 1 hour

Your site will be live at `https://arjunkocharla.com` once DNS propagates! 🚀

