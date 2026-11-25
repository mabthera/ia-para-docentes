// Ejemplo didáctico: filtrar un reparto fijo, sin ejecutar ni consultar un modelo.
function localSamplingSelection(probabilities, kind, value) {
  if (kind === 'k') {
    const count = Math.max(1, Math.min(probabilities.length, Math.trunc(value)));
    return probabilities.map((_, index) => index < count);
  }
  let accumulated = 0;
  return probabilities.map(probability => {
    const keep = accumulated < value - 1e-12;
    accumulated += probability;
    return keep;
  });
}

document.querySelectorAll('[data-sampling-demo]').forEach(demo => {
  const galician = demo.dataset.language === 'gl';
  demo.querySelectorAll('fieldset[data-kind]').forEach(panel => {
    const kind = panel.dataset.kind;
    const control = panel.querySelector('[data-sampling-control]');
    const valueLabel = panel.querySelector('[data-sampling-value]');
    const result = panel.querySelector('[data-sampling-result]');
    const rows = [...panel.querySelectorAll('[data-candidate]')];
    const probabilities = rows.map(row => Number(row.dataset.probability));

    function update() {
      const value = Number(control.value);
      const selected = localSamplingSelection(probabilities, kind, value);
      const names = [];
      let mass = 0;
      rows.forEach((row, index) => {
        row.classList.toggle('is-kept', selected[index]);
        row.querySelector('[data-candidate-state]').textContent = selected[index]
          ? 'Conservado' : (galician ? 'Fóra' : 'Fuera');
        if (selected[index]) {
          names.push(row.querySelector('.lc-token-name').textContent);
          mass += probabilities[index];
        }
      });
      valueLabel.value = kind === 'k' ? String(value) : value.toFixed(2).replace('.', ',');
      control.setAttribute('aria-valuetext', kind === 'k'
        ? `${value} ${value === 1 ? 'candidato' : 'candidatos'}`
        : `${Math.round(value * 100)} %`);
      const candidateLabel = names.length === 1 ? 'candidato' : 'candidatos';
      result.textContent = galician
        ? `Conserva ${names.join(', ')}: ${names.length} ${candidateLabel} e ${Math.round(mass * 100)} % da probabilidade acumulada.`
        : `Conserva ${names.join(', ')}: ${names.length} ${candidateLabel} y ${Math.round(mass * 100)} % de probabilidad acumulada.`;
    }

    control.addEventListener('input', update);
    update();
  });
});
