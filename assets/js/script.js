// Toggle mobil menyu
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".toggle-menu");
  const navLinks = document.querySelector(".nav-links");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});

// Dark/Light mode toggle
const themeToggle = document.createElement("button");
themeToggle.innerText = "🌓";
themeToggle.className = "theme-toggle";
document.body.appendChild(themeToggle);

themeToggle.style.position = "fixed";
themeToggle.style.bottom = "20px";
themeToggle.style.right = "20px";
themeToggle.style.padding = "10px 14px";
themeToggle.style.borderRadius = "50%";
themeToggle.style.border = "none";
themeToggle.style.cursor = "pointer";
themeToggle.style.zIndex = "1000";
themeToggle.style.background = "#f72ee2";
themeToggle.style.color = "#fff";

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

