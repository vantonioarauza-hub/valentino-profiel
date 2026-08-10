// Pop in the whole profile card smoothly on page load
gsap.from(".profile-card", {
  duration: 1.2,
  y: 50,
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

// Dodge Mechanic (Simulating his unique flow ability)
const attackBtn = document.getElementById('attackBtn');
const valImg = document.getElementById('valentinoImg');
const dodgeText = document.getElementById('dodgeText');

const dodgeMessages = [
  "DODGED!",
  "TOO SLOW!",
  "NOT EVEN CLOSE",
  "MISSED!",
  "HE'S NOT EVEN LOOKING"
];

attackBtn.addEventListener('click', () => {
  // Randomize dodge direction slightly
  const xShift = (Math.random() - 0.5) * 60;
  
  // Pick a random message
  dodgeText.innerText = dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)];

  // Animate Valentino slipping out of the way effortlessly
  gsap.timeline()
    .to(valImg, { x: xShift, duration: 0.15, ease: "power2.out" })
    .to(dodgeText, { opacity: 1, y: -20, duration: 0.2 }, "<")
    .to(valImg, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" }, "+=0.1")
    .to(dodgeText, { opacity: 0, y: -40, duration: 0.3 }, "<");
});
