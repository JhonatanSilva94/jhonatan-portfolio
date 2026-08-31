const STORAGE_KEY = '2000vibe-selected-character';

const characters = {
  'neon-racer': {
    name: 'Emo',
  },
  'pixel-star': {
    name: 'Skatista',
  },
  'chrome-rebel': {
    name: 'Dançarina Psy',
  },
};

const cards = document.querySelectorAll('.character-card');
const summary = document.getElementById('selection-summary');
const startButton = document.getElementById('start-button');

function saveSelection(characterId) {
  if (!characterId) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(STORAGE_KEY, characterId);
}

function updateSelectionDisplay(selectedId) {
  cards.forEach((card) => {
    const isSelected = card.dataset.character === selectedId;
    card.classList.toggle('selected', isSelected);
    card.setAttribute('aria-pressed', String(isSelected));
  });

  const hasSelection = Boolean(selectedId && characters[selectedId]);
  startButton.disabled = !hasSelection;

  if (!hasSelection) {
    summary.textContent = 'Nenhum personagem selecionado.';
    return;
  }

  summary.textContent = `Personagem selecionado: ${characters[selectedId].name}`;
}

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const selectedId = card.dataset.character;
    saveSelection(selectedId);
    updateSelectionDisplay(selectedId);
  });
});

startButton.addEventListener('click', () => {
  window.location.href = 'map.html';
});

const savedSelection = localStorage.getItem(STORAGE_KEY);
updateSelectionDisplay(savedSelection && characters[savedSelection] ? savedSelection : null);
