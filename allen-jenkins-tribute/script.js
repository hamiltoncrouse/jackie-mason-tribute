const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.watch-card');
const topButton = document.querySelector('.top-button');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.addEventListener('click', event => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    chips.forEach(item => item.classList.remove('active'));
    chip.classList.add('active');

    cards.forEach(card => {
      const tags = card.dataset.tags || '';
      const shouldShow = filter === 'all' || tags.includes(filter);
      card.hidden = !shouldShow;
    });
  });
});

topButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));
