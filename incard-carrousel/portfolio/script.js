// script.js

const card = document.getElementById("card");
const overlay = document.getElementById("overlay");
const track = document.getElementById("track");

let holdTimer = null;
let expanded = false;

let current = 0;
let loop = null;

card.addEventListener("mouseenter", startHold);
card.addEventListener("mouseleave", cancelHold);

card.addEventListener("touchstart", startHold);
card.addEventListener("touchend", cancelHold);

overlay.addEventListener("click", closeCard);

function startHold() {

    if (expanded) return;

    card.classList.add("hovered");

    holdTimer = setTimeout(() => {
        openCard();
    }, 4000);
}

function cancelHold() {

    if (expanded) return;

    clearTimeout(holdTimer);

    card.classList.remove("hovered");
}

function openCard() {

    expanded = true;

    card.classList.add("expanded");
    overlay.classList.add("active");

    startSlides();
}

function startSlides() {

    loop = setInterval(() => {

        current++;

        if (current > 1) {
            current = 0;
        }

        track.style.transform =
            `translateX(-${current * 280}px)`;

    }, 2600);
}

function closeCard() {

    expanded = false;

    clearTimeout(holdTimer);
    clearInterval(loop);

    current = 0;

    track.style.transform = "translateX(0px)";

    card.classList.remove("expanded");
    card.classList.remove("hovered");

    overlay.classList.remove("active");
}