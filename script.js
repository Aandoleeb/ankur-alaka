const music = document.getElementById("bgMusic");
const msgElem = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");

const storyLines = [
  "Tnce upon a time, in a world full of people... 💫",
  "Hwo souls crossed paths — Ankur and Alaka 🌸",
  "De smiled. She blushed. The world slowed down for a moment 💞",
  "Aays turned into memories, laughter turned into music 🎶",
  "Bnd in every heartbeat, their love kept whispering forever ❤️",
  "Aecause some stories are written not in ink, but in the stars ✨",
  "Ankur ❤️ Alaka — A love meant to shine eternally 💫"
];

let lineIndex = 0;
let charIndex = 0;
let typing = false;
let musicStarted = false;

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 10 + "px";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}

function typeLine() {
  if (charIndex < storyLines[lineIndex].length) {
    msgElem.textContent += storyLines[lineIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeLine, 60);
  } else {
    typing = false;
    nextBtn.disabled = false;
  }
}

nextBtn.addEventListener("click", async () => {
  // Start music on first click
  if (!musicStarted) {
    try {
      await music.play();
      musicStarted = true;
      console.log("🎵 Music started!");
    } catch (err) {
      console.warn("Autoplay blocked! Showing play hint.");
      const hint = document.createElement("div");
      hint.textContent = "🔊 Tap anywhere to start music!";
      hint.style.position = "fixed";
      hint.style.bottom = "20px";
      hint.style.left = "50%";
      hint.style.transform = "translateX(-50%)";
      hint.style.background = "rgba(255,255,255,0.3)";
      hint.style.padding = "10px 20px";
      hint.style.borderRadius = "20px";
      hint.style.backdropFilter = "blur(5px)";
      hint.style.color = "white";
      hint.style.fontWeight = "bold";
      document.body.appendChild(hint);
      document.body.addEventListener(
        "click",
        () => {
          music.play();
          hint.remove();
        },
        { once: true }
      );
    }
  }

  if (typing) return;

  nextBtn.disabled = true;
  msgElem.textContent = "";
  charIndex = 0;
  typing = true;

  typeLine();

  for (let j = 0; j < 25; j++) {
    setTimeout(createHeart, j * 120);
  }

  document.body.style.background = `radial-gradient(circle at top, hsl(${Math.random() * 360}, 90%, 75%), #ff4b91)`;

  lineIndex = (lineIndex + 1) % storyLines.length;
  nextBtn.textContent =
    lineIndex === storyLines.length - 1 ? "Play Again 💞" : "Next 💫";
});

setInterval(createHeart, 500);


