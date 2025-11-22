# Render Deployment Checklist ✅

Follow this checklist to ensure a smooth deployment to Render.

## Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] MongoDB Atlas database is set up and accessible
- [ ] Cloudinary account is configured
- [ ] All environment variables are documented
- [ ] `.gitignore` includes `.env` files
- [ ] `render.yaml` is in the root directory

## Environment Variables to Set in Render

Copy these values from your `backend/.env` file:

- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `SECRET_KEY` - JWT secret key
- [ ] `CLOUD_NAME` - Cloudinary cloud name
- [ ] `API_KEY` - Cloudinary API key
- [ ] `API_SECRET` - Cloudinary API secret
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Set to `8000`

## Deployment Steps

1. [ ] Go to https://dashboard.render.com
2. [ ] Click "New +" → "Blueprint"
3. [ ] Connect your GitHub repository
4. [ ] Render detects `render.yaml` automatically
5. [ ] Add all environment variables listed above
6. [ ] Click "Apply" to start deployment
7. [ ] Wait 5-10 minutes for build to complete

## Post-Deployment

- [ ] Note your Render URL (e.g., `https://your-app-name.onrender.com`)
- [ ] Update CORS whitelist in `backend/index.js` with your Render URL
- [ ] Commit and push the CORS update
- [ ] Wait for automatic redeployment
- [ ] Test the live application:
  - [ ] Homepage loads correctly
  - [ ] User registration works
  - [ ] User login works
  - [ ] Job search works
  - [ ] File uploads work (profile photo, resume)
  - [ ] Job application works
  - [ ] Recruiter features work

## MongoDB Atlas Configuration

- [ ] Whitelist all IPs (0.0.0.0/0) in Network Access
- [ ] Database user has read/write permissions
- [ ] Connection string is correct in `MONGO_URI`

## Troubleshooting

If deployment fails:

1. Check build logs in Render dashboard
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection string is accessible
4. Check that all dependencies are in `package.json`
5. Review the DEPLOYMENT.md guide for detailed troubleshooting

## Success Indicators

✅ Build completes without errors
✅ Service shows "Live" status in Render dashboard
✅ Application loads at your Render URL
✅ API endpoints respond correctly
✅ Database operations work
✅ File uploads to Cloudinary work

---

**Your Render URL:** `https://_____________________.onrender.com`

**Deployment Date:** ___________________

**Notes:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
