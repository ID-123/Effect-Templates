// script.js

/* =====================================
   ELEMENTOS HTML
===================================== */
const card = document.getElementById("card");
const overlay = document.getElementById("overlay");
const track = document.getElementById("track");
const windowBox = document.getElementById("window");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsBox = document.getElementById("dots");

const slides = document.querySelectorAll(".slide");

/* =====================================
   VARIABLES GENERALES
===================================== */
let holdTimer = null;
let expanded = false;

/* índice actual */
let current = 0;

/* autoplay */
let autoPlay = null;

/* drag */
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let previousTranslate = 0;

/* tamaño real del slide + gap */
const step = 276;

/* =====================================
   CREAR DOTS DINÁMICOS
===================================== */
slides.forEach((_, index) => {

    const dot = document.createElement("span");
    dot.classList.add("dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        goToSlide(index);
    });

    dotsBox.appendChild(dot);
});

/* =====================================
   EVENTOS HOVER / TOUCH
===================================== */
card.addEventListener("mouseenter", startHold);
card.addEventListener("mouseleave", cancelHold);

card.addEventListener("touchstart", startHold);
card.addEventListener("touchend", cancelHold);

/* cerrar fuera */
overlay.addEventListener("click", closeCard);

/* botones */
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

/* =====================================
   DRAG DESKTOP
===================================== */
windowBox.addEventListener("mousedown", dragStart);
window.addEventListener("mousemove", dragMove);
window.addEventListener("mouseup", dragEnd);

/* =====================================
   SWIPE TOUCH
===================================== */
windowBox.addEventListener("touchstart", dragStartTouch);
windowBox.addEventListener("touchmove", dragMoveTouch);
windowBox.addEventListener("touchend", dragEnd);

/* =====================================
   INICIO HOLD
===================================== */
function startHold() {

    if (expanded) return;

    card.classList.add("hovered");

    holdTimer = setTimeout(() => {
        openCard();
    }, 2500);
}

/* cancelar hold */
function cancelHold() {

    if (expanded) return;

    clearTimeout(holdTimer);
    card.classList.remove("hovered");
}

/* =====================================
   ABRIR
===================================== */
function openCard() {

    expanded = true;

    card.classList.add("expanded");
    overlay.classList.add("active");

    startAutoplay();
}

/* =====================================
   CERRAR
===================================== */
function closeCard() {

    expanded = false;

    clearTimeout(holdTimer);
    stopAutoplay();

    current = 0;
    updateSlider();

    card.classList.remove("expanded");
    card.classList.remove("hovered");
    overlay.classList.remove("active");
}

/* =====================================
   AUTOPLAY
===================================== */
function startAutoplay() {

    stopAutoplay();

    autoPlay = setInterval(() => {
        nextSlide();
    }, 2600);
}

function stopAutoplay() {
    clearInterval(autoPlay);
}

/* =====================================
   NAVEGACIÓN
===================================== */
function nextSlide() {

    current++;

    if (current >= slides.length) {
        current = 0;
    }

    updateSlider();
}

function prevSlide() {

    current--;

    if (current < 0) {
        current = slides.length - 1;
    }

    updateSlider();
}

function goToSlide(index) {

    current = index;
    updateSlider();

    startAutoplay();
}

/* =====================================
   ACTUALIZAR POSICIÓN
===================================== */
function updateSlider() {

    track.style.transition = "transform .45s ease";

    track.style.transform =
        `translateX(-${current * step}px)`;

    updateDots();
}

/* =====================================
   DOTS ACTIVOS
===================================== */
function updateDots() {

    const dots = document.querySelectorAll(".dot");

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    dots[current].classList.add("active");
}

/* =====================================
   DRAG DESKTOP
===================================== */
function dragStart(e) {

    if (!expanded) return;

    isDragging = true;

    startX = e.clientX;

    previousTranslate = -current * step;

    track.style.transition = "none";

    windowBox.classList.add("dragging");

    stopAutoplay();
}

function dragMove(e) {

    if (!isDragging) return;

    const moved = e.clientX - startX;

    currentTranslate = previousTranslate + moved;

    track.style.transform =
        `translateX(${currentTranslate}px)`;
}

function dragEnd() {

    if (!isDragging) return;

    isDragging = false;

    windowBox.classList.remove("dragging");

    const movedBy = currentTranslate - previousTranslate;

    if (movedBy < -80) {
        nextSlide();
    }
    else if (movedBy > 80) {
        prevSlide();
    }
    else {
        updateSlider();
    }

    startAutoplay();
}

/* =====================================
   TOUCH
===================================== */
function dragStartTouch(e) {

    if (!expanded) return;

    isDragging = true;

    startX = e.touches[0].clientX;

    previousTranslate = -current * step;

    track.style.transition = "none";

    stopAutoplay();
}

function dragMoveTouch(e) {

    if (!isDragging) return;

    const moved = e.touches[0].clientX - startX;

    currentTranslate = previousTranslate + moved;

    track.style.transform =
        `translateX(${currentTranslate}px)`;
}