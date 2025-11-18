# Student Task Manager

A full-stack web application built with React and Firebase that allows students to create, track, and prioritize academic tasks with due dates. Features include user authentication, real-time data synchronization, and a responsive user interface.

## Features

- ✅ **User Authentication** - Secure login and signup with Firebase Authentication
- ✅ **Task Management** - Create, read, update, and delete tasks
- ✅ **Priority System** - Assign high, medium, or low priority to tasks
- ✅ **Due Dates** - Set and track due dates for tasks with overdue indicators
- ✅ **Real-time Sync** - Automatic synchronization across devices using Firebase Firestore
- ✅ **Task Filtering** - Filter tasks by priority or completion status
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Modern UI** - Beautiful gradient design with smooth animations

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- A Firebase account

## Setup Instructions

### 1. Clone or Download the Project

If you haven't already, download or clone this project to your local machine.

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable **Email/Password** provider
4. Create a **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in **test mode** (for development)
   - Choose your preferred location
5. Get your Firebase configuration:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click the web icon (`</>`) to add a web app
   - Copy the Firebase configuration object

### 4. Configure Firebase in the Project

Open `src/firebase/config.js` and replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5. Set Up Firestore Security Rules (Important!)

Go to Firestore Database → Rules and update them to:

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

This ensures users can only access their own tasks.

### 6. Run the Application

Start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Usage

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Sign in with your credentials
3. **Create Tasks**: Click "+ Add New Task" to create a new task
   - Enter task title (required)
   - Add description (optional)
   - Select priority level (High, Medium, Low)
   - Set due date (optional)
4. **Manage Tasks**:
   - Check off tasks when completed
   - Edit tasks by clicking the "Edit" button
   - Delete tasks by clicking the "Delete" button
5. **Filter Tasks**: Use the filter buttons to view tasks by priority or completed tasks
6. **Track Due Dates**: Tasks with overdue due dates will be highlighted in red

## Project Structure

```
student-task-manager/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Auth.css
│   │   └── Dashboard/
│   │       ├── Dashboard.js
│   │       ├── Dashboard.css
│   │       ├── TaskForm.js
│   │       ├── TaskForm.css
│   │       ├── TaskList.js
│   │       ├── TaskList.css
│   │       ├── TaskItem.js
│   │       └── TaskItem.css
│   ├── firebase/
│   │   └── config.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Technologies Used

- **React** - Frontend framework
- **React Router** - Client-side routing
- **Firebase Authentication** - User authentication
- **Firebase Firestore** - Real-time database
- **CSS3** - Styling with modern design patterns

## Build for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder that you can deploy to any static hosting service.

## Deployment

You can deploy this application to:
- **Firebase Hosting** (recommended)
- **Netlify**
- **Vercel**
- **GitHub Pages**
- Any static hosting service

### Deploy to Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy --only hosting`

## Security Notes

- Never commit your Firebase configuration with real credentials to public repositories
- Use environment variables for production deployments
- Ensure Firestore security rules are properly configured
- Consider implementing additional security measures for production use

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please check the Firebase documentation or React documentation.

---

**Developed in 2024** - Student Task Manager (React + Firebase)

