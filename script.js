function bukaUndangan(){

  const musik = document.getElementById("musik");
  const musicBtn = document.getElementById("musicBtn");
  const cover = document.getElementById("cover");
  const content = document.getElementById("content");
	

    cover.style.transition = "opacity 1s";
    cover.style.opacity = "0";

    setTimeout(function(){

        cover.style.display = "none";

        content.classList.add("show");

      musik.play();

     musicBtn.style.display = "block";
     musicBtn.classList.add("playing");

    },1000);

}

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
