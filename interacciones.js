const mensajes = {
  fundamentos: 'Una base para comprender cómo funciona la IA y tomar decisiones informadas sobre su uso.',
  online: 'Exploraremos herramientas web para crear, adaptar y revisar materiales docentes.',
  proyectos: 'Un pequeño puente entre las herramientas online y el escritorio: organizar proyectos y consultar fuentes con GeminiNotebook.',
  escritorio: 'Conoceremos asistentes de escritorio que pueden ayudar a trabajar con archivos y crear recursos.',
  local: 'Una primera mirada a modelos y herramientas que pueden procesar información en el propio equipo.'
};
const botones = document.querySelectorAll('.phase');
const descripcion = document.querySelector('#fase-descripcion');
const volver = document.querySelector('.reset');
const centro = document.querySelector('.phase-center');
centro.addEventListener('click', () => volver.click());
function seleccionar(fase) {
  document.body.dataset.fase = fase;
  botones.forEach(boton => boton.setAttribute('aria-pressed', String(boton.dataset.fase === fase)));
  descripcion.textContent = mensajes[fase] || 'Una formación flexible para descubrir qué puede aportar la IA a tu práctica.';
  volver.hidden = fase === 'inicio';
}
botones.forEach(boton => boton.addEventListener('click', () => {
  const fase = boton.dataset.fase;
  if (boton.getAttribute('aria-pressed') === 'true') {
    window.location.href = `${fase}.html`;
  } else {
    seleccionar(fase);
  }
}));
volver.addEventListener('click', () => seleccionar('inicio'));

// El recorrido se presenta con un desplazamiento pausado y cancelable.
const enlaceRecorrido = document.querySelector('.hero-link');
const recorrido = document.querySelector('#recorrido');
let animacionDesplazamiento;
enlaceRecorrido.addEventListener('click', evento => {
  if (evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;
  evento.preventDefault();
  cancelAnimationFrame(animacionDesplazamiento);
  const inicio = window.scrollY;
  const destino = Math.min(inicio + recorrido.getBoundingClientRect().top, document.documentElement.scrollHeight - window.innerHeight);
  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const estilo = document.documentElement.style;
  estilo.scrollBehavior = 'auto';
  if (reducirMovimiento) {
    window.scrollTo(0, destino);
    estilo.removeProperty('scroll-behavior');
    return;
  }
  let tiempoInicial;
  const duracion = 1900;
  const terminar = () => {
    cancelAnimationFrame(animacionDesplazamiento);
    estilo.removeProperty('scroll-behavior');
    window.removeEventListener('wheel', interrumpir);
    window.removeEventListener('touchstart', interrumpir);
    window.removeEventListener('keydown', interrumpir);
  };
  const interrumpir = () => terminar();
  window.addEventListener('wheel', interrumpir, { passive: true, once: true });
  window.addEventListener('touchstart', interrumpir, { passive: true, once: true });
  window.addEventListener('keydown', interrumpir, { once: true });
  function avanzar(tiempo) {
    if (tiempoInicial === undefined) tiempoInicial = tiempo;
    const progreso = Math.min((tiempo - tiempoInicial) / duracion, 1);
    const suavizado = (1 - Math.cos(Math.PI * progreso)) / 2;
    window.scrollTo(0, inicio + (destino - inicio) * suavizado);
    if (progreso < 1) animacionDesplazamiento = requestAnimationFrame(avanzar);
    else terminar();
  }
  animacionDesplazamiento = requestAnimationFrame(avanzar);
});


