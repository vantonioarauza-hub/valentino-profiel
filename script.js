// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Initial Scroll Animations (Fades in elements smoothly as you scroll)
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".gs-reveal");

  reveals.forEach((element) => {
    gsap.fromTo(element, 
      { autoAlpha: 0, y: 30 }, 
      { 
        duration: 0.8, 
        autoAlpha: 1, 
        y: 0, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 90%", // Trigger when top of element hits 90% of viewport
          toggleActions: "play none none reverse"
        }
      }
    );
  });
});

// 2. 3D Card Tilt Effect (Interactive Depth)
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -3; // Max 3 deg rotation
    const rotateY = ((x - centerX) / centerX) * 3;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.6
    });
  });
});

// Game & Player State
let missCount = 0;
let currentTrackIndex = 0;

// Tracklist
const playlist = [
  { title: "01. Bad Bunny – Tití Me Preguntó", src: "track1.mp3" },
  { title: "02. Sech – Otro Trago", src: "track2.mp3" },
  { title: "03. Snoop Dogg – Lodi Dodi (1993)", src: "track3.mp3" },
  { title: "04. Shaggy – Angel (2000)", src: "track4.mp3" }
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

// 3. Audio Logic
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

// 4. Interactive Messenger Bag Inspector
if (bagItems && bagInspector) {
  bagItems.forEach(item => {
    item.addEventListener('click', () => {
      const description = item.getAttribute('data-desc');
      
      gsap.to(bagInspector, { opacity: 0, y: -4, duration: 0.15, onComplete: () => {
        bagInspector.textContent = description;
        gsap.to(bagInspector, { opacity: 1, y: 0, duration: 0.2 });
      }});
    });
  });
}

// 5. Enhanced Evasion Mechanic
const dodgeMessages = ['DODGED!', 'TOO SLOW!', 'QUÉ SOPA?', 'MISSED!', 'TRANQUILO!'];

if (punchBtn && portraitImg) {
  punchBtn.addEventListener('click', () => {
    if (punchBtn.disabled) return;

    missCount++;
    if (missCountEl) missCountEl.textContent = missCount;

    punchBtn.disabled = true;

    // Bigger, faster movement to look like effortless dodging
    const xShift = (Math.random() - 0.5) * 60;
    const yShift = (Math.random() - 0.5) * 30;
    const message = dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)];

    gsap.timeline()
      .to(portraitImg, { x: xShift, y: yShift, rotateZ: (Math.random()-0.5)*10, duration: 0.1, ease: 'power2.out' }, 0)
      .to(dodgeIndicator, { textContent: message, opacity: 1, scale: 1.2, duration: 0.1 }, 0)
      .to(dodgeIndicator, { scale: 1, duration: 0.1 }, 0.1)
      .to(portraitImg, { x: 0, y: 0, rotateZ: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' }, 0.15)
      .to(dodgeIndicator, { opacity: 0, y: -10, duration: 0.2 }, 0.4);

    setTimeout(() => { 
      punchBtn.disabled = false; 
      gsap.set(dodgeIndicator, {y: 0}); // reset position
    }, 350);
  });
}
