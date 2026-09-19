// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, null, targetId);
    }
  });
});

// ==================== LINK ATIVO CONFORME SCROLL ====================
const tabs = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section[id]');

function updateActiveTab() {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      currentSection = section.getAttribute('id');
    }
  });

  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('href') === `#${currentSection}`);
  });
}

window.addEventListener('scroll', updateActiveTab);
updateActiveTab();
