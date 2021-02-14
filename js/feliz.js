var timeLeft = 60;
var elem = document.getElementById("cuentaDiv");
var timerId = setInterval(countdown, 1000);
var ocultar = document.getElementById("");

function countdown() {
  if (timeLeft == -1) {
    clearTimeout(timerId);
  } else {
    if (timeLeft == 54) {
      muestraDiv("div-name2");
    }
    if (timeLeft == 48) {
      muestraDiv("div-name1");
    }
    if (timeLeft == 42) {
      muestraDiv("div6");
    }
    if (timeLeft == 36) {
      muestraDiv("div1");
    }
    if (timeLeft == 30) {
      muestraDiv("div3");
    }
    if (timeLeft == 24) {
      muestraDiv("div2");
    }

    if (timeLeft == 18) {
      muestraDiv("div4");
    }

    if (timeLeft == 12) {
      muestraDiv("div8");
    }

    if (timeLeft == 6) {
      muestraDiv("div7");
    }
    if (timeLeft == 1) {
      muestraDiv("nav");
    }

    elem.innerHTML = timeLeft + " segundos";
    timeLeft--;
  }
}

function loadingDone() {
  elemt = document.getElementById("loadingArea");
  elemt.classList.add("done");
}

function muestraDiv(divId) {
  document.getElementById(divId).style.display = "block";
}

var gravedad = 0.5;
var numHijos = 50;

var numParticulas = 10;
var particulasCreadas = 0;

function crearParticula() {
  var particula = document.createElement("div");
  particula.className = "particula";

  var y = window.innerHeight;
  var x = Math.random() * window.innerWidth;

  particula.style.top = y + "px";
  particula.style.left = x + "px";

  var velocidadY = -15 - Math.random() * 15;

  particula.setAttribute("data-velocidad-y", velocidadY);
  particula.setAttribute("data-velocidad-x", "0");
  particula.setAttribute("data-padre", "true");

  particula.style.background = getRandomColor();

  document.getElementsByTagName("body")[0].append(particula);

  particulasCreadas++;

  if (particulasCreadas < numParticulas) {
    setTimeout(crearParticula, 50 + Math.random() * 150);
  }
}

function start() {
  crearParticula();
}

function update() {
  var particulas = document.getElementsByClassName("particula");
  for (var p = 0; p < particulas.length; p++) {
    var particula = particulas[p];

    var velocidadY = parseFloat(particula.getAttribute("data-velocidad-y"));
    velocidadY += gravedad;

    particula.setAttribute("data-velocidad-y", velocidadY);

    var top = particula.style.top ? particula.style.top : "0"; //10px
    top = parseFloat(top.replace("px", ""));
    top += velocidadY;
    particula.style.top = top + "px";

    var velocidadX = parseFloat(particula.getAttribute("data-velocidad-x"));

    var left = particula.style.left ? particula.style.left : "0";
    left = parseFloat(left.replace("px", ""));
    left += velocidadX;
    particula.style.left = left + "px";

    var padre = particula.getAttribute("data-padre");

    if (velocidadY >= 0 && padre === "true") {
      explotar(particula);
    }

    if (top > window.innerHeight) {
      particula.remove();
    }
  }

  setTimeout(update, 20);
}

function explotar(particula) {
  for (var h = 0; h < numHijos; h++) {
    var hijo = document.createElement("div");
    hijo.className = "particula";

    hijo.style.top = particula.style.top;
    hijo.style.left = particula.style.left;
    hijo.style.background = particula.style.background;

    var velocidadY = Math.random() * 20 - 18;
    hijo.setAttribute("data-velocidad-y", velocidadY);
    var velocidadX = Math.random() * 16 - 8;
    hijo.setAttribute("data-velocidad-x", velocidadX);

    hijo.setAttribute("data-padre", false);

    //Agregar el hijo :) :) :)
    document.getElementsByTagName("body")[0].append(hijo);
  }

  particula.remove();
}

window.onload = function () {
  start();
  loadingDone();
  update();
};

//utilerias
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const menu = document.querySelectorAll(".link");
let pagina_actual = "#page_uno";
let link_actual = "#uno";
for (const m of menu) {
  m.addEventListener("click", function (event) {
    document.querySelector(
      pagina_actual
    ).style.animation = `salir 0.5s ease forwards 0s`;
    document.querySelector(link_actual).style.background = `transparent`;
    document.querySelector(
      "#page_" + event.target.id
    ).style.animation = `navlinkfade 0.5s ease forwards 0s`;
    document.querySelector("#" + event.target.id).style.background = `#dfca56`;

    pagina_actual = "#page_" + event.target.id;
    link_actual = "#" + event.target.id;
  });
}
