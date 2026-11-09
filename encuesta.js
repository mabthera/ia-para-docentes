const formulario = document.querySelector('#diagnostic-form');
const experiencia = [...formulario.querySelectorAll('input[name="experiencia"]')];
const interes = [...formulario.querySelectorAll('input[name="interes"]')];
const estado = document.querySelector('#form-status');
const botonEnviar = formulario.querySelector('.survey-submit');
const URL_RECEPTOR = 'https://script.google.com/macros/s/AKfycbxJXkLdEpmXJliR2jhC6B0ezPaAO0rmKsW7TpbStGu5HZwZeNHMKd5ha4xE9VGO53XaUQ/exec';

const casillaNinguna = experiencia.find(casilla => casilla.value === 'ninguna');
experiencia.forEach(casilla => casilla.addEventListener('change', () => {
  if (casilla === casillaNinguna && casilla.checked) {
    experiencia.filter(item => item !== casillaNinguna).forEach(item => { item.checked = false; });
  } else if (casilla.checked) {
    casillaNinguna.checked = false;
  }
  document.querySelector('[data-error-for="experiencia"]').hidden = experiencia.some(item => item.checked);
}));

const opcionSinPreferencia = interes.find(casilla => casilla.value === 'sin-preferencia');
interes.forEach(casilla => casilla.addEventListener('change', () => {
  const seleccionadas = interes.filter(item => item.checked);
  const error = document.querySelector('[data-error-for="interes"]');
  if (casilla === opcionSinPreferencia && casilla.checked) {
    interes.filter(item => item !== opcionSinPreferencia).forEach(item => { item.checked = false; });
    error.hidden = true;
    return;
  }
  if (casilla.checked) opcionSinPreferencia.checked = false;
  if (seleccionadas.length > 2) {
    casilla.checked = false;
    error.hidden = false;
  } else {
    error.hidden = true;
  }
}));

const textoLibre = document.querySelector('#peticion-propia');
const contador = document.querySelector('#character-count');
textoLibre.addEventListener('input', () => { contador.textContent = String(textoLibre.value.length); });

function recopilarRespuestas() {
  const datos = new FormData(formulario);
  return {
    experiencia: datos.getAll('experiencia'),
    fundamentos: datos.get('fundamentos'),
    peticion: datos.get('peticion'),
    fuentes: datos.get('fuentes'),
    archivos: datos.get('archivos'),
    local: datos.get('local'),
    interes: datos.getAll('interes'),
    'peticion-propia': datos.get('peticion-propia') || '',
    website: datos.get('website') || ''
  };
}

function crearFormularioDeEnvio(payload, target) {
  const envio = document.createElement('form');
  envio.method = 'POST';
  envio.action = URL_RECEPTOR;
  envio.target = target;
  envio.hidden = true;
  const campo = document.createElement('input');
  campo.type = 'hidden';
  campo.name = 'payload';
  campo.value = JSON.stringify(payload);
  envio.append(campo);
  return envio;
}

formulario.addEventListener('submit', async evento => {
  evento.preventDefault();
  const experienciaCompleta = experiencia.some(casilla => casilla.checked);
  const errorExperiencia = document.querySelector('[data-error-for="experiencia"]');
  errorExperiencia.hidden = experienciaCompleta;
  if (!experienciaCompleta) {
    experiencia[0].focus();
    return;
  }
  if (!formulario.checkValidity()) {
    formulario.reportValidity();
    return;
  }
  botonEnviar.disabled = true;
  formulario.setAttribute('aria-busy', 'true');
  estado.hidden = false;
  estado.textContent = 'Enviando tu respuesta…';

  const nombreFrame = `envio-encuesta-${Date.now()}`;
  const frame = document.createElement('iframe');
  frame.name = nombreFrame;
  frame.title = 'Confirmación del envío de la encuesta';
  frame.hidden = true;
  const frameListo = new Promise(resolve => frame.addEventListener('load', resolve, { once: true }));
  document.body.append(frame);
  await frameListo;

  const envio = crearFormularioDeEnvio(recopilarRespuestas(), nombreFrame);
  document.body.append(envio);
  let finalizado = false;
  const limpiar = () => {
    envio.remove();
    frame.remove();
    formulario.removeAttribute('aria-busy');
  };
  const temporizador = window.setTimeout(() => {
    if (finalizado) return;
    finalizado = true;
    limpiar();
    botonEnviar.disabled = false;
    estado.textContent = 'No hemos podido confirmar el envío. Comprueba tu conexión y vuelve a intentarlo.';
    estado.focus();
  }, 20000);

  frame.addEventListener('load', () => {
    if (finalizado) return;
    finalizado = true;
    window.clearTimeout(temporizador);
    limpiar();
    estado.textContent = 'Hemos enviado tu respuesta. Gracias por participar.';
    estado.focus();
  }, { once: true });
  envio.submit();
});

