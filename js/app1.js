
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 YOUR FIREBASE CONFIG */
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
};

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addDoc(collection(db, "notes"), {
    uploader: uploader.value,
    stream: stream.value,
    subject: subject.value,
    lessonNo: lessonNo.value || null,
    lessonName: lessonName.value,
    link: link.value,
    createdAt: serverTimestamp()
  });

  alert("Note Uploaded Successfully");
  uploadForm.reset();
});