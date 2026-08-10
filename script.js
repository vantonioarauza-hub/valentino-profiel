// Game State
let missCount = 0;

// DOM Elements
const musicBtn = document.getElementById('musicToggle');
const audio = document.getElementById('bgm');
const punchBtn = document.getElementById('punchBtn');
const portraitImg = document.getElementById('portraitImg');
const missCountEl = document.querySelector('.miss-count');
const dodgeIndicator = document.getElementById('dodgeIndicator');
const controlText = document.querySelector('.control-text');

// Audio Toggle
if (musicBtn && audio) {
  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      controlText.textContent = 'Pause BGM';
      musicBtn.style.background = '#ffffff';
      musicBtn.style.color = '#000000';
    } else {
      audio.pause();
      controlText.textContent = 'Play BGM';
      musicBtn.style.background = 'rgba(255, 255, 255, 0.08)';
      musicBtn.style.color = '#ffffff';
    }
  });
}

// Dodge Mechanics
const dodgeMessages = [
  'DODGED!',
  'TOO SLOW!',
  'QUÉ SOPA?',
  'LAS CINTAS!',
  'MISSED!',
  'TRANQUILO!'
];

if (punchBtn && portraitImg) {
  punchBtn.addEventListener('click', () => {
    if (punchBtn.disabled) return;

    missCount++;
    if (missCountEl) {
      missCountEl.textContent = missCount;
    }

    punchBtn.disabled = true;

    // Fluid GSAP evasion shift
    const xShift = (Math.random() - 0.5) * 60;
    const yShift = (Math.random() - 0.5) * 30;
    const message = dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)];

    gsap.timeline()
      .to(portraitImg, {
        x: xShift,
        y: yShift,
        duration: 0.1,
        ease: 'power2.out'
      }, 0)
      .to(dodgeIndicator, {
        textContent: message,
        opacity: 1,
        scale: 1,
        duration: 0.15,
        ease: 'back.out'
      }, 0)
      .to(portraitImg, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)'
      }, 0.12)
      .to(dodgeIndicator, {
        opacity: 0,
        duration: 0.25
      }, 0.35);

    setTimeout(() => {
      punchBtn.disabled = false;
    }, 250);
  });
}
