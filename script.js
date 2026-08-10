/* ================================================================
   VALENTINO DE LA CRUZ - INTERACTIVE SCRIPT
   Clean, intentional, hand-written interaction logic
   ================================================================ */

// ================================================================
// STATE MANAGEMENT
// ================================================================

const GameState = {
  missCount: 0,
  balanceLevel: 65,
  isPlaying: false,
  maxMisses: 30
};

// ================================================================
// DOM ELEMENTS
// ================================================================

const elements = {
  musicBtn: document.getElementById('musicToggle'),
  audio: document.getElementById('bgm'),
  punchBtn: document.getElementById('punchBtn'),
  portraitImg: document.getElementById('portraitImg'),
  missCount: document.querySelector('.miss-count'),
  balanceMeter: document.getElementById('balanceMeter'),
  dodgeIndicator: document.querySelector('.dodge-indicator'),
  controlText: document.querySelector('.control-text')
};

// ================================================================
// INITIALIZATION
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  initializeAudio();
  initializePunchMechanics();
  setupPortraitInteraction();
});

// ================================================================
// AUDIO CONTROL
// ================================================================

function initializeAudio() {
  elements.musicBtn.addEventListener('click', toggleMusic);
}

function toggleMusic() {
  if (elements.audio.paused) {
    elements.audio.play();
    elements.controlText.textContent = 'Pause';
    elements.musicBtn.style.background = 'linear-gradient(135deg, #d4835c, #e8956e)';
    elements.musicBtn.style.color = '#0a0e17';
  } else {
    elements.audio.pause();
    elements.controlText.textContent = 'Play';
    elements.musicBtn.style.background = 'rgba(20, 25, 40, 0.8)';
    elements.musicBtn.style.color = '#d4835c';
  }
}

// ================================================================
// PUNCH MECHANICS
// ================================================================

function initializePunchMechanics() {
  elements.punchBtn.addEventListener('click', handlePunch);
}

const dodgeMessages = [
  'DODGED!',
  'MISSED!',
  'TOO SLOW!',
  'RHYTHM FLOW!',
  'QUÉ SOPA?',
  'OYE BRO!',
  'NOT TODAY!',
  'TRANQUILO!'
];

function handlePunch() {
  if (elements.punchBtn.disabled) return;
  
  // Update game state
  GameState.missCount++;
  updateMissCounter();
  updateBalanceMeter();
  
  // Disable button temporarily
  elements.punchBtn.disabled = true;
  
  // Trigger dodge animation
  performDodge();
  
  // Re-enable button
  setTimeout(() => {
    elements.punchBtn.disabled = false;
  }, 300);
}

function performDodge() {
  // Random direction
  const xShift = (Math.random() - 0.5) * 100;
  const yShift = (Math.random() - 0.5) * 50;
  const rotation = xShift / 20;
  
  // Get random message
  const message = dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)];
  
  // Button feedback
  elements.punchBtn.style.transform = 'scale(0.94)';
  setTimeout(() => {
    elements.punchBtn.style.transform = 'scale(1)';
  }, 100);
  
  // Dodge animation with GSAP
  gsap.timeline()
    .to(elements.portraitImg, {
      x: xShift,
      y: yShift,
      rotation: rotation,
      duration: 0.12,
      ease: 'power2.out'
    }, 0)
    .to(elements.dodgeIndicator, {
      textContent: message,
      opacity: 1,
      y: -40,
      scale: 1.1,
      duration: 0.2,
      ease: 'back.out'
    }, 0)
    .to(elements.portraitImg, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.5,
      ease: 'elastic.out(1.2, 0.6)'
    }, 0.15)
    .to(elements.dodgeIndicator, {
      opacity: 0,
      y: -60,
      duration: 0.3
    }, 0.35);
}

function updateMissCounter() {
  gsap.to(elements.missCount, {
    textContent: GameState.missCount,
    duration: 0.3,
    ease: 'power2.out',
    snap: { textContent: 1 }
  });
}

function updateBalanceMeter() {
  const newBalance = Math.min(
    65 + (GameState.missCount / GameState.maxMisses) * 30,
    95
  );
  
  GameState.balanceLevel = newBalance;
  
  gsap.to(elements.balanceMeter, {
    width: newBalance + '%',
    duration: 0.5,
    ease: 'power2.out'
  });
  
  // Warning effect if critical
  if (newBalance > 85) {
    triggerBalanceWarning();
  }
}

function triggerBalanceWarning() {
  const header = document.querySelector('.header');
  if (header.dataset.warned) return;
  
  header.dataset.warned = true;
  
  gsap.timeline()
    .to(elements.balanceMeter, {
      boxShadow: '0 0 12px rgba(255, 0, 85, 0.6)',
      duration: 0.2
    }, 0)
    .to(elements.balanceMeter, {
      boxShadow: '0 0 0px rgba(255, 0, 85, 0)',
      duration: 0.2
    }, 0.4);
}

// ================================================================
// PORTRAIT INTERACTION
// ================================================================

function setupPortraitInteraction() {
  elements.portraitImg.addEventListener('mouseenter', () => {
    gsap.to(elements.portraitImg, {
      filter: 'brightness(1.05)',
      duration: 0.3
    });
  });
  
  elements.portraitImg.addEventListener('mouseleave', () => {
    gsap.to(elements.portraitImg, {
      filter: 'brightness(1)',
      duration: 0.3
    });
  });
}

// ================================================================
// KEYBOARD SHORTCUTS
// ================================================================

document.addEventListener('keydown', (e) => {
  // Spacebar: Throw punch
  if (e.code === 'Space') {
    e.preventDefault();
    if (!elements.punchBtn.disabled) {
      elements.punchBtn.click();
    }
  }
  
  // M: Toggle music
  if (e.key.toLowerCase() === 'm') {
    elements.musicBtn.click();
  }
});

// ================================================================
// CLEANUP
// ================================================================

window.addEventListener('beforeunload', () => {
  if (!elements.audio.paused) {
    elements.audio.pause();
  }
});

// ================================================================
// DEBUG / EASTER EGGS
// ================================================================

window.DEBUG = {
  getMissCount: () => GameState.missCount,
  getBalance: () => GameState.balanceLevel,
  resetMisses: () => {
    GameState.missCount = 0;
    GameState.balanceLevel = 65;
    elements.missCount.textContent = '0';
    gsap.to(elements.balanceMeter, { width: '65%', duration: 0.5 });
  }
};

console.log('%c🇵🇦 VALENTINO DE LA CRUZ', 'color: #e8956e; font-size: 14px; font-weight: bold;');
console.log('%cThe Untouchable', 'color: #00d9ff; font-size: 12px;');
