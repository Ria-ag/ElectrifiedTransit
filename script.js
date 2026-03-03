// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrolled / total) * 100}%`;
}, { passive: true });


// ── REVEAL ON SCROLL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});


// ── STAT COUNTER ANIMATION ──
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const duration = target > 999 ? 2200 : 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  statObserver.observe(el);
});


// ── AUDIO BUTTON ──
const audioPill = document.getElementById('playAudio');
const audioEl   = document.getElementById('voiceover');
let audioPlaying = false;

audioPill.addEventListener('click', () => {
  if (!audioPlaying) {
    audioEl.play().catch(e => console.log('Audio blocked:', e));
    audioPill.querySelector('.audio-label').textContent = 'Pause Audio';
    audioPill.classList.remove('paused');
    audioPlaying = true;
  } else {
    audioEl.pause();
    audioPill.querySelector('.audio-label').textContent = 'Hear the City';
    audioPill.classList.add('paused');
    audioPlaying = false;
  }
});

audioEl.addEventListener('ended', () => {
  audioPill.querySelector('.audio-label').textContent = 'Hear the City';
  audioPill.classList.add('paused');
  audioPlaying = false;
});


// ── HORIZONTAL STRIP DRAG-TO-SCROLL ──
const strip = document.getElementById('stripTrack');
if (strip) {
  let isDown = false;
  let startX;
  let scrollLeft;

  strip.addEventListener('mousedown', (e) => {
    isDown = true;
    strip.classList.add('dragging');
    startX = e.pageX - strip.offsetLeft;
    scrollLeft = strip.scrollLeft;
  });

  strip.addEventListener('mouseleave', () => {
    isDown = false;
    strip.classList.remove('dragging');
  });

  strip.addEventListener('mouseup', () => {
    isDown = false;
    strip.classList.remove('dragging');
  });

  strip.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - strip.offsetLeft;
    const walk = (x - startX) * 1.8;
    strip.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStartX = 0;
  let touchScrollLeft = 0;

  strip.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = strip.scrollLeft;
  }, { passive: true });

  strip.addEventListener('touchmove', (e) => {
    const walk = (e.touches[0].pageX - touchStartX) * 1.5;
    strip.scrollLeft = touchScrollLeft - walk;
  }, { passive: true });
}


// ── SMOOTH PARALLAX (desktop only) ──
function parallaxScroll() {
  if (window.innerWidth < 900) return;
  const scrollY = window.scrollY;
  document.querySelectorAll('.parallax-bg').forEach(el => {
    const rect = el.parentElement.getBoundingClientRect();
    const offset = rect.top * 0.25;
    el.style.transform = `translateY(${offset}px)`;
  });
}

window.addEventListener('scroll', parallaxScroll, { passive: true });