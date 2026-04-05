/* ═══════════════════════════════════════════
   Bibek Shrestha Portfolio — script.js
   ═══════════════════════════════════════════ */

/* ── LOADER ──────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 700);

    // Kick off entrance animations for the default section
    animateCounters();
    animateTimeline();
  }, 900);
});

/* ── CUSTOM CURSOR ───────────────────────── */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth lag on the ring with rAF
(function tickCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  cur.style.left  = mouseX + 'px';
  cur.style.top   = mouseY + 'px';
  ring.style.left = ringX  + 'px';
  ring.style.top  = ringY  + 'px';

  requestAnimationFrame(tickCursor);
})();

// Expand ring on interactive elements
const hoverTargets = 'a, button, .Project-card, .contact-card, .research-cell, .stat-box';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ── SECTION SWITCHING ───────────────────── */
/**
 * showSection(event, id)
 * Fades out the current section, then reveals the target section.
 * Also syncs active state on both the top banner buttons and sidebar nav links.
 *
 * @param {Event|null} event  - click event (pass null for programmatic calls)
 * @param {string}     id     - target section element id
 */
function showSection(event, id) {
  if (event) event.preventDefault();

  const current = document.querySelector('.content-section.section-active');
  const next    = document.getElementById(id);

  if (!next || current === next) return;

  // Fade-out current
  current.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
  current.style.opacity    = '0';
  current.style.transform  = 'translateY(-10px)';

  setTimeout(() => {
    current.classList.remove('section-active');
    current.style.cssText = '';      // reset inline styles
    next.classList.add('section-active');

    // Per-section entrance animations
    if (id === 'Projects') setTimeout(animateProjects,    100);
    if (id === 'contact')  setTimeout(animateContactCards, 100);
    if (id === 'home')     setTimeout(animateTimeline,     300);
  }, 200);

  // Update nav active states — covers both banner btns and sidebar links
  document.querySelectorAll('.banner-btn, .nav-item a').forEach(el => {
    el.classList.remove('active');
  });
  document.querySelectorAll(`[data-section="${id}"]`).forEach(el => {
    el.classList.add('active');
  });
}

/* ── COUNTER ANIMATION ───────────────────── */
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let current  = 0;
    const step   = target / 30;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 30);
  });
}

/* ── STAGGERED ENTRANCE — ProjectS ──────── */
function animateProjects() {
  document.querySelectorAll('.Project-card').forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity    = '1';
      card.style.transform  = 'translateY(0)';
    }, i * 100);
  });
}

/* ── STAGGERED ENTRANCE — CONTACT ────────── */
function animateContactCards() {
  document.querySelectorAll('.contact-card').forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'scale(0.96)';

    setTimeout(() => {
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      card.style.opacity    = '1';
      card.style.transform  = 'scale(1)';
    }, i * 70);
  });
}

/* ── STAGGERED ENTRANCE — TIMELINE ──────── */
function animateTimeline() {
  document.querySelectorAll('.tl-item').forEach((item, i) => {
    item.classList.remove('visible');
    setTimeout(() => item.classList.add('visible'), i * 150 + 100);
  });
}

/* ── RESEARCH CELL GLOW ON HOVER ─────────── */
document.querySelectorAll('.research-cell').forEach(cell => {
  cell.addEventListener('mouseenter', function () {
    this.style.boxShadow = 'inset 0 0 0 1px rgba(201,168,76,0.2)';
  });
  cell.addEventListener('mouseleave', function () {
    this.style.boxShadow = '';
  });
});

/* ── PARALLAX AMBIENT GLOWS ──────────────── */
document.addEventListener('mousemove', e => {
  const xPct = (e.clientX / window.innerWidth  - 0.5) * 20;
  const yPct = (e.clientY / window.innerHeight - 0.5) * 20;

  const a1 = document.querySelector('.ambient-1');
  const a2 = document.querySelector('.ambient-2');

  if (a1) a1.style.transform = `translate(${xPct}px, ${yPct}px)`;
  if (a2) a2.style.transform = `translate(${-xPct * 0.6}px, ${-yPct * 0.6}px)`;
});
