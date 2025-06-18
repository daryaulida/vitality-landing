/* === Появление текста при скролле без ручных классов === */
function revealTextElements() {
  const elements = document.querySelectorAll('h1, h2, h3, h4, p, li, strong');
  const triggerPoint = window.innerHeight * 0.9;

  elements.forEach(el => {
    if (!el.classList.contains('reveal-text')) {
      el.classList.add('reveal-text');
    }
    const elTop = el.getBoundingClientRect().top;
    if (elTop < triggerPoint) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealTextElements);
window.addEventListener('load', revealTextElements);


