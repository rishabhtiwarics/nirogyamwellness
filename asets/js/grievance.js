(() => {
  /* ---------- reveal-on-scroll (ledger rows + .reveal blocks) ---------- */
  const revealEls = document.querySelectorAll('.reveal, .v4-row');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('in-view'));
    }
  }

  /* ---------- ledger accordion ---------- */
  const ledger = document.getElementById('v4Ledger');
  if (ledger) {
    const rows = ledger.querySelectorAll('.v4-row');
    rows.forEach((row) => {
      const head = row.querySelector('.v4-row-head');
      if (!head) return;
      head.addEventListener('click', () => {
        const wasOpen = row.classList.contains('open');
        rows.forEach((r) => r.classList.remove('open'));
        if (!wasOpen) row.classList.add('open');
      });
    });
    rows[0]?.classList.add('open');
  }

  /* ---------- small-square particle background (ledger section) ---------- */
  const canvas = document.getElementById('v4Canvas');
  const wrap = document.getElementById('v4-ledger-section');
  if (canvas && wrap) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H, DPR;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      initParticles();
    }

    function initParticles() {
      const count = Math.max(24, Math.round((W * H) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: 3 + Math.random() * 6,
        speedX: (Math.random() - 0.5) * 0.18,
        speedY: (Math.random() - 0.5) * 0.18,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        opacity: 0.08 + Math.random() * 0.18,
        hue: Math.random() > 0.5 ? 'green' : 'gold'
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.hue === 'green'
          ? `rgba(76,154,110,${p.opacity})`
          : `rgba(199,134,46,${p.opacity})`;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
  }
})();