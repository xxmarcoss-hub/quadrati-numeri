/**
 * Generatore di Livelli - Approccio Inverso
 * Parte da coppie uguali e espande all'indietro
 */

// Trasformazioni inverse disponibili
const InverseTransforms = {
    // Somma: N → [A, B] dove A + B = N
    SUM: 'sum',
    // Moltiplicazioni inverse: N → [N/k, xk]
    MULTIPLY_2: 'mult2',
    MULTIPLY_3: 'mult3',
    // Negazione: N → [-N, +-]
    NEGATE: 'negate',
    // Divisioni inverse: N → [N*k, /k]
    DIVIDE_2: 'div2',
    DIVIDE_3: 'div3',
    // Valore assoluto: N (positivo) → [-N, |x|]
    ABS: 'abs',
    // Quadrato inverso: N → [√N, x²] (se √N intero)
    SQUARE: 'square',
    // Radice inversa: N → [N², √]
    SQRT: 'sqrt',
    // Flip: N → [flip(N), flip]
    FLIP: 'flip',
    // Somma cifre inversa: N → [numero con somma cifre = N, Σ]
    SUM_DIGITS: 'sumdigits',
    // Segno inverso: 1 → [positivo, sgn], -1 → [negativo, sgn]
    SIGN: 'sign',
    // Fattoriale inverso: N → [k, n!] se N = k!
    FACTORIAL: 'factorial',
    // Potenza 2 inversa: N → [k, 2ⁿ] se N = 2^k
    POW_2: 'pow2',
    // Potenza 3 inversa: N → [k, 3ⁿ] se N = 3^k
    POW_3: 'pow3',
    // Clone inverso: [N, N] → [N, ⊕]
    CLONE: 'clone',
    // Divisori inverso: [p1, p2, ...] → [prodotto, ÷→]
    DIVISORS: 'divisors'
};

// Fattoriali precalcolati
const FACTORIALS = { 1: 1, 2: 2, 3: 6, 4: 24, 5: 120, 6: 720 };
const FACTORIAL_INVERSE = { 1: 1, 2: 2, 6: 3, 24: 4, 120: 5, 720: 6 };

// Potenze di 2 precalcolate
const POW2_INVERSE = {};
for (let i = 1; i <= 10; i++) POW2_INVERSE[Math.pow(2, i)] = i;

// Potenze di 3 precalcolate
const POW3_INVERSE = {};
for (let i = 1; i <= 6; i++) POW3_INVERSE[Math.pow(3, i)] = i;

// Quadrati perfetti comuni
const PERFECT_SQUARES = {};
for (let i = 1; i <= 32; i++) PERFECT_SQUARES[i * i] = i;

/**
 * Inverte le cifre di un numero
 */
function flipNumber(n) {
    const sign = n < 0 ? -1 : 1;
    const abs = Math.abs(n);
    const flipped = parseInt(abs.toString().split('').reverse().join('')) || 0;
    return sign * flipped;
}

/**
 * Somma le cifre di un numero
 */
function sumDigits(n) {
    return Math.abs(n).toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
}

/**
 * Trova numeri la cui somma cifre è uguale a target
 */
function findNumbersWithDigitSum(target, count = 5) {
    const results = [];
    // Numeri semplici: target stesso (se una cifra), target + 9, target + 18, etc.
    if (target >= 1 && target <= 9) results.push(target);
    // Numeri a due cifre
    for (let tens = 1; tens <= 9; tens++) {
        const units = target - tens;
        if (units >= 0 && units <= 9) {
            results.push(tens * 10 + units);
        }
    }
    // Numeri a tre cifre
    for (let h = 1; h <= 9; h++) {
        for (let t = 0; t <= 9; t++) {
            const u = target - h - t;
            if (u >= 0 && u <= 9) {
                results.push(h * 100 + t * 10 + u);
            }
        }
    }
    return results.slice(0, count);
}

/**
 * Scompone un numero in fattori primi
 */
function primeFactors(n) {
    if (n <= 1) return [];
    const factors = [];
    let num = n;
    for (let p = 2; p * p <= num; p++) {
        while (num % p === 0) {
            factors.push(p);
            num /= p;
        }
    }
    if (num > 1) factors.push(num);
    return factors;
}

/**
 * Restituisce tutte le trasformazioni inverse applicabili a un numero
 */
function getInverseTransforms(n, difficulty = 'all') {
    const transforms = [];

    // === TRASFORMAZIONI BASE (sempre disponibili) ===

    // Somma: trova coppie A + B = N
    const sumPairs = [];
    const absN = Math.abs(n);
    for (let a = 1; a < absN; a++) {
        const b = n - a;
        if (b !== 0 && a !== b) { // Evita coppie con 0 o uguali
            sumPairs.push([a, b]);
        }
    }
    // Somme con negativi
    for (let a = -20; a <= 20; a++) {
        if (a === 0) continue;
        const b = n - a;
        if (b !== 0 && a !== b && Math.abs(b) <= 100) {
            if (a < 0 || b < 0) { // Solo se coinvolge negativi
                sumPairs.push([a, b]);
            }
        }
    }
    if (sumPairs.length > 0) {
        transforms.push({
            type: InverseTransforms.SUM,
            pairs: sumPairs.slice(0, 10) // Limita le opzioni
        });
    }

    // Negazione: N → [-N, +-]
    transforms.push({
        type: InverseTransforms.NEGATE,
        result: [-n]
    });

    // === MOLTIPLICAZIONI INVERSE ===

    // x2 inverso: N → [N/2, x2] (se N pari)
    if (n % 2 === 0 && n !== 0) {
        transforms.push({
            type: InverseTransforms.MULTIPLY_2,
            result: [n / 2]
        });
    }

    // x3 inverso: N → [N/3, x3] (se N divisibile per 3)
    if (n % 3 === 0 && n !== 0) {
        transforms.push({
            type: InverseTransforms.MULTIPLY_3,
            result: [n / 3]
        });
    }

    // === DIVISIONI INVERSE ===

    // /2 inverso: N → [N*2, /2]
    if (Math.abs(n * 2) <= 200) {
        transforms.push({
            type: InverseTransforms.DIVIDE_2,
            result: [n * 2]
        });
    }

    // /3 inverso: N → [N*3, /3]
    if (Math.abs(n * 3) <= 200) {
        transforms.push({
            type: InverseTransforms.DIVIDE_3,
            result: [n * 3]
        });
    }

    // === OPERAZIONI SPECIALI ===

    // Valore assoluto: N (positivo) → [-N, |x|]
    if (n > 0) {
        transforms.push({
            type: InverseTransforms.ABS,
            result: [-n]
        });
    }

    // Quadrato inverso: N → [√N, x²] (se √N intero)
    if (PERFECT_SQUARES[n]) {
        transforms.push({
            type: InverseTransforms.SQUARE,
            result: [PERFECT_SQUARES[n]]
        });
    }
    // Anche per negativi: (-3)² = 9
    if (n > 0 && PERFECT_SQUARES[n]) {
        transforms.push({
            type: InverseTransforms.SQUARE,
            result: [-PERFECT_SQUARES[n]]
        });
    }

    // Radice inversa: N → [N², √] (se N² ragionevole)
    if (n > 0 && n <= 32) {
        transforms.push({
            type: InverseTransforms.SQRT,
            result: [n * n]
        });
    }

    // Flip: N → [flip(N), flip]
    const flipped = flipNumber(n);
    if (flipped !== n && flipped !== 0) {
        transforms.push({
            type: InverseTransforms.FLIP,
            result: [flipped]
        });
    }

    // Somma cifre inversa
    if (n >= 1 && n <= 27) { // Somma cifre max per 3 cifre
        const candidates = findNumbersWithDigitSum(n);
        if (candidates.length > 0) {
            transforms.push({
                type: InverseTransforms.SUM_DIGITS,
                candidates: candidates.filter(c => c !== n)
            });
        }
    }

    // Segno inverso
    if (n === 1) {
        transforms.push({
            type: InverseTransforms.SIGN,
            candidates: [2, 5, 10, 42, 100] // Qualsiasi positivo
        });
    } else if (n === -1) {
        transforms.push({
            type: InverseTransforms.SIGN,
            candidates: [-2, -5, -10, -42] // Qualsiasi negativo
        });
    } else if (n === 0) {
        transforms.push({
            type: InverseTransforms.SIGN,
            candidates: [0]
        });
    }

    // Fattoriale inverso
    if (FACTORIAL_INVERSE[n]) {
        transforms.push({
            type: InverseTransforms.FACTORIAL,
            result: [FACTORIAL_INVERSE[n]]
        });
    }

    // Potenza di 2 inversa
    if (POW2_INVERSE[n]) {
        transforms.push({
            type: InverseTransforms.POW_2,
            result: [POW2_INVERSE[n]]
        });
    }

    // Potenza di 3 inversa
    if (POW3_INVERSE[n]) {
        transforms.push({
            type: InverseTransforms.POW_3,
            result: [POW3_INVERSE[n]]
        });
    }

    return transforms;
}

/**
 * Mappa trasformazione inversa → operazione da aggiungere
 */
function getOperationForTransform(transformType) {
    const map = {
        [InverseTransforms.MULTIPLY_2]: OperationType.MULTIPLY_2,
        [InverseTransforms.MULTIPLY_3]: OperationType.MULTIPLY_3,
        [InverseTransforms.NEGATE]: OperationType.NEGATE,
        [InverseTransforms.DIVIDE_2]: OperationType.DIVIDE_2,
        [InverseTransforms.DIVIDE_3]: OperationType.DIVIDE_3,
        [InverseTransforms.ABS]: OperationType.ABS,
        [InverseTransforms.SQUARE]: OperationType.SQUARE,
        [InverseTransforms.SQRT]: OperationType.SQRT,
        [InverseTransforms.FLIP]: OperationType.FLIP,
        [InverseTransforms.SUM_DIGITS]: OperationType.SUM_DIGITS,
        [InverseTransforms.SIGN]: OperationType.SIGN,
        [InverseTransforms.FACTORIAL]: OperationType.FACTORIAL,
        [InverseTransforms.POW_2]: OperationType.POW_2,
        [InverseTransforms.POW_3]: OperationType.POW_3,
        [InverseTransforms.CLONE]: OperationType.CLONE,
        [InverseTransforms.DIVISORS]: OperationType.DIVISORS
    };
    return map[transformType];
}

/**
 * Peso di difficoltà per ogni trasformazione
 */
const TRANSFORM_DIFFICULTY = {
    [InverseTransforms.SUM]: 1,
    [InverseTransforms.MULTIPLY_2]: 2,
    [InverseTransforms.MULTIPLY_3]: 3,
    [InverseTransforms.NEGATE]: 4,
    [InverseTransforms.DIVIDE_2]: 5,
    [InverseTransforms.DIVIDE_3]: 6,
    [InverseTransforms.ABS]: 5,
    [InverseTransforms.SQUARE]: 6,
    [InverseTransforms.SQRT]: 7,
    [InverseTransforms.FLIP]: 8,
    [InverseTransforms.SUM_DIGITS]: 8,
    [InverseTransforms.SIGN]: 6,
    [InverseTransforms.FACTORIAL]: 9,
    [InverseTransforms.POW_2]: 9,
    [InverseTransforms.POW_3]: 9,
    [InverseTransforms.CLONE]: 10,
    [InverseTransforms.DIVISORS]: 12
};

/**
 * Stato di generazione di un livello
 */
class LevelState {
    constructor() {
        this.numbers = [];      // Numeri nel livello
        this.operations = [];   // Operazioni nel livello
        this.solutionSteps = []; // Passi della soluzione (in ordine inverso)
        this.difficulty = 0;    // Punteggio difficoltà accumulato
    }

    addNumber(n) {
        this.numbers.push(n);
    }

    removeNumber(n) {
        const idx = this.numbers.indexOf(n);
        if (idx !== -1) this.numbers.splice(idx, 1);
    }

    addOperation(op) {
        this.operations.push(op);
    }

    addSolutionStep(step) {
        this.solutionSteps.unshift(step); // Aggiungi all'inizio
    }

    addDifficulty(d) {
        this.difficulty += d;
    }

    getSquares() {
        const squares = [];
        for (const n of this.numbers) {
            squares.push({ type: SquareType.NUMBER, value: n });
        }
        for (const op of this.operations) {
            squares.push({ type: SquareType.OPERATION, value: op });
        }
        return squares;
    }

    getSolution() {
        return this.solutionSteps.join(', ');
    }

    getTotalSquares() {
        return this.numbers.length + this.operations.length;
    }

    clone() {
        const c = new LevelState();
        c.numbers = [...this.numbers];
        c.operations = [...this.operations];
        c.solutionSteps = [...this.solutionSteps];
        c.difficulty = this.difficulty;
        return c;
    }
}

/**
 * Genera un livello partendo da una coppia finale
 * @param {number} targetValue - Valore della coppia finale (es: 5 per [5,5])
 * @param {number} targetDifficulty - Difficoltà target (1-100)
 * @param {object} options - Opzioni di generazione
 */
function generateLevel(targetValue, targetDifficulty, options = {}) {
    const {
        maxSquares = 20,
        allowedTransforms = null, // null = tutti
        preferTransforms = [],    // Trasformazioni preferite
        avoidTransforms = [],     // Trasformazioni da evitare
        maxExpansions = 15,       // Max espansioni
        name = null
    } = options;

    const state = new LevelState();

    // Passo 0: coppia iniziale
    state.addNumber(targetValue);
    state.addNumber(targetValue);
    state.addSolutionStep(`${targetValue}+${targetValue} spariscono`);
    state.addDifficulty(3); // Base per coppia

    let expansions = 0;

    // Espandi finché non raggiungiamo la difficoltà target
    while (state.difficulty < targetDifficulty &&
           state.getTotalSquares() < maxSquares &&
           expansions < maxExpansions) {

        // Scegli un numero da espandere
        const numberToExpand = chooseNumberToExpand(state.numbers, preferTransforms);
        if (numberToExpand === null) break;

        // Ottieni trasformazioni possibili
        let transforms = getInverseTransforms(numberToExpand);

        // Filtra per trasformazioni permesse
        if (allowedTransforms) {
            transforms = transforms.filter(t => allowedTransforms.includes(t.type));
        }

        // Rimuovi trasformazioni da evitare
        transforms = transforms.filter(t => !avoidTransforms.includes(t.type));

        // Preferisci certe trasformazioni
        if (preferTransforms.length > 0) {
            const preferred = transforms.filter(t => preferTransforms.includes(t.type));
            if (preferred.length > 0 && Math.random() < 0.7) {
                transforms = preferred;
            }
        }

        if (transforms.length === 0) break;

        // Scegli una trasformazione casuale pesata per difficoltà
        const transform = chooseTransform(transforms, targetDifficulty - state.difficulty);

        // Applica la trasformazione
        applyInverseTransform(state, numberToExpand, transform);

        expansions++;
    }

    // Costruisci il livello finale
    return {
        name: name || `Livello ${targetDifficulty}`,
        squares: shuffleArray(state.getSquares()),
        solution: state.getSolution(),
        generatedDifficulty: state.difficulty
    };
}

/**
 * Sceglie quale numero espandere
 */
function chooseNumberToExpand(numbers, preferTransforms) {
    if (numbers.length === 0) return null;

    // Preferisci numeri con più trasformazioni possibili
    let best = null;
    let bestScore = -1;

    for (const n of numbers) {
        const transforms = getInverseTransforms(n);
        let score = transforms.length;

        // Bonus per numeri "ricchi" (molti divisori, quadrati perfetti, etc.)
        if (PERFECT_SQUARES[Math.abs(n)]) score += 2;
        if (FACTORIAL_INVERSE[Math.abs(n)]) score += 3;
        if (POW2_INVERSE[Math.abs(n)]) score += 2;

        if (score > bestScore) {
            bestScore = score;
            best = n;
        }
    }

    // A volte scegli casualmente per variare
    if (Math.random() < 0.3) {
        return numbers[Math.floor(Math.random() * numbers.length)];
    }

    return best;
}

/**
 * Sceglie una trasformazione pesata per difficoltà
 */
function chooseTransform(transforms, remainingDifficulty) {
    // Preferisci trasformazioni che si avvicinano alla difficoltà target
    const weighted = transforms.map(t => {
        const diff = TRANSFORM_DIFFICULTY[t.type] || 5;
        // Peso inversamente proporzionale alla distanza dalla difficoltà ideale
        const idealDiff = Math.min(remainingDifficulty / 2, 10);
        const distance = Math.abs(diff - idealDiff);
        return { transform: t, weight: Math.max(1, 10 - distance) };
    });

    const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
    let random = Math.random() * totalWeight;

    for (const w of weighted) {
        random -= w.weight;
        if (random <= 0) return w.transform;
    }

    return transforms[0];
}

/**
 * Applica una trasformazione inversa allo stato
 */
function applyInverseTransform(state, number, transform) {
    state.removeNumber(number);

    switch (transform.type) {
        case InverseTransforms.SUM: {
            // Scegli una coppia casuale
            const pair = transform.pairs[Math.floor(Math.random() * transform.pairs.length)];
            state.addNumber(pair[0]);
            state.addNumber(pair[1]);
            state.addSolutionStep(`${pair[0]}+${pair[1]}=${number}`);
            state.addDifficulty(TRANSFORM_DIFFICULTY[transform.type]);
            break;
        }

        case InverseTransforms.NEGATE: {
            state.addNumber(-number);
            state.addOperation(OperationType.NEGATE);
            state.addSolutionStep(`${-number}×[+-]=${number}`);
            state.addDifficulty(TRANSFORM_DIFFICULTY[transform.type]);
            break;
        }

        case InverseTransforms.MULTIPLY_2:
        case InverseTransforms.MULTIPLY_3:
        case InverseTransforms.DIVIDE_2:
        case InverseTransforms.DIVIDE_3:
        case InverseTransforms.ABS:
        case InverseTransforms.SQUARE:
        case InverseTransforms.SQRT:
        case InverseTransforms.FLIP:
        case InverseTransforms.FACTORIAL:
        case InverseTransforms.POW_2:
        case InverseTransforms.POW_3: {
            const newNumber = transform.result[0];
            const operation = getOperationForTransform(transform.type);
            state.addNumber(newNumber);
            state.addOperation(operation);
            state.addSolutionStep(`${newNumber}×${operation}=${number}`);
            state.addDifficulty(TRANSFORM_DIFFICULTY[transform.type]);
            break;
        }

        case InverseTransforms.SUM_DIGITS: {
            const candidate = transform.candidates[Math.floor(Math.random() * transform.candidates.length)];
            state.addNumber(candidate);
            state.addOperation(OperationType.SUM_DIGITS);
            state.addSolutionStep(`${candidate}×Σ=${number}`);
            state.addDifficulty(TRANSFORM_DIFFICULTY[transform.type]);
            break;
        }

        case InverseTransforms.SIGN: {
            const candidate = transform.candidates[Math.floor(Math.random() * transform.candidates.length)];
            state.addNumber(candidate);
            state.addOperation(OperationType.SIGN);
            state.addSolutionStep(`${candidate}×sgn=${number}`);
            state.addDifficulty(TRANSFORM_DIFFICULTY[transform.type]);
            break;
        }
    }
}

/**
 * Mescola un array (Fisher-Yates)
 */
function shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * Genera 100 livelli con difficoltà crescente
 */
function generate100Levels() {
    const levels = [];

    // Coppie finali per ogni fascia di difficoltà
    const easyTargets = [3, 4, 5, 6, 8, 10];
    const mediumTargets = [6, 8, 9, 10, 12, 16, 24];
    const hardTargets = [12, 16, 24, 25, 27, 32, 36, 64];
    const expertTargets = [24, 36, 64, 81, 100, 120, 125];
    const masterTargets = [24, 36, 48, 64, 72, 81, 100, 120, 144];

    // Operazioni per fascia
    const tutorialOps = [InverseTransforms.SUM];
    const easyOps = [InverseTransforms.SUM, InverseTransforms.MULTIPLY_2, InverseTransforms.MULTIPLY_3, InverseTransforms.NEGATE];
    const mediumOps = [...easyOps, InverseTransforms.DIVIDE_2, InverseTransforms.DIVIDE_3, InverseTransforms.ABS, InverseTransforms.SQUARE, InverseTransforms.SQRT];
    const hardOps = [...mediumOps, InverseTransforms.FLIP, InverseTransforms.SUM_DIGITS, InverseTransforms.SIGN];
    const expertOps = [...hardOps, InverseTransforms.FACTORIAL, InverseTransforms.POW_2, InverseTransforms.POW_3];
    const masterOps = [...expertOps, InverseTransforms.CLONE, InverseTransforms.DIVISORS];

    // Nomi per categoria
    const categoryNames = {
        tutorial: ['Primo Passo', 'Due Uguali', 'Somma Base', 'Catena', 'Tre Numeri', 'Primi Passi', 'Inizio', 'Base', 'Semplice', 'Avvio'],
        easy: ['Raddoppio', 'Triplice', 'Specchio', 'Doppio', 'Moltiplicazione', 'Fattore Due', 'Fattore Tre', 'Negativo', 'Inversione', 'Mix Base', 'Catena Facile', 'Somme', 'Prodotti', 'Semplice Mix', 'Combinazione'],
        medium: ['Divisione', 'Radice', 'Quadrato', 'Assoluto', 'Catena Media', 'Mix Operazioni', 'Percorso', 'Strategia', 'Calcolo', 'Ragionamento', 'Intermedio', 'Bilanciamento', 'Equilibrio', 'Scelta', 'Decisione', 'Analisi', 'Valutazione', 'Approccio', 'Metodo', 'Tecnica'],
        hard: ['Flip', 'Cifre', 'Segno', 'Complesso', 'Difficile', 'Sfida', 'Puzzle', 'Enigma', 'Rompicapo', 'Labirinto', 'Intrico', 'Nodo', 'Groviglio', 'Dedalo', 'Mistero', 'Arcano', 'Oscuro', 'Profondo', 'Arduo', 'Impegnativo', 'Tosto', 'Duro', 'Severo', 'Rigoroso', 'Esigente'],
        expert: ['Fattoriale', 'Potenza', 'Esponenziale', 'Esperto', 'Maestro', 'Virtuoso', 'Genio', 'Prodigio', 'Campione', 'Veterano', 'Elite', 'Supremo', 'Eccellente', 'Brillante', 'Luminare', 'Esperto Max', 'Ultra', 'Mega', 'Super', 'Iper'],
        master: ['Clone', 'Divisori', 'Finale', 'Ultimo', 'Definitivo', 'Supremo', 'Leggenda', 'Mito', 'Epico', 'Titanico']
    };

    let levelIndex = 0;

    // TUTORIAL (1-10): Solo somme
    for (let i = 0; i < 10; i++) {
        const target = easyTargets[i % easyTargets.length];
        const difficulty = 5 + i * 2;
        const level = generateLevel(target, difficulty, {
            maxSquares: 2 + Math.floor(i / 2),
            allowedTransforms: tutorialOps,
            name: categoryNames.tutorial[i] || `Tutorial ${i + 1}`
        });
        levels.push(level);
        levelIndex++;
    }

    // FACILE (11-25): +x2, x3, +-
    for (let i = 0; i < 15; i++) {
        const target = easyTargets[i % easyTargets.length];
        const difficulty = 15 + i * 2;
        const level = generateLevel(target, difficulty, {
            maxSquares: 4 + Math.floor(i / 3),
            allowedTransforms: easyOps,
            name: categoryNames.easy[i] || `Facile ${i + 1}`
        });
        levels.push(level);
        levelIndex++;
    }

    // MEDIO (26-45): +/2, /3, |x|, x², √
    for (let i = 0; i < 20; i++) {
        const target = mediumTargets[i % mediumTargets.length];
        const difficulty = 30 + i * 2;
        const level = generateLevel(target, difficulty, {
            maxSquares: 5 + Math.floor(i / 4),
            allowedTransforms: mediumOps,
            name: categoryNames.medium[i] || `Medio ${i + 1}`
        });
        levels.push(level);
        levelIndex++;
    }

    // DIFFICILE (46-70): +flip, Σ, sgn
    for (let i = 0; i < 25; i++) {
        const target = hardTargets[i % hardTargets.length];
        const difficulty = 50 + i * 2;
        const level = generateLevel(target, difficulty, {
            maxSquares: 6 + Math.floor(i / 5),
            allowedTransforms: hardOps,
            name: categoryNames.hard[i] || `Difficile ${i + 1}`
        });
        levels.push(level);
        levelIndex++;
    }

    // ESPERTO (71-90): +n!, 2ⁿ, 3ⁿ
    for (let i = 0; i < 20; i++) {
        const target = expertTargets[i % expertTargets.length];
        const difficulty = 75 + i * 2;
        const level = generateLevel(target, difficulty, {
            maxSquares: 8 + Math.floor(i / 4),
            allowedTransforms: expertOps,
            name: categoryNames.expert[i] || `Esperto ${i + 1}`
        });
        levels.push(level);
        levelIndex++;
    }

    // MAESTRO (91-100): +clone, divisori
    for (let i = 0; i < 10; i++) {
        const target = masterTargets[i % masterTargets.length];
        const difficulty = 95 + i * 3;
        const level = generateLevel(target, difficulty, {
            maxSquares: 12 + Math.floor(i / 2),
            allowedTransforms: masterOps,
            name: categoryNames.master[i] || `Maestro ${i + 1}`
        });
        levels.push(level);
        levelIndex++;
    }

    return levels;
}

/**
 * Formatta i livelli generati per levels.js
 */
function formatLevelsForExport(levels) {
    let output = '// Livelli generati automaticamente\nconst levels = [\n';

    for (let i = 0; i < levels.length; i++) {
        const level = levels[i];
        output += '    {\n';
        output += `        name: "${level.name}",\n`;
        output += `        solution: "${level.solution}",\n`;
        output += '        squares: [\n';

        for (const sq of level.squares) {
            if (sq.type === SquareType.NUMBER) {
                output += `            { type: SquareType.NUMBER, value: ${sq.value} },\n`;
            } else {
                output += `            { type: SquareType.OPERATION, value: OperationType.${getOperationKey(sq.value)} },\n`;
            }
        }

        output += '        ]\n';
        output += '    }';
        if (i < levels.length - 1) output += ',';
        output += '\n';
    }

    output += '];\n';
    return output;
}

/**
 * Ottiene la chiave di OperationType dal valore
 */
function getOperationKey(value) {
    for (const [key, val] of Object.entries(OperationType)) {
        if (val === value) return key;
    }
    return value;
}

// Esporta per uso nel browser
if (typeof window !== 'undefined') {
    window.generateLevel = generateLevel;
    window.generate100Levels = generate100Levels;
    window.formatLevelsForExport = formatLevelsForExport;
    window.getInverseTransforms = getInverseTransforms;
}
