// ==================== SMOOTH SCROLL ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    // Ignora se for apenas "#"
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Scroll suave nativo (melhor compatibilidade)
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Atualiza o histórico sem reload
      history.pushState(null, null, targetId);
    }
  });
});

// ==================== HIGHLIGHT DO LINK ATIVO ==================== 
const sectionLinks = document.querySelectorAll('.section-link');
const sections = document.querySelectorAll('[id]');

function updateActiveLink() {
  let currentSection = '';
  
  // Encontra qual seção está mais visível
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    // Se a seção está visível (com margem de 150px para ativar antes)
    if (window.scrollY >= sectionTop - 150) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Atualiza classe ativa nos links
  sectionLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Escuta scroll
window.addEventListener('scroll', updateActiveLink);

// Chama na carga da página
updateActiveLink();

// ==================== EFEITOS DE INTERATIVIDADE ==================== 

// Adiciona efeito de glow ao passar o mouse em seções
const glowSections = document.querySelectorAll('.subsection, .about, .contact');

glowSections.forEach(section => {
  section.addEventListener('mouseenter', function () {
    this.style.boxShadow = '0 16px 60px rgba(78, 242, 255, 0.3)';
  });
  
  section.addEventListener('mouseleave', function () {
    this.style.boxShadow = '0 16px 50px rgba(2, 4, 12, 0.4)';
  });
});

// ==================== SCROLL REVEAL (OPCIONAL) ==================== 
// Anima elementos conforme entram em viewport (observador)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observa subsections
document.querySelectorAll('.subsection').forEach(el => {
  observer.observe(el);
});

// ==================== AJUSTE DINÂMICO DO ESPAÇO DA NAVBAR ====================
// A navbar é fixa e no celular pode quebrar em mais linhas (marca + link do
// repositório + links de navegação), então o espaço reservado precisa
// acompanhar a altura real dela para não cobrir o conteúdo abaixo.
const navbarEl = document.querySelector('.navbar');
const mainContentEl = document.querySelector('.main-content');

function adjustMainContentOffset() {
  if (!navbarEl || !mainContentEl) return;
  mainContentEl.style.paddingTop = `${navbarEl.offsetHeight + 24}px`;
}

window.addEventListener('load', adjustMainContentOffset);
window.addEventListener('resize', adjustMainContentOffset);
window.addEventListener('orientationchange', adjustMainContentOffset);

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(adjustMainContentOffset);
}

adjustMainContentOffset();

console.log('✓ Portfolio script loaded');
