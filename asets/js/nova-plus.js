
  // ----- Gallery: click a thumbnail to swap the main image -----
  (function () {
    const mainImg = document.getElementById('pdpMainImage');
    const thumbs = document.querySelectorAll('.pdp-thumb');
    thumbs.forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-src');
        const alt = btn.querySelector('img').alt;
        mainImg.src = src;
        mainImg.alt = alt;
      });
    });
  })();
 
  // ----- Wishlist toggle -----
  (function () {
    const wish = document.getElementById('pdpWish');
    wish.addEventListener('click', () => {
      wish.classList.toggle('active');
      const icon = wish.querySelector('i');
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
    });
  })();
 
  // ----- Quantity stepper -----
  (function () {
    const minus = document.getElementById('pdpQtyMinus');
    const plus = document.getElementById('pdpQtyPlus');
    const value = document.getElementById('pdpQtyValue');
    minus.addEventListener('click', () => {
      const n = Math.max(1, parseInt(value.value || '1', 10) - 1);
      value.value = n;
    });
    plus.addEventListener('click', () => {
      const n = parseInt(value.value || '1', 10) + 1;
      value.value = n;
    });
  })();
 
  // ----- Description tabs -----
  (function () {
    const buttons = document.querySelectorAll('.pdp-tabs__btn');
    const panels = document.querySelectorAll('.pdp-tabs__panel');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.getElementById('tab-' + btn.getAttribute('data-tab')).classList.add('active');
      });
    });
  })();
