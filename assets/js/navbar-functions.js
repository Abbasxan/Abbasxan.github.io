// Theme toggle logic
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const iconMoon = document.querySelector('.icon-moon');
  const iconSun = document.querySelector('.icon-sun');

  function updateThemeIcon() {
    if (!iconMoon || !iconSun) return;
    if (document.body.classList.contains("dark")) {
      iconMoon.style.display = "inline";
      iconSun.style.display = "none";
    } else {
      iconMoon.style.display = "none";
      iconSun.style.display = "inline";
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      updateThemeIcon();
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }

    updateThemeIcon();
  }
}

// Scroll-up button logic
function setupScrollUp() {
  const scrollBtn = document.getElementById("scrollUpBtn");
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollBtn.classList.add('show'); // <-- исправлено
    } else {
      scrollBtn.classList.remove('show'); // <-- исправлено
    }
  });
}
