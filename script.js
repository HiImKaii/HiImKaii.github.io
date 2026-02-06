/* =======================================================================
   VXQ Portfolio — Ultra Interactive Script
   ======================================================================= */

(function () {
  'use strict';

  // ── Particle System ──
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  const PARTICLE_COUNT = 80;
  const CONNECTION_DIST = 120;
  const MOUSE_RADIUS = 150;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
      this.baseAlpha = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Mouse repulsion
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          this.vx += (dx / dist) * force * 0.3;
          this.vy += (dy / dist) * force * 0.3;
        }
      }

      // Damping
      this.vx *= 0.99;
      this.vy *= 0.99;
    }

    draw() {
      const isDark = !document.documentElement.getAttribute('data-theme') ||
        document.documentElement.getAttribute('data-theme') === 'dark';

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(108, 99, 255, ${this.baseAlpha})`
        : `rgba(108, 99, 255, ${this.baseAlpha * 0.6})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    const isDark = !document.documentElement.getAttribute('data-theme') ||
      document.documentElement.getAttribute('data-theme') === 'dark';

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isDark
            ? `rgba(108, 99, 255, ${alpha})`
            : `rgba(108, 99, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // ── Custom Cursor ──
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  let cursorX = 0, cursorY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
  });

  function animateCursor() {
    outlineX += (cursorX - outlineX) * 0.15;
    outlineY += (cursorY - outlineY) * 0.15;
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .glass-card, .skill-tag, .float-icon, .info-chip');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ── Typewriter Effect ──
  const typewriterEl = document.getElementById('typewriter');
  const currentLang = () => localStorage.getItem('language') || 'vi';

  const roles = {
    vi: [
      'Kỹ sư Hàng không Vũ trụ',
      'GIS & Viễn thám',
      'AI & Tối ưu hóa',
      'Machine Learning',
      'Phân tích Dữ liệu Không gian'
    ],
    en: [
      'Aerospace Engineer',
      'GIS & Remote Sensing',
      'AI & Optimization',
      'Machine Learning',
      'Spatial Data Analysis'
    ]
  };

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeWriter() {
    const lang = currentLang();
    const currentRoles = roles[lang] || roles.vi;
    const currentRole = currentRoles[roleIndex % currentRoles.length];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex++;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeWriter, typeSpeed);
  }

  typeWriter();

  // ── Scroll Reveal (IntersectionObserver) ──
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // ── Counter Animation ──
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }

  // Trigger counter when hero stats are visible
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statsObserver.observe(statsEl);
  }

  // ── 3D Tilt Effect ──
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ── Navbar Scroll ──
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ── Back to Top ──
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Hamburger Menu ──
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ── Theme Toggle ──
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Init theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
  });

  // ── Language Toggle ──
  const langToggle = document.getElementById('language-toggle');
  const langText = document.getElementById('language-text');

  function setLanguage(lang) {
    localStorage.setItem('language', lang);
    langText.textContent = lang === 'vi' ? 'EN' : 'VI';

    document.querySelectorAll('[data-vi][data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    // Reset nav link texts
    document.querySelectorAll('.nav-link').forEach(link => {
      const text = link.getAttribute(`data-${lang}`);
      if (text) {
        const textEl = link.querySelector('.nav-link-text');
        if (textEl) textEl.textContent = text;
      }
    });
  }

  // Init language
  const savedLang = localStorage.getItem('language') || 'vi';
  setLanguage(savedLang);

  langToggle.addEventListener('click', () => {
    const current = localStorage.getItem('language') || 'vi';
    setLanguage(current === 'vi' ? 'en' : 'vi');
  });

  // ── GitHub Stats ──
  async function fetchGitHubStats() {
    try {
      const res = await fetch('https://api.github.com/users/HiImKaii');
      if (!res.ok) return;
      const data = await res.json();

      const reposEl = document.getElementById('repos-count');
      const followersEl = document.getElementById('followers-count');

      if (reposEl) reposEl.setAttribute('data-target', data.public_repos);
      if (followersEl) followersEl.setAttribute('data-target', data.followers);

      // Fetch contributions (approximate from events)
      const eventsRes = await fetch('https://api.github.com/users/HiImKaii/events?per_page=100');
      if (eventsRes.ok) {
        const events = await eventsRes.json();
        const pushEvents = events.filter(e => e.type === 'PushEvent');
        let totalCommits = 0;
        pushEvents.forEach(e => { totalCommits += e.payload.commits ? e.payload.commits.length : 0; });

        const contribEl = document.getElementById('contributions-count');
        if (contribEl && totalCommits > 0) {
          contribEl.setAttribute('data-target', totalCommits);
        }
      }
    } catch (e) {
      // Silently fail
    }
  }

  fetchGitHubStats();

  // ── Magnetic Button Effect ──
  const magneticBtns = document.querySelectorAll('.btn-magnetic');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // ── Smooth Scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
