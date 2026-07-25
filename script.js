import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyApzkn1I1agP3F8JdaPc-cV9JtmAQCJ4nQ",
    authDomain: "undangan-pernikahan-4df30.firebaseapp.com",
    projectId: "undangan-pernikahan-4df30",
    storageBucket: "undangan-pernikahan-4df30.firebasestorage.app",
    messagingSenderId: "352613631882",
    appId: "1:352613631882:web:47d2a88311af6fb53a2a73"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let isAdmin = false;

function bukaUndangan(){
	
    const musik = document.getElementById("musik");
    const musicBtn = document.getElementById("musicBtn");
    const cover = document.getElementById("cover");
    const content = document.getElementById("content");

    cover.style.transition = "opacity .35s ease";
    cover.style.opacity = "0";

    setTimeout(function(){

        cover.style.display = "none";

        content.classList.add("show");

        musik.play();

        musicBtn.style.display = "block";
        musicBtn.classList.add("playing");

    },350);

}

window.bukaUndangan = bukaUndangan;

const tanggalNikah = new Date("September 20, 2026 09:00:00").getTime();

setInterval(function(){

    const sekarang = new Date().getTime();

    const selisih = tanggalNikah - sekarang;

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));

    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));

    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    document.getElementById("hari").innerHTML = hari;
    document.getElementById("jam").innerHTML = jam;
    document.getElementById("menit").innerHTML = menit;
    document.getElementById("detik").innerHTML = detik;

},1000);

const params = new URLSearchParams(window.location.search);

const tamu = params.get("to");

if(tamu){

    document.getElementById("tamu").innerHTML =
    "Kepada Yth.<br><b>" + tamu + "</b>";

}

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

sections.forEach(function(section){

    observer.observe(section);

});

const gallery = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

gallery.forEach(function(img){

    img.onclick=function(){

        lightbox.style.display="flex";

        lightboxImg.src=this.src;

    }

});

lightbox.onclick=function(){

    lightbox.style.display="none";

}

const musicBtn = document.getElementById("musicBtn");
const musik = document.getElementById("musik");


musicBtn.onclick = function(){

    if(musik.paused){

        musik.play();
        musicBtn.classList.add("playing");

    }else{

        musik.pause();
        musicBtn.classList.remove("playing");

    }

}

window.addEventListener("scroll", function(){

    let posisi = window.pageYOffset;

    document.body.style.backgroundPositionY = posisi * 0.3 + "px";

});

function copyRek(id){

    const nomor = document.getElementById(id).innerText;

    navigator.clipboard.writeText(nomor);

    alert("Nomor rekening berhasil disalin");

}

const form = document.getElementById("wishForm");
const list = document.getElementById("listUcapan");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    await addDoc(collection(db, "comments"), {

        nama: document.getElementById("nama").value,
        hadir: document.getElementById("hadir").value,
        pesan: document.getElementById("pesan").value,
        waktu: serverTimestamp()

    });

    form.reset();

});

const q = query(
    collection(db, "comments"),
    orderBy("waktu", "desc")
);

let semuaKomentar = [];

function renderKomentar(){

    list.innerHTML = "";

    semuaKomentar.forEach(function(item){

        const data = item.data();

        list.innerHTML += `
<div class="ucapan-card">

    <div class="ucapan-header">

        <div class="avatar">
            ${data.nama.charAt(0).toUpperCase()}
        </div>

        <div class="info">

            <h3>${data.nama}</h3>

            <small>${data.hadir}</small>

        </div>

    </div>

    <p>${data.pesan}</p>

            ${isAdmin ? `
            <button onclick="hapusKomentar('${item.id}')" class="hapus-btn">
                🗑 Hapus
            </button>
            ` : ""}

        </div>
        `;

    });

}

onSnapshot(q, function(snapshot){

    semuaKomentar = snapshot.docs;

    renderKomentar();

});

window.hapusKomentar = async function(id){

    await deleteDoc(doc(db, "comments", id));

    alert("Komentar berhasil dihapus");

}

let klikAdmin = 0;

document.getElementById("adminTrigger").addEventListener("click", function(){

    klikAdmin++;

    if(klikAdmin >= 10){

        klikAdmin = 0;

        const password = prompt("Password Admin");

       if(password === "Arif2026!"){

    isAdmin = true;

    renderKomentar();

    }else{

    alert("Password salah");

}

    }

});
