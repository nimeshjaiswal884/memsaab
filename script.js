/* ============================================================
   MEM SAAB — script.js
   ============================================================ */

/* --- 1. Smooth Scroll --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav if open
      closeMobileNav();
    }
  });
});

/* --- 2. Header scroll effect --- */
const header = document.getElementById('mainHeader');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- 3. Scroll Reveal --- */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const delay = entry.target.classList.contains('delay-1') ? 150
                    : entry.target.classList.contains('delay-2') ? 300
                    : 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));
}

/* --- 4. Mobile Nav --- */
const hamburger     = document.getElementById('hamburger');
const mobileNav     = document.getElementById('mobileNav');
const navOverlay    = document.getElementById('navOverlay');

function openMobileNav() {
  hamburger?.classList.add('open');
  mobileNav?.classList.add('open');
  navOverlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  hamburger?.classList.remove('open');
  mobileNav?.classList.remove('open');
  navOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMobileNav() : openMobileNav();
});

navOverlay?.addEventListener('click', closeMobileNav);

mobileNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMobileNav);
});

/* --- 5. Collection Slider --- */
const track   = document.querySelector('.slider-track');
const slides  = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.slider-btn.next');
const prevBtn = document.querySelector('.slider-btn.prev');
const dots    = document.querySelectorAll('.slider-dots .dot');

let sliderIndex = 0;
let autoSlide;

function goToSlide(n) {
  if (!track || !slides.length) return;
  sliderIndex = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${sliderIndex * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === sliderIndex));
}

nextBtn?.addEventListener('click', () => { goToSlide(sliderIndex + 1); resetAutoSlide(); });
prevBtn?.addEventListener('click', () => { goToSlide(sliderIndex - 1); resetAutoSlide(); });
dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); }));

function startAutoSlide() {
  autoSlide = setInterval(() => goToSlide(sliderIndex + 1), 5000);
}
function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// Touch/swipe support for slider
if (track) {
  let touchStartX = 0;
  track.parentElement.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.parentElement.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goToSlide(sliderIndex + 1) : goToSlide(sliderIndex - 1);
      resetAutoSlide();
    }
  });
  startAutoSlide();
}

/* --- 6. Music Control --- */
const music      = document.getElementById('bg-music');
const musicBtn   = document.getElementById('musicBtn');
const musicLabel = document.getElementById('musicLabel');
let isPlaying    = false;

if (musicBtn && music) {
  musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
      music.play().catch(() => {});
      musicLabel.textContent = 'Stop Music';
      musicBtn.classList.add('playing');
      isPlaying = true;
    } else {
      music.pause();
      music.currentTime = 0;
      musicLabel.textContent = 'Play Music';
      musicBtn.classList.remove('playing');
      isPlaying = false;
    }
  });
}

/* --- 7. Parallax hint on hero image (desktop only) --- */
const heroImage = document.querySelector('.hero-portrait');
if (heroImage && window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroImage.style.transform = `translateY(${scrollY * 0.12}px)`;
  }, { passive: true });
}

/* --- 8. Lookbook items — WhatsApp link passthrough --- */
// Already handled via anchor wrapping in HTML

/* --- 9. Keyboard accessibility for hamburger --- */
hamburger?.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    hamburger.click();
  }
});
