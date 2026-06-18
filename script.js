//////////////////////////////
// loading tiles
//////////////////////////////
window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("loading-grid");
  if (!grid) return;

  const cols = 12;
  const rows = 20;

  for (let i = 0; i < cols * rows; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    grid.appendChild(tile);
  }
});

//////////////////////////////
// scroll
//////////////////////////////
let scrollY = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

//////////////////////////////
// header animation
//////////////////////////////
const header = document.querySelector("header");
let current = 0;

function animate() {
  if (header) {
    current += (scrollY - current) * 0.1;
    const progress = Math.min(current / 200, 1);

    header.classList.toggle("shrink", scrollY > 50);

    header.style.background =
      `rgba(255,255,255,${0.45 + progress * 0.25})`;

    header.style.transform = `
      scale(${1 - progress * 0.05})
      translateY(${progress * -4}px)
    `;
  }

  requestAnimationFrame(animate);
}
animate();

//////////////////////////////
// fade observer
//////////////////////////////
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

//////////////////////////////
// loading remove
//////////////////////////////
window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const tiles = document.querySelectorAll(".tile");

  if (!loading) return;

  tiles.forEach((tile, i) => {
    setTimeout(() => tile.classList.add("hide"), i * 15);
  });

  setTimeout(() => {
    loading.style.opacity = "0";
    setTimeout(() => loading.remove(), 600);
  }, 900);
});

//////////////////////////////
// cursor
//////////////////////////////
const glow = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;
let cx = 0;
let cy = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cx += (mouseX - cx) * 0.12;
  cy += (mouseY - cy) * 0.12;

  if (glow) {
    glow.style.transform =
      `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

//////////////////////////////
// lightbox
//////////////////////////////

const images = document.querySelectorAll(
  ".work-images img, .graphic-grid img"
);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

if (lightbox) {

  images.forEach(img => {

    img.addEventListener("click", () => {

      lightboxImg.src = img.src;

      requestAnimationFrame(() => {
        lightbox.classList.add("show");
      });

    });

  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("show");
  });

}
