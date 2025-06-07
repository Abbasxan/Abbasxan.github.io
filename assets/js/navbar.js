const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.onclick = () => navLinks.classList.toggle('open');
}

document.querySelectorAll('.has-dropdown').forEach(function(item) {
  item.addEventListener('mouseenter', function() {
    if(window.innerWidth > 768) item.classList.add('open');
  });
  item.addEventListener('mouseleave', function() {
    if(window.innerWidth > 768) item.classList.remove('open');
  });
  item.querySelector('.dropdown-toggle').addEventListener('focus', function() {
    if(window.innerWidth > 768) item.classList.add('open');
  });
  item.querySelector('.dropdown-toggle').addEventListener('blur', function() {
    if(window.innerWidth > 768) item.classList.remove('open');
  });
  item.querySelector('.dropdown-toggle').addEventListener('click', function(e) {
    if(window.innerWidth <= 768) {
      e.preventDefault();
      item.classList.toggle('open');
    }
  });
});

document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    if(window.innerWidth <= 768 && navLinks) navLinks.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
});
window.addEventListener('resize', () => {
  if(window.innerWidth > 768 && navLinks) navLinks.classList.remove('open');
  document.querySelectorAll('.has-dropdown.open').forEach(el => el.classList.remove('open'));
});
