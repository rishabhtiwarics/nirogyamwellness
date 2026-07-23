const scrollIndicatorThumb = document.getElementById('scrollIndicatorThumb');
function updateScrollIndicator() {
  if (!scrollIndicatorThumb) return;
  const { scrollHeight, clientHeight } = document.documentElement;
  const scrollableHeight = scrollHeight - clientHeight;
  if (scrollableHeight <= 0) {
    scrollIndicatorThumb.style.transform = 'translateY(0%)';
    return;
  }
  const scrollProgress = (window.scrollY / scrollableHeight) * 100;
  scrollIndicatorThumb.style.transform = `translateY(-${100 - scrollProgress}%)`;
}
updateScrollIndicator();
window.addEventListener('scroll', updateScrollIndicator, { passive: true });

const burgerBtn = document.getElementById('burgerBtn');
const closeBtn = document.getElementById('closeBtn');
const panel = document.getElementById('mobilePanel');
const sidebarAccordion = document.querySelector('.sidebar-accordion');
const sidebarProducts = document.getElementById('sidebarProducts');
if (burgerBtn && closeBtn && panel && sidebarAccordion && sidebarProducts) {
  burgerBtn.addEventListener('click', () => panel.classList.add('open'));
  closeBtn.addEventListener('click', () => panel.classList.remove('open'));
  sidebarAccordion.addEventListener('click', () => {
    const isOpen = sidebarProducts.classList.toggle('open');
    sidebarAccordion.classList.toggle('open', isOpen);
    sidebarAccordion.setAttribute('aria-expanded', String(isOpen));
  });
}
const ayurCards = document.querySelectorAll('.ayur-card');
if (ayurCards.length) {
  const ayurObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 90);
        ayurObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  ayurCards.forEach(card => ayurObserver.observe(card));
}