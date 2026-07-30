const certRows = document.querySelectorAll('.cert2-row');
if (certRows.length) {
  if ('IntersectionObserver' in window) {
    const certObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          certObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    certRows.forEach(row => certObserver.observe(row));
  } else {
    certRows.forEach(row => row.classList.add('is-visible'));
  }
}
// ----- Certificate lightbox -----
(function () {
  const rows = Array.from(document.querySelectorAll('.cert2-row'));
  const lightbox = document.getElementById('galleryLightbox');
  const image = document.getElementById('galleryLightboxImage');
  const meta = document.getElementById('galleryLightboxMeta');
  const close = document.getElementById('galleryClose');
  const prev = document.getElementById('galleryPrev');
  const next = document.getElementById('galleryNext');
  if (!rows.length || !lightbox || !image || !close || !prev || !next) return;

  const items = rows.map((row, index) => {
    const img = row.querySelector('.cert2-thumb img');
    const title = row.querySelector('.cert2-info h3');
    const label = title ? title.textContent.trim() : (img && img.alt) || `Certificate ${index + 1}`;
    row.setAttribute('role', 'button');
    row.setAttribute('tabindex', '0');
    row.setAttribute('aria-label', `Open ${label}`);
    return { src: img.src, alt: img.alt || label, label };
  });

  let current = 0;

  function render(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    image.src = item.src;
    image.alt = item.alt;
    if (meta) meta.textContent = item.label;
  }

  function open(index) {
    render(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-lightbox-open');
    close.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-lightbox-open');
  }

  rows.forEach((row, index) => {
    row.addEventListener('click', () => open(index));
    row.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(index);
      }
    });
  });

  close.addEventListener('click', closeLightbox);
  prev.addEventListener('click', () => render(current - 1));
  next.addEventListener('click', () => render(current + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') render(current - 1);
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') render(current + 1);
  });
})();