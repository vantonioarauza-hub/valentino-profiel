// Game & Player State
let missCount = 0;
let currentTrackIndex = 0;

// Playlist Data
const playlist = [
  { title: "01. Coastal Vibe (Lofi)", src: "track1.mp3" },
  { title: "02. Panama Beats (Latin Rhythm)", src: "track2.mp3" },
  { title: "03. Kazemachi Sunset (Ambient)", src: "track3.mp3" }
];

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevTrackBtn = document.getElementById('prevTrackBtn');
const nextTrackBtn = document.getElementById('nextTrackBtn');
const trackTitle = document.getElementById('trackTitle');

const punchBtn = document.getElementById('punchBtn');
const portraitImg = document.getElementById('portraitImg');
const missCountEl = document.querySelector('.miss-count');
const dodgeIndicator = document.getElementById('dodgeIndicator');

const bagItems = document.querySelectorAll('.bag-item');
const bagInspector = document.getElementById('bagInspector');

// Multi-Track Audio Logic
function loadTrack(index) {
  currentTrackIndex = index;
  audioPlayer.src = playlist[currentTrackIndex].src;
  trackTitle.textContent = playlist[currentTrackIndex].title;
}

if (playPauseBtn && audioPlayer) {
  playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.textContent = '⏸ Pause';
    } else {
      audioPlayer.pause();
      playPauseBtn.textContent = '▶ Play';
    }
  });

  prevTrackBtn.addEventListener('click', () => {
    let newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(newIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸ Pause';
  });

  nextTrackBtn.addEventListener('click', () => {
    let newIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(newIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸ Pause';
  });
}

// Interactive Messenger Bag Inspector
if (bagItems && bagInspector) {
  bagItems.forEach(item => {
    item.addEventListener('click', () => {
      const description = item.getAttribute('data-desc');
      bagInspector.textContent = description;
    });
  });
}

// Dodge Mechanic
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
