// ----- Hero swiper -----
    (function () {
      const track = document.getElementById('slidesTrack');
      const slides = Array.from(track.children);
      const dots = Array.from(document.querySelectorAll('#sliderDots .dot'));
      const total = slides.length;
      let current = 0;
      let autoplayTimer;
      const AUTOPLAY_MS = 5500;

      function render() {
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
      }

      function goTo(index) {
        current = (index + total) % total;
        render();
        restartAutoplay();
      }

      function next() { goTo(current + 1); }

      function restartAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(next, AUTOPLAY_MS);
      }

      dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

      render();
      restartAutoplay();
    })();



    // ----- Gallery lightbox -----
    (function () {
      const cards = Array.from(document.querySelectorAll('.gallery-card'));
      const lightbox = document.getElementById('galleryLightbox');
      const image = document.getElementById('galleryLightboxImage');
      const meta = document.getElementById('galleryLightboxMeta');
      const close = document.getElementById('galleryClose');
      const prev = document.getElementById('galleryPrev');
      const next = document.getElementById('galleryNext');
      if (!cards.length || !lightbox || !image || !close || !prev || !next) return;
      const items = cards.map((card, index) => {
        const img = card.querySelector('img');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Open gallery image ${index + 1}`);
        return { src: img.src, alt: img.alt || 'Gallery image' };
      });
      let current = 0;
      function render(index) {
        current = (index + items.length) % items.length;
        const item = items[current];
        image.src = item.src;
        image.alt = item.alt;
        if (meta) meta.textContent = item.alt;
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
      cards.forEach((card, index) => {
        card.addEventListener('click', () => open(index));
        card.addEventListener('keydown', (event) => {
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
        if (event.key === 'ArrowLeft') render(current - 1);
        if (event.key === 'ArrowRight') render(current + 1);
      });
    })();
    // ----- Client reviews -----
    (function () {
      const reviews = [
        { name: 'Priya Sharma', city: 'Mumbai', tag: 'NovaPlus Wellness', quote: '"Gave me back mornings I had stopped looking forward to."', short: 'Gave me back mornings I had stopped looking forward to.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=85' },
        { name: 'Dr. Nandita Rao', city: 'Chennai', tag: 'Daily Immunity', quote: '"Four months later, zero sick days - most credible formula."', short: 'Four months later, zero sick days - most credible formula.', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=85' },
        { name: 'Riya Menon', city: 'Bengaluru', tag: 'Pitta Cooling Drops', quote: '"Skin clearer, mind cooler, inflammation quieted - I finally understand what balance feels like in the body."', short: 'Skin clearer, mind cooler, inflammation quieted in eight weeks.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=85' },
        { name: 'Amit Verma', city: 'Pune', tag: 'Energy Support', quote: '"My afternoon slump reduced and my workouts feel steadier now."', short: 'My afternoon slump reduced and my workouts feel steadier now.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=85' },
        { name: 'Meera Kapoor', city: 'Delhi', tag: 'Digestive Wellness', quote: '"No more heavy feeling after meals. It became part of my routine quickly."', short: 'No more heavy feeling after meals; it became routine quickly.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=85' },
        { name: 'Karan Patel', city: 'Ahmedabad', tag: 'Joint Comfort', quote: '"Morning stiffness is much lower, and I feel more comfortable walking."', short: 'Morning stiffness is much lower, and walking feels easier.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=85' }
      ];
      const avatar = document.getElementById('reviewAvatar');
      const name = document.getElementById('reviewName');
      const meta = document.getElementById('reviewMeta');
      const tag = document.getElementById('reviewTag');
      const quote = document.getElementById('reviewQuote');
      const count = document.getElementById('reviewCount');
      const list = document.getElementById('reviewsList');
      const prev = document.getElementById('reviewPrev');
      const next = document.getElementById('reviewNext');
      if (!avatar || !name || !list || !prev || !next) return;
      let current = 0;
      let autoplayTimer;
      const AUTOPLAY_MS = 5000;
      function stars() { return '<i class="fa-solid fa-star"></i>'.repeat(5); }
      function renderList() {
        const start = Math.floor(current / 3) * 3;
        const end = Math.min(start + 3, reviews.length);
        count.textContent = `${start + 1} - ${end} of ${reviews.length}`;
        list.innerHTML = '';
        reviews.slice(start, end).forEach((review, offset) => {
          const index = start + offset;
          const card = document.createElement('button');
          card.className = `review-card${index === current ? ' active' : ''}`;
          card.type = 'button';
          card.innerHTML = `<div class="review-card__top"><img src="${review.avatar.replace('w=120', 'w=90')}" alt="${review.name}"><span><h3>${review.name}</h3><small>${review.city}</small></span><span class="review-card__stars">${stars()}</span></div><p>${review.short}</p>`;
          card.addEventListener('click', () => renderReview(index));
          list.appendChild(card);
        });
      }
      function renderReview(index) {
        current = (index + reviews.length) % reviews.length;
        const review = reviews[current];
        avatar.src = review.avatar;
        avatar.alt = review.name;
        name.textContent = review.name;
        meta.textContent = review.city;
        tag.innerHTML = '<i class="fa-solid fa-leaf" aria-hidden="true"></i> ' + review.tag;
        quote.textContent = review.quote;
        renderList();
        restartAutoplay();
      }
      function nextReview() {
        renderReview(current + 1);
      }
      function restartAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(nextReview, AUTOPLAY_MS);
      }
      prev.addEventListener('click', () => renderReview(current - 1));
      next.addEventListener('click', () => nextReview());
      renderReview(0);
    })();
    // ----- Story video controls -----
    // ----- Story video controls -----
    (function () {
      var video = document.getElementById('storyVideo');
      var toggle = document.getElementById('storyVideoToggle');
      var muteToggle = document.getElementById('storyVideoMute');
      if (!video || !toggle || !muteToggle) return;

      function syncToggle() {
        var playing = !video.paused;
        toggle.setAttribute('aria-label', playing ? 'Pause story video' : 'Play story video');
        toggle.innerHTML = '<i class="fa-solid fa-' + (playing ? 'pause' : 'play') + '" aria-hidden="true"></i>';
      }
      function syncMute() {
        muteToggle.setAttribute('aria-label', video.muted ? 'Unmute story video' : 'Mute story video');
        muteToggle.innerHTML = '<i class="fa-solid fa-' + (video.muted ? 'volume-xmark' : 'volume-high') + '" aria-hidden="true"></i>';
      }

      toggle.addEventListener('click', function () {
        if (video.paused) { video.play(); } else { video.pause(); }
      });
      muteToggle.addEventListener('click', function () {
        video.muted = !video.muted;
        syncMute();
      });
      video.addEventListener('play', syncToggle);
      video.addEventListener('pause', syncToggle);

      syncToggle();
      syncMute();
    })();
