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