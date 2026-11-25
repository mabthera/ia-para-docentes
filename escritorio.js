const contenedor = document.querySelector('#recorrido-escritorio, #recorrido-local');
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

document.querySelectorAll('.extras > details, .case-expansions > details').forEach((detalle, i) => {
  const resumen = detalle.querySelector('summary').textContent;
  const contenido = detalle.querySelector(':scope > div');
  const botonExistente = detalle.dataset.trigger ? document.getElementById(detalle.dataset.trigger) : null;
  const boton = botonExistente || document.createElement('button');
  if (!botonExistente) {
    boton.type = 'button';
    boton.className = 'open-drawer';
  } else {
    boton.setAttribute('aria-label', resumen);
  }
  boton.setAttribute('aria-haspopup', 'dialog');
  boton.setAttribute('aria-controls', `ampliacion-${i}`);
  if (detalle.classList.contains('legal-expansion')) boton.classList.add('legal-expansion-link');
  if (detalle.classList.contains('bridge-expansion')) boton.classList.add('bridge-expansion-link');

  if (!botonExistente) {
    const texto = document.createElement('span');
    texto.textContent = resumen;
    const flecha = document.createElement('span');
    flecha.className = 'drawer-arrow';
    flecha.setAttribute('aria-hidden', 'true');
    flecha.textContent = '→';
    const icono = detalle.querySelector('summary svg');
    if (icono) boton.append(icono);
    boton.append(texto, flecha);
  }

  const panel = document.createElement('dialog');
  panel.className = 'drawer';
  if (contenido.dataset.layout) panel.dataset.layout = contenido.dataset.layout;
  panel.id = `ampliacion-${i}`;
  panel.setAttribute('aria-labelledby', `titulo-ampliacion-${i}`);

  const cabecera = document.createElement('header');
  cabecera.className = 'drawer-header';
  const cerrar = document.createElement('button');
  cerrar.className = 'close-drawer';
  cerrar.type = 'button';
  cerrar.textContent = document.documentElement.lang === 'gl' ? '← Volver ao percorrido' : '← Volver al recorrido';
  const titulo = document.createElement('h2');
  titulo.id = `titulo-ampliacion-${i}`;
  titulo.textContent = resumen;
  cabecera.append(cerrar, titulo);

  contenido.classList.add('drawer-content');
  panel.append(cabecera, contenido);
  document.body.append(panel);
  if (botonExistente) detalle.remove();
  else detalle.replaceWith(boton);

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

  boton.addEventListener('click', evento => {
    evento.preventDefault();
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
      const destino = document.getElementById(enlace.getAttribute('href').slice(1));
      if (panel.contains(destino)) {
        e.preventDefault();
        let desplegable = destino.closest('details');
        while (desplegable && panel.contains(desplegable)) {
          desplegable.open = true;
          desplegable = desplegable.parentElement?.closest('details');
        }
        const cabeceraAltura = cabecera.getBoundingClientRect().height;
        const posicion = panel.scrollTop + destino.getBoundingClientRect().top - panel.getBoundingClientRect().top - cabeceraAltura - 16;
        panel.scrollTo({ top: Math.max(0, posicion), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        destino.setAttribute('tabindex', '-1');
        destino.focus({ preventScroll: true });
      } else {
        panel.close();
      }
    }
  });
});

const imagenIDE = document.getElementById('imagen-ide');
if (imagenIDE) {
  document.querySelectorAll('.desktop-open-reference').forEach(boton => {
    boton.addEventListener('click', () => {
      if (!imagenIDE.open) imagenIDE.showModal();
    });
  });
  imagenIDE.querySelector('.close-drawer').addEventListener('click', () => imagenIDE.close());
  imagenIDE.addEventListener('click', evento => {
    if (evento.target === imagenIDE) imagenIDE.close();
  });
}

document.querySelectorAll('.copy').forEach(boton => {
  boton.addEventListener('click', async () => {
    const bloque = boton.closest('.prompt');
    const contenido = bloque.querySelector('pre').textContent;
    const estado = bloque.querySelector('.copy-status');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard');
      await navigator.clipboard.writeText(contenido);
      estado.textContent = document.documentElement.lang === 'gl' ? 'Copiado.' : 'Copiado.';
    } catch {
      const seleccion = window.getSelection();
      const rango = document.createRange();
      rango.selectNodeContents(bloque.querySelector('pre'));
      seleccion.removeAllRanges();
      seleccion.addRange(rango);
      estado.textContent = document.documentElement.lang === 'gl' ? 'Texto seleccionado. Copia con Ctrl+C.' : 'Texto seleccionado. Copia con Ctrl+C.';
    }
    setTimeout(() => {
      estado.textContent = '';
    }, 4000);
  });
});

