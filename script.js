// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Theme toggle with persistence
const themeToggle = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme');
if (stored === 'light') document.body.classList.add('light');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// IntersectionObserver reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Typewriter subtitle (reduced-motion aware)
const twEl = document.getElementById('typewriter');
const phrases = [
  "Read. Reflect. Realize.",
  "The Theory of Unlimited Self.",
  "A classic inquiry with a modern lens."
];
let pi = 0, ci = 0, deleting = false;
function type() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!twEl) return;
  const full = phrases[pi % phrases.length];
  if (deleting) {
    ci--;
  } else {
    ci++;
  }
  twEl.textContent = full.slice(0, ci);
  if (!reduceMotion) {
    if (!deleting && ci === full.length) {
      deleting = true;
      setTimeout(type, 1400);
      return;
    }
    if (deleting && ci === 0) {
      deleting = false; pi++;
    }
    setTimeout(type, deleting ? 35 : 55);
  } else {
    // Reduced motion: just set full text and stop
    twEl.textContent = full;
  }
}
type();

// 3D tilt for the book cover (pointer move)
const tilt = document.getElementById('bookTilt');
if (tilt) {
  const cover = tilt.querySelector('.book-cover');
  let rect = null;

  function updateTilt(e) {
    rect = rect || tilt.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = x / rect.width - 0.5;
    const cy = y / rect.height - 0.5;
    const rotateY = cx * 10; // left/right
    const rotateX = -cy * 10; // up/down
    tilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    cover.style.transform = `translateZ(20px) rotateY(${rotateY * 0.6}deg) rotateX(${rotateX * 0.6}deg)`;
  }
  function resetTilt() {
    tilt.style.transform = 'rotateX(0) rotateY(0)';
    cover.style.transform = 'translateZ(0) rotateY(0) rotateX(0)';
    rect = null;
  }
  tilt.addEventListener('mousemove', updateTilt);
  tilt.addEventListener('mouseleave', resetTilt);
  tilt.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    updateTilt({ clientX: t.clientX, clientY: t.clientY });
  }, { passive: true });
  tilt.addEventListener('touchend', resetTilt);
}

// Modal reader
const modal = document.getElementById('modal');
const openReader = document.getElementById('openReader');
const closeModal = document.getElementById('closeModal');
const xClose = document.getElementById('xClose');
function openM(){ modal.setAttribute('aria-hidden','false'); }
function closeM(){ modal.setAttribute('aria-hidden','true'); }
openReader?.addEventListener('click', openM);
closeModal?.addEventListener('click', closeM);
xClose?.addEventListener('click', closeM);
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeM(); });
