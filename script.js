/* ========================================================
   SAMEEKSHA SHETTY — PORTFOLIO JS
======================================================== */

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');

if (window.matchMedia('(hover: hover)').matches) {
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  setInterval(() => {
    trail.style.left = mx + 'px';
    trail.style.top = my + 'px';
  }, 80);
}

// ── NAVBAR ──
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(s => {
    const top = s.offsetTop;
    const bot = top + s.offsetHeight;
    const link = navLinks.querySelector(`a[href="#${s.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bot);
  });
}

// ── REVEAL ON SCROLL ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Stagger siblings
document.querySelectorAll('.projects-grid, .skills-grid, .recs-grid, .about-stats, .timeline').forEach(parent => {
  Array.from(parent.querySelectorAll('.reveal')).forEach((el, i) => {
    el.dataset.delay = i * 100;
  });
});

revealEls.forEach(el => observer.observe(el));

// ── TYPED EFFECT ──
const phrases = [
  'Software Engineer',
  'Full-Stack Developer',
  'AI/ML Engineer',
  'IEEE Published Researcher',
  'Problem Solver'
];
const typedEl = document.getElementById('typed');
let pIdx = 0, cIdx = 0, deleting = false;

function type() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 60);
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 35);
  }
}

// Add cursor span
if (typedEl) {
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  cursor.textContent = '|';
  typedEl.parentNode.insertBefore(cursor, typedEl.nextSibling);
  setTimeout(type, 800);
}

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      note.textContent = '✅ Message sent! I\'ll get back to you soon.';
      form.reset();
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
      setTimeout(() => note.textContent = '', 5000);
    }, 1200);
  });
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
