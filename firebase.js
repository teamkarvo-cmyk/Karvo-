
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCbKuhaoqCMrKWbzsGT9Vb3EjFdFjjbyEw",
  authDomain: "karvo-86279.firebaseapp.com",
  projectId: "karvo-86279",
  storageBucket: "karvo-86279.firebasestorage.app",
  messagingSenderId: "105369503187",
  appId: "1:105369503187:web:c97fb2922b54fff1959b26"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// SIGNUP
  const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    try {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const city = document.getElementById("city").value;
      const category = document.getElementById("category").value;
      const experience = Number(document.getElementById("experience").value);
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(collection(db, "Workers"), {
        Name: name,
        Phone: phone,
        City: city,
        category: category,
        Experience: experience,
        rating: 4.9,
        Verified: true
      });

      alert("Account Created Successfully");
      window.location.href = "login.html";

    } catch (error) {
      alert(error.message);
    }
  });
  }
