// Los diálogos modales forman una capa propia: llevan su propio aviso accesible.
const avisoLicencia = document.querySelector('.license-badge');
if (avisoLicencia) {
  document.querySelectorAll('dialog.drawer').forEach(panel => {
    const avisoPanel = avisoLicencia.cloneNode(true);
    panel.append(avisoPanel);
    panel.addEventListener('close', () => { avisoPanel.open = false; });
  });

  document.addEventListener('click', evento => {
    document.querySelectorAll('.license-badge[open]').forEach(aviso => {
      if (!aviso.contains(evento.target)) {
        aviso.open = false;
        if (aviso.contains(document.activeElement)) document.activeElement.blur();
      }
    });
  });
}
