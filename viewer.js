// Viewer state
let viewerState = {
    filteredLevels: [],
    currentFilter: 'all',
    searchQuery: ''
};

// DOM Elements
const levelsGrid = document.getElementById('levels-grid');
const filterDifficulty = document.getElementById('filter-difficulty');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('level-modal');
const modalTitle = document.getElementById('modal-title');
const modalDifficulty = document.getElementById('modal-difficulty');
const modalStats = document.getElementById('modal-stats');
const modalSquares = document.getElementById('modal-squares');
const modalSolutionText = document.getElementById('modal-solution-text');
const modalPlayLink = document.getElementById('modal-play-link');
const modalClose = document.querySelector('.modal-close');

// Initialize viewer
function initViewer() {
    viewerState.filteredLevels = levels.map((level, index) => ({ ...level, index }));
    renderLevels();
    setupEventListeners();
}

// Get difficulty class for CSS
function getDifficultyClass(difficulty) {
    return difficulty.toLowerCase().replace(' ', '-');
}

// Get square display value
function getSquareDisplay(square) {
    if (square.type === SquareType.NUMBER) {
        return square.value.toString();
    }
    return square.value;
}

// Count numbers and operations in a level
function getLevelStats(level) {
    const numbers = level.squares.filter(s => s.type === SquareType.NUMBER).length;
    const operations = level.squares.filter(s => s.type === SquareType.OPERATION).length;
    return { total: level.squares.length, numbers, operations };
}

// Create a mini square element
function createMiniSquare(square) {
    const el = document.createElement('div');
    el.className = 'mini-square';
    el.classList.add(square.type === SquareType.NUMBER ? 'number' : 'operation');
    el.textContent = getSquareDisplay(square);
    return el;
}

// Create a level card
function createLevelCard(level, index) {
    const difficulty = getLevelDifficulty(index);
    const stats = getLevelStats(level);

    const card = document.createElement('div');
    card.className = 'level-card';
    card.dataset.index = index;

    card.innerHTML = `
        <div class="level-card-header">
            <span class="level-card-number">${index + 1}</span>
            <span class="difficulty-badge ${getDifficultyClass(difficulty)}">${difficulty}</span>
        </div>
        <div class="level-card-name">${level.name}</div>
        <div class="level-card-preview"></div>
    `;

    const preview = card.querySelector('.level-card-preview');
    level.squares.forEach(square => {
        preview.appendChild(createMiniSquare(square));
    });

    card.addEventListener('click', () => openModal(index));

    return card;
}

// Render all levels
function renderLevels() {
    levelsGrid.innerHTML = '';

    if (viewerState.filteredLevels.length === 0) {
        levelsGrid.innerHTML = '<div class="empty-state"><p>Nessun livello trovato</p></div>';
        return;
    }

    viewerState.filteredLevels.forEach(level => {
        levelsGrid.appendChild(createLevelCard(level, level.index));
    });
}

// Filter levels
function filterLevels() {
    const difficulty = viewerState.currentFilter;
    const query = viewerState.searchQuery.toLowerCase().trim();

    viewerState.filteredLevels = levels
        .map((level, index) => ({ ...level, index }))
        .filter(level => {
            // Filter by difficulty
            if (difficulty !== 'all') {
                const levelDifficulty = getLevelDifficulty(level.index);
                if (levelDifficulty !== difficulty) return false;
            }

            // Filter by search query
            if (query) {
                const nameMatch = level.name.toLowerCase().includes(query);
                const numberMatch = (level.index + 1).toString().includes(query);
                if (!nameMatch && !numberMatch) return false;
            }

            return true;
        });

    renderLevels();
}

// Create full-size square for modal
function createModalSquare(square) {
    const el = document.createElement('div');
    el.className = 'square';

    if (square.type === SquareType.NUMBER) {
        el.classList.add('number');
        if (square.value > 0) el.classList.add('positive');
        else if (square.value < 0) el.classList.add('negative');
        else el.classList.add('zero');
    } else {
        el.classList.add('operation');
        if (square.value === OperationType.NEGATE) {
            el.classList.add('negate');
        } else {
            el.classList.add('multiply');
        }
    }

    el.textContent = getSquareDisplay(square);
    return el;
}

// Open modal with level details
function openModal(index) {
    const level = levels[index];
    const difficulty = getLevelDifficulty(index);
    const stats = getLevelStats(level);

    modalTitle.textContent = `Livello ${index + 1} - ${level.name}`;
    modalDifficulty.textContent = difficulty;
    modalDifficulty.className = `difficulty-badge ${getDifficultyClass(difficulty)}`;
    modalStats.textContent = `${stats.total} elementi (${stats.numbers} numeri, ${stats.operations} operazioni)`;

    modalSquares.innerHTML = '';
    level.squares.forEach(square => {
        modalSquares.appendChild(createModalSquare(square));
    });

    modalSolutionText.textContent = level.solution || 'Soluzione non documentata';
    modalPlayLink.href = `index.html#level=${index}`;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Setup event listeners
function setupEventListeners() {
    // Filter by difficulty
    filterDifficulty.addEventListener('change', (e) => {
        viewerState.currentFilter = e.target.value;
        filterLevels();
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        viewerState.searchQuery = e.target.value;
        filterLevels();
    });

    // Modal close
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// Start viewer
initViewer();
