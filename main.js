/* ============================================================
   YOUSSEF EID SAID — Portfolio JavaScript
   Features: Custom cursor, terminal animation, scroll effects,
             mobile nav, contact form, intersection observer
   ============================================================ */

(function () {
  'use strict';

  /* ==================== CUSTOM CURSOR ==================== */
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Smooth cursor follow
    function animateCursor() {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.left = curX + 'px';
      cursor.style.top = curY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .stag, .project-card, .highlight-item, .skill-group, .social-btn');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
  }

  /* ==================== NAVBAR ==================== */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Scroll detection
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav on link click (mobile)
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  /* ==================== TERMINAL ANIMATION ==================== */
  const terminalBody = document.getElementById('terminalBody');

  const termLines = [
    { text: '$ whoami', cls: 't-cmd', delay: 300 },
    { text: 'youssef_eid_said', cls: '', delay: 500 },
    { text: '$ cat profile.json', cls: 't-cmd', delay: 800 },
    { text: '{', cls: '', delay: 1000 },
    { text: '  <span class="t-key">"role"</span>: <span class="t-val">"Backend Developer"</span>,', cls: '', delay: 1200 },
    { text: '  <span class="t-key">"stack"</span>: <span class="t-val">"ASP.NET / Node / Django"</span>,', cls: '', delay: 1400 },
    { text: '  <span class="t-key">"db"</span>: <span class="t-val">"SQL Server"</span>,', cls: '', delay: 1600 },
    { text: '  <span class="t-key">"status"</span>: <span class="t-val">"available"</span>', cls: '', delay: 1800 },
    { text: '}', cls: '', delay: 2000 },
    { text: '$ ls projects/', cls: 't-cmd', delay: 2300 },
    { text: 'ecommerce-app/', cls: '', delay: 2500 },
    { text: 'file-encryption/', cls: '', delay: 2650 },
    { text: 'photo-editor/', cls: '', delay: 2800 },
    { text: '$ <span class="t-cursor"></span>', cls: '', delay: 3100 },
  ];

  if (terminalBody) {
    termLines.forEach(({ text, cls, delay }) => {
      setTimeout(() => {
        const line = document.createElement('span');
        line.className = 't-line' + (cls ? ' ' + cls : '');
        line.innerHTML = text + '\n';
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }, delay);
    });
  }

  /* ==================== INTERSECTION OBSERVER ==================== */
  // Reveal elements on scroll
  const revealEls = document.querySelectorAll(
    '.skill-group, .project-card, .highlight-item, .about-card, .contact-item, .contact-form, .soft-skills, .section-title, .section-sub'
  );

  revealEls.forEach(el => el.classList.add('io-reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ==================== ACTIVE NAV LINK ==================== */
  const sections = document.querySelectorAll('section[id]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => navObserver.observe(s));

  /* ==================== CONTACT FORM ==================== */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = ['name', 'email', 'subject', 'message'];
      let valid = true;

      fields.forEach(id => {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) {
          el && (el.style.borderColor = 'var(--red)');
          valid = false;
        } else {
          el.style.borderColor = '';
        }
      });

      // Basic email check
      const emailEl = document.getElementById('email');
      if (emailEl && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
        emailEl.style.borderColor = 'var(--red)';
        valid = false;
      }

      if (!valid) {
        formNote.textContent = 'Please fill in all fields correctly.';
        formNote.className = 'form-note error';
        return;
      }

      // Simulate send (no backend in static build)
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      setTimeout(() => {
        formNote.textContent = '✓ Message sent! I\'ll get back to you soon.';
        formNote.className = 'form-note success';
        contactForm.reset();
        btn.disabled = false;
        btn.innerHTML = 'Send Message <i class="bi bi-send"></i>';
      }, 1200);
    });

    // Clear border on input
    contactForm.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', () => { el.style.borderColor = ''; });
    });
  }

  /* ==================== SMOOTH SCROLL (polyfill) ==================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
