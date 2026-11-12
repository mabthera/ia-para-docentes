const mensajes = {
  fundamentos: 'Unha base para comprender como funciona a IA e tomar decisións fundamentadas sobre o seu uso.',
  online: 'Exploraremos ferramentas web para crear, adaptar e revisar materiais docentes.',
  proyectos: 'Unha ponte entre as ferramentas online e o escritorio para organizar proxectos e consultar fontes con GeminiNotebook.',
  escritorio: 'Coñeceremos asistentes de escritorio que poden axudar a traballar con arquivos e crear recursos.',
  local: 'Unha primeira ollada a modelos e ferramentas que poden procesar información no propio equipo.'
};
const botones = document.querySelectorAll('.phase');
const descripcion = document.querySelector('#fase-descripcion');
const volver = document.querySelector('.reset');
const centro = document.querySelector('.phase-center');
centro.addEventListener('click', () => volver.click());
function seleccionar(fase) {
  document.body.dataset.fase = fase;
  botones.forEach(boton => boton.setAttribute('aria-pressed', String(boton.dataset.fase === fase)));
  descripcion.textContent = mensajes[fase] || 'Unha formación flexible para descubrir que pode achegar a IA á túa práctica.';
  volver.hidden = fase === 'inicio';
}
botones.forEach(boton => boton.addEventListener('click', () => {
  const fase = boton.dataset.fase;
  if (boton.getAttribute('aria-pressed') === 'true') {
    window.location.href = ['fundamentos', 'online', 'proyectos'].includes(fase) ? `${fase}-gl.html` : `${fase}.html`;
  } else {
    seleccionar(fase);
  }
}));
volver.addEventListener('click', () => seleccionar('inicio'));

// O percorrido preséntase cun desprazamento pausado que se pode interromper.
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


