import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
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

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {

signupBtn.addEventListener("click", async () => {

try {

const name = document.getElementById("name").value.trim();

const phone = document.getElementById("phone").value.trim();

const city = document.getElementById("city").value.trim();

const category = document.getElementById("category").value;

const experience = Number(document.getElementById("experience").value);

const email = document.getElementById("email").value.trim();

const password = document.getElementById("password").value;

await createUserWithEmailAndPassword(auth,email,password);

await addDoc(collection(db,"Workers"),{

Name:name,

Phone:phone,

City:city,

category:category,

Experience:experience,

rating:4.9,

Verified:true

});

alert("Account Created Successfully");

window.location.href="login.html";

}catch(error){

alert(error.message);

}

});

}

const loginBtn=document.getElementById("loginBtn");

if(loginBtn){

loginBtn.addEventListener("click",async()=>{

try{

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value;

await signInWithEmailAndPassword(auth,email,password);

window.location.href="index.html";

}catch(error){

alert(error.message);

}

});

}
// ===============================
// LOAD WORKERS
// ===============================
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    loadWorkers(searchInput.value.toLowerCase().trim());
  });
}
const workerGrid = document.getElementById("workerGrid");

if (workerGrid) {
  loadWorkers();
}

async function loadWorkers(search = "") {

  try {

    const querySnapshot = await getDocs(collection(db, "Workers"));

    workerGrid.innerHTML = "";

    querySnapshot.forEach((doc) => {

      const worker = doc.data();
const text = `${worker.Name || ""} ${worker.category || ""} ${worker.City || ""}`.toLowerCase();
if (search && !text.includes(search)) {
  return;
    }
      const phone = String(worker.Phone || "");

      const card = `
<div class="card">

<h3>👷 ${worker.Name}</h3>
<p>🛠 ${worker.category}</p>
<p>⭐ ${worker.rating || "4.9"}</p>
<p>📍 ${worker.City || "Mumbai"}</p>

<p>✔ Verified</p>

<div class="card-buttons">

<a class="view-btn"
href="Worker.html?phone=${encodeURIComponent(phone)}">
View Profile
</a>

<button onclick="window.location.href='tel:${phone}'">
Call
</button>

</div>

</div>
`;

      workerGrid.insertAdjacentHTML("beforeend", card);

    });

  } catch (error) {

    console.error("Load Worker Error :", error);

  }

}
