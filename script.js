document.documentElement.classList.add('js');

(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');

  /* ---- year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- nav: scrolled state ---- */
  var onScroll = function () {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile menu ---- */
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // close when a link inside the panel is clicked
    nav.querySelectorAll('.nav__links a, .nav__cta').forEach(function (a) {
      a.addEventListener('click', function () {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  /* ---- services dropdown (keyboard / touch) ---- */
  var trigger = document.getElementById('servicesTrigger');
  var dropdown = document.getElementById('servicesDropdown');
  if (trigger && dropdown) {
    dropdown.hidden = false; // CSS handles visibility via hover/focus
    var parent = document.getElementById('servicesNav');
    trigger.addEventListener('click', function (e) {
      // on small screens the hover doesn't apply; allow anchor to work
      if (window.innerWidth > 860) return;
      e.preventDefault();
    });
    parent.addEventListener('focusin', function () { trigger.setAttribute('aria-expanded', 'true'); });
    parent.addEventListener('focusout', function () { trigger.setAttribute('aria-expanded', 'false'); });
  }

  /* ---- work filters ---- */
  var filters = document.getElementById('workFilters');
  var grid = document.getElementById('workGrid');
  if (filters && grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.work-card'));
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.work__filter');
      if (!btn) return;
      filters.querySelectorAll('.work__filter').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var cat = btn.getAttribute('data-filter');
      cards.forEach(function (card) {
        var show = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.classList.toggle('is-hidden', !show);
      });
    });
  }

  /* ---- FAQ accordion ---- */
  var faqList = document.getElementById('faqList');
  if (faqList) {
    faqList.addEventListener('click', function (e) {
      var q = e.target.closest('.faq__q');
      if (!q) return;
      var item = q.parentElement;
      var isOpen = item.classList.contains('is-open');
      faqList.querySelectorAll('.faq__item').forEach(function (it) { it.classList.remove('is-open'); });
      if (!isOpen) item.classList.add('is-open');
    });
  }

  /* ---- reveal on scroll ---- */
  var revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
