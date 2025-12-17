import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdmQiVcaQVD538GaUjgDnhoyDAfqe2Jsg",
  authDomain: "uwu-acadamy.firebaseapp.com",
  projectId: "uwu-acadamy",
  storageBucket: "uwu-acadamy.firebasestorage.app",
  messagingSenderId: "904845372714",
  appId: "1:904845372714:web:c9811bb60da4c60fd80253"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const subjects = {
  "Physical Science": ["Combined Mathematics","Physics","Chemistry","ICT"],
  "Biological Science": ["Biology","Chemistry","Physics","Agricultural Science"],
  "Commerce": ["Economics","Business Studies","Accountancy","ICT"],
  "Arts": ["Sinhala","Tamil","English","History","Geography","Political Science"],
  "Technology": ["Engineering Technology","ICT"]
};

stream.onchange = () => {
  subject.innerHTML = '<option value="">Select Subject</option>';
  subjects[stream.value]?.forEach(s=>{
    subject.innerHTML += `<option>${s}</option>`;
  });
  list.innerHTML = "";
};

subject.onchange = () => {
  list.innerHTML = "";

  const q = query(
    collection(db, "notes"),
    where("stream", "==", stream.value),
    where("subject", "==", subject.value)
  );

  onSnapshot(q, snapshot => {
    let items = [];
    snapshot.forEach(doc => items.push(doc.data()));

    // ✅ SORT BY lessonNo (JS side)
    items.sort((a,b) => (a.lessonNo || 9999) - (b.lessonNo || 9999));

    list.innerHTML = "";
    items.forEach(n => {
      list.innerHTML += `
        <li>
          <b>${n.lessonNo ?? ""}</b>
          <a href="${n.link}" target="_blank">${n.lessonName}</a><br>
          ${n.uploader}<br>
          ${n.createdAt ? n.createdAt.toDate().toLocaleString() : ""}
        </li><br>
      `;
    });
  });
};