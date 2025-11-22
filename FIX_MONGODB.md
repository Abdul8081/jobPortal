# 🔧 Fix MongoDB Connection Issue

## The Problem
Your MongoDB connection is timing out because the connection string is missing the database name.

## Quick Fix - Update Environment Variable in Render

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your **"job-portal"** service
3. Click **"Environment"** tab (left sidebar)
4. Find the **MONGO_URI** variable
5. Click **"Edit"** (pencil icon)
6. Update the value to:

```
mongodb+srv://amuid677:Abdul123@cluster0.8kcbyb1.mongodb.net/jobportal?retryWrites=true&w=majority
```

**What changed:** Added `/jobportal` (database name) and connection options

7. Click **"Save Changes"**
8. Render will automatically redeploy (takes 2-3 minutes)

## Alternative: Check MongoDB Atlas

If the above doesn't work, verify MongoDB Atlas settings:

### 1. Network Access
- Go to: https://cloud.mongodb.com
- Click **"Network Access"** (left sidebar)
- Make sure **0.0.0.0/0** is in the IP Access List
- If not, click **"Add IP Address"** → **"Allow Access from Anywhere"**

### 2. Database User
- Click **"Database Access"** (left sidebar)
- Find user: **amuid677**
- Make sure password is: **Abdul123**
- Make sure role is: **"Read and write to any database"**

### 3. Check if Cluster is Active
- Click **"Database"** (left sidebar)
- Make sure Cluster0 shows **"Active"** (not paused)
- If paused, click **"Resume"**

## Test After Fix

Once Render redeploys:
1. Go to: https://jobportal-059k.onrender.com
2. Try to register a new user
3. Should work within 5-10 seconds

## Still Not Working?

Check Render logs:
1. Go to Render dashboard
2. Click your service
3. Click **"Logs"** tab
4. Look for MongoDB connection errors
5. Send me the error message

---

**Most likely fix:** Just update the MONGO_URI in Render with the database name!
