(function () {
    "use strict";

    var grid = document.getElementById('shopProductsGrid');
    if (!grid) return;

    var products = window.NirogyamProducts || [];
    var utils = window.NirogyamProductUtils;
    if (products.length && utils) {
        grid.innerHTML = products.map(function (product) {
            return '<div class="v3-card shop-card" role="link" tabindex="0" data-product-url="' + utils.productUrl(product) + '" data-name="' + product.name + '" data-category="' + product.category + '" data-price="' + product.price + '" data-rating="' + product.rating + '">' +
                '<div class="v3-card__top"><img src="' + product.image + '" alt="' + product.name + '"><i class="fa-solid ' + product.icon + ' v3-cat-icon"></i><span class="discount-badge">' + product.discount + '</span></div>' +
                '<div class="v3-card__body"><h3>' + product.name + '</h3>' +
                '<div class="v3-rating" data-rating="' + product.rating + '"><span class="stars"></span><span class="rating-num">' + product.rating + '</span><span class="rating-count">(' + product.count + ')</span></div>' +
                '<p>' + product.short + '</p><div class="v3-prices"><span class="price-new">' + utils.money(product.price) + '</span><span class="price-old">' + utils.money(product.oldPrice) + '</span></div>' +
                '<div class="v3-btn-row"><button class="add-cart-btn add-cart-btn--full" type="button" data-add-cart="' + product.id + '"><i class="fa-solid fa-cart-shopping"></i>Add to Cart</button></div></div></div>';
        }).join('');
        grid.querySelectorAll('.shop-card[data-product-url]').forEach(function (card) {
            card.addEventListener('click', function () { window.location.href = card.getAttribute('data-product-url'); });
            card.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    window.location.href = card.getAttribute('data-product-url');
                }
            });
        });
        grid.querySelectorAll('[data-add-cart]').forEach(function (button) {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (button.disabled) return;
        if (window.NirogyamCart) window.NirogyamCart.add(button.getAttribute('data-add-cart'));
            });
        });
        if (window.NirogyamCart) window.NirogyamCart.render();
    }

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.shop-card'));
    var searchInput = document.getElementById('shopSearch');
    var sortSelect = document.getElementById('shopSort');
    var categoryInputs = Array.prototype.slice.call(document.querySelectorAll('input[name="category"]'));
    var priceInputs = Array.prototype.slice.call(document.querySelectorAll('input[name="price"]'));
    var resultsCount = document.getElementById('resultsCount');
    var emptyState = document.getElementById('shopEmpty');
    var clearBtn = document.getElementById('clearFilters');
    var clearBtnEmpty = document.getElementById('clearFiltersEmpty');

    /* ---------- star rating render (shared markup pattern with home page) ---------- */
    function renderStars(container) {
        var rating = parseFloat(container.getAttribute('data-rating')) || 0;
        var starsEl = container.querySelector('.stars');
        if (!starsEl) return;
        var html = '';
        for (var i = 1; i <= 5; i++) {
            if (rating >= i) {
                html += '<i class="fa-solid fa-star"></i>';
            } else if (rating >= i - 0.5) {
                html += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                html += '<i class="fa-regular fa-star star-empty"></i>';
            }
        }
        starsEl.innerHTML = html;
    }
    document.querySelectorAll('.v3-rating').forEach(renderStars);

    /* ---------- category checkbox behaviour: "All" is exclusive ---------- */
    function getSelectedCategories() {
        var checked = categoryInputs.filter(function (el) { return el.checked && el.value !== 'all'; });
        return checked.map(function (el) { return el.value; });
    }

    categoryInputs.forEach(function (input) {
        input.addEventListener('change', function () {
            var allBox = categoryInputs.find(function (el) { return el.value === 'all'; });
            if (input.value === 'all' && input.checked) {
                categoryInputs.forEach(function (el) { if (el.value !== 'all') el.checked = false; });
            } else if (input.value !== 'all') {
                if (input.checked) allBox.checked = false;
                var anyChecked = getSelectedCategories().length > 0;
                if (!anyChecked) allBox.checked = true;
            }
            applyFilters();
        });
    });

    priceInputs.forEach(function (input) {
        input.addEventListener('change', applyFilters);
    });

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            sortCards(sortSelect.value);
            applyFilters();
        });
    }

    function currentPriceRange() {
        var picked = priceInputs.find(function (el) { return el.checked; });
        if (!picked || picked.value === 'all') return null;
        var parts = picked.value.split('-');
        return { min: parseFloat(parts[0]), max: parseFloat(parts[1]) };
    }

    function applyFilters() {
        var term = (searchInput ? searchInput.value : '').trim().toLowerCase();
        var categories = getSelectedCategories();
        var priceRange = currentPriceRange();
        var visibleCount = 0;

        cards.forEach(function (card) {
            var name = (card.getAttribute('data-name') || '').toLowerCase();
            var category = card.getAttribute('data-category') || '';
            var price = parseFloat(card.getAttribute('data-price')) || 0;

            var matchesSearch = !term || name.indexOf(term) !== -1;
            var matchesCategory = categories.length === 0 || categories.indexOf(category) !== -1;
            var matchesPrice = !priceRange || (price >= priceRange.min && price <= priceRange.max);

            var visible = matchesSearch && matchesCategory && matchesPrice;
            card.hidden = !visible;
            if (visible) visibleCount++;
        });

        if (resultsCount) resultsCount.textContent = visibleCount;
        if (emptyState) emptyState.hidden = visibleCount !== 0;
        grid.hidden = visibleCount === 0;
    }

    function sortCards(mode) {
        var sorted = cards.slice();
        switch (mode) {
            case 'price-asc':
                sorted.sort(function (a, b) { return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price')); });
                break;
            case 'price-desc':
                sorted.sort(function (a, b) { return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price')); });
                break;
            case 'rating-desc':
                sorted.sort(function (a, b) { return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating')); });
                break;
            case 'name-asc':
                sorted.sort(function (a, b) { return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name')); });
                break;
            default:
                sorted = cards; /* featured = original markup order */
        }
        sorted.forEach(function (card) { grid.appendChild(card); });
    }

    function resetFilters() {
        if (searchInput) searchInput.value = '';
        categoryInputs.forEach(function (el) { el.checked = el.value === 'all'; });
        priceInputs.forEach(function (el) { el.checked = el.value === 'all'; });
        if (sortSelect) sortSelect.value = 'featured';
        sortCards('featured');
        applyFilters();
    }

    if (clearBtn) clearBtn.addEventListener('click', resetFilters);
    if (clearBtnEmpty) clearBtnEmpty.addEventListener('click', resetFilters);

    applyFilters();

})();







