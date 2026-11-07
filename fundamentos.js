const contexto = document.querySelector('#frase-contexto');
const respuesta = document.querySelector('#respuesta-contexto');
const cambiar = document.querySelector('#cambiar-contexto');
cambiar.addEventListener('click', () => {
  const ampliado = cambiar.getAttribute('aria-pressed') !== 'true';
  cambiar.setAttribute('aria-pressed', String(ampliado));
  contexto.textContent = ampliado ? 'Al atardecer, después de la tormenta, el cielo se tiñó de…' : 'El cielo es…';
  respuesta.textContent = ampliado ? 'naranja' : 'azul';
  cambiar.innerHTML = ampliado ? 'Volver al inicio <span aria-hidden="true">↺</span>' : 'Añadir contexto <span aria-hidden="true">↗</span>';
});

const casos = {
  noticia: 'Aunque el texto sea público, comprueba sus condiciones de uso y si contiene datos personales innecesarios para la tarea.',
  informe: 'Puede incluir datos personales y de salud. Para una demostración abierta, usa un caso ficticio; cualquier tratamiento real exige analizar la finalidad y las autorizaciones del centro.',
  foto: 'Puede mostrar rostros o incluir ubicación y otros metadatos. Comprueba la autorización, la finalidad y quién recibirá la imagen; usa una imagen ficticia o autorizada en la formación.'
};
const botonesCaso = document.querySelectorAll('[data-caso]');
botonesCaso.forEach(boton => boton.addEventListener('click', () => {
  botonesCaso.forEach(item => item.setAttribute('aria-pressed', String(item === boton)));
  document.querySelector('#caso-respuesta').textContent = casos[boton.dataset.caso];
}));

// Cada ampliación se abre en un panel lateral y conserva la posición del recorrido.
document.querySelectorAll('.extras details').forEach((detalle, indice) => {
  const resumen = detalle.querySelector('summary').textContent.trim();
  const contenido = detalle.querySelector(':scope > div');
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'open-drawer';
  boton.setAttribute('aria-haspopup', 'dialog');
  boton.setAttribute('aria-controls', `ampliacion-${indice}`);
  const texto = document.createElement('span');
  texto.textContent = resumen;
  const flecha = document.createElement('span');
  flecha.setAttribute('aria-hidden', 'true');
  flecha.className = 'drawer-arrow';
  flecha.textContent = '→';
  boton.append(texto, flecha);

  const panel = document.createElement('dialog');
  panel.className = 'drawer';
  panel.id = `ampliacion-${indice}`;
  panel.setAttribute('aria-labelledby', `titulo-ampliacion-${indice}`);
  const encabezado = document.createElement('header');
  encabezado.className = 'drawer-header';
  const titulo = document.createElement('h2');
  titulo.id = `titulo-ampliacion-${indice}`;
  titulo.textContent = resumen.replace(/^(Ampliar|Profundizar|Para consultar|Consultar) · /, '');
  const cerrar = document.createElement('button');
  cerrar.className = 'close-drawer';
  cerrar.type = 'button';
  cerrar.textContent = '← Volver al recorrido';
  encabezado.append(cerrar, titulo);
  contenido.classList.add('drawer-content');
  panel.append(encabezado, contenido);
  document.body.append(panel);
  detalle.replaceWith(boton);

  let cerrando = false;
  function cerrarPanel() {
    if (cerrando || !panel.open) return;
    cerrando = true;
    const animar = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof panel.animate === 'function';
    if (!animar) {
      panel.close();
      cerrando = false;
      return;
    }
    const animacion = panel.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }], { duration: 300, easing: 'ease-in' });
    animacion.finished.then(() => { panel.close(); cerrando = false; }).catch(() => { panel.close(); cerrando = false; });
  }
  boton.addEventListener('click', () => { if (!panel.open) panel.showModal(); });
  cerrar.addEventListener('click', cerrarPanel);
  panel.addEventListener('cancel', evento => { evento.preventDefault(); cerrarPanel(); });
  panel.addEventListener('click', evento => { if (evento.target === panel) cerrarPanel(); });
});

const panelDiapositiva = document.querySelector('#diapositiva-anterior');
let cerrandoDiapositiva = false;
function cerrarDiapositiva() {
  if (!panelDiapositiva.open || cerrandoDiapositiva) return;
  cerrandoDiapositiva = true;
  const animar = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && typeof panelDiapositiva.animate === 'function';
  if (!animar) {
    panelDiapositiva.close();
    cerrandoDiapositiva = false;
    return;
  }
  const salida = panelDiapositiva.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }], { duration: 300, easing: 'ease-in' });
  salida.finished.then(() => { panelDiapositiva.close(); cerrandoDiapositiva = false; }).catch(() => { panelDiapositiva.close(); cerrandoDiapositiva = false; });
}
document.querySelectorAll('[data-abrir-diagrama]').forEach(boton => boton.addEventListener('click', () => {
  if (!panelDiapositiva.open) panelDiapositiva.showModal();
}));
panelDiapositiva.querySelector('.close-drawer').addEventListener('click', cerrarDiapositiva);
panelDiapositiva.addEventListener('cancel', evento => { evento.preventDefault(); cerrarDiapositiva(); });
panelDiapositiva.addEventListener('click', evento => { if (evento.target === panelDiapositiva) cerrarDiapositiva(); });
