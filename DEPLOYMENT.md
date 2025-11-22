# Deployment Guide for Render

This guide will help you deploy your Job Portal application to Render.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your code pushed to a GitHub repository
3. MongoDB Atlas database (or any accessible MongoDB instance)
4. Cloudinary account for file uploads

## Deployment Steps

### Option 1: Deploy Using render.yaml (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Create a New Web Service on Render**
   - Go to https://dashboard.render.com
   - Click "New +" and select "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Configure Environment Variables**
   
   In the Render dashboard, add these environment variables:
   
   - `MONGO_URI` - Your MongoDB connection string
   - `SECRET_KEY` - Your JWT secret key (generate a strong random string)
   - `CLOUD_NAME` - Your Cloudinary cloud name
   - `API_KEY` - Your Cloudinary API key
   - `API_SECRET` - Your Cloudinary API secret
   - `NODE_ENV` - Set to `production` (should be auto-set)
   - `PORT` - Set to `8000` (should be auto-set)

4. **Deploy**
   - Click "Apply" to create the service
   - Wait for the build and deployment to complete (5-10 minutes)
   - Your app will be live at `https://your-app-name.onrender.com`

### Option 2: Manual Deployment

1. **Create a New Web Service**
   - Go to https://dashboard.render.com
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```
   Name: job-portal
   Runtime: Node
   Build Command: cd backend && npm install && cd ../frontend && npm install && npm run build
   Start Command: cd backend && npm start
   ```

3. **Add Environment Variables** (same as Option 1)

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

## Post-Deployment

### Update CORS Settings

After deployment, update the CORS whitelist in `backend/index.js`:

```javascript
const whitelist = [
  "http://localhost:5173", // dev frontend
  "https://your-app-name.onrender.com" // your actual Render URL
];
```

Then commit and push the changes:
```bash
git add backend/index.js
git commit -m "Update CORS for production"
git push origin main
```

Render will automatically redeploy with the new changes.

### Test Your Deployment

1. Visit your Render URL: `https://your-app-name.onrender.com`
2. Test user registration and login
3. Test job posting and application features
4. Verify file uploads work correctly

## Troubleshooting

### Build Fails

- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### Database Connection Issues

- Verify `MONGO_URI` is correct
- Ensure MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
- Check MongoDB Atlas user permissions

### CORS Errors

- Update the whitelist in `backend/index.js` with your Render URL
- Ensure credentials are enabled in CORS options

### File Upload Issues

- Verify Cloudinary credentials are correct
- Check Cloudinary upload preset settings
- Review Cloudinary logs for errors

### App Crashes or Restarts

- Check application logs in Render dashboard
- Verify all environment variables are set
- Ensure database connection is stable

## Free Tier Limitations

Render's free tier has some limitations:

- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- 750 hours of runtime per month (shared across services)

To avoid spin-down, consider upgrading to a paid plan or using a service like UptimeRobot to ping your app periodically.

## Monitoring

- View logs: Render Dashboard → Your Service → Logs
- Monitor performance: Render Dashboard → Your Service → Metrics
- Set up alerts: Render Dashboard → Your Service → Settings → Notifications

## Updating Your App

Render automatically deploys when you push to your connected branch:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

## Custom Domain (Optional)

1. Go to your service settings in Render
2. Click "Custom Domain"
3. Add your domain and follow DNS configuration instructions

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- MongoDB Atlas Support: https://www.mongodb.com/cloud/atlas/support

---

**Note:** Remember to never commit your `.env` file or expose sensitive credentials in your code!
