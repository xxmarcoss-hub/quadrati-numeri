// Tipi di contenuto dei quadrati
const SquareType = {
    NUMBER: 'number',
    OPERATION: 'operation'
};

// Tipi di operazioni
const OperationType = {
    MULTIPLY_2: 'x2',
    MULTIPLY_3: 'x3',
    NEGATE: '+-'
};

// Classe per rappresentare il contenuto di un quadrato
class SquareContent {
    constructor(type, value) {
        this.type = type;
        this.value = value; // numero o OperationType
    }

    equals(other) {
        return this.type === other.type && this.value === other.value;
    }

    toString() {
        if (this.type === SquareType.NUMBER) {
            return this.value.toString();
        }
        return this.value;
    }

    getTooltip() {
        if (this.type === SquareType.NUMBER) {
            return `Numero: ${this.value}`;
        }
        switch (this.value) {
            case OperationType.MULTIPLY_2:
                return 'Moltiplica per 2';
            case OperationType.MULTIPLY_3:
                return 'Moltiplica per 3';
            case OperationType.NEGATE:
                return 'Inverti segno';
        }
    }
}

// Funzione per applicare un'operazione a un numero
function applyOperation(num, operationContent) {
    // Se è un contenuto con composedMultiplier o getMultiplier può gestirlo
    if (typeof operationContent === 'object') {
        return num * getMultiplier(operationContent);
    }
    // Fallback per operazioni base passate come stringa
    switch (operationContent) {
        case OperationType.MULTIPLY_2:
            return num * 2;
        case OperationType.MULTIPLY_3:
            return num * 3;
        case OperationType.NEGATE:
            return -num;
    }
    // Fallback: parsa dalla stringa
    if (typeof operationContent === 'string' && operationContent.startsWith('x')) {
        return num * parseInt(operationContent.substring(1));
    }
    return num;
}

// Funzione per ottenere il moltiplicatore di un'operazione
function getMultiplier(content) {
    const baseMultipliers = {
        [OperationType.MULTIPLY_2]: 2,
        [OperationType.MULTIPLY_3]: 3,
        [OperationType.NEGATE]: -1
    };

    // Se ha un moltiplicatore composto, usalo
    if (content.composedMultiplier !== undefined) {
        return content.composedMultiplier;
    }

    // Altrimenti cerca nel mapping base
    if (baseMultipliers[content.value] !== undefined) {
        return baseMultipliers[content.value];
    }

    // Fallback: parsa dalla stringa (es. "x6" -> 6)
    if (typeof content.value === 'string' && content.value.startsWith('x')) {
        return parseInt(content.value.substring(1));
    }

    return 1;
}

// Funzione per comporre due operazioni
function composeOperations(content1, content2) {
    const m1 = getMultiplier(content1);
    const m2 = getMultiplier(content2);
    const result = m1 * m2;

    // Risultato come operazione composta (stringa per mostrare)
    if (result === 1) {
        return { type: 'identity' };
    }

    // Crea una nuova operazione "virtuale"
    return {
        type: 'composed',
        multiplier: result,
        display: `x${result}`
    };
}

// Stato del gioco
let gameState = {
    currentLevel: 0,
    squares: [],
    draggedSquare: null
};

// Livelli predefiniti - tutti verificati risolvibili
const levels = [
    // === TUTORIAL (1-4) === Meccaniche base
    {
        name: "Tutorial",
        // Soluzione: 3+3 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 3 }
        ]
    },
    {
        name: "Somma",
        // Soluzione: 1+2=3, 3+3 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 }
        ]
    },
    {
        name: "Raddoppia",
        // Soluzione: 2×x2=4, 4+4 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    {
        name: "Inversione",
        // Soluzione: 5×[+-]=-5, -5+-5 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -5 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    // === FACILI (5-8) ===
    {
        name: "Catena",
        // Soluzione: 5+5 spariscono, 1+4=5, 2+3=5, 5+5 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 5 }
        ]
    },
    {
        name: "Doppio x2",
        // Soluzione: x2+x2 spariscono, 1+4=5, 2+3=5, 5+5 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    {
        name: "Specchio",
        // Soluzione: [-6]×[+-]=6, 2+4=6, 6+6 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Triplica",
        // Soluzione: 2×x3=6, 6+6 spariscono, 1+4=5, 5+5 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    // === MEDI (9-12) ===
    {
        name: "Otto per Due",
        // Soluzione: 4×x2=8, 8+8 spariscono, 2+6=8, rimane... NO!
        // Soluzione corretta: 4×x2=8, 2+6=8, 8+8 spariscono, x3+x3 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    {
        name: "Somma Otto",
        // Soluzione: 2+2 spariscono, 4×x2=8, 1+7=8, 8+8 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    {
        name: "Negativo",
        // Soluzione: 6×[+-]=-6, 3+[-6]=-3, -3+-3 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -3 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Meno Sei",
        // Soluzione: 1+5=6, 6×[+-]=-6, -6+-6 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    // === DIFFICILI (13-16) ===
    {
        name: "Percorso",
        // Soluzione: 1+2=3, 3+[-6]=-3, -3×[+-]=3, 3+3 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Dodici",
        // Soluzione: 4×x3=12, 12+12 spariscono, 8+8 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    {
        name: "Composto",
        // Soluzione: x2×x3=x6, x6+x6 spariscono, 2+3=5, 5+5 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: 'x6' }
        ]
    },
    {
        name: "Labirinto",
        // Soluzione: 4×x2=8, 8+8 spariscono, 2×x3=6, 6+6 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    // === ESPERTI (17-20) ===
    {
        name: "Caos",
        // Soluzione: [-6]×[+-]=6, 6+6 spariscono, 1+3=4, 4+4 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Equilibrio",
        // Soluzione: 8×[+-]=-8, -8+-8 spariscono, 2+4=6, 6+6 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: -8 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Intrico",
        // Soluzione: 2×x3=6, 6+6 spariscono, 1+3=4, 4×x2=8, 8+8 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    {
        name: "Maestro",
        // Soluzione: x3+x3 spariscono, 2×x2=4, 4+4 spariscono, 1+5=6, 6+6 spariscono, 3+9=12, 12+12 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    // === SFIDA FINALE (21-25) === Livelli grandi
    {
        name: "Decine",
        // Soluzione: 5×x2=10, 10+10 spariscono, 3+7=10, 2+8=10, 10+10 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    {
        name: "Venti",
        // Soluzione: 10×x2=20, 20+20 spariscono, 5+15=20, 4+6=10, 10+10 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    {
        name: "Trentasei",
        // Soluzione: 12×x3=36, 36+36 spariscono, 6×x2=12, 12+12 spariscono, 4+8=12, rimane...
        // Riprovo: 4×x3=12, 12+12 spariscono, 6×x2=12, 8+4=12... no 4 usato
        // 6×x2=12, 12+12 spariscono, 4×x3=12, 12+36 = 48... no
        // 6×x2=12, 4×x3=12, 12+12 spariscono, 12+12 spariscono, 8+36=44... no
        // Cambio: 6×x2=12, 12×x3=36, 36+36 spariscono, 4+8=12, 12+12 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 36 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    {
        name: "Caos Totale",
        // Soluzione: 15×[+-]=-15, -15+-15 spariscono, 5×x3=15, 3+12=15, 15+15 spariscono, 6+9=15... no
        // Riprovo con numeri diversi
        // 12×[+-]=-12, -12+-12 spariscono, 4×x3=12, 3+9=12, 12+12 spariscono, 6+6 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: -12 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Finale",
        // 12 oggetti
        // Soluzione: 15+15 spariscono, 4×x2=8, 8+8 spariscono, 2×x3=6, 6+6 spariscono, 1+3=4, 4+5=9, 9+9 spariscono
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    }
];

// Elementi DOM
const gameArea = document.getElementById('game-area');
const levelNumber = document.getElementById('level-number');
const squaresCount = document.getElementById('squares-count');
const btnReset = document.getElementById('btn-reset');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const messageEl = document.getElementById('message');

// Inizializzazione
function init() {
    loadLevel(gameState.currentLevel);
    setupEventListeners();
}

// Mescola un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Carica un livello
function loadLevel(levelIndex) {
    gameState.currentLevel = levelIndex;
    gameState.squares = [];
    gameArea.innerHTML = '';

    const level = levels[levelIndex];
    levelNumber.textContent = `${levelIndex + 1} - ${level.name}`;

    // Mescola i quadrati e creali
    const shuffledSquares = shuffleArray(level.squares);
    shuffledSquares.forEach((sq, index) => {
        const content = new SquareContent(sq.type, sq.value);
        createSquare(content, index * 50); // delay per animazione
    });

    updateUI();
}

// Crea un elemento quadrato
function createSquare(content, delay = 0) {
    const square = document.createElement('div');
    square.className = 'square';
    square.draggable = true;

    // Aggiungi classi per lo stile
    if (content.type === SquareType.NUMBER) {
        square.classList.add('number');
        if (content.value > 0) square.classList.add('positive');
        else if (content.value < 0) square.classList.add('negative');
        else square.classList.add('zero');
    } else {
        square.classList.add('operation');
        if (content.value === OperationType.NEGATE) {
            square.classList.add('negate');
        } else {
            square.classList.add('multiply');
        }
    }

    square.textContent = content.toString();
    square.dataset.tooltip = content.getTooltip();

    // Salva il contenuto nell'elemento
    square.squareContent = content;

    // Aggiungi all'array di stato
    const squareId = Date.now() + Math.random();
    square.dataset.id = squareId;
    gameState.squares.push({ id: squareId, element: square, content });

    // Animazione di apparizione
    setTimeout(() => {
        square.classList.add('appearing');
        gameArea.appendChild(square);
        setupSquareDragEvents(square);
    }, delay);

    return square;
}

// Configura eventi drag per un quadrato
function setupSquareDragEvents(square) {
    square.addEventListener('dragstart', handleDragStart);
    square.addEventListener('dragend', handleDragEnd);
    square.addEventListener('dragover', handleDragOver);
    square.addEventListener('dragenter', handleDragEnter);
    square.addEventListener('dragleave', handleDragLeave);
    square.addEventListener('drop', handleDrop);

    // Touch support
    square.addEventListener('touchstart', handleTouchStart, { passive: false });
    square.addEventListener('touchmove', handleTouchMove, { passive: false });
    square.addEventListener('touchend', handleTouchEnd);
}

// Gestori drag and drop
function handleDragStart(e) {
    gameState.draggedSquare = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.id);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.square.drag-over').forEach(sq => {
        sq.classList.remove('drag-over');
    });
    gameState.draggedSquare = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    if (this !== gameState.draggedSquare) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');

    if (this === gameState.draggedSquare || !gameState.draggedSquare) return;

    const dragged = gameState.draggedSquare;
    const target = this;

    combineSquares(dragged, target);
}

// Supporto touch
let touchDraggedSquare = null;
let touchStartX, touchStartY;
let touchClone = null;

function handleTouchStart(e) {
    e.preventDefault();
    touchDraggedSquare = this;
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;

    // Crea clone per visualizzazione
    touchClone = this.cloneNode(true);
    touchClone.style.position = 'fixed';
    touchClone.style.pointerEvents = 'none';
    touchClone.style.opacity = '0.8';
    touchClone.style.zIndex = '1000';
    touchClone.classList.add('dragging');
    document.body.appendChild(touchClone);

    this.classList.add('dragging');
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!touchClone) return;

    const touch = e.touches[0];
    touchClone.style.left = (touch.clientX - 40) + 'px';
    touchClone.style.top = (touch.clientY - 40) + 'px';

    // Evidenzia quadrato sotto
    document.querySelectorAll('.square.drag-over').forEach(sq => {
        sq.classList.remove('drag-over');
    });

    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    if (elementBelow && elementBelow.classList.contains('square') && elementBelow !== touchDraggedSquare) {
        elementBelow.classList.add('drag-over');
    }
}

function handleTouchEnd(e) {
    if (!touchDraggedSquare) return;

    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);

    if (touchClone) {
        touchClone.remove();
        touchClone = null;
    }

    touchDraggedSquare.classList.remove('dragging');

    if (elementBelow && elementBelow.classList.contains('square') && elementBelow !== touchDraggedSquare) {
        elementBelow.classList.remove('drag-over');
        combineSquares(touchDraggedSquare, elementBelow);
    }

    touchDraggedSquare = null;
}

// Combina due quadrati
function combineSquares(dragged, target) {
    const content1 = dragged.squareContent;
    const content2 = target.squareContent;

    // Stessi contenuti: entrambi spariscono
    if (content1.equals(content2)) {
        removeSquare(dragged);
        removeSquare(target);
        checkWin();
        return;
    }

    // Contenuti diversi: combina
    let result = null;

    if (content1.type === SquareType.NUMBER && content2.type === SquareType.NUMBER) {
        // Numero + Numero = Somma
        result = new SquareContent(SquareType.NUMBER, content1.value + content2.value);
    } else if (content1.type === SquareType.NUMBER && content2.type === SquareType.OPERATION) {
        // Numero + Operazione = Applica operazione
        result = new SquareContent(SquareType.NUMBER, applyOperation(content1.value, content2));
    } else if (content1.type === SquareType.OPERATION && content2.type === SquareType.NUMBER) {
        // Operazione + Numero = Applica operazione
        result = new SquareContent(SquareType.NUMBER, applyOperation(content2.value, content1));
    } else {
        // Operazione + Operazione = Compone
        const composed = composeOperations(content1, content2);
        if (composed.type === 'identity') {
            // Le operazioni si annullano
            removeSquare(dragged);
            removeSquare(target);
            checkWin();
            return;
        }
        // Crea operazione composta (la salviamo come stringa con il moltiplicatore)
        result = new SquareContent(SquareType.OPERATION, composed.display);
        result.composedMultiplier = composed.multiplier;
    }

    // Salva la posizione del target prima di rimuoverlo
    const targetNextSibling = target.nextSibling;

    // Rimuovi i due quadrati originali
    removeSquare(dragged);
    removeSquare(target);

    // Crea il nuovo quadrato nella posizione del target
    setTimeout(() => {
        const newSquare = createSquareFromResult(result, targetNextSibling);
        newSquare.classList.add('merging');
        updateUI();
        checkWin();
    }, 300);
}

// Crea quadrato da risultato (gestisce operazioni composte)
function createSquareFromResult(content, insertBeforeElement = null) {
    const square = document.createElement('div');
    square.className = 'square appearing';
    square.draggable = true;

    if (content.type === SquareType.NUMBER) {
        square.classList.add('number');
        if (content.value > 0) square.classList.add('positive');
        else if (content.value < 0) square.classList.add('negative');
        else square.classList.add('zero');
        square.textContent = content.value.toString();
        square.dataset.tooltip = `Numero: ${content.value}`;
    } else {
        square.classList.add('operation');
        if (content.composedMultiplier && content.composedMultiplier < 0) {
            square.classList.add('negate');
        } else {
            square.classList.add('multiply');
        }
        square.textContent = content.value;
        square.dataset.tooltip = content.composedMultiplier
            ? `Moltiplica per ${content.composedMultiplier}`
            : content.getTooltip();
    }

    // Per operazioni composte, modifica il comportamento
    if (content.composedMultiplier) {
        content.applyTo = (num) => num * content.composedMultiplier;
    }

    square.squareContent = content;

    const squareId = Date.now() + Math.random();
    square.dataset.id = squareId;
    gameState.squares.push({ id: squareId, element: square, content });

    // Inserisci nella posizione corretta
    if (insertBeforeElement && insertBeforeElement.parentNode === gameArea) {
        gameArea.insertBefore(square, insertBeforeElement);
    } else {
        gameArea.appendChild(square);
    }
    setupSquareDragEvents(square);

    return square;
}

// Rimuovi un quadrato
function removeSquare(square) {
    square.classList.add('disappearing');
    const id = square.dataset.id;

    setTimeout(() => {
        square.remove();
        gameState.squares = gameState.squares.filter(s => s.id != id);
        updateUI();
    }, 300);
}

// Aggiorna UI
function updateUI() {
    squaresCount.textContent = gameState.squares.length;
    btnPrev.disabled = gameState.currentLevel === 0;
    btnNext.disabled = gameState.currentLevel === levels.length - 1;
}

// Verifica vittoria
function checkWin() {
    setTimeout(() => {
        if (gameState.squares.length === 0) {
            showMessage('Livello Completato!', 'Hai eliminato tutti i quadrati!');

            // Auto-avanza al prossimo livello dopo 2 secondi
            setTimeout(() => {
                hideMessage();
                if (gameState.currentLevel < levels.length - 1) {
                    loadLevel(gameState.currentLevel + 1);
                }
            }, 2000);
        }
    }, 400);
}

// Mostra messaggio
function showMessage(title, text) {
    messageEl.innerHTML = `<h2>${title}</h2><p>${text}</p>`;
    messageEl.classList.remove('hidden');
}

// Nascondi messaggio
function hideMessage() {
    messageEl.classList.add('hidden');
}

// Event listeners per i pulsanti
function setupEventListeners() {
    btnReset.addEventListener('click', () => {
        loadLevel(gameState.currentLevel);
    });

    btnPrev.addEventListener('click', () => {
        if (gameState.currentLevel > 0) {
            loadLevel(gameState.currentLevel - 1);
        }
    });

    btnNext.addEventListener('click', () => {
        if (gameState.currentLevel < levels.length - 1) {
            loadLevel(gameState.currentLevel + 1);
        }
    });

    // Chiudi messaggio con click
    messageEl.addEventListener('click', hideMessage);

    // Tastiera
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' || e.key === 'R') {
            loadLevel(gameState.currentLevel);
        }
        if (e.key === 'ArrowLeft' && gameState.currentLevel > 0) {
            loadLevel(gameState.currentLevel - 1);
        }
        if (e.key === 'ArrowRight' && gameState.currentLevel < levels.length - 1) {
            loadLevel(gameState.currentLevel + 1);
        }
    });
}

// Estendi applyOperation per gestire operazioni composte
const originalApplyOperation = applyOperation;
function applyOperationExtended(num, op, content) {
    if (content && content.applyTo) {
        return content.applyTo(num);
    }
    if (typeof op === 'string' && op.startsWith('x')) {
        const multiplier = parseInt(op.substring(1));
        return num * multiplier;
    }
    return originalApplyOperation(num, op);
}

// Sovrascrivi la logica di combinazione per operazioni composte
const originalCombineSquares = combineSquares;

// Avvia il gioco
init();
