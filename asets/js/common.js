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
// ----- Shared header links, icons, auth panel, cart drawer, and cart counter -----
(function () {
  var navItems = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['shop.html', 'Shop'],
    ['legal.html', 'Legal'],
    ['management.html', 'Management'],
    ['grievance.html', 'Grievance'],
    ['contact.html', 'Contact']
  ];

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function money(amount) {
    return '&#8377;' + (Number(amount) || 0);
  }

  function getProducts() {
    return window.NirogyamProducts || [];
  }

  function findProduct(id) {
    return getProducts().find(function (product) { return product.id === id; }) || null;
  }

  function prettyName(id) {
    return String(id || 'Product').replace(/-/g, ' ').replace(/\b\w/g, function (letter) { return letter.toUpperCase(); });
  }

  function isActiveNav(href) {
    var current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var target = String(href || '').split('?')[0].split('#')[0].toLowerCase();
    if (!current) current = 'index.html';
    return current === target || (current === 'checkout.html' && target === 'shop.html') || (current === 'cart.html' && target === 'shop.html') || (current === 'nova-plus.html' && target === 'shop.html');
  }
  function renderAccountMenu() {
    var user = getUser();
    if (user) {
      var name = escapeHtml(user.name || user.username || user.email || 'Nirogyam User');
      var email = escapeHtml(user.email || 'Logged in');
      var initial = escapeHtml((name.charAt(0) || 'N').toUpperCase());
      return '' +
        '<div class="header-account-menu" role="menu" aria-label="Account menu">' +
          '<div class="header-account-profile">' +
            '<span class="header-account-avatar">' + initial + '</span>' +
            '<span><strong>' + name + '</strong><small>' + email + '</small></span>' +
          '</div>' +
          '<button class="header-account-logout" type="button" data-header-logout><i class="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>Logout</button>' +
        '</div>';
    }
    return '' +
      '<div class="header-account-menu" role="menu" aria-label="Account menu">' +
        '<p class="header-account-title">My Account</p>' +
        '<p class="header-account-copy">Login or register to manage orders and wellness details.</p>' +
        '<div class="header-account-actions">' +
          '<a class="header-account-btn header-account-btn--login" href="login.html"><i class="fa-regular fa-user" aria-hidden="true"></i>Login</a>' +
          '<a class="header-account-btn header-account-btn--register" href="register.html"><i class="fa-solid fa-user-plus" aria-hidden="true"></i>Register</a>' +
        '</div>' +
      '</div>';
  }

  function iconActions() {
    return '' +
      '<button class="header-icon-action header-search-action" type="button" data-open-search aria-label="Search products"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>' +
      '<div class="header-account-wrap">' +
        '<button class="header-icon-action header-user-action" type="button" aria-label="User account" aria-haspopup="true"><i class="fa-regular fa-user" aria-hidden="true"></i></button>' +
        renderAccountMenu() +
      '</div>' +
      '<button class="header-icon-action header-cart-action" type="button" data-open-cart aria-label="Open cart"><i class="fa-solid fa-cart-shopping" aria-hidden="true"></i><span class="cart-count" data-cart-count>0</span></button>';
  }
  function getUser() {
    try {
      var user = JSON.parse(localStorage.getItem('nirogyamUser') || 'null');
      if (user && (user.name || user.username || user.email)) return user;
    } catch (error) {}

    if (localStorage.getItem('nirogyamLoggedIn') === 'true') {
      return { name: localStorage.getItem('nirogyamUsername') || 'Nirogyam User' };
    }
    return null;
  }

  function renderSidebarAuth() {
    var user = getUser();
    if (user) {
      var name = escapeHtml(user.name || user.username || user.email || 'Nirogyam User');
      return '' +
        '<div class="sidebar-auth sidebar-auth--profile">' +
          '<p class="sidebar-auth__title">My Account</p>' +
          '<div class="sidebar-profile">' +
            '<span class="sidebar-profile__icon"><i class="fa-regular fa-user" aria-hidden="true"></i></span>' +
            '<span><strong>' + name + '</strong><small>Logged in</small></span>' +
          '</div>' +
          '<button class="sidebar-auth__logout" type="button" id="sidebarLogout"><i class="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>Logout</button>' +
        '</div>';
    }

    return '' +
      '<div class="sidebar-auth">' +
        '<p class="sidebar-auth__title">Account</p>' +
        '<a class="sidebar-auth__btn sidebar-auth__btn--login" href="login.html"><i class="fa-regular fa-user" aria-hidden="true"></i><span>Login</span></a>' +
        '<a class="sidebar-auth__btn sidebar-auth__btn--register" href="register.html"><i class="fa-solid fa-user-plus" aria-hidden="true"></i><span>Register</span></a>' +
      '</div>';
  }

  function bindSidebarAuth() {
    var logoutButtons = document.querySelectorAll('#sidebarLogout, [data-header-logout]');
    if (!logoutButtons.length) return;
    logoutButtons.forEach(function (logout) {
      logout.addEventListener('click', function () {
        localStorage.removeItem('nirogyamUser');
        localStorage.removeItem('nirogyamLoggedIn');
        localStorage.removeItem('nirogyamUsername');
        renderHeader();
      });
    });
  }

  function cartItems() {
    try {
      return JSON.parse(localStorage.getItem('nirogyamCart') || '[]');
    } catch (error) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem('nirogyamCart', JSON.stringify(items));
  }

  function cartSubtotal(items) {
    return items.reduce(function (sum, item) {
      var product = findProduct(item.id);
      return sum + ((product ? product.price : 0) * (Number(item.qty) || 0));
    }, 0);
  }

  function cartItemMarkup(item, mode) {
    var product = findProduct(item.id);
    var qty = Number(item.qty) || 1;
    var name = product ? product.name : prettyName(item.id);
    var image = product ? product.image : 'https://www.nirogyamwellness.com/Images/logo.png';
    var price = product ? product.price : 0;
    return '' +
      '<article class="cart-line ' + (mode === 'page' ? 'cart-line--page' : '') + '">' +
        '<img src="' + image + '" alt="' + escapeHtml(name) + '">' +
        '<div class="cart-line__info">' +
          '<h3>' + escapeHtml(name) + '</h3>' +
          '<p>' + money(price) + '</p>' +
          '<div class="cart-line__qty" aria-label="Quantity controls">' +
            '<button type="button" data-cart-dec="' + item.id + '" aria-label="Decrease quantity">-</button>' +
            '<span>' + qty + '</span>' +
            '<button type="button" data-cart-inc="' + item.id + '" aria-label="Increase quantity">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="cart-line__remove" type="button" data-cart-remove="' + item.id + '" aria-label="Remove ' + escapeHtml(name) + '"><i class="fa-solid fa-trash-can" aria-hidden="true"></i></button>' +
      '</article>';
  }

  function emptyCartMarkup() {
    return '' +
      '<div class="cart-empty-state">' +
        '<i class="fa-solid fa-basket-shopping" aria-hidden="true"></i>' +
        '<h3>Your cart is empty</h3>' +
        '<p>Add wellness products from the shop and they will appear here.</p>' +
        '<a href="shop.html">Browse Products</a>' +
      '</div>';
  }

  function renderCartContent(container, mode) {
    if (!container) return;
    var items = cartItems();
    var drawer = container.closest ? container.closest('.cart-drawer') : null;
    if (drawer) drawer.classList.toggle('is-empty', !items.length);
    if (!items.length) {
      container.innerHTML = emptyCartMarkup();
      return;
    }
    container.innerHTML = items.map(function (item) { return cartItemMarkup(item, mode); }).join('');
  }

  function renderCartSummary() {
    var items = cartItems();
    var subtotal = cartSubtotal(items);
    document.querySelectorAll('[data-cart-subtotal]').forEach(function (el) { el.innerHTML = money(subtotal); });
    document.querySelectorAll('[data-cart-total]').forEach(function (el) { el.innerHTML = money(subtotal); });
  }

  function ensureCartDrawer() {
    if (document.getElementById('cartDrawer')) return;
    var drawer = document.createElement('div');
    drawer.className = 'cart-drawer-shell';
    drawer.id = 'cartDrawer';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML = '' +
      '<div class="cart-drawer-backdrop" data-close-cart></div>' +
      '<aside class="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">' +
        '<div class="cart-drawer__top">' +
          '<span><i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>Cart</span>' +
          '<button type="button" data-close-cart aria-label="Close cart"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
        '</div>' +
        '<div class="cart-drawer__items" id="cartDrawerItems"></div>' +
        '<div class="cart-drawer__bottom">' +
          '<div class="cart-drawer__subtotal"><span>Subtotal</span><strong data-cart-subtotal>&#8377;0</strong></div>' +
          '<a class="cart-drawer__checkout" href="checkout.html">Checkout</a>' +
          '<a class="cart-drawer__view" href="cart.html">Open Cart Page</a>' +
        '</div>' +
      '</aside>';
    document.body.appendChild(drawer);
  }

  function openCartDrawer() {
    ensureCartDrawer();
    renderCartContent(document.getElementById('cartDrawerItems'));
    renderCartSummary();
    var drawer = document.getElementById('cartDrawer');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-drawer-open');
  }

  function closeCartDrawer() {
    var drawer = document.getElementById('cartDrawer');
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-drawer-open');
  }


  function isInCart(productId) {
    return cartItems().some(function (item) { return item.id === productId; });
  }

  function updateProductButtonStates() {
    document.querySelectorAll('[data-add-cart]').forEach(function (button) {
      var id = button.getAttribute('data-add-cart');
      var compact = !!button.closest('.site-search-card');
      if (isInCart(id)) {
        button.disabled = true;
        button.classList.add('is-in-cart');
        button.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>' + (compact ? 'Added' : 'Added to Cart');
        button.setAttribute('aria-label', 'Already added to cart');
        button.title = 'Already added to cart';
      } else {
        button.disabled = false;
        button.classList.remove('is-in-cart');
        button.innerHTML = '<i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>' + (compact ? 'Add' : 'Add to Cart');
        button.removeAttribute('aria-label');
        button.removeAttribute('title');
      }
    });
  }

  function searchImage(product) {
    var image = product.image || '';
    if (image.indexOf('picsum.photos') === -1) return image;
    var map = {
      thyroid: 'asets/img/Slide2.jpeg',
      heart: 'asets/img/Slide1.jpeg',
      joint: 'asets/img/slide-novaplus2.jpeg',
      kidney: 'asets/img/Slide3.jpeg',
      women: 'asets/img/slide-novaplus.png',
      digestive: 'asets/img/novaplus-use-section.png',
      energy: 'asets/img/slide-live-better-naturally.png',
      sugar: 'asets/img/Slide3.jpeg'
    };
    return map[product.category] || 'asets/img/Slide1.jpeg';  }
  function searchProductCard(product) {
    var inCart = isInCart(product.id);
    var url = window.NirogyamProductUtils ? window.NirogyamProductUtils.productUrl(product) : 'nova-plus.html?product=' + product.id;
    return '' +
      '<article class="site-search-card" role="link" tabindex="0" data-product-url="' + url + '">' +
        '<div class="site-search-card__media"><img src="' + searchImage(product) + '" alt="' + escapeHtml(product.name) + '"></div>' +
        '<div class="site-search-card__body">' +
          '<span>' + escapeHtml(product.tag || product.category || 'Product') + '</span>' +
          '<h3>' + escapeHtml(product.name) + '</h3>' +
          '<p>' + escapeHtml(product.short || '') + '</p>' +
          '<div class="site-search-card__bottom"><strong>' + money(product.price) + '</strong>' +
          '<button type="button" data-add-cart="' + product.id + '"' + (inCart ? ' disabled class="is-in-cart"' : '') + '><i class="fa-solid ' + (inCart ? 'fa-circle-check' : 'fa-cart-shopping') + '" aria-hidden="true"></i>' + (inCart ? 'Added' : 'Add') + '</button></div>' +
        '</div>' +
      '</article>';
  }

  function ensureSearchPanel() {
    if (document.getElementById('siteSearchPanel')) return;
    var panel = document.createElement('div');
    panel.className = 'site-search-panel';
    panel.id = 'siteSearchPanel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = '' +
      '<div class="site-search-panel__backdrop" data-close-search></div>' +
      '<section class="site-search-panel__sheet" role="dialog" aria-modal="true" aria-label="Product search">' +
        '<div class="site-search-panel__inner">' +
          '<div class="site-search-panel__top">' +
            '<label for="siteSearchInput"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><input id="siteSearchInput" type="search" placeholder="Search products..." autocomplete="off"></label>' +
            '<button type="button" data-close-search aria-label="Close search"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
          '</div>' +
          '<p class="site-search-panel__count" id="siteSearchCount">0 product</p>' +
          '<div class="site-search-results" id="siteSearchResults"><div class="site-search-empty">Search key type karein to product show honge.</div></div>' +
          '<a class="site-search-view-all" href="shop.html"><span id="siteSearchCtaText">Shop Now</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>' +
        '</div>' +
      '</section>';
    document.body.appendChild(panel);
    var input = document.getElementById('siteSearchInput');
    if (input) input.addEventListener('input', renderSearchResults);
  }

  function renderSearchResults() {
    var input = document.getElementById('siteSearchInput');
    var results = document.getElementById('siteSearchResults');
    var count = document.getElementById('siteSearchCount');
    var ctaText = document.getElementById('siteSearchCtaText');
    if (!input || !results || !count) return;
    var term = input.value.trim().toLowerCase();
    if (!term) {
      count.textContent = '0 product';
      if (ctaText) ctaText.textContent = 'Shop Now';
      results.innerHTML = '<div class="site-search-empty">Search key type karein to product show honge.</div>';
      return;
    }
    var matches = getProducts().filter(function (product) {
      return [product.name, product.short, product.tag, product.category].join(' ').toLowerCase().indexOf(term) !== -1;
    });
    count.textContent = matches.length + (matches.length === 1 ? ' product' : ' products');
    if (ctaText) ctaText.textContent = 'View All Products';
    results.innerHTML = matches.length ? matches.map(searchProductCard).join('') : '<div class="site-search-empty">No product found.</div>';
    updateProductButtonStates();
  }

  function openSearchPanel() {
    ensureSearchPanel();
    var panel = document.getElementById('siteSearchPanel');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('site-search-open');
    renderSearchResults();
    window.setTimeout(function () {
      var input = document.getElementById('siteSearchInput');
      if (input) input.focus();
    }, 260);
  }

  function closeSearchPanel() {
    var panel = document.getElementById('siteSearchPanel');
    if (!panel) return;
    var input = document.getElementById('siteSearchInput');
    var results = document.getElementById('siteSearchResults');
    var count = document.getElementById('siteSearchCount');
    if (input) input.value = '';
    if (count) count.textContent = '0 product';
    var ctaText = document.getElementById('siteSearchCtaText');
    if (ctaText) ctaText.textContent = 'Shop Now';
    if (results) results.innerHTML = '<div class="site-search-empty">Search key type karein to product show honge.</div>';
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('site-search-open');
  }

  function bindSearchEvents() {
    document.addEventListener('click', function (event) {
      if (event.target.closest('[data-open-search]')) {
        event.preventDefault();
        openSearchPanel();
        return;
      }
      if (event.target.closest('[data-close-search]')) {
        event.preventDefault();
        closeSearchPanel();
        return;
      }
      var card = event.target.closest('.site-search-card[data-product-url]');
      if (card && !event.target.closest('[data-add-cart]')) {
        window.location.href = card.getAttribute('data-product-url');
      }
    });
  }
  function bindCartEvents() {
    document.addEventListener('click', function (event) {
      var open = event.target.closest('[data-open-cart]');
      if (open) {
        event.preventDefault();
        openCartDrawer();
        return;
      }

      if (event.target.closest('[data-close-cart]')) {
        event.preventDefault();
        closeCartDrawer();
        return;
      }

      var inc = event.target.closest('[data-cart-inc]');
      var dec = event.target.closest('[data-cart-dec]');
      var remove = event.target.closest('[data-cart-remove]');
      var add = event.target.closest('[data-add-cart]');
      if (add) {
        event.preventDefault();
        event.stopPropagation();
        if (!add.disabled) window.NirogyamCart.add(add.getAttribute('data-add-cart'));
        return;
      }

      if (inc || dec || remove) {
        event.preventDefault();
        if (inc) window.NirogyamCart.change(inc.getAttribute('data-cart-inc'), 1);
        if (dec) window.NirogyamCart.change(dec.getAttribute('data-cart-dec'), -1);
        if (remove) window.NirogyamCart.remove(remove.getAttribute('data-cart-remove'));
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { closeCartDrawer(); closeSearchPanel(); }
    });
  }

  function renderCartPage() {
    renderCartContent(document.getElementById('cartPageItems'), 'page');
    renderCartSummary();
  }

  function renderCheckoutPage() {
    renderCartContent(document.getElementById('checkoutCartItems'), 'page');
    renderCartSummary();
  }


  function bindMobilePanelControls() {
    var burger = document.getElementById('burgerBtn');
    var close = document.getElementById('closeBtn');
    var mobilePanel = document.getElementById('mobilePanel');
    if (!burger || !close || !mobilePanel || burger.dataset.panelBound === 'true') return;
    burger.dataset.panelBound = 'true';
    burger.addEventListener('click', function () { mobilePanel.classList.add('open'); });
    close.addEventListener('click', function () { mobilePanel.classList.remove('open'); });
    mobilePanel.querySelectorAll('.sidebar-nav a').forEach(function (link) {
      link.addEventListener('click', function () { mobilePanel.classList.remove('open'); });
    });
  }
  function renderHeader() {
    var desktopNav = document.querySelector('nav.primary ul');
    if (desktopNav) {
      desktopNav.innerHTML = navItems.map(function (item) {
        var active = isActiveNav(item[0]);
        return '<li><a class="nav-link' + (active ? ' is-active' : '') + '" href="' + item[0] + '"' + (active ? ' aria-current="page"' : '') + '>' + item[1] + '</a></li>';
      }).join('');
    }

    var sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) {
      sidebarNav.innerHTML = navItems.map(function (item) {
        var active = isActiveNav(item[0]);
        return '<a class="' + (active ? 'is-active' : '') + '" href="' + item[0] + '"' + (active ? ' aria-current="page"' : '') + '>' + item[1] + '</a>';
      }).join('');
    }

    var actions = document.querySelector('.actions');
    if (actions) {
      var burger = document.getElementById('burgerBtn');
      actions.innerHTML = iconActions();
      if (burger) actions.appendChild(burger);
    }

    var mobileCta = document.querySelector('.mobile-cta');
    if (mobileCta) mobileCta.innerHTML = renderSidebarAuth();
    bindSidebarAuth();
    bindMobilePanelControls();
  }


  function showLoaderForNavigation(url) {
    if (!document.getElementById('pageLoader')) {
      var loader = document.createElement('div');
      loader.className = 'page-loader';
      loader.id = 'pageLoader';
      loader.innerHTML = '<div class="page-loader__mark"><img src="https://www.nirogyamwellness.com/Images/logo.png" alt="Nirogyam"><span>Loading</span></div>';
      document.body.appendChild(loader);
    } else {
      document.getElementById('pageLoader').classList.remove('hide');
    }
    window.setTimeout(function () { window.location.href = url; }, 160);
  }

  function bindPageTransitions() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target && link.target !== '_self') return;
      var href = link.getAttribute('href') || '';
      if (!href || href === '#' || href.indexOf('tel:') === 0 || href.indexOf('mailto:') === 0 || href.charAt(0) === '#') return;
      var url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin || url.href === window.location.href) return;
      event.preventDefault();
      showLoaderForNavigation(url.href);
    });
  }
  function showPageLoader() {
    document.body.classList.add('page-skeleton');
    if (!document.getElementById('pageLoader')) {
      var loader = document.createElement('div');
      loader.className = 'page-loader';
      loader.id = 'pageLoader';
      loader.innerHTML = '<div class="page-loader__mark"><img src="https://www.nirogyamwellness.com/Images/logo.png" alt="Nirogyam"><span>Loading</span></div>';
      document.body.appendChild(loader);
    }
    window.setTimeout(function () {
      var loader = document.getElementById('pageLoader');
      if (loader) loader.classList.add('hide');
      document.body.classList.remove('page-skeleton');
      window.setTimeout(function () { if (loader) loader.remove(); }, 760);
    }, 520);
  }
  window.NirogyamCart = {
    items: cartItems,
    count: function () {
      return cartItems().reduce(function (sum, item) { return sum + (Number(item.qty) || 0); }, 0);
    },
    add: function (productId, qty) {
      var id = String(productId || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (!id) return 0;
      var items = cartItems();
      var existing = items.find(function (item) { return item.id === id; });
      var amount = Math.max(1, Number(qty) || 1);
      if (existing) existing.qty += amount;
      else items.push({ id: id, qty: amount });
      saveCart(items);
      this.render();
      return this.count();
    },
    change: function (productId, delta) {
      var items = cartItems();
      var item = items.find(function (entry) { return entry.id === productId; });
      if (!item) return;
      item.qty = Math.max(0, (Number(item.qty) || 0) + delta);
      items = items.filter(function (entry) { return (Number(entry.qty) || 0) > 0; });
      saveCart(items);
      this.render();
    },
    remove: function (productId) {
      saveCart(cartItems().filter(function (item) { return item.id !== productId; }));
      this.render();
    },
    subtotal: function () {
      return cartSubtotal(cartItems());
    },
    render: function () {
      var count = this.count();
      document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = count; });
      renderCartContent(document.getElementById('cartDrawerItems'));
      renderCartPage();
      renderCheckoutPage();
      renderCartSummary();
      updateProductButtonStates();
      renderSearchResults();
    },
    open: openCartDrawer,
    close: closeCartDrawer
  };

  window.v3AddToCart = window.shopAddToCart = function (nameOrId) {
    window.NirogyamCart.add(nameOrId);
  };

  showPageLoader();
  renderHeader();
  ensureCartDrawer();
  ensureSearchPanel();
  bindCartEvents();
  bindSearchEvents();
  bindPageTransitions();
  window.NirogyamCart.render();
  var checkoutForm = document.querySelector('.checkout-form');
  if (checkoutForm) {
    var checkoutTerms = document.getElementById('checkoutTerms');
    function updateCheckoutFieldErrors() {
      checkoutForm.querySelectorAll('[required]').forEach(function (field) {
        var wrap = field.closest('.checkout-field');
        if (wrap) wrap.classList.toggle('is-invalid', !field.checkValidity());
      });
      var termsWrap = checkoutTerms ? checkoutTerms.closest('.checkout-terms') : null;
      if (termsWrap) termsWrap.classList.toggle('is-invalid', !checkoutTerms.checked);
    }
    checkoutForm.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', updateCheckoutFieldErrors);
      field.addEventListener('change', updateCheckoutFieldErrors);
    });
    if (checkoutTerms) checkoutTerms.addEventListener('change', updateCheckoutFieldErrors);
    checkoutForm.addEventListener('submit', function (event) {
      event.preventDefault();
      updateCheckoutFieldErrors();
      var firstInvalid = checkoutForm.querySelector('[required]:invalid');
      if (!firstInvalid && checkoutTerms && !checkoutTerms.checked) firstInvalid = checkoutTerms;
      if (firstInvalid) {
        if (firstInvalid.focus) firstInvalid.focus();
        return;
      }
      alert('Order details saved for checkout.');
    });
  }
})();


















