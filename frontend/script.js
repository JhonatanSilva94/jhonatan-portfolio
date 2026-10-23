// ==================== LINK ATIVO CONFORME SCROLL ====================
const tabs = document.querySelectorAll('.nav-link[href^="#"]');
const sections = document.querySelectorAll('.section[id]');

function updateActiveTab() {
  let currentSection = 'inicio';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      currentSection = section.getAttribute('id');
    }
  });

  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('href') === `#${currentSection}`);
  });
}

window.addEventListener('scroll', updateActiveTab, { passive: true });
updateActiveTab();

// ==================== COPIAR E-MAIL ====================
document.querySelectorAll('[data-copy]').forEach(button => {
  const label = button.textContent;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = 'Endereço copiado';
      setTimeout(() => { button.textContent = label; }, 2000);
    } catch {
      // Sem acesso à área de transferência: abre o cliente de e-mail
      window.location.href = `mailto:${button.dataset.copy}`;
    }
  });
});
