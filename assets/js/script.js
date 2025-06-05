// AOS init
AOS.init({ duration: 1000, once: true, offset: 100 });

// Scroll Up Button + Progress
const scrollUpBtn = document.getElementById("scrollUpBtn");
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener("scroll", () => {
  scrollUpBtn.classList.toggle("show", window.scrollY > 300);

  // Scroll progress effect
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / docHeight);
  const dasharray = 81.68;
  if (scrollProgress) {
    scrollProgress.style.strokeDashoffset = dasharray - (dasharray * scrolled);
  }
});

// Mobile menu
const menuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Typed.js
if (document.getElementById("typed")) {
  new Typed("#typed", {
    strings: [
      "Python proqramçısıyam 🐍",
      "Botlar yaradıram 🤖",
      "Avtomatlaşdırma ilə məşğulam ⚙️"
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true
  });
}

// Theme toggle (UI/UX toggle)
const themeToggle = document.getElementById("themeToggle");
const iconMoon = document.querySelector('.icon-moon');
const iconSun = document.querySelector('.icon-sun');
function updateThemeIcon() {
  if (document.body.classList.contains("light-mode")) {
    if (iconMoon) iconMoon.style.display = "inline";
    if (iconSun) iconSun.style.display = "none";
  } else {
    if (iconMoon) iconMoon.style.display = "none";
    if (iconSun) iconSun.style.display = "inline";
  }
}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    updateThemeIcon();
  });
  updateThemeIcon();
}
