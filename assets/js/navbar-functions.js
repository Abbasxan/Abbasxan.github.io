// Theme toggle and scroll functionality
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const iconMoon = document.querySelector(".icon-moon")
  const iconSun = document.querySelector(".icon-sun")

  function updateThemeIcon() {
    if (!iconMoon || !iconSun) return

    const isDark = document.body.classList.contains("dark")
    iconMoon.style.display = isDark ? "inline" : "none"
    iconSun.style.display = isDark ? "none" : "inline"
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark")
      updateThemeIcon()

      // Save theme preference
      const theme = document.body.classList.contains("dark") ? "dark" : "light"
      localStorage.setItem("theme", theme)

      // Dispatch custom event for theme change
      window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme } }))
    })

    // Load saved theme
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.body.classList.add("dark")
    }

    updateThemeIcon()
  }
}

function setupScrollUp() {
  const scrollBtn = document.getElementById("scrollUpBtn")
  if (!scrollBtn) return

  let isVisible = false

  function updateScrollButton() {
    const shouldShow = window.scrollY > 300

    if (shouldShow && !isVisible) {
      scrollBtn.classList.add("show")
      isVisible = true
    } else if (!shouldShow && isVisible) {
      scrollBtn.classList.remove("show")
      isVisible = false
    }
  }

  // Throttle scroll events for better performance
  let ticking = false
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollButton()
        updateScrollProgress()
        ticking = false
      })
      ticking = true
    }
  })

  // Smooth scroll to top
  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

function updateScrollProgress() {
  const scrollCircle = document.querySelector(".scroll-progress")
  if (!scrollCircle) return

  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = Math.min(scrollTop / docHeight, 1)

  const radius = scrollCircle.r.baseVal.value
  const circumference = 2 * Math.PI * radius
  const offset = circumference - progress * circumference

  scrollCircle.style.strokeDasharray = `${circumference}`
  scrollCircle.style.strokeDashoffset = `${offset}`
}

// Initialize when DOM is ready
function initializeNavbarFunctions() {
  setupThemeToggle()
  setupScrollUp()
  updateScrollProgress()
}

// Auto-initialize if DOM is ready, otherwise wait
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeNavbarFunctions)
} else {
  initializeNavbarFunctions()
}

// Export functions for manual initialization if needed
window.NavbarFunctions = {
  setupThemeToggle,
  setupScrollUp,
  updateScrollProgress,
  init: initializeNavbarFunctions,
}
