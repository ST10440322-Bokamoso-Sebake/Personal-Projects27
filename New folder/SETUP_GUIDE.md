# Quick Setup Guide

## Step 1: Firebase Setup (5 minutes)

### 1.1 Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project" or "Create a project"
3. Enter project name (e.g., "student-task-manager")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 1.2 Enable Authentication
1. In Firebase Console, click "Authentication" in left menu
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Click on "Email/Password"
5. Enable "Email/Password" (toggle ON)
6. Click "Save"

### 1.3 Create Firestore Database
1. Click "Firestore Database" in left menu
2. Click "Create database"
3. Select "Start in test mode" (for development)
4. Choose a location (closest to you)
5. Click "Enable"

### 1.4 Get Firebase Config
1. Click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>` (if no web app exists, click "Add app" → Web)
5. Register app with a nickname (e.g., "Student Task Manager")
6. Copy the `firebaseConfig` object

### 1.5 Update Config File
1. Open `src/firebase/config.js`
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",           // Your actual API key
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 1.6 Set Firestore Security Rules
1. In Firebase Console, go to "Firestore Database"
2. Click "Rules" tab
3. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

4. Click "Publish"

## Step 2: Run the Application

```bash
npm start
```

The app will open at http://localhost:3000

## Step 3: Test the App

1. Click "Sign up" to create an account
2. Create your first task
3. Try editing, completing, and deleting tasks
4. Test the filters and priority system

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've updated `src/firebase/config.js` with your actual Firebase credentials

### "Missing or insufficient permissions"
- Check your Firestore security rules (Step 1.6)
- Make sure you're logged in

### App won't start
- Make sure all dependencies are installed: `npm install`
- Check for any syntax errors in the console

### Tasks not syncing
- Verify Firestore is enabled in Firebase Console
- Check browser console for errors
- Verify security rules allow authenticated users to read/write

## Need Help?

Refer to the main README.md for detailed documentation.

