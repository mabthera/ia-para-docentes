const SPREADSHEET_ID = '1eAcTcu6YzI-vo2c1efovGD560BTiG66adyV1glgdioI';
const RESPONSE_TAB = 'Respuestas';

function doGet() {
  return jsonResponse({ ok: true, service: 'encuesta-ia-docentes' });
}

function doPost(e) {
  try {
    const payloadText = e && e.parameter && e.parameter.payload;
    if (!payloadText || payloadText.length > 12000) {
      throw new Error('Solicitud vacía o demasiado extensa.');
    }
    const data = JSON.parse(payloadText);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Formato no válido.');
    }
    if (data.website) throw new Error('Solicitud no válida.');

    const experience = cleanChoices(data.experiencia, ['material', 'verificacion', 'fuentes', 'archivos', 'local', 'ninguna'], 6);
    const interest = cleanChoices(data.interes, ['crear', 'consultar', 'archivos', 'audio', 'criterio', 'sin-preferencia'], 2);
    if (!experience.length || (experience.includes('ninguna') && experience.length !== 1)) {
      throw new Error('La selección de experiencia no es válida.');
    }
    if (interest.includes('sin-preferencia') && interest.length !== 1) {
      throw new Error('La selección de interés no es válida.');
    }

    const answers = {
      fundamentos: ['fluidez', 'contrastaria', 'citas', 'actualidad', 'no-se'],
      peticion: ['claro', 'ficha', 'contexto', 'investiga', 'no-se'],
      fuentes: ['anadir-fuentes', 'resumen-general', 'busqueda', 'pegar-fragmentos', 'no-se'],
      archivos: ['carpeta-completa', 'actualizar-directo', 'resumen-manual', 'copia-acotada', 'no-se'],
      local: ['no-sale', 'matiz-local', 'sin-internet', 'quitar-nombres', 'no-conozco']
    };
    Object.keys(answers).forEach(function (key) {
      if (answers[key].indexOf(data[key]) === -1) throw new Error('Falta una respuesta válida.');
    });

    const prompt = cleanText(data['peticion-propia'], 240);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(RESPONSE_TAB);
      if (!sheet) throw new Error('No se encontró la pestaña de respuestas.');
      sheet.appendRow([
        Utilities.getUuid(), new Date(), '', experience.join(';'),
        data.fundamentos, data.peticion, data.fuentes, data.archivos, data.local,
        interest.join(';'), prompt
      ]);
    } finally {
      lock.releaseLock();
    }
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error.message || error) });
  }
}

function cleanChoices(value, allowed, maxItems) {
  if (!Array.isArray(value) || value.length > maxItems) throw new Error('Selección no válida.');
  const choices = value.map(String);
  if (choices.some(function (item) { return allowed.indexOf(item) === -1; })) {
    throw new Error('Se recibió una opción no válida.');
  }
  return Array.from(new Set(choices));
}

function cleanText(value, maxLength) {
  const text = String(value || '').trim().slice(0, maxLength);
  return /^[=+@-]/.test(text) ? "'" + text : text;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

