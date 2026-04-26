// script.js

const card = document.getElementById("card");
const overlay = document.getElementById("overlay");
const track = document.getElementById("track");

let holdTimer = null;
let expanded = false;

let slide = 0;
let autoPlay = null;

/* ===============================
   EVENTOS
================================= */
card.addEventListener("mouseenter", startHold);
card.addEventListener("mouseleave", cancelHold);

card.addEventListener("touchstart", startHold);
card.addEventListener("touchend", cancelHold);

overlay.addEventListener("click", closeCard);

/* ===============================
   ESPERAR 4 SEGUNDOS
================================= */
function startHold() {

    if (expanded) return;

    card.classList.add("hovered");

    holdTimer = setTimeout(() => {
        expandCard();
    }, 4000);
}

function cancelHold() {

    if (expanded) return;

    clearTimeout(holdTimer);
    card.classList.remove("hovered");
}

/* ===============================
   ABRIR
================================= */
function expandCard() {

    expanded = true;

    card.classList.add("expanded");
    overlay.classList.add("active");

    startCarousel();
}

/* ===============================
   CARRUSEL AUTO
================================= */
function startCarousel() {

    autoPlay = setInterval(() => {

        slide++;

        if (slide > 2) {
            slide = 0;
        }

        track.style.transform =
            `translateX(-${slide * 234}px)`;

    }, 2200);
}

/* ===============================
   CERRAR
================================= */
function closeCard() {

    expanded = false;

    clearTimeout(holdTimer);
    clearInterval(autoPlay);

    slide = 0;

    track.style.transform = "translateX(0px)";

    card.classList.remove("expanded");
    card.classList.remove("hovered");

    overlay.classList.remove("active");
}