// ----- Product detail data binding -----
(function () {
  var utils = window.NirogyamProductUtils;
  if (!utils) return;

  var params = new URLSearchParams(window.location.search);
  var product = utils.find(params.get('product') || 'nova-plus');
  if (!product) return;

  document.title = 'Nirogyam - ' + product.name;

  function setText(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  setText('.hero-v5-rail span:last-child', product.name);
  setText('.hero-v5-title', product.name);
  setText('.hero-v5-copy', product.details || product.short);
  setText('.hero-v5-crumb .current', product.name);
  setText('.pdp-crumb span', 'Product details');
  setText('.pdp-title-row h1', product.name);
  setText('.pdp-gallery__tag', product.tag || 'Nirogyam Wellness');
  var price = document.querySelector('.pdp-price');
  if (price) price.innerHTML = '<small>Price</small>Rs. ' + product.price;
  setText('.pdp-desc p', product.details || product.short);
  setText('#tab-en p', product.details || product.short);

  var heroButton = document.querySelector('.hero-v5-btn');
  if (heroButton) heroButton.href = 'shop.html';

  var mainImg = document.getElementById('pdpMainImage');
  var gallery = product.gallery && product.gallery.length ? product.gallery : [product.image];
  if (mainImg) {
    mainImg.src = gallery[0];
    mainImg.alt = product.name;
  }

  document.querySelectorAll('.pdp-thumb').forEach(function (thumb, index) {
    var src = gallery[index % gallery.length];
    var img = thumb.querySelector('img');
    thumb.setAttribute('data-src', src);
    thumb.setAttribute('aria-label', 'View ' + product.name + ' image ' + (index + 1));
    if (img) {
      img.src = src;
      img.alt = product.name + ' Thumbnail ' + (index + 1);
    }
  });

  var buyBox = document.querySelector('.pdp-buybox');
  if (buyBox) buyBox.setAttribute('aria-label', 'Buy ' + product.name);

  var buyNow = document.querySelector('.pdp-buynow');
  if (buyNow) {
    buyNow.addEventListener('click', function () {
      var qty = document.getElementById('pdpQtyValue');
      if (window.NirogyamCart) window.NirogyamCart.add(product.id, qty ? qty.value : 1);
    });
  }
})();

// ----- Gallery: click a thumbnail to swap the main image -----
(function () {
  const mainImg = document.getElementById('pdpMainImage');
  const thumbs = document.querySelectorAll('.pdp-thumb');
  if (!mainImg || !thumbs.length) return;
  thumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const img = btn.querySelector('img');
      mainImg.src = src;
      mainImg.alt = img ? img.alt : 'Product image';
    });
  });
})();

// ----- Wishlist toggle -----
(function () {
  const wish = document.getElementById('pdpWish');
  if (!wish) return;
  wish.addEventListener('click', () => {
    wish.classList.toggle('active');
    const icon = wish.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
  });
})();

// ----- Quantity stepper -----
(function () {
  const minus = document.getElementById('pdpQtyMinus');
  const plus = document.getElementById('pdpQtyPlus');
  const value = document.getElementById('pdpQtyValue');
  if (!minus || !plus || !value) return;
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
  if (!buttons.length || !panels.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById('tab-' + btn.getAttribute('data-tab'));
      if (panel) panel.classList.add('active');
    });
  });
})();


