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
    // save theme to localStorage
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
  // On load, set theme from localStorage if exists
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  updateThemeIcon();
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

// --- Логика лицензии (НЕ ТРОГАТЬ, как просил пользователь) ---
const nameInput = document.getElementById("nameInput");
const yearInput = document.getElementById("yearInput");
const licenseText = document.getElementById("licenseText");

function generateLicense() {
  const name = nameInput.value.trim();
  const year = yearInput.value.trim();

  if (!name || !year) {
    alert("Zəhmət olmasa, həm ad-soyad, həm də ili daxil edin.");
    return;
  }

  const license = `
## Neon Public Protective License (NPPL) v1.0

**Created by ${name}, Neon Group Azerbaijan**  
**License Type: Restrictive Protective Open License**

---

### 1. Purpose

This license is designed to help **independent developers and creators** protect their original projects from unauthorized use, cloning, and commercialization, especially in the age of automated s[...]

---

### 2. Grant of Rights

The Licensor grants the Licensee the **non-exclusive right to use, view, and learn from the source code** for non-commercial, personal, and educational purposes **only**.

Use in any **production, distribution, AI training, commercial project, or modified form** is **strictly prohibited** unless explicitly permitted in writing by the original author.

---

### 3. Restrictions

Licensee shall not:

* a) Copy, modify, fork, or distribute the software or any part thereof.  
* b) Use it in any commercial, governmental, or institutional project.  
* c) Publish modified or rebranded versions, even with attribution.  
* d) Use or integrate the code into AI models, bots, or LLM pipelines.  
* e) Upload or mirror the code on GitHub, Hugging Face, or other code hosts without permission.  
* f) Remove or alter copyright notices.

---

### 4. AI & Machine Learning Clause

* Use of the code, architecture, design, or logic in **training datasets**, **LLMs**, or **code-generation systems** is **strictly prohibited**.  
* Generating derivatives via AI that replicate or approximate this project constitutes a license violation.

---

### 5. Educational Fair Use

Reading and analyzing the code for **learning or research** is allowed **only if** the project remains unmodified and is not redistributed.

---

### 6. Attribution

Any authorized use must retain original credits:

\`\`\`
© ${year} ${name} - Licensed under the Neon Public Protective License (NPPL)
\`\`\`

---

### 7. Termination

Violating any terms of this license **immediately revokes all granted rights**, and the licensee must delete all copies of the Product in their possession.

---

### 8. Jurisdiction

This license is governed by international copyright laws and enforced under the jurisdiction of the author’s country of residence (Azerbaijan by default).

---

### 9. Contact

Permission requests must be submitted to the author.

* Email: [Sultanov.mbk@gmail.com](mailto:Sultanov.mbk@gmail.com)  
* Website: [https://neongroup.me](https://neongroup.me)  
* Telegram: [https://t.me/neonsahib](https://t.me/neonsahib)

---

## How to Use This License in Your Project

To use this license in your own project, include the following in your README or LICENSE file:

\`\`\`
Licensed under the Neon Public Protective License v1.0  
See https://neongroup.me/license for details.
\`\`\`
  `.trim();

  licenseText.value = license;
}

function copyLicense() {
  if (!licenseText.value.trim()) {
    alert("Əvvəlcə lisenziyanı yaradın.");
    return;
  }
  navigator.clipboard.writeText(licenseText.value)
    .then(() => alert("Lisenziya mətnini kopyaladınız!"))
    .catch(() => alert("Kopyalama alınmadı, brauzeriniz bu funksiyanı dəstəkləyə bilməz."));
}

function downloadLicense() {
  if (!licenseText.value.trim()) {
    alert("Əvvəlcə lisenziyanı yaradın.");
    return;
  }
  const blob = new Blob([licenseText.value], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "NPPL_LICENSE.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Привязка кнопок, если нужно, можно вызвать в window.onload или после DOM готовности
document.addEventListener("DOMContentLoaded", () => {
  const genBtn = document.querySelector(".generator-form button");
  if (genBtn) genBtn.addEventListener("click", generateLicense);

  const copyBtn = document.querySelector(".license-actions button:nth-child(1)");
  if (copyBtn) copyBtn.addEventListener("click", copyLicense);

  const downloadBtn = document.querySelector(".license-actions button:nth-child(2)");
  if (downloadBtn) downloadBtn.addEventListener("click", downloadLicense);
});
