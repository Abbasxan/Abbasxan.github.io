// Enhanced Navbar functionality
class NavbarManager {
  constructor() {
    this.mobileMenuBtn = null
    this.navLinks = null
    this.dropdowns = []
    this.init()
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup())
    } else {
      this.setup()
    }
  }

  setup() {
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn")
    this.navLinks = document.getElementById("navLinks")

    if (this.mobileMenuBtn && this.navLinks) {
      this.setupMobileMenu()
      this.setupDropdowns()
      this.setupActiveLinks()
      this.setupEventListeners()
    }
  }

  setupMobileMenu() {
    this.mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault()
      this.toggleMobileMenu()
    })
  }

  toggleMobileMenu() {
    const isOpen = this.navLinks.classList.contains("open")
    this.navLinks.classList.toggle("open")
    this.mobileMenuBtn.classList.toggle("active")

    // Update aria-expanded
    this.mobileMenuBtn.setAttribute("aria-expanded", !isOpen)

    // Close all dropdowns when mobile menu closes
    if (isOpen) {
      this.closeAllDropdowns()
    }
  }

  setupDropdowns() {
    const dropdowns = document.querySelectorAll(".has-dropdown")

    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".dropdown-toggle")
      const menu = dropdown.querySelector(".dropdown")

      if (toggle && menu) {
        // Desktop hover events
        dropdown.addEventListener("mouseenter", () => {
          if (window.innerWidth > 768) {
            this.openDropdown(dropdown)
          }
        })

        dropdown.addEventListener("mouseleave", () => {
          if (window.innerWidth > 768) {
            this.closeDropdown(dropdown)
          }
        })

        // Mobile/keyboard click events
        toggle.addEventListener("click", (e) => {
          e.preventDefault()
          this.toggleDropdown(dropdown)
        })

        // Keyboard navigation
        toggle.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            this.toggleDropdown(dropdown)
          }
        })
      }
    })
  }

  openDropdown(dropdown) {
    dropdown.classList.add("open")
    const toggle = dropdown.querySelector(".dropdown-toggle")
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true")
    }
  }

  closeDropdown(dropdown) {
    dropdown.classList.remove("open")
    const toggle = dropdown.querySelector(".dropdown-toggle")
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false")
    }
  }

  toggleDropdown(dropdown) {
    const isOpen = dropdown.classList.contains("open")

    // Close all other dropdowns first
    this.closeAllDropdowns()

    if (!isOpen) {
      this.openDropdown(dropdown)
    }
  }

  closeAllDropdowns() {
    document.querySelectorAll(".has-dropdown.open").forEach((dropdown) => {
      this.closeDropdown(dropdown)
    })
  }

  setupActiveLinks() {
    const currentPage = this.getCurrentPage()
    const links = document.querySelectorAll(".nav-links a[data-page]")

    links.forEach((link) => {
      const page = link.getAttribute("data-page")
      if (page === currentPage) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  }

  getCurrentPage() {
    const path = window.location.pathname
    const filename = path.split("/").pop().replace(".html", "") || "index"

    // Handle special cases
    const pageMap = {
      deyisiklikler: "changelog",
      tertibatcilar: "contributors",
    }

    return pageMap[filename] || filename
  }

  setupEventListeners() {
    // Close mobile menu when clicking nav links
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          this.navLinks.classList.remove("open")
          this.mobileMenuBtn.classList.remove("active")
          this.mobileMenuBtn.setAttribute("aria-expanded", "false")
        }
      })
    })

    // Close dropdowns on scroll
    window.addEventListener("scroll", () => {
      this.closeAllDropdowns()
    })

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        this.navLinks.classList.remove("open")
        this.mobileMenuBtn.classList.remove("active")
        this.mobileMenuBtn.setAttribute("aria-expanded", "false")
      }
      this.closeAllDropdowns()
    })

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".has-dropdown")) {
        this.closeAllDropdowns()
      }
    })
  }
}

// Initialize navbar when script loads
new NavbarManager()

// Fallback for older browsers or if class doesn't work
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navLinks = document.getElementById("navLinks")

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault()
      navLinks.classList.toggle("open")
      mobileMenuBtn.classList.toggle("active")
    })
  }

  // Dropdown functionality
  document.querySelectorAll(".has-dropdown").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle")

    if (toggle) {
      // Desktop hover
      dropdown.addEventListener("mouseenter", () => {
        if (window.innerWidth > 768) {
          dropdown.classList.add("open")
        }
      })

      dropdown.addEventListener("mouseleave", () => {
        if (window.innerWidth > 768) {
          dropdown.classList.remove("open")
        }
      })

      // Mobile/Desktop click
      toggle.addEventListener("click", (e) => {
        e.preventDefault()
        dropdown.classList.toggle("open")
      })
    }
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) {
      document.querySelectorAll(".has-dropdown.open").forEach((dropdown) => {
        dropdown.classList.remove("open")
      })
    }
  })

  // Close mobile menu when clicking nav links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navLinks) {
        navLinks.classList.remove("open")
        if (mobileMenuBtn) mobileMenuBtn.classList.remove("active")
      }
    })
  })
})
