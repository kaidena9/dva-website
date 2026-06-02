/* ─────────────────────────────────────────────────────────
   DVA — script.js
   ───────────────────────────────────────────────────────── */

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
    if (!isOpen) closeMega();
  });
}

document.querySelectorAll('.nav__links a:not(.nav__mega-trigger)').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    closeMega();
  });
});

/* ── Mega menu ── */
const servicesNav = document.getElementById('servicesNav');
const servicesTrigger = document.getElementById('servicesTrigger');
const megaMenu = document.getElementById('megaMenu');

function openMega() {
  if (!megaMenu) return;
  servicesNav.classList.add('is-open');
  servicesTrigger.setAttribute('aria-expanded', 'true');
  megaMenu.removeAttribute('hidden');
}

function closeMega() {
  if (!megaMenu) return;
  servicesNav.classList.remove('is-open');
  servicesTrigger.setAttribute('aria-expanded', 'false');
  megaMenu.setAttribute('hidden', '');
}

function toggleMega() {
  servicesNav.classList.contains('is-open') ? closeMega() : openMega();
}

if (servicesTrigger && megaMenu) {
  let hoverTimer;
  const isMobile = () => window.innerWidth <= 960;

  servicesNav.addEventListener('mouseenter', () => {
    if (isMobile()) return;
    clearTimeout(hoverTimer);
    openMega();
  });
  servicesNav.addEventListener('mouseleave', () => {
    if (isMobile()) return;
    hoverTimer = setTimeout(closeMega, 120);
  });
  megaMenu.addEventListener('mouseenter', () => {
    if (isMobile()) return;
    clearTimeout(hoverTimer);
  });
  megaMenu.addEventListener('mouseleave', () => {
    if (isMobile()) return;
    hoverTimer = setTimeout(closeMega, 120);
  });

  servicesTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMega();
  });

  servicesTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMega(); }
    if (e.key === 'Escape') closeMega();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMega();
  });
  document.addEventListener('click', (e) => {
    if (!servicesNav.contains(e.target) && !megaMenu.contains(e.target)) closeMega();
  });
  megaMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeMega(); servicesTrigger.focus(); }
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
