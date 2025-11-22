# 🚀 Quick Deploy to Render

## 3-Minute Deployment Guide

### Step 1: Prepare Your Repository (1 min)

```bash
# Ensure you're in the project root
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Deploy on Render (1 min)

1. Go to **https://dashboard.render.com**
2. Click **"New +"** → **"Blueprint"**
3. Connect your **GitHub repository**
4. Render will detect `render.yaml` automatically
5. Click **"Apply"**

### Step 3: Add Environment Variables (1 min)

In the Render dashboard, add these 5 variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
SECRET_KEY=your_jwt_secret_here
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

**That's it!** Your app will be live in 5-10 minutes at:
`https://your-app-name.onrender.com`

---

## Post-Deployment (Important!)

After your app is live, update the CORS settings:

1. Copy your Render URL (e.g., `https://job-portal-abc123.onrender.com`)
2. Open `backend/index.js`
3. Update line 23:

```javascript
const whitelist = [
  "http://localhost:5173",
  "https://your-actual-render-url.onrender.com" // ← Replace this
];
```

4. Commit and push:
```bash
git add backend/index.js
git commit -m "Update CORS for production"
git push origin main
```

Render will auto-deploy the update in 2-3 minutes.

---

## Environment Variables Explained

| Variable | Where to Get It | Example |
|----------|----------------|---------|
| `MONGO_URI` | MongoDB Atlas → Connect → Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `SECRET_KEY` | Generate random string (32+ chars) | `mySuper$ecretK3y!2024#Random` |
| `CLOUD_NAME` | Cloudinary Dashboard → Account Details | `df98bbgzn` |
| `API_KEY` | Cloudinary Dashboard → Account Details | `736715592374869` |
| `API_SECRET` | Cloudinary Dashboard → Account Details | `D-5RGWBKwIV3vlAEMG6lUHhCfAo` |

---

## MongoDB Atlas Setup

If you haven't set up MongoDB Atlas:

1. Go to **https://cloud.mongodb.com**
2. Create a free cluster
3. Go to **Network Access** → Add IP: `0.0.0.0/0` (allow all)
4. Go to **Database Access** → Create user with read/write permissions
5. Click **Connect** → Get connection string
6. Replace `<password>` with your actual password

---

## Testing Your Deployment

Once live, test these features:

✅ Homepage loads
✅ User registration
✅ User login
✅ Job search
✅ Profile photo upload
✅ Resume upload
✅ Job application

---

## Common Issues & Fixes

### Issue: "Cannot connect to database"
**Fix:** Check MongoDB Atlas Network Access allows `0.0.0.0/0`

### Issue: "CORS error"
**Fix:** Update CORS whitelist with your Render URL (see Post-Deployment above)

### Issue: "File upload fails"
**Fix:** Verify Cloudinary credentials in environment variables

### Issue: "App is slow to load"
**Fix:** Free tier spins down after 15 min. First load takes 30-60 sec. This is normal.

---

## Free Tier Notes

Render's free tier:
- ✅ Perfect for testing and portfolios
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds
- ✅ 750 hours/month (enough for most projects)

---

## Need Help?

- 📖 Full guide: See `DEPLOYMENT.md`
- ✅ Checklist: See `RENDER_CHECKLIST.md`
- 🐛 Issues: Check Render logs in dashboard
- 💬 Support: https://community.render.com

---

**Happy Deploying! 🎉**
