// js/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  EmailAuthProvider, 
  GoogleAuthProvider, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import * as firebaseui from "https://www.gstatic.com/firebasejs/ui/6.1.0/firebase-ui-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuzTjN96TOKOReyJi_zDs03-OILxMxmVs",
  authDomain: "growtech-collective.firebaseapp.com",
  projectId: "growtech-collective",
  storageBucket: "growtech-collective.firebasestorage.app",
  messagingSenderId: "1035107940967",
  appId: "1:1035107940967:web:701527deaa1ac708c332c2",
  measurementId: "G-QGJX090B09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(auth);

// Determine where to redirect after login
const redirectAfterLogin = sessionStorage.getItem('redirectAfterLogin') || 'index.html';

// FirebaseUI configuration
const uiConfig = {
  signInSuccessUrl: redirectAfterLogin,
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID
  ]
};

// Start FirebaseUI
ui.start('#firebaseui-auth-container', uiConfig);

// Protect pages: redirect non-logged-in users to login
onAuthStateChanged(auth, user => {
  if (!user) {
    // Save the current page path
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
    // Redirect to login page
    window.location.href = 'login.html';
  }
});

// Logout functionality (attach to a button with id="logout-btn")
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        window.location.href = 'login.html';
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  });
}

