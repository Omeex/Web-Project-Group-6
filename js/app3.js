import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase config
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

// Streams & subjects
const streams = {
  "phy": ["Combined Mathematics","Physics","Chemistry","ICT"],
  "bio": ["Biology","Chemistry","Physics","Agricultural Science"],
  "com": ["Economics","Business Studies","Accountancy","ICT"],
  "arts": ["Sinhala","Tamil","English","History","Geography","Political Science",
           "Logic & Scientific Method","Economics","Media Studies","Dancing",
           "Music","Art","Drama","Religion & Civilization"],
  "tech": ["Engineering Technology","Biosystems Technology","Science for Technology",
           "ICT","Civil Technology","Mechanical Technology","Electrical & Electronic Technology","Food Technology"]
};

// 🔹 Utility to create short codes from subject
function subjectCode(name){
  return name.toLowerCase().replace(/[^a-z]/g,"").slice(0,4);
}

// 🔹 Function to load notes for UL
function loadNotes(ulId, streamFull, subjectFull){
  const ul = document.getElementById(ulId);
  if(!ul) return;

  const q = query(
    collection(db,"notes"),
    where("stream","==",streamFull),
    where("subject","==",subjectFull)
  );

  onSnapshot(q, snapshot=>{
    let items = [];
    snapshot.forEach(doc=>items.push(doc.data()));
    items.sort((a,b)=> (a.lessonNo||999) - (b.lessonNo||999));
    ul.innerHTML = "";
    items.forEach(n=>{
      ul.innerHTML += `
        <li>
          <b>${n.lessonNo ?? ""}</b>
          <a href="${n.link}" target="_blank">${n.lessonName}</a><br>
          ${n.uploader} | ${n.createdAt ? n.createdAt.toDate().toLocaleString() : ""}
        </li>
      `;
    });
  });
}

// 🔹 Loop through all ULs in document
document.querySelectorAll("ul[id]").forEach(ul=>{
  const parts = ul.id.split("-"); // id pattern: stream-subject
  const streamCode = parts[0]; // e.g., phy, com
  const subjectCodeId = parts[1]; // e.g., comb, acc

  const streamFull = Object.keys(streams).includes(streamCode) 
                     ? Object.entries({"phy":"Physical Science","bio":"Biological Science","com":"Commerce","arts":"Arts","tech":"Technology"})
                       .find(([code,full])=>code===streamCode)[1]
                     : null;
  if(!streamFull) return;

  const subjectFull = streams[streamCode].find(s => subjectCode(s)===subjectCodeId);
  if(!subjectFull) return;

  loadNotes(ul.id, streamFull, subjectFull);
});
