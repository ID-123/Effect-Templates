// script.js

/* ======================================
   OBTENEMOS ELEMENTOS DEL HTML
====================================== */
const card = document.getElementById("card");
const overlay = document.getElementById("overlay");
const demo = document.getElementById("demo");

/* ======================================
   VARIABLES DE CONTROL
====================================== */

// guardará el temporizador de 4 segundos
let holdTimer = null;

// indica si ya está expandida
let expanded = false;


/* ======================================
   EVENTOS DESKTOP (mouse)
====================================== */

// entra cursor
card.addEventListener("mouseenter", startHold);

// sale cursor
card.addEventListener("mouseleave", cancelHold);


/* ======================================
   EVENTOS MÓVIL (touch)
====================================== */

// dedo toca tarjeta
card.addEventListener("touchstart", startHold);

// dedo se retira
card.addEventListener("touchend", cancelHold);


/* ======================================
   CLICK FUERA PARA CERRAR
====================================== */
overlay.addEventListener("click", closeCard);


/* ======================================
   INICIA CUENTA REGRESIVA
====================================== */
function startHold() {

    // si ya está abierta no hacemos nada
    if (expanded) return;

    // efecto visual hover
    card.classList.add("hovered");

    // esperamos 4 segundos
    holdTimer = setTimeout(() => {
        expandCard();
    }, 4000);
}


/* ======================================
   CANCELA TEMPORIZADOR
   Si usuario sale antes de 4 segundos
====================================== */
function cancelHold() {

    if (expanded) return;

    clearTimeout(holdTimer);

    card.classList.remove("hovered");
}


/* ======================================
   EXPANDE TARJETA
====================================== */
function expandCard() {

    expanded = true;

    // crece tarjeta
    card.classList.add("expanded");

    // aparece fondo blur
    overlay.classList.add("active");

    // inicia demo automática
    demo.classList.add("play");
}


/* ======================================
   CIERRA TARJETA
====================================== */
function closeCard() {

    expanded = false;

    // quitamos clases activas
    card.classList.remove("expanded");
    card.classList.remove("hovered");

    overlay.classList.remove("active");

    // detenemos animación
    demo.classList.remove("play");

    // limpiamos timer por seguridad
    clearTimeout(holdTimer);
}