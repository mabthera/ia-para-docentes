const contenedor = document.querySelector('#recorrido-proyectos');
const barra = document.querySelector('.chapter-nav');
if ('ResizeObserver' in window && barra) {
  new ResizeObserver(() => document.documentElement.style.setProperty('--chapter-nav-height', `${barra.offsetHeight}px`)).observe(barra);
}
const enlacesIndice = barra ? [...barra.querySelectorAll('a')] : [];
const secciones = contenedor ? [...contenedor.querySelectorAll('.slide')] : [];

function actualizarIndice() {
  if (!barra || !secciones.length) return;
  const offset = barra.getBoundingClientRect().bottom + Math.min(150, innerHeight * 0.22);
  const actual = secciones.filter(s => s.getBoundingClientRect().top <= offset).at(-1) || secciones[0];
  enlacesIndice.forEach(a => {
    if (a.dataset.topic === actual.dataset.topic) {
      a.setAttribute('aria-current', 'location');
    } else {
      a.removeAttribute('aria-current');
    }
  });
}

addEventListener('scroll', actualizarIndice, { passive: true });
addEventListener('resize', actualizarIndice);
actualizarIndice();

document.querySelectorAll('.extras details').forEach((detalle, i) => {
  const resumen = detalle.querySelector('summary').textContent;
  const contenido = detalle.querySelector(':scope > div');
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'open-drawer';
  boton.setAttribute('aria-haspopup', 'dialog');
  boton.setAttribute('aria-controls', `ampliacion-${i}`);
  if (detalle.classList.contains('legal-expansion')) boton.classList.add('legal-expansion-link');
  if (detalle.classList.contains('bridge-expansion')) boton.classList.add('bridge-expansion-link');

  const texto = document.createElement('span');
  texto.textContent = resumen;
  const flecha = document.createElement('span');
  flecha.className = 'drawer-arrow';
  flecha.setAttribute('aria-hidden', 'true');
  flecha.textContent = '→';
  boton.append(texto, flecha);

  const panel = document.createElement('dialog');
  panel.className = 'drawer';
  panel.id = `ampliacion-${i}`;
  panel.setAttribute('aria-labelledby', `titulo-ampliacion-${i}`);

  const cabecera = document.createElement('header');
  cabecera.className = 'drawer-header';
  const cerrar = document.createElement('button');
  cerrar.className = 'close-drawer';
  cerrar.type = 'button';
  cerrar.textContent = '← Volver al recorrido';
  const titulo = document.createElement('h2');
  titulo.id = `titulo-ampliacion-${i}`;
  titulo.textContent = resumen;
  cabecera.append(cerrar, titulo);

  contenido.classList.add('drawer-content');
  panel.append(cabecera, contenido);
  document.body.append(panel);
  detalle.replaceWith(boton);

  let cerrando = false;
  function cerrarPanel() {
    if (cerrando || !panel.open) return;
    cerrando = true;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || typeof panel.animate !== 'function') {
      panel.close();
      cerrando = false;
      return;
    }
    panel.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }], {
      duration: 250,
      easing: 'ease-in'
    }).finished.then(() => {
      panel.close();
      cerrando = false;
    }).catch(() => {
      panel.close();
      cerrando = false;
    });
  }

  boton.addEventListener('click', () => {
    if (!panel.open) panel.showModal();
  });
  cerrar.addEventListener('click', cerrarPanel);
  panel.addEventListener('cancel', e => {
    e.preventDefault();
    cerrarPanel();
  });
  panel.addEventListener('click', e => {
    if (e.target === panel) {
      cerrarPanel();
      return;
    }
    const enlace = e.target.closest('a[href^="#"]');
    if (enlace && document.getElementById(enlace.getAttribute('href').slice(1))) {
      panel.close();
    }
  });
});

document.querySelectorAll('.copy').forEach(boton => {
  boton.addEventListener('click', async () => {
    const bloque = boton.closest('.prompt');
    const contenido = bloque.querySelector('pre').textContent;
    const estado = bloque.querySelector('.copy-status');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard');
      await navigator.clipboard.writeText(contenido);
      estado.textContent = 'Copiado.';
    } catch {
      const seleccion = window.getSelection();
      const rango = document.createRange();
      rango.selectNodeContents(bloque.querySelector('pre'));
      seleccion.removeAllRanges();
      seleccion.addRange(rango);
      estado.textContent = 'Texto seleccionado. Copia con Ctrl+C.';
    }
    setTimeout(() => {
      estado.textContent = '';
    }, 4000);
  });
});

