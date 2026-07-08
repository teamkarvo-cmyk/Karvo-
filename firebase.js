import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs
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
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account Created Successfully");
        window.location.href = "login.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// LOGIN
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login Successful");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}
const workerGrid = document.getElementById("workerGrid");

if (workerGrid) {
  loadWorkers();
}

async function loadWorkers() {
  console.log("Loading workers...");
  const querySnapshot = await getDocs(collection(db, "Workers"));

  workerGrid.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const worker = doc.data();
    console.log(worker);
console.log(doc.id);
console.log(worker);
    workerGrid.innerHTML += `
      <div class="card">
        <h3>👷 ${worker.category}</h3>
        <p>⭐ ${worker.Rating || worker.rating} Rating</p>
<p>📍 ${worker.City || worker.city}</p>
        <p>✔ Verified</p>

        <div class="card-buttons">
          <a href="worker.html" class="view-btn">View Profile</a>
          <button>Call</button>
        </div>
      </div>
    `;
  });
}
