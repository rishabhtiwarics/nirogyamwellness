(function () {
    "use strict";

    var grid = document.getElementById('shopProductsGrid');
    if (!grid) return;

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