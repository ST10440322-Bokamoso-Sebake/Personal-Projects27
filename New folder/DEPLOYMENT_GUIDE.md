# Deployment Guide - Firebase Hosting

## Step 1: Login to Firebase
Run this command and follow the prompts:
```bash
firebase login
```
- Answer "Y" or "n" to the Gemini question (your choice)
- A browser window will open for authentication
- Sign in with your Google account

## Step 2: Initialize Firebase Hosting
```bash
firebase init hosting
```

When prompted, select:
- **What do you want to use as your public directory?** → `build`
- **Configure as a single-page app?** → `Yes`
- **Set up automatic builds and deploys with GitHub?** → `No` (unless you want it)
- **File build/index.html already exists. Overwrite?** → `No`

## Step 3: Build the Production Version
```bash
npm run build
```

## Step 4: Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```

## Step 5: Access Your Deployed App
After deployment, you'll get a URL like:
`https://student-task-management-779a1.web.app`

---

## Quick Deploy Commands (After Login)
```bash
firebase init hosting
# Select: build, Yes, No, No

npm run build

firebase deploy --only hosting
```

## Troubleshooting

### "Firebase CLI not found"
- Make sure firebase-tools is installed: `npm install -g firebase-tools`

### "Error: No Firebase project"
- Make sure you're logged in: `firebase login`
- Select your project when initializing

### Build errors
- Make sure all dependencies are installed: `npm install`
- Check for any console errors

