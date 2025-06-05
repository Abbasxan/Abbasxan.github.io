// AOS init
if (typeof AOS !== "undefined") {
  AOS.init({ duration: 1000, once: true, offset: 100 });
}

// Scroll Up Button + Progress
const scrollUpBtn = document.getElementById("scrollUpBtn");
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener("scroll", () => {
  if (scrollUpBtn)
    scrollUpBtn.classList.toggle("show", window.scrollY > 300);

  // Scroll progress effect
  if (scrollProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / docHeight);
    const dasharray = 81.68;
    scrollProgress.style.strokeDashoffset = dasharray - (dasharray * scrolled);
  }
});

// Theme toggle (UI/UX toggle)
const themeToggle = document.getElementById("themeToggle");
const iconMoon = document.querySelector('.icon-moon');
const iconSun = document.querySelector('.icon-sun');
function updateThemeIcon() {
  if (!iconMoon || !iconSun) return;
  if (document.body.classList.contains("light-mode")) {
    iconMoon.style.display = "inline";
    iconSun.style.display = "none";
  } else {
    iconMoon.style.display = "none";
    iconSun.style.display = "inline";
  }
}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    updateThemeIcon();
  });
  updateThemeIcon();
}

// Mobile menu (если есть)
const menuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Typed.js (если есть)
if (document.getElementById("typed") && typeof Typed !== "undefined") {
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
