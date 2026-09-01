const STORAGE_KEY = '2000vibe-selected-character';

const characterMap = {
  'neon-racer': {
    name: 'Emo',
    className: 'emo',
  },
  'pixel-star': {
    name: 'Skatista',
    className: 'skatista',
  },
  'chrome-rebel': {
    name: 'Dançarina Psy',
    className: 'psy',
  },
};

const explicitSoundMap = {
  'Vídeo Games': 'VideoGames.mp3',
  'Televisão': 'Televisao.mp3',
  Esportes: 'Esportes.mp3',
};

const checkpointDefaults = [
  { id: 'brincadeiras', title: 'Brincadeiras', side: 'left', distance: 220, image: 'assets/images/areas/brincadeiras.jpg', sound: null, minimal: true },
  { id: 'musicas', title: 'Músicas', side: 'right', distance: 460, image: 'assets/images/areas/musicas.png', sound: null, minimal: false },
  { id: 'videogames', title: 'Vídeo Games', side: 'left', distance: 700, image: 'assets/images/areas/videogames.png', sound: 'VideoGames.mp3', minimal: false },
  { id: 'internet', title: 'Internet', side: 'right', distance: 980, image: 'assets/images/areas/internet.png', sound: 'Internet.mp3', minimal: true },
  { id: 'tecnologias', title: 'Tecnologias', side: 'left', distance: 1260, image: 'assets/images/areas/tecnologias.png', sound: 'Tecnologias.mp3', minimal: false },
  { id: 'televisao', title: 'Televisão', side: 'right', distance: 1540, image: 'assets/images/areas/televisao.jpg', sound: 'Televisao.mp3', minimal: false },
  { id: 'eventos', title: 'Eventos', side: 'left', distance: 1820, image: 'assets/images/areas/eventos.png', sound: null, minimal: false },
  { id: 'esportes', title: 'Esportes', side: 'right', distance: 2000, image: 'assets/images/areas/esportes.jpg', sound: 'Esportes.mp3', minimal: false },
];

const finalCheckpoint = {
  id: 9,
  title: 'Final',
  side: null,
  distance: 2350,
  image: 'assets/images/areas/final.png',
  sound: null,
  minimal: false,
  text: '',
  video: null,
};

const checkpoints = checkpointDefaults.map((checkpoint) => ({ ...checkpoint, text: '', video: null }));

const map = document.getElementById('game-map');
const player = document.getElementById('player');
const playerName = document.getElementById('player-name');
const markersContainer = document.getElementById('lane-markers');
const restartButton = document.getElementById('restart-button');
const checkpointModal = document.getElementById('checkpoint-modal');
const checkpointTag = document.getElementById('checkpoint-tag');
const checkpointTitle = document.getElementById('checkpoint-title');
const checkpointText = document.getElementById('checkpoint-text');
const checkpointImage = document.getElementById('checkpoint-image');
const checkpointVideo = document.getElementById('checkpoint-video');
const checkpointVideoWrapper = document.getElementById('checkpoint-video-wrapper');
const closeCheckpointButton = document.getElementById('close-checkpoint');
const finishPopup = document.getElementById('finish-popup');
const activeCheckpointSound = { audio: null };

function getCheckpointImagePath(checkpointTitleValue, fallbackPath) {
  if (checkpointTitleValue === 'Brincadeiras') {
    return fallbackPath || 'assets/images/areas/brincadeiras.jpg';
  }

  if (checkpointTitleValue === 'Internet') {
    return 'assets/images/areas/internet.png';
  }

  return fallbackPath || 'assets/images/areas/final.png';
}

function getModalImagePath(checkpoint) {
  if (checkpoint.title === 'Brincadeiras') {
    return 'assets/images/areas/bola_de_gude.png';
  }

  if (checkpoint.title === 'Internet') {
    return 'assets/images/areas/comunidade_orkut.png';
  }

  return checkpoint.image || 'assets/images/areas/final.png';
}

function buildVideoUrl(videoEntry) {
  if (!videoEntry) return null;

  const id = String(videoEntry).split('youtu.be/')[1]?.split(/[?&]/)[0]
    || String(videoEntry).split('youtube.com/watch?v=')[1]?.split(/[?&]/)[0]
    || String(videoEntry).replace(/&.*$/, '').trim();

  if (!id) return null;

  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    rel: '0',
  });

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

async function hydrateCheckpointsFromJson() {
  try {
    const response = await fetch('checkpoints.json');
    if (!response.ok) throw new Error('Erro ao carregar checkpoints.json');

    const checkpointEntries = await response.json();
    const checkpointMap = new Map(checkpointEntries.map((entry) => [entry.nome, entry]));

    checkpoints.forEach((checkpoint) => {
      const source = checkpointMap.get(checkpoint.title);
      if (!source) return;

      checkpoint.text = source.texto || `${checkpoint.title} foi registrado.`;
      checkpoint.image = getCheckpointImagePath(checkpoint.title, source.image || source.imagem || checkpoint.image);
      checkpoint.sound = source.sound || source.som || explicitSoundMap[checkpoint.title] || checkpoint.sound || null;
      checkpoint.video = buildVideoUrl(source.videos_youtube?.[0]) || null;
      checkpoint.minimal = source.minimal ?? checkpoint.minimal;
    });

    const finalSource = checkpointMap.get('Final');
    if (finalSource) {
      finalCheckpoint.text = finalSource.texto || 'Você completou a jornada pela nostalgia!';
      finalCheckpoint.image = 'assets/images/areas/final.png';
      finalCheckpoint.video = buildVideoUrl(finalSource.videos_youtube?.[0]) || null;
      finalCheckpoint.sound = finalSource.sound || finalSource.som || finalCheckpoint.sound || null;
    }
  } catch (error) {
    console.warn('Não foi possível carregar checkpoints.json:', error);
    checkpoints.forEach((checkpoint) => {
      checkpoint.text = checkpoint.text || `${checkpoint.title} foi registrado.`;
      checkpoint.image = getCheckpointImagePath(checkpoint.title, checkpoint.image);
      checkpoint.video = null;
      checkpoint.sound = checkpoint.sound || null;
    });
  }

  buildCheckpoints();
  renderCheckpoints();
}

const finishDistance = 2350;
const finishVisibleDistance = 150;

const state = {
  distance: 0,
  roadOffset: 0,
  sceneOffset: 0,
  baseSpeed: 500,
  reverseSpeed: 500,
  isPaused: false,
  forwardHeld: false,
  backwardHeld: false,
  passedCheckpoints: new Set(),
  finalTriggered: false,
  lastTimestamp: 0,
  currentCharacter: 'neon-racer',
};

function getSelectedCharacter() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved && characterMap[saved] ? saved : 'neon-racer';
}

function applyCharacterVisual(characterKey) {
  const config = characterMap[characterKey];
  player.classList.remove('emo', 'skatista', 'psy');
  player.classList.add(config.className);
  playerName.textContent = config.name;
}

function buildCheckpoints() {
  markersContainer.innerHTML = checkpoints
    .filter((checkpoint) => checkpoint.title !== 'Final')
    .map(
      (checkpoint) => `
        <button
          class="checkpoint-card"
          type="button"
          data-id="${checkpoint.id}"
          aria-label="${checkpoint.title}"
          title="${checkpoint.title}"
          style="left:${checkpoint.side === 'left' ? '26%' : '74%'}; top: 18%"
        >
          <img src="${checkpoint.image}" alt="${checkpoint.title}" />
          <span class="checkpoint-name">${checkpoint.title}</span>
        </button>
      `
    )
    .join('');

  markersContainer.querySelectorAll('.checkpoint-card').forEach((card) => {
    card.addEventListener('click', () => {
      const checkpoint = checkpoints.find((item) => item.id === card.dataset.id);
      if (checkpoint) {
        openCheckpoint(checkpoint);
      }
    });
  });
}

function renderCheckpoints() {
  const cards = markersContainer.querySelectorAll('.checkpoint-card');

  cards.forEach((card) => {
    const checkpoint = checkpoints.find((item) => item.id === card.dataset.id);
    if (!checkpoint) return;

    const relative = checkpoint.distance - state.distance;
    const visible = relative >= -100 && relative <= 900;

    if (!visible) {
      card.style.display = 'none';
      return;
    }

    const progress = 1 - Math.min(Math.max(relative / 900, 0), 1);
    const y = 18 + progress * 60;
    const x = checkpoint.side === 'left' ? 26 : 74;

    card.style.display = 'block';
    card.style.left = `${x}%`;
    card.style.top = `${y}%`;
    card.style.opacity = `${Math.min(1, 0.4 + progress)}`;
  });
}

function normalizeSoundName(value) {
  return String(value || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.]/g, '')
    .toLowerCase();
}

function resolveCheckpointSound(checkpoint) {
  const normalizedTitle = normalizeSoundName(checkpoint.title);
  const sourceCandidates = [
    checkpoint.sound,
    explicitSoundMap[checkpoint.title],
    checkpoint.sound && checkpoint.sound.replace(/\s+/g, ''),
  ];

  for (const candidate of sourceCandidates) {
    if (!candidate) continue;
    const normalizedCandidate = normalizeSoundName(candidate);
    if (!normalizedCandidate) continue;
    if (normalizedCandidate.includes(normalizedTitle) || normalizedTitle.includes(normalizedCandidate)) {
      return candidate;
    }
  }

  return checkpoint.sound || explicitSoundMap[checkpoint.title] || null;
}

function playCheckpointSound(checkpoint) {
  const soundName = resolveCheckpointSound(checkpoint);
  if (!soundName) return;

  if (activeCheckpointSound.audio) {
    activeCheckpointSound.audio.pause();
    activeCheckpointSound.audio.currentTime = 0;
  }

  const audio = new Audio(`assets/sounds/${soundName}`);
  audio.volume = 0.5;
  audio.play().catch(() => {});
  activeCheckpointSound.audio = audio;
}

function openCheckpoint(checkpoint) {
  checkpointModal.classList.remove('hidden');

  const isMinimalLayout = checkpoint.minimal === true && checkpoint.title !== 'Final';
  checkpointTag.style.display = isMinimalLayout ? 'none' : 'block';
  checkpointTitle.style.display = isMinimalLayout ? 'none' : 'block';

  checkpointText.textContent = checkpoint.text || `${checkpoint.title} foi registrado.`;
  checkpointImage.src = getModalImagePath(checkpoint);
  checkpointImage.alt = checkpoint.title;

  if (checkpoint.video) {
    checkpointVideo.src = checkpoint.video;
    checkpointVideoWrapper.classList.remove('hidden');
  } else {
    checkpointVideo.src = '';
    checkpointVideo.removeAttribute('src');
    checkpointVideoWrapper.classList.add('hidden');
  }

  playCheckpointSound(checkpoint);
  state.isPaused = true;
}

function closeCheckpoint() {
  checkpointModal.classList.add('hidden');
  checkpointImage.src = '';
  checkpointVideo.src = '';
  checkpointVideo.removeAttribute('src');
  checkpointVideoWrapper.classList.add('hidden');
  checkpointTitle.style.display = 'block';
  checkpointTag.style.display = 'block';

  if (activeCheckpointSound.audio) {
    activeCheckpointSound.audio.pause();
    activeCheckpointSound.audio.currentTime = 0;
    activeCheckpointSound.audio = null;
  }

  state.isPaused = false;
}

function togglePause() {
  if (checkpointModal.classList.contains('hidden')) {
    state.isPaused = !state.isPaused;
    return;
  }

  closeCheckpoint();
}

function resetRun() {
  state.distance = 0;
  state.roadOffset = 0;
  state.sceneOffset = 0;
  state.isPaused = false;
  state.forwardHeld = false;
  state.backwardHeld = false;
  state.passedCheckpoints = new Set();
  state.finalTriggered = false;
  state.lastTimestamp = 0;

  checkpointModal.classList.add('hidden');
  checkpointImage.src = '';
  finishPopup.classList.add('hidden');
  map.style.backgroundPositionY = '0px';
  renderCheckpoints();
}

function showFinalMessage() {
  if (state.finalTriggered) return;

  state.finalTriggered = true;
  openCheckpoint(finalCheckpoint);

  finishPopup.classList.remove('hidden');
  state.isPaused = true;

  window.setTimeout(() => {
    finishPopup.classList.add('hidden');
  }, 1600);
}

function updateGame(delta) {
  if (state.isPaused) return;

  let speed = 0;

  if (state.forwardHeld && !state.backwardHeld) {
    speed = state.baseSpeed;
  }

  if (state.backwardHeld && !state.forwardHeld) {
    speed = -state.reverseSpeed;
  }

  const nextDistance = Math.max(0, state.distance + speed * delta);
  state.distance = nextDistance;
  state.roadOffset = (state.roadOffset + Math.abs(speed) * delta * 1.5) % 180;
  map.style.backgroundPositionY = `${state.roadOffset}px`;

  const finishSign = document.getElementById('finish-sign');
  const isNearFinish = state.distance >= finishDistance - finishVisibleDistance;

  if (finishSign) {
    finishSign.style.display = isNearFinish ? 'block' : 'none';
  }

  checkpoints
    .filter((checkpoint) => checkpoint.title !== 'Final')
    .forEach((checkpoint) => {
      if (state.distance >= checkpoint.distance && !state.passedCheckpoints.has(checkpoint.id)) {
        state.passedCheckpoints.add(checkpoint.id);
      }
    });

  if (state.distance >= finishDistance) {
    showFinalMessage();
  }

  renderCheckpoints();
}

function loop(timestamp) {
  if (!state.lastTimestamp) {
    state.lastTimestamp = timestamp;
  }

  const delta = (timestamp - state.lastTimestamp) / 1000;
  state.lastTimestamp = timestamp;

  updateGame(delta);
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key === 'ArrowUp') {
    event.preventDefault();
    state.forwardHeld = true;
  }

  if (key === 'ArrowDown') {
    event.preventDefault();
    state.backwardHeld = true;
  }

  if (key === 'p' || key === ' ') {
    event.preventDefault();
    togglePause();
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    state.forwardHeld = false;
  }

  if (event.key === 'ArrowDown') {
    state.backwardHeld = false;
  }
});

restartButton.addEventListener('click', resetRun);
closeCheckpointButton.addEventListener('click', closeCheckpoint);

const touchForwardButton = document.getElementById('touch-forward');
const touchBackButton = document.getElementById('touch-back');

function bindHoldButton(button, onPress, onRelease) {
  if (!button) return;

  const press = (event) => {
    event.preventDefault();
    onPress();
  };

  const release = (event) => {
    event.preventDefault();
    onRelease();
  };

  button.addEventListener('pointerdown', press);
  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('pointerleave', release);
}

bindHoldButton(
  touchForwardButton,
  () => { state.forwardHeld = true; },
  () => { state.forwardHeld = false; }
);

bindHoldButton(
  touchBackButton,
  () => { state.backwardHeld = true; },
  () => { state.backwardHeld = false; }
);

const initialCharacter = getSelectedCharacter();
state.currentCharacter = initialCharacter;
applyCharacterVisual(initialCharacter);
hydrateCheckpointsFromJson();
requestAnimationFrame(loop);
