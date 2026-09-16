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

// ==================== ABA ATIVA CONFORME SCROLL ====================
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('[id]');

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

// ==================== NOTIFICAÇÃO ESTILO MSN ====================
const msnToast = document.getElementById('msn-toast');
const msnAudio = document.getElementById('msn-audio');
const msnCloseBtn = document.querySelector('.msn-toast-close');
const msnOptionsBtn = document.querySelector('.msn-toast-options');
let msnHideTimer = null;

function isDesktopWidth() {
  return window.innerWidth > 720;
}

function hideMsnToast() {
  if (msnToast) {
    msnToast.classList.remove('show');
  }
}

// Navegadores bloqueiam áudio com som antes de qualquer interação do
// usuário na página. Destrava a reprodução assim que a pessoa clicar,
// tocar na tela ou apertar uma tecla pela primeira vez.
let msnAudioUnlocked = false;

function unlockMsnAudio() {
  if (msnAudioUnlocked || !msnAudio) return;

  msnAudio.play()
    .then(() => {
      msnAudio.pause();
      msnAudio.currentTime = 0;
      msnAudioUnlocked = true;
    })
    .catch(() => {
      // Ainda bloqueado; tentará novamente no próximo gesto do usuário.
    });
}

['click', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
  document.addEventListener(evt, unlockMsnAudio, { once: true, passive: true });
});

function showMsnToast() {
  if (!msnToast || !isDesktopWidth()) return;

  msnToast.classList.add('show');

  if (msnAudio) {
    msnAudio.currentTime = 0;
    msnAudio.play().catch(() => {
      // Reprodução bloqueada pelo navegador; ignora silenciosamente.
    });
  }

  clearTimeout(msnHideTimer);
  msnHideTimer = setTimeout(hideMsnToast, 6000);
}

if (msnToast) {
  if (msnCloseBtn) {
    msnCloseBtn.addEventListener('click', hideMsnToast);
  }

  if (msnOptionsBtn) {
    msnOptionsBtn.addEventListener('click', hideMsnToast);
  }

  setTimeout(showMsnToast, 5000);
  setInterval(showMsnToast, 120000);
}
