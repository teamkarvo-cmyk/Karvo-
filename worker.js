import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
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
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const phone = params.get("phone");

async function loadWorker() {
  const querySnapshot = await getDocs(collection(db, "Workers"));

  querySnapshot.forEach((doc) => {
    const worker = doc.data();
    alert(phone);
alert(JSON.stringify(worker));
console.log(phone);
console.log(worker);
    if (String(worker.Phone) === String(phone)) {
      document.querySelector("h2").innerText = worker.Name;
      document.querySelector(".rating").innerText =
        "⭐ " + worker.rating + " Rating";

      document.querySelectorAll("p")[1].innerText = "📍 " + worker.City;
      document.querySelectorAll("p")[2].innerText = "✔ Verified Worker";
      document.querySelectorAll("p")[3].innerText =
        "Experience : " + worker.Experience + " Years";
      document.querySelectorAll("p")[4].innerText =
        "Category : " + worker.category;

      document.querySelector(".call-btn").href = "tel:" + worker.Phone;
    }
  });
}

loadWorker();
