/* ============================================================
   FATMA KARPINAR — Portfolio
   Refined Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initScrollReveal();
  initSmoothScroll();
  initContactForm();
  initSpotlight();
});

/* ============================================================
   3. NAVBAR — Scroll effect
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   4. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  if (!toggle || !links) return;

  function close() {
    toggle.classList.remove('active');
    links.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.contains('active');
    if (isOpen) {
      close();
    } else {
      toggle.classList.add('active');
      links.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  if (overlay) overlay.addEventListener('click', close);
  links.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', close));
}

/* ============================================================
   5. SCROLL SPY
   ============================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === entry.target.id);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   6. SCROLL REVEAL — Clean fade-up
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.sr');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.12 }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   7. SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   8. SPOTLIGHT — Mouse-follow glow on Spline card
   ============================================================ */
function initSplineClickBlock() {
  const wrap = document.querySelector('.spline-viewer-wrap');
  if (!wrap) return;
  wrap.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
  }, true);
  wrap.addEventListener('pointerup', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
  }, true);
}

function initSpotlight() {
  const card = document.querySelector('.spline-card');
  const overlay = document.getElementById('spotlightOverlay');
  if (!card || !overlay) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    overlay.style.setProperty('--mx', x + '%');
    overlay.style.setProperty('--my', y + '%');
  });
}

/* ============================================================
   9. CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    const btn = form.querySelector('.form-btn');
    const original = btn.innerHTML;

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Gönderildi';
      btn.style.opacity = '1';

      setTimeout(() => {
        form.reset();
        btn.innerHTML = original;
        btn.disabled = false;
      }, 2500);
    }, 1200);
  });
}
