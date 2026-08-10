// Interactive Script
let missCount = 0;

const musicBtn = document.getElementById('musicToggle');
const audio = document.getElementById('bgm');
const punchBtn = document.getElementById('punchBtn');
const portraitImg = document.getElementById('portraitImg');
const missCountEl = document.querySelector('.miss-count');
const dodgeIndicator = document.getElementById('dodgeIndicator');

if (musicBtn && audio) {
  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      musicBtn.textContent = 'Pause BGM';
      musicBtn.style.background = '#2f2f2f';
      musicBtn.style.color = '#ffffff';
    } else {
      audio.pause();
      musicBtn.textContent = 'Play BGM';
      musicBtn.style.background = '#ffffff';
      musicBtn.style.color = '#37352f';
    }
  });
}

const dodgeMessages = ['DODGED!', 'TOO SLOW!', 'QUÉ SOPA?', 'MISSED!', 'TRANQUILO!'];

if (punchBtn && portraitImg) {
  punchBtn.addEventListener('click', () => {
    if (punchBtn.disabled) return;

    missCount++;
    if (missCountEl) missCountEl.textContent = missCount;

    punchBtn.disabled = true;

    const xShift = (Math.random() - 0.5) * 40;
    const yShift = (Math.random() - 0.5) * 20;
    const message = dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)];

    gsap.timeline()
      .to(portraitImg, { x: xShift, y: yShift, duration: 0.1, ease: 'power2.out' }, 0)
      .to(dodgeIndicator, { textContent: message, opacity: 1, duration: 0.12 }, 0)
      .to(portraitImg, { x: 0, y: 0, duration: 0.35, ease: 'elastic.out(1, 0.5)' }, 0.12)
      .to(dodgeIndicator, { opacity: 0, duration: 0.2 }, 0.3);

    setTimeout(() => { punchBtn.disabled = false; }, 250);
  });
}
