// Conserva a sección consultada mesmo cando se navega desprazándose.
const languageLinks = document.querySelectorAll('.language-switch[data-preserve-hash]');
const languageSections = [...document.querySelectorAll('main section.slide[id]')];
let lastLanguageSection = null;
function rememberLanguageSection() {
  const nav = document.querySelector('.chapter-nav');
  const offset = (nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0) + 100;
  const active = languageSections.filter(section => section.getBoundingClientRect().top <= offset).at(-1);
  // Ao volver á cabeceira para premer o selector, conserva a última sección consultada.
  if (active && active !== languageSections[0]) lastLanguageSection = active.id;
}
window.addEventListener('scroll', rememberLanguageSection, { passive: true });
document.addEventListener('click', event => {
  const anchor = event.target.closest?.('a[href^="#"]');
  if (anchor && languageSections[0] && anchor.getAttribute('href') === `#${languageSections[0].id}`) {
    lastLanguageSection = null;
  }
});
languageLinks.forEach(link => {
  link.addEventListener('click', () => {
    const target = new URL(link.getAttribute('href'), location.href);
    let hashId = location.hash.slice(1);
    try { hashId = decodeURIComponent(hashId); } catch { /* Conservar o fragmento orixinal. */ }
    const hashElement = hashId && document.getElementById(hashId);
    const hashSection = hashElement && hashElement.closest('section.slide');
    if (lastLanguageSection && (!hashSection || hashSection.id !== lastLanguageSection)) {
      target.hash = lastLanguageSection;
    } else {
      target.hash = location.hash;
    }
    link.href = target.href;
  });
});
