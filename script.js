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
            case OperationType.DIVIDE_2:
                return 'Dividi per 2 (solo pari)';
            case OperationType.DIVIDE_3:
                return 'Dividi per 3 (solo multipli)';
            case OperationType.ABS:
                return 'Valore assoluto';
            case OperationType.SQUARE:
                return 'Eleva al quadrato';
            case OperationType.FLIP:
                return 'Inverti cifre';
            case OperationType.SUM_DIGITS:
                return 'Somma cifre';
            case OperationType.SIGN:
                return 'Estrai segno';
            case OperationType.FACTORIAL:
                return 'Fattoriale (solo 1-6)';
            case OperationType.POW_2:
                return 'Potenza di 2 (solo 1-10)';
            case OperationType.POW_3:
                return 'Potenza di 3 (solo 1-6)';
            case OperationType.MOD_2:
                return 'Modulo 2 (resto)';
            case OperationType.MOD_3:
                return 'Modulo 3 (resto)';
            case OperationType.MOD_5:
                return 'Modulo 5 (resto)';
            case OperationType.MOD_10:
                return 'Modulo 10 (ultima cifra)';
            case OperationType.SQRT:
                return 'Radice quadrata (solo quadrati perfetti)';
            case OperationType.CLONE:
                return 'Clona (duplica elemento)';
            case OperationType.DIVISORS:
                return 'Fattori primi (scompone in fattori)';
        }
    }

    // Verifica se l'operazione è speciale (non componibile)
    isSpecialOperation() {
        return this.type === SquareType.OPERATION &&
               SpecialOperations.includes(this.value);
    }
}

// Funzione per applicare un'operazione a un numero
function applyOperation(num, operationContent) {
    // Gestisci operazioni speciali
    const opValue = typeof operationContent === 'object' ? operationContent.value : operationContent;

    switch (opValue) {
        case OperationType.ABS:
            return Math.abs(num);
        case OperationType.SQUARE:
            return num * num;
        case OperationType.FLIP: {
            // Inverti le cifre del numero, mantieni il segno
            const sign = num < 0 ? -1 : 1;
            const flipped = parseInt(Math.abs(num).toString().split('').reverse().join(''), 10);
            return sign * flipped;
        }
        case OperationType.SUM_DIGITS: {
            // Somma le cifre del numero, mantieni il segno
            const sign = num < 0 ? -1 : 1;
            const sum = Math.abs(num).toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
            return sign * sum;
        }
        case OperationType.SIGN:
            // Restituisce il segno: 1, -1, o 0
            return num > 0 ? 1 : (num < 0 ? -1 : 0);
        case OperationType.FACTORIAL: {
            // Fattoriale: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720
            const factorials = [1, 1, 2, 6, 24, 120, 720];
            return factorials[num];
        }
        case OperationType.POW_2:
            // Potenza di 2: 2ⁿ
            return Math.pow(2, num);
        case OperationType.POW_3:
            // Potenza di 3: 3ⁿ
            return Math.pow(3, num);
        case OperationType.MOD_2:
            // Modulo 2 (sempre positivo)
            return ((num % 2) + 2) % 2;
        case OperationType.MOD_3:
            // Modulo 3 (sempre positivo)
            return ((num % 3) + 3) % 3;
        case OperationType.MOD_5:
            // Modulo 5 (sempre positivo)
            return ((num % 5) + 5) % 5;
        case OperationType.MOD_10:
            // Modulo 10 (sempre positivo - ultima cifra)
            return ((num % 10) + 10) % 10;
        case OperationType.SQRT:
            // Radice quadrata
            return Math.sqrt(num);
    }

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
        [OperationType.NEGATE]: -1,
        [OperationType.DIVIDE_2]: 0.5,
        [OperationType.DIVIDE_3]: 1/3
    };

    // Se ha un moltiplicatore composto, usalo
    if (content.composedMultiplier !== undefined) {
        return content.composedMultiplier;
    }

    // Altrimenti cerca nel mapping base
    if (baseMultipliers[content.value] !== undefined) {
        return baseMultipliers[content.value];
    }

    // Fallback: parsa dalla stringa (es. "x6" -> 6, "/6" -> 1/6)
    if (typeof content.value === 'string') {
        if (content.value.startsWith('x')) {
            return parseInt(content.value.substring(1));
        }
        if (content.value.startsWith('/')) {
            return 1 / parseInt(content.value.substring(1));
        }
    }

    return 1;
}

// Verifica se un'operazione può essere applicata a un numero
function canApplyOperation(num, operationContent) {
    const opValue = typeof operationContent === 'object' ? operationContent.value : operationContent;
    const multiplier = typeof operationContent === 'object' ? getMultiplier(operationContent) : null;

    // Divisioni: verificano che il numero sia divisibile
    if (opValue === OperationType.DIVIDE_2 || (multiplier && multiplier === 0.5)) {
        return num % 2 === 0;
    }
    if (opValue === OperationType.DIVIDE_3 || (multiplier && Math.abs(multiplier - 1/3) < 0.0001)) {
        return num % 3 === 0;
    }

    // Operazioni composte con divisore: verifica divisibilità
    if (multiplier && multiplier < 1 && multiplier > 0) {
        const divisor = Math.round(1 / multiplier);
        return num % divisor === 0;
    }

    // Fattoriale: solo numeri da 1 a 6
    if (opValue === OperationType.FACTORIAL) {
        return Number.isInteger(num) && num >= 1 && num <= 6;
    }

    // Potenza di 2: solo numeri da 1 a 10
    if (opValue === OperationType.POW_2) {
        return Number.isInteger(num) && num >= 1 && num <= 10;
    }

    // Potenza di 3: solo numeri da 1 a 6
    if (opValue === OperationType.POW_3) {
        return Number.isInteger(num) && num >= 1 && num <= 6;
    }

    // Radice quadrata: solo quadrati perfetti positivi
    if (opValue === OperationType.SQRT) {
        if (num < 0) return false;
        const sqrt = Math.sqrt(num);
        return Number.isInteger(sqrt);
    }

    // Divisori: solo numeri composti (no primi), interi > 1, limite a 100
    if (opValue === OperationType.DIVISORS) {
        if (!Number.isInteger(num) || num <= 1 || num > 100) return false;
        // Escludi numeri primi: i fattori primi sarebbero solo il numero stesso
        return !isPrime(num);
    }

    // Tutte le altre operazioni sono sempre applicabili
    return true;
}

// Funzione per verificare se un numero è primo
function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Funzione per ottenere i fattori primi di un numero (con ripetizioni)
function getPrimeFactors(num) {
    const factors = [];
    let n = Math.abs(num);

    // Estrai tutti i fattori 2
    while (n % 2 === 0) {
        factors.push(2);
        n = n / 2;
    }

    // Estrai i fattori dispari
    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            factors.push(i);
            n = n / i;
        }
    }

    // Se rimane un numero primo > 2
    if (n > 2) {
        factors.push(n);
    }

    return factors;
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
    let display;
    if (result > 0 && result < 1) {
        // Divisione: mostra come /N
        display = `/${Math.round(1/result)}`;
    } else if (result < 0 && result > -1) {
        // Divisione negativa: mostra come -/N
        display = `-/${Math.round(-1/result)}`;
    } else {
        display = `x${result}`;
    }

    return {
        type: 'composed',
        multiplier: result,
        display: display
    };
}

// Stato del gioco
let gameState = {
    currentLevel: 0,
    squares: [],
    draggedSquare: null,
    trashSlotsTotal: 0,
    trashSlotsUsed: 0,
    isExploding: false
};

// Controlla se un valore supera il limite massimo del livello
function checkOverflow(value) {
    const level = levels[gameState.currentLevel];
    const limit = level.maxValue || 9999;
    return Math.abs(value) > limit;
}

// Attiva l'esplosione (game over)
function triggerExplosion(value, square) {
    if (gameState.isExploding) return;
    gameState.isExploding = true;

    const level = levels[gameState.currentLevel];
    const limit = level.maxValue || 9999;

    // Animazione esplosione sul quadrato
    if (square) {
        square.classList.add('exploding');
    }

    // Mostra messaggio di overflow
    setTimeout(() => {
        messageEl.classList.add('overflow');
        showMessage('OVERFLOW!', `Limite superato: ${Math.abs(value)} > ${limit}`);

        // Reset dopo 2 secondi
        setTimeout(() => {
            hideMessage();
            gameState.isExploding = false;
            loadLevel(gameState.currentLevel);
        }, 2000);
    }, 500);
}

// Elementi DOM
const gameArea = document.getElementById('game-area');
const levelNumber = document.getElementById('level-number');
const squaresCount = document.getElementById('squares-count');
const maxValueDisplay = document.getElementById('max-value');
const btnReset = document.getElementById('btn-reset');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const messageEl = document.getElementById('message');
const trashContainer = document.getElementById('trash-container');
const trashBin = document.getElementById('trash-bin');
const trashCount = document.getElementById('trash-count');

// Inizializzazione
function init() {
    // Check for level parameter in URL hash
    const hash = window.location.hash;
    if (hash) {
        const match = hash.match(/level=(\d+)/);
        if (match) {
            const levelIndex = parseInt(match[1]);
            if (levelIndex >= 0 && levelIndex < levels.length) {
                gameState.currentLevel = levelIndex;
            }
        }
    }
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
    gameState.isExploding = false;
    gameArea.innerHTML = '';

    const level = levels[levelIndex];
    levelNumber.textContent = `${levelIndex + 1} - ${level.name}`;

    // Aggiorna display del limite
    if (maxValueDisplay) {
        maxValueDisplay.textContent = level.maxValue || '∞';
    }

    // Inizializza il cestino
    gameState.trashSlotsTotal = level.trashSlots || 0;
    gameState.trashSlotsUsed = 0;

    // Mostra/nascondi cestino
    if (gameState.trashSlotsTotal > 0) {
        trashContainer.classList.remove('hidden');
        trashBin.classList.remove('full');
    } else {
        trashContainer.classList.add('hidden');
    }

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
        if (content.isSpecialOperation()) {
            square.classList.add('special');
        } else if (content.value === OperationType.NEGATE) {
            square.classList.add('negate');
        } else if (content.value === OperationType.DIVIDE_2 || content.value === OperationType.DIVIDE_3 ||
                   (typeof content.value === 'string' && content.value.startsWith('/'))) {
            square.classList.add('divide');
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
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.id);

    // Crea un clone isolato per l'immagine di drag
    // Questo evita che vengano catturati elementi adiacenti
    const clone = this.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    clone.style.width = this.offsetWidth + 'px';
    clone.style.height = this.offsetHeight + 'px';
    document.body.appendChild(clone);

    // Usa il clone come immagine di drag
    e.dataTransfer.setDragImage(clone, this.offsetWidth / 2, this.offsetHeight / 2);

    // Rimuovi il clone dopo che il browser ha catturato l'immagine
    setTimeout(() => clone.remove(), 0);

    // Nasconde l'elemento originale
    const element = this;
    requestAnimationFrame(() => {
        element.classList.add('dragging');
    });
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
    trashBin.classList.remove('drag-over');

    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    if (elementBelow && elementBelow.classList.contains('square') && elementBelow !== touchDraggedSquare) {
        elementBelow.classList.add('drag-over');
    }
    // Evidenzia cestino se sopra
    if (elementBelow && (elementBelow === trashBin || elementBelow.closest('.trash-bin'))) {
        if (gameState.trashSlotsUsed < gameState.trashSlotsTotal) {
            trashBin.classList.add('drag-over');
        }
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
    trashBin.classList.remove('drag-over');

    // Controlla se rilasciato sul cestino
    if (elementBelow && (elementBelow === trashBin || elementBelow.closest('.trash-bin'))) {
        trashSquare(touchDraggedSquare);
        touchDraggedSquare = null;
        return;
    }

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

    // Caso speciale: CLONE duplica l'altro elemento
    const isClone1 = content1.type === SquareType.OPERATION && content1.value === OperationType.CLONE;
    const isClone2 = content2.type === SquareType.OPERATION && content2.value === OperationType.CLONE;

    if (isClone1 || isClone2) {
        // L'elemento non-clone viene duplicato, clone sparisce
        const cloneSquare = isClone1 ? dragged : target;
        const targetSquare = isClone1 ? target : dragged;
        const targetContent = isClone1 ? content2 : content1;

        // Rimuovi il clone
        removeSquare(cloneSquare);

        // Crea una copia dell'elemento target
        setTimeout(() => {
            const newContent = new SquareContent(targetContent.type, targetContent.value);
            if (targetContent.composedMultiplier) {
                newContent.composedMultiplier = targetContent.composedMultiplier;
            }
            const newSquare = createSquare(newContent, 0);
            applyGlow(newSquare);
            updateUI();
            checkWin();
        }, 300);
        return;
    }

    // Caso speciale: DIVISORS esplode un numero nei suoi divisori
    const isDivisors1 = content1.type === SquareType.OPERATION && content1.value === OperationType.DIVISORS;
    const isDivisors2 = content2.type === SquareType.OPERATION && content2.value === OperationType.DIVISORS;

    if ((isDivisors1 && content2.type === SquareType.NUMBER) ||
        (isDivisors2 && content1.type === SquareType.NUMBER)) {
        const numContent = isDivisors1 ? content2 : content1;
        const num = numContent.value;

        // Verifica applicabilità
        if (!canApplyOperation(num, { value: OperationType.DIVISORS })) {
            dragged.classList.add('rejected');
            target.classList.add('rejected');
            setTimeout(() => {
                dragged.classList.remove('rejected');
                target.classList.remove('rejected');
            }, 300);
            return;
        }

        // Rimuovi entrambi gli elementi
        removeSquare(dragged);
        removeSquare(target);

        // Crea un quadrato per ogni fattore primo
        const divisors = getPrimeFactors(num);
        setTimeout(() => {
            divisors.forEach((div, index) => {
                const newContent = new SquareContent(SquareType.NUMBER, div);
                const newSquare = createSquare(newContent, index * 100);
                // Applica glow con delay per sincronizzare con l'animazione
                setTimeout(() => applyGlow(newSquare), index * 100);
            });
            updateUI();
            checkWin();
        }, 300);
        return;
    }

    // Contenuti diversi: combina
    let result = null;

    if (content1.type === SquareType.NUMBER && content2.type === SquareType.NUMBER) {
        // Numero + Numero = Somma
        result = new SquareContent(SquareType.NUMBER, content1.value + content2.value);
    } else if (content1.type === SquareType.NUMBER && content2.type === SquareType.OPERATION) {
        // Numero + Operazione = Applica operazione (se applicabile)
        if (!canApplyOperation(content1.value, content2)) {
            // Rifiuta - operazione non applicabile (es. divisione su numero non divisibile)
            dragged.classList.add('rejected');
            target.classList.add('rejected');
            setTimeout(() => {
                dragged.classList.remove('rejected');
                target.classList.remove('rejected');
            }, 300);
            return;
        }
        result = new SquareContent(SquareType.NUMBER, applyOperation(content1.value, content2));
    } else if (content1.type === SquareType.OPERATION && content2.type === SquareType.NUMBER) {
        // Operazione + Numero = Applica operazione (se applicabile)
        if (!canApplyOperation(content2.value, content1)) {
            // Rifiuta - operazione non applicabile
            dragged.classList.add('rejected');
            target.classList.add('rejected');
            setTimeout(() => {
                dragged.classList.remove('rejected');
                target.classList.remove('rejected');
            }, 300);
            return;
        }
        result = new SquareContent(SquareType.NUMBER, applyOperation(content2.value, content1));
    } else {
        // Operazione + Operazione = Compone (solo se entrambe non-speciali)
        const isSpecial1 = content1.isSpecialOperation();
        const isSpecial2 = content2.isSpecialOperation();

        // Caso speciale: √ + x² = identità (si annullano)
        const isSqrtSquareCombo = (content1.value === OperationType.SQRT && content2.value === OperationType.SQUARE) ||
                                   (content1.value === OperationType.SQUARE && content2.value === OperationType.SQRT);
        if (isSqrtSquareCombo) {
            removeSquare(dragged);
            removeSquare(target);
            checkWin();
            return;
        }

        // Le operazioni speciali non si compongono tra loro né con altre operazioni
        if (isSpecial1 || isSpecial2) {
            // Rifiuta la combinazione - feedback visivo
            dragged.classList.add('rejected');
            target.classList.add('rejected');
            setTimeout(() => {
                dragged.classList.remove('rejected');
                target.classList.remove('rejected');
            }, 300);
            return;
        }

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

    // Controlla overflow per risultati numerici
    if (result && result.type === SquareType.NUMBER && checkOverflow(result.value)) {
        triggerExplosion(result.value, target);
        return;
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
        applyGlow(newSquare);
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
        if (content.isSpecialOperation()) {
            square.classList.add('special');
        } else if (content.composedMultiplier && content.composedMultiplier < 0) {
            square.classList.add('negate');
        } else if (content.value === OperationType.DIVIDE_2 || content.value === OperationType.DIVIDE_3 ||
                   (typeof content.value === 'string' && content.value.startsWith('/')) ||
                   (content.composedMultiplier && content.composedMultiplier > 0 && content.composedMultiplier < 1)) {
            square.classList.add('divide');
        } else {
            square.classList.add('multiply');
        }
        square.textContent = content.value;
        square.dataset.tooltip = content.composedMultiplier
            ? (content.composedMultiplier < 1 ? `Dividi per ${Math.round(1/content.composedMultiplier)}` : `Moltiplica per ${content.composedMultiplier}`)
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

// Applica effetto glow temporaneo a un quadrato
function applyGlow(square) {
    square.classList.add('glow');
    setTimeout(() => {
        square.classList.remove('glow');
        square.classList.add('glow-fade');
        setTimeout(() => {
            square.classList.remove('glow-fade');
        }, 500);
    }, 2000);
}

// Cestina un quadrato
function trashSquare(square) {
    // Verifica se ci sono slot disponibili
    if (gameState.trashSlotsUsed >= gameState.trashSlotsTotal) {
        return false;
    }

    gameState.trashSlotsUsed++;
    trashBin.classList.add('shaking');
    setTimeout(() => trashBin.classList.remove('shaking'), 300);

    removeSquare(square);
    checkWin();
    return true;
}

// Aggiorna UI
function updateUI() {
    squaresCount.textContent = gameState.squares.length;
    btnPrev.disabled = gameState.currentLevel === 0;
    btnNext.disabled = gameState.currentLevel === levels.length - 1;

    // Aggiorna cestino
    if (gameState.trashSlotsTotal > 0) {
        const remaining = gameState.trashSlotsTotal - gameState.trashSlotsUsed;
        trashCount.textContent = `${remaining}/${gameState.trashSlotsTotal}`;
        if (remaining === 0) {
            trashBin.classList.add('full');
        } else {
            trashBin.classList.remove('full');
        }
    }
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
    messageEl.classList.remove('overflow');
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

    // Eventi cestino - drag and drop
    trashBin.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (gameState.trashSlotsUsed < gameState.trashSlotsTotal) {
            trashBin.classList.add('drag-over');
        }
    });

    trashBin.addEventListener('dragleave', () => {
        trashBin.classList.remove('drag-over');
    });

    trashBin.addEventListener('drop', (e) => {
        e.preventDefault();
        trashBin.classList.remove('drag-over');
        if (gameState.draggedSquare) {
            trashSquare(gameState.draggedSquare);
            gameState.draggedSquare = null;
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
