// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  EmailAuthProvider, 
  GoogleAuthProvider, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import * as firebaseui from "https://www.gstatic.com/firebasejs/ui/6.1.0/firebase-ui-auth.js";

import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(auth);

// Redirect after login
const redirectAfterLogin = sessionStorage.getItem('redirectAfterLogin') || '/index.html';

// FirebaseUI configuration
const uiConfig = {
  signInSuccessUrl: redirectAfterLogin,
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID
  ]
};

// Start FirebaseUI if login container exists
const loginContainer = document.getElementById('firebaseui-auth-container');
if (loginContainer) {
  ui.start('#firebaseui-auth-container', uiConfig);
}

// Protect pages: redirect non-logged-in users to login
onAuthStateChanged(auth, user => {
  const currentPath = window.location.pathname;
  if (!user && !currentPath.endsWith('/login.html')) {
    sessionStorage.setItem('redirectAfterLogin', currentPath);
    window.location.href = '/login.html';
  }
});

// Logout functionality
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        window.location.href = '/login.html';
      })
      .catch(err => console.error("Logout error:", err));
  });
}
