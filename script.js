// Pop in the profile card smoothly on page load
gsap.from(".profile-card", {
  duration: 1.2,
  y: 40,
  opacity: 0,
  ease: "power3.out"
});

// Music Toggle Setup
const musicBtn = document.getElementById('musicToggle');
const audio = document.getElementById('bgm');

musicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    musicBtn.innerText = "⏸ Pause Track";
  } else {
    audio.pause();
    musicBtn.innerText = "▶ Play Track";
  }
});

// Dodge Mechanic (Simulating Las Cintas movement)
const attackBtn = document.getElementById('attackBtn');
const valImg = document.getElementById('valentinoImg');
const dodgeText = document.getElementById('dodgeText');

const dodgeMessages = [
  "LAS CINTAS FLOW!",
  "TOO SLOW, BRO!",
  "QUE SOPA? MISSED!",
  "DIDN'T EVEN LOOK!",
  "QUE PASÓ, BRO?"
];

attackBtn.addEventListener('click', () => {
  // Shift direction randomly
  const xShift = (Math.random() - 0.5) * 70;
  
  // Pick a random Japaspanish dodge quote
  dodgeText.innerText = dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)];

  // Animate Valentino slipping out of the way using fluid ribbon-like motion
  gsap.timeline()
    .to(valImg, { x: xShift, rotation: xShift / 10, duration: 0.15, ease: "power2.out" })
    .to(dodgeText, { opacity: 1, y: -25, duration: 0.2 }, "<")
    .to(valImg, { x: 0, rotation: 0, duration: 0.45, ease: "elastic.out(1, 0.4)" }, "+=0.1")
    .to(dodgeText, { opacity: 0, y: -45, duration: 0.3 }, "<");
});
