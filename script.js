/* ════════════════════════════════════════════════════════
   REHAN BIJU — PORTFOLIO SCRIPTS
   ════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Lucide icons ──
  if (window.lucide) lucide.createIcons();

  // ═══════════════════════════════════════════════════════
  // NAVBAR
  // ═══════════════════════════════════════════════════════
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkEls = document.querySelectorAll('.nav-link');

  // Scroll → add .scrolled
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Active link on scroll
  const sections = document.querySelectorAll('.section');
  const observerNav = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(l => l.classList.remove('active'));
        const id = entry.target.id;
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -30% 0px' });
  sections.forEach(s => observerNav.observe(s));

  // Close mobile nav on link click
  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ═══════════════════════════════════════════════════════
  // INTERSECTION OBSERVER — ANIMATIONS
  // ═══════════════════════════════════════════════════════
  const animClasses = [
    'anim-fade-up', 'anim-slide-up', 'anim-slide-left', 'anim-slide-right',
    'anim-slide-angle-left', 'anim-slide-angle-right', 'anim-pop', 'anim-flip',
    'anim-scale-wave', 'anim-waterfall', 'anim-zoom-spring', 'anim-deal',
    'anim-rubber', 'anim-drop-in', 'anim-rise-up', 'anim-draw'
  ];

  const selector = animClasses.map(c => '.' + c).join(',');
  const animEls = document.querySelectorAll(selector);

  const observerAnim = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerAnim.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  animEls.forEach(el => observerAnim.observe(el));

  // ═══════════════════════════════════════════════════════
  // STAGGER ANIMATIONS (bullets, typewriter)
  // ═══════════════════════════════════════════════════════
  const staggerEls = document.querySelectorAll('.anim-stagger, .anim-typewriter');

  const observerStagger = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find all siblings with same class in the same parent
        const parent = entry.target.closest('ul, .project-card__outcomes');
        if (parent) {
          const items = parent.querySelectorAll('.anim-stagger, .anim-typewriter');
          items.forEach((item, i) => {
            item.style.setProperty('--stagger-delay', `${i * 0.15}s`);
            item.classList.add('visible');
            observerStagger.unobserve(item);
          });
        } else {
          entry.target.classList.add('visible');
          observerStagger.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.1 });

  staggerEls.forEach(el => observerStagger.observe(el));

  // ═══════════════════════════════════════════════════════
  // RUBBER-BAND TECH PILLS
  // ═══════════════════════════════════════════════════════
  const rubberEls = document.querySelectorAll('.tech-pill.anim-rubber');
  const observerRubber = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.closest('.project-card__tech');
        if (parent) {
          const pills = parent.querySelectorAll('.anim-rubber');
          pills.forEach((pill, i) => {
            pill.style.setProperty('--delay', `${i * 0.08}s`);
            pill.classList.add('visible');
            observerRubber.unobserve(pill);
          });
        }
      }
    });
  }, { threshold: 0.1 });
  rubberEls.forEach(el => observerRubber.observe(el));

  // ═══════════════════════════════════════════════════════
  // EXPERIENCE CARD — CURTAIN REVEAL
  // ═══════════════════════════════════════════════════════
  const timelineCards = document.querySelectorAll('.timeline__card');
  const observerTimeline = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observerTimeline.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  timelineCards.forEach(c => observerTimeline.observe(c));

  // ═══════════════════════════════════════════════════════
  // SKILL BARS ANIMATION
  // ═══════════════════════════════════════════════════════
  const skillBars = document.querySelectorAll('.skill-bar');

  const observerSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = parseInt(bar.dataset.percent);
        const fill = bar.querySelector('.skill-bar__fill');
        const pctEl = bar.querySelector('.skill-bar__pct');

        // Animate fill
        setTimeout(() => {
          fill.style.width = percent + '%';
        }, 100);

        // Animate counter
        animateCounter(pctEl, 0, percent, 1000, '%');

        observerSkills.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observerSkills.observe(bar));

  // ═══════════════════════════════════════════════════════
  // STAT COUNTERS
  // ═══════════════════════════════════════════════════════
  const counterEls = document.querySelectorAll('.counter__number');

  const observerCounters = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, 0, target, 1200);
        observerCounters.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterEls.forEach(el => observerCounters.observe(el));

  // ── Counter helper ──
  function animateCounter(el, start, end, duration, suffix = '') {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ═══════════════════════════════════════════════════════
  // CERTIFICATION CARD TILT (mouse-follow)
  // ═══════════════════════════════════════════════════════
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ═══════════════════════════════════════════════════════
  // HERO PARTICLE FIELD
  // ═══════════════════════════════════════════════════════
  const particleContainer = document.getElementById('heroParticles');
  if (particleContainer) {
    const canvas = document.createElement('canvas');
    particleContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animFrame;
    const PARTICLE_COUNT = 60;
    const CONNECT_DISTANCE = 120;

    function resizeCanvas() {
      canvas.width = particleContainer.offsetWidth;
      canvas.height = particleContainer.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107, 142, 120, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const opacity = (1 - dist / CONNECT_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(107, 142, 120, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connectParticles();
      animFrame = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
  }

  // ═══════════════════════════════════════════════════════
  // CONTACT FORM — SEND BUTTON PULSE
  // ═══════════════════════════════════════════════════════
  const sendBtn = document.getElementById('sendBtn');
  const observerContact = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          sendBtn.style.animation = 'pulse 1s ease';
          setTimeout(() => { sendBtn.style.animation = ''; }, 1000);
        }, 800);
        observerContact.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  if (sendBtn) observerContact.observe(sendBtn);

  // ═══════════════════════════════════════════════════════
  // CONTACT FORM — SEQUENTIAL UNDERLINE DRAW
  // ═══════════════════════════════════════════════════════
  const formGroups = document.querySelectorAll('.form-group');
  const observerForm = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.closest('.contact-form');
        if (parent) {
          const groups = parent.querySelectorAll('.form-group');
          groups.forEach((group, i) => {
            const line = group.querySelector('.form-line');
            if (line) {
              setTimeout(() => {
                line.style.width = '100%';
                setTimeout(() => { line.style.width = '0'; }, 600);
              }, i * 200);
            }
          });
        }
        observerForm.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  if (formGroups.length) observerForm.observe(formGroups[0]);

  // ═══════════════════════════════════════════════════════
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ═══════════════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

// ── Pulse keyframe (injected) ──
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(107,142,120,0); }
    50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(107,142,120,.35); }
  }
`;
document.head.appendChild(styleSheet);

// ── Horizontal Scroll Carousels ──
function initScrollCarousel(trackId, leftBtnId, rightBtnId) {
  const track = document.getElementById(trackId);
  const leftBtn = document.getElementById(leftBtnId);
  const rightBtn = document.getElementById(rightBtnId);
  if (!track || !leftBtn || !rightBtn) return;

  const scrollAmount = 420;

  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
  rightBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Drag to scroll
  let isDragging = false, startX = 0, scrollLeft = 0;
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
  });
  track.addEventListener('mouseleave', () => { isDragging = false; track.style.cursor = 'grab'; });
  track.addEventListener('mouseup', () => { isDragging = false; track.style.cursor = 'grab'; });
  track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // Hide/show arrows based on scroll position
  const updateArrows = () => {
    leftBtn.style.opacity = track.scrollLeft <= 0 ? '0.3' : '1';
    rightBtn.style.opacity = (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) ? '0.3' : '1';
  };
  track.addEventListener('scroll', updateArrows);
  updateArrows();
}

initScrollCarousel('certsTrack', 'certsLeft', 'certsRight');
initScrollCarousel('achieveTrack', 'achieveLeft', 'achieveRight');
initScrollCarousel('expTrack', 'expLeft', 'expRight');
