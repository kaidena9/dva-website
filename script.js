document.documentElement.classList.add('js');

/* ── Nav scroll state ── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile menu toggle ── */
const toggle = document.getElementById('navToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

/* Close mobile menu on nav link tap */
document.querySelectorAll('.nav__links a:not(.nav__mega-trigger)').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
});

/* ── Services dropdown ── */
const servicesNav = document.getElementById('servicesNav');
const servicesTrigger = document.getElementById('servicesTrigger');
const dropdown = document.getElementById('servicesDropdown');

if (servicesTrigger && dropdown) {

  /* Hover on desktop */
  servicesNav.addEventListener('mouseenter', () => {
    dropdown.removeAttribute('hidden');
    servicesTrigger.setAttribute('aria-expanded', 'true');
  });
  servicesNav.addEventListener('mouseleave', () => {
    dropdown.setAttribute('hidden', '');
    servicesTrigger.setAttribute('aria-expanded', 'false');
  });

  /* Click toggle */
  servicesTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    const isHidden = dropdown.hasAttribute('hidden');
    if (isHidden) {
      dropdown.removeAttribute('hidden');
      servicesTrigger.setAttribute('aria-expanded', 'true');
    } else {
      dropdown.setAttribute('hidden', '');
      servicesTrigger.setAttribute('aria-expanded', 'false');
    }
  });

  /* Close on outside click */
  document.addEventListener('click', (e) => {
    if (!servicesNav.contains(e.target)) {
      dropdown.setAttribute('hidden', '');
      servicesTrigger.setAttribute('aria-expanded', 'false');
    }
  });

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.setAttribute('hidden', '');
      servicesTrigger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Scroll reveal ── */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => entry.target.classList.add('is-in'), delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }
} else {
  document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-in'));
}

/* ── Footer year ── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
