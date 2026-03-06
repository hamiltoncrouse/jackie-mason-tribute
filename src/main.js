(() => {
  const root = document.documentElement;
  const modeBtn = document.getElementById('mode');
  const modeLabel = document.getElementById('modeLabel');
  const copyLink = document.getElementById('copyLink');

  const getTheme = () => localStorage.getItem('jm-theme') || 'night';
  const setTheme = (t) => {
    localStorage.setItem('jm-theme', t);
    if (t === 'day') {
      root.setAttribute('data-theme', 'day');
      modeLabel && (modeLabel.textContent = 'Day');
    } else {
      root.removeAttribute('data-theme');
      modeLabel && (modeLabel.textContent = 'Night');
    }
  };

  setTheme(getTheme());

  modeBtn?.addEventListener('click', () => {
    const next = (getTheme() === 'night') ? 'day' : 'night';
    setTheme(next);
  });

  copyLink?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(location.href);
      copyLink.textContent = 'Copied!';
      setTimeout(() => (copyLink.textContent = 'Copy page link'), 1100);
    } catch {
      // fallback: do nothing
    }
  });

  // Subtle counters
  const els = [...document.querySelectorAll('[data-count]')];
  if (!els.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = new Intl.NumberFormat(undefined);

  const animate = (el, to) => {
    if (prefersReduced) {
      el.textContent = fmt.format(to);
      return;
    }
    const start = performance.now();
    const from = 0;
    const dur = 900;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(from + (to - from) * eased);
      el.textContent = fmt.format(val);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((ent) => {
      if (!ent.isIntersecting) return;
      const el = ent.target;
      const to = Number(el.getAttribute('data-count') || '0');
      animate(el, to);
      io.unobserve(el);
    });
  }, { threshold: 0.35 });

  els.forEach((el) => io.observe(el));
})();
