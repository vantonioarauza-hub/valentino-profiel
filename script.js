/* ============================================
   VALENTINO DE LA CRUZ - INTERACTIVE SCRIPT
   Fluid Animations & Combat Mechanics
   ============================================ */

// ============================================
// INITIALIZATION & PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initPageLoad();
  setupMusicToggle();
  setupCombatMechanics();
  setupPressureGauge();
  setupScrollAnimations();
});

function initPageLoad() {
  // Smooth entrance animation for the profile card
  gsap.set('.profile-content', { opacity: 0, y: 40 });
  gsap.set('.character-visual', { opacity: 0, x: -40 });
  
  gsap.timeline()
    .to('.character-visual', {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out'
    }, 0)
    .to('.profile-content', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, 0.2)
    .to('.status-badges .badge', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out'
    }, 0.8);

  // Cascade stat cards in
  gsap.from('.stat-card', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.08,
    delay: 1.2,
    ease: 'power2.out'
  });

  // Initialize badge animations
  gsap.set('.status-badges .badge', { opacity: 0, y: 10 });
}

// ============================================
// MUSIC TOGGLE
// ============================================

function setupMusicToggle() {
  const musicBtn = document.getElementById('musicToggle');
  const audio = document.getElementById('bgm');
  const musicIcon = musicBtn.querySelector('.music-icon');

  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      musicBtn.querySelector('.music-text').innerText = 'Pause Track';
      gsap.to(musicIcon, { rotation: 360, duration: 0.6, ease: 'power2.out' });
    } else {
      audio.pause();
      musicBtn.querySelector('.music-text').innerText = 'Play Track';
      gsap.to(musicIcon, { rotation: 0, duration: 0.3 });
    }
  });
}

// ============================================
// COMBAT MECHANICS - The Dodge System
// ============================================

function setupCombatMechanics() {
  const attackBtn = document.getElementById('attackBtn');
  const valImg = document.getElementById('valentinoImg');
  const dodgeText = document.getElementById('dodgeText');
  const missCounter = document.getElementById('misses');
  
  let missCount = 0;

  const dodgeMessages = [
    'DODGED!',
    'LAS CINTAS FLOW!',
    'TOO SLOW, BRO!',
    'QUÉ SOPA?',
    'DIDN\'T EVEN LOOK!',
    'QUÉ PASÓ, BRO?',
    'RHYTHM, BABY!',
    'YOU MISSED!',
    'TRANQUILO!',
    'NOT TODAY, HERMANO!'
  ];

  attackBtn.addEventListener('click', () => {
    missCount++;
    missCounter.textContent = `Misses: ${missCount}`;
    
    // Update pressure gauge as misses increase
    updatePressureGauge(missCount);

    // Random dodge direction
    const xShift = (Math.random() - 0.5) * 80;
    const yShift = (Math.random() - 0.5) * 40;
    const rotation = xShift / 15;

    // Pick random dodge message
    const message = dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)];
    dodgeText.innerText = message;

    // Create impact effect
    createImpactEffect(attackBtn);

    // Main dodge animation timeline
    const timeline = gsap.timeline();

    timeline
      // Valentino slips away with fluid ribbon-like motion
      .to(valImg, {
        x: xShift,
        y: yShift,
        rotation: rotation,
        duration: 0.12,
        ease: 'power2.out'
      }, 0)
      // Dodge text pops in
      .to(dodgeText, {
        opacity: 1,
        y: -30,
        scale: 1.2,
        duration: 0.15,
        ease: 'back.out'
      }, 0)
      // Return to neutral with elastic bounce
      .to(valImg, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.6)'
      }, 0.15)
      // Fade out dodge text
      .to(dodgeText, {
        opacity: 0,
        y: -50,
        duration: 0.3
      }, 0.35);

    // Button press feedback
    gsap.to(attackBtn, {
      scale: 0.92,
      duration: 0.08,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });

    // Disable button briefly to prevent spam
    attackBtn.disabled = true;
    setTimeout(() => {
      attackBtn.disabled = false;
    }, 200);
  });
}

// ============================================
// IMPACT EFFECT - Visual Feedback on Attack
// ============================================

function createImpactEffect(element) {
  const impact = document.createElement('div');
  impact.style.position = 'absolute';
  impact.style.pointerEvents = 'none';
  
  const rect = element.getBoundingClientRect();
  impact.style.left = (rect.left + rect.width / 2) + 'px';
  impact.style.top = (rect.top + rect.height / 2) + 'px';
  
  impact.style.width = '10px';
  impact.style.height = '10px';
  impact.style.borderRadius = '50%';
  impact.style.background = 'radial-gradient(circle, #ff0055, transparent)';
  impact.style.zIndex = '1000';
  
  document.body.appendChild(impact);

  gsap.to(impact, {
    x: (Math.random() - 0.5) * 100,
    y: (Math.random() - 0.5) * 100,
    scale: 2,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => {
      impact.remove();
    }
  });
}

// ============================================
// PRESSURE GAUGE - System Balance Dynamics
// ============================================

let missCount = 0;

function setupPressureGauge() {
  const gauge = document.getElementById('gaugeIndicator');
  // Initial state: 65%
  gsap.set(gauge, { width: '65%' });
}

function updatePressureGauge(misses) {
  const gauge = document.getElementById('gaugeIndicator');
  const maxMisses = 30;
  
  // Pressure increases with each miss (Valentino disrupts the balance)
  const newWidth = Math.min(65 + (misses / maxMisses) * 30, 95);
  
  gsap.to(gauge, {
    width: newWidth + '%',
    duration: 0.5,
    ease: 'power2.out'
  });

  // When system reaches critical (>90%), add warning
  if (newWidth > 90) {
    triggerBalanceWarning();
  }
}

function triggerBalanceWarning() {
  const gauge = document.querySelector('.pressure-gauge');
  
  // Check if warning already shown
  if (gauge.classList.contains('critical')) return;
  
  gauge.classList.add('critical');
  
  gsap.timeline()
    .to(gauge, {
      boxShadow: '0 0 30px rgba(255, 0, 85, 0.6)',
      duration: 0.3
    })
    .to(gauge, {
      boxShadow: '0 0 15px rgba(255, 0, 85, 0.3)',
      duration: 0.3
    }, 0.3);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe stat cards
  document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
  });

  // Observe threat card
  const threatCard = document.querySelector('.threat-card');
  if (threatCard) observer.observe(threatCard);
}

// ============================================
// HOVER EFFECTS - Interactive Elements
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Stat card hover glow
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        boxShadow: '0 0 20px rgba(232, 149, 110, 0.3)',
        duration: 0.3
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        boxShadow: '0 0 0px rgba(232, 149, 110, 0)',
        duration: 0.3
      });
    });
  });

  // Archetype tag hover
  const tags = document.querySelectorAll('.archetype-tag');
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      gsap.to(tag, {
        scale: 1.08,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
    
    tag.addEventListener('mouseleave', () => {
      gsap.to(tag, {
        scale: 1,
        duration: 0.2
      });
    });
  });

  // Rhythm bars react to mouse movement
  const rhythmBars = document.querySelectorAll('.rhythm-bar.active');
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    rhythmBars.forEach((bar, index) => {
      const offset = (index - 2) * 0.15;
      gsap.to(bar, {
        scaleY: 0.6 + 0.4 * (Math.sin(mouseX + offset) * 0.5 + 0.5),
        duration: 0.2
      });
    });
  });
});

// ============================================
// THREAT CARD ANIMATION - On Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const threatItems = document.querySelectorAll('.threat-item');
  
  threatItems.forEach((item, index) => {
    const threatFill = item.querySelector('.threat-fill');
    
    // Reset width to 0
    gsap.set(threatFill, { width: '0%' });
    
    // Animate in with delay
    gsap.to(threatFill, {
      width: threatFill.style.width,
      duration: 0.8,
      delay: 0.5 + index * 0.15,
      ease: 'power3.out'
    });
  });
});

// ============================================
// EASTER EGGS - Keyboard Shortcuts
// ============================================

document.addEventListener('keydown', (e) => {
  // 'V' key - Show Valentino's "unbothered" vibe
  if (e.key.toLowerCase() === 'v') {
    const valImg = document.getElementById('valentinoImg');
    gsap.timeline()
      .to(valImg, { rotation: 10, duration: 0.1 })
      .to(valImg, { rotation: -10, duration: 0.1 })
      .to(valImg, { rotation: 0, duration: 0.2 });
  }

  // 'P' key - Trigger pressure spike
  if (e.key.toLowerCase() === 'p') {
    const gauge = document.getElementById('gaugeIndicator');
    gsap.to(gauge, {
      width: '75%',
      duration: 0.3,
      ease: 'back.out',
      yoyo: true,
      repeat: 1
    });
  }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Reduce animation complexity on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable complex animations for accessibility
  gsap.globalTimeline.timeScale(0.5);
}

// Cleanup audio on page unload
window.addEventListener('beforeunload', () => {
  const audio = document.getElementById('bgm');
  if (audio && !audio.paused) {
    audio.pause();
  }
});

console.log('%c🇵🇦 VALENTINO DE LA CRUZ 🇵🇦', 'color: #e8956e; font-size: 16px; font-weight: bold;');
console.log('%cThe Untouchable. Master of Las Cintas.', 'color: #00f2fe; font-size: 12px;');
console.log('%cPress "V" for unbothered energy. Press "P" for pressure surge.', 'color: #8a99ad; font-size: 11px;');
