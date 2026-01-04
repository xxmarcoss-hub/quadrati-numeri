#!/usr/bin/env node
/**
 * Script per generare 100 livelli con difficoltà crescente
 * Esegui con: node generate-100.js
 */

// Copia le definizioni necessarie
const SquareType = {
    NUMBER: 'number',
    OPERATION: 'operation'
};

const OperationType = {
    MULTIPLY_2: 'x2',
    MULTIPLY_3: 'x3',
    NEGATE: '+-',
    DIVIDE_2: '/2',
    DIVIDE_3: '/3',
    ABS: '|x|',
    SQUARE: 'x²',
    FLIP: 'flip',
    SUM_DIGITS: 'Σ',
    SIGN: 'sgn',
    FACTORIAL: 'n!',
    POW_2: '2ⁿ',
    POW_3: '3ⁿ',
    MOD_2: '%2',
    MOD_3: '%3',
    MOD_5: '%5',
    MOD_10: '%10',
    SQRT: '√',
    CLONE: '⊕',
    DIVISORS: '÷→'
};

const SpecialOperations = [
    OperationType.ABS, OperationType.SQUARE, OperationType.FLIP,
    OperationType.SUM_DIGITS, OperationType.SIGN, OperationType.FACTORIAL,
    OperationType.POW_2, OperationType.POW_3, OperationType.MOD_2,
    OperationType.MOD_3, OperationType.MOD_5, OperationType.MOD_10,
    OperationType.SQRT, OperationType.CLONE, OperationType.DIVISORS
];

// Trasformazioni inverse
const InverseTransforms = {
    SUM: 'sum',
    MULTIPLY_2: 'mult2',
    MULTIPLY_3: 'mult3',
    NEGATE: 'negate',
    DIVIDE_2: 'div2',
    DIVIDE_3: 'div3',
    ABS: 'abs',
    SQUARE: 'square',
    SQRT: 'sqrt',
    FLIP: 'flip',
    SUM_DIGITS: 'sumdigits',
    SIGN: 'sign',
    FACTORIAL: 'factorial',
    POW_2: 'pow2',
    POW_3: 'pow3',
    CLONE: 'clone',
    DIVISORS: 'divisors'
};

// Lookup tables
const FACTORIALS = { 1: 1, 2: 2, 3: 6, 4: 24, 5: 120, 6: 720 };
const FACTORIAL_INVERSE = { 1: 1, 2: 2, 6: 3, 24: 4, 120: 5, 720: 6 };
const POW2_INVERSE = {};
for (let i = 1; i <= 10; i++) POW2_INVERSE[Math.pow(2, i)] = i;
const POW3_INVERSE = {};
for (let i = 1; i <= 6; i++) POW3_INVERSE[Math.pow(3, i)] = i;
const PERFECT_SQUARES = {};
for (let i = 1; i <= 32; i++) PERFECT_SQUARES[i * i] = i;

// Pesi difficoltà
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

function flipNumber(n) {
    const sign = n < 0 ? -1 : 1;
    const abs = Math.abs(n);
    const flipped = parseInt(abs.toString().split('').reverse().join('')) || 0;
    return sign * flipped;
}

function findNumbersWithDigitSum(target, count = 5) {
    const results = [];
    if (target >= 1 && target <= 9) results.push(target);
    for (let tens = 1; tens <= 9; tens++) {
        const units = target - tens;
        if (units >= 0 && units <= 9) {
            results.push(tens * 10 + units);
        }
    }
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

function getInverseTransforms(n) {
    const transforms = [];
    const absN = Math.abs(n);

    // Somma
    const sumPairs = [];
    for (let a = 1; a < absN && a <= 50; a++) {
        const b = n - a;
        if (b !== 0 && a !== b && Math.abs(b) <= 100) {
            sumPairs.push([a, b]);
        }
    }
    for (let a = -20; a <= 20; a++) {
        if (a === 0) continue;
        const b = n - a;
        if (b !== 0 && a !== b && Math.abs(b) <= 100) {
            if (a < 0 || b < 0) sumPairs.push([a, b]);
        }
    }
    if (sumPairs.length > 0) {
        transforms.push({ type: InverseTransforms.SUM, pairs: sumPairs.slice(0, 10) });
    }

    // Negazione
    transforms.push({ type: InverseTransforms.NEGATE, result: [-n] });

    // x2 inverso
    if (n % 2 === 0 && n !== 0) {
        transforms.push({ type: InverseTransforms.MULTIPLY_2, result: [n / 2] });
    }

    // x3 inverso
    if (n % 3 === 0 && n !== 0) {
        transforms.push({ type: InverseTransforms.MULTIPLY_3, result: [n / 3] });
    }

    // /2 inverso
    if (Math.abs(n * 2) <= 200) {
        transforms.push({ type: InverseTransforms.DIVIDE_2, result: [n * 2] });
    }

    // /3 inverso
    if (Math.abs(n * 3) <= 200) {
        transforms.push({ type: InverseTransforms.DIVIDE_3, result: [n * 3] });
    }

    // Valore assoluto
    if (n > 0) {
        transforms.push({ type: InverseTransforms.ABS, result: [-n] });
    }

    // Quadrato inverso
    if (PERFECT_SQUARES[n]) {
        transforms.push({ type: InverseTransforms.SQUARE, result: [PERFECT_SQUARES[n]] });
    }
    if (n > 0 && PERFECT_SQUARES[n]) {
        transforms.push({ type: InverseTransforms.SQUARE, result: [-PERFECT_SQUARES[n]] });
    }

    // Radice inversa
    if (n > 0 && n <= 32) {
        transforms.push({ type: InverseTransforms.SQRT, result: [n * n] });
    }

    // Flip
    const flipped = flipNumber(n);
    if (flipped !== n && flipped !== 0) {
        transforms.push({ type: InverseTransforms.FLIP, result: [flipped] });
    }

    // Somma cifre
    if (n >= 1 && n <= 27) {
        const candidates = findNumbersWithDigitSum(n).filter(c => c !== n);
        if (candidates.length > 0) {
            transforms.push({ type: InverseTransforms.SUM_DIGITS, candidates });
        }
    }

    // Segno
    if (n === 1) {
        transforms.push({ type: InverseTransforms.SIGN, candidates: [2, 5, 10, 42, 100] });
    } else if (n === -1) {
        transforms.push({ type: InverseTransforms.SIGN, candidates: [-2, -5, -10, -42] });
    }

    // Fattoriale
    if (FACTORIAL_INVERSE[n]) {
        transforms.push({ type: InverseTransforms.FACTORIAL, result: [FACTORIAL_INVERSE[n]] });
    }

    // Potenza 2
    if (POW2_INVERSE[n]) {
        transforms.push({ type: InverseTransforms.POW_2, result: [POW2_INVERSE[n]] });
    }

    // Potenza 3
    if (POW3_INVERSE[n]) {
        transforms.push({ type: InverseTransforms.POW_3, result: [POW3_INVERSE[n]] });
    }

    return transforms;
}

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

class LevelState {
    constructor() {
        this.numbers = [];
        this.operations = [];
        this.solutionSteps = [];
        this.difficulty = 0;
    }

    addNumber(n) { this.numbers.push(n); }
    removeNumber(n) {
        const idx = this.numbers.indexOf(n);
        if (idx !== -1) this.numbers.splice(idx, 1);
    }
    addOperation(op) { this.operations.push(op); }
    addSolutionStep(step) { this.solutionSteps.unshift(step); }
    addDifficulty(d) { this.difficulty += d; }

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

    getSolution() { return this.solutionSteps.join(', '); }
    getTotalSquares() { return this.numbers.length + this.operations.length; }
}

function shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// Calcola il limite massimo per un livello
// Formula: max(|valori|) × 5, minimo 50
function calculateMaxValue(squares) {
    const numbers = squares
        .filter(sq => sq.type === SquareType.NUMBER)
        .map(sq => Math.abs(sq.value));
    const maxNum = numbers.length > 0 ? Math.max(...numbers) : 10;
    return Math.max(50, maxNum * 5);
}

function generateLevel(targetValue, targetDifficulty, options = {}) {
    const { maxSquares = 20, allowedTransforms = null, name = null, preferNumbers = true } = options;

    const state = new LevelState();
    state.addNumber(targetValue);
    state.addNumber(targetValue);
    state.addSolutionStep(`${targetValue}+${targetValue} spariscono`);
    state.addDifficulty(3);

    let expansions = 0;
    const maxExpansions = 15;

    while (state.difficulty < targetDifficulty &&
           state.getTotalSquares() < maxSquares &&
           expansions < maxExpansions) {

        if (state.numbers.length === 0) break;

        const numberToExpand = state.numbers[Math.floor(Math.random() * state.numbers.length)];
        let transforms = getInverseTransforms(numberToExpand);

        if (allowedTransforms) {
            transforms = transforms.filter(t => allowedTransforms.includes(t.type));
        }

        if (transforms.length === 0) break;

        // Preferisci somme (aggiungono numeri) rispetto a operazioni
        let transform;
        if (preferNumbers) {
            const sumTransforms = transforms.filter(t => t.type === InverseTransforms.SUM);
            const opTransforms = transforms.filter(t => t.type !== InverseTransforms.SUM);

            // 70% probabilità di usare somma se disponibile, 30% operazione
            if (sumTransforms.length > 0 && (opTransforms.length === 0 || Math.random() < 0.7)) {
                transform = sumTransforms[Math.floor(Math.random() * sumTransforms.length)];
            } else if (opTransforms.length > 0) {
                transform = opTransforms[Math.floor(Math.random() * opTransforms.length)];
            } else {
                transform = transforms[Math.floor(Math.random() * transforms.length)];
            }
        } else {
            transform = transforms[Math.floor(Math.random() * transforms.length)];
        }
        state.removeNumber(numberToExpand);

        if (transform.type === InverseTransforms.SUM) {
            const pair = transform.pairs[Math.floor(Math.random() * transform.pairs.length)];
            state.addNumber(pair[0]);
            state.addNumber(pair[1]);
            state.addSolutionStep(`${pair[0]}+${pair[1]}=${numberToExpand}`);
        } else if (transform.type === InverseTransforms.SUM_DIGITS) {
            const candidate = transform.candidates[Math.floor(Math.random() * transform.candidates.length)];
            state.addNumber(candidate);
            state.addOperation(OperationType.SUM_DIGITS);
            state.addSolutionStep(`${candidate}×Σ=${numberToExpand}`);
        } else if (transform.type === InverseTransforms.SIGN) {
            const candidate = transform.candidates[Math.floor(Math.random() * transform.candidates.length)];
            state.addNumber(candidate);
            state.addOperation(OperationType.SIGN);
            state.addSolutionStep(`${candidate}×sgn=${numberToExpand}`);
        } else {
            const newNumber = transform.result[0];
            const operation = getOperationForTransform(transform.type);
            state.addNumber(newNumber);
            state.addOperation(operation);
            state.addSolutionStep(`${newNumber}×${operation}=${numberToExpand}`);
        }

        state.addDifficulty(TRANSFORM_DIFFICULTY[transform.type] || 3);
        expansions++;
    }

    const squares = shuffleArray(state.getSquares());
    return {
        name: name || `Livello`,
        squares: squares,
        solution: state.getSolution(),
        generatedDifficulty: state.difficulty,
        maxValue: calculateMaxValue(squares)
    };
}

// Genera i 100 livelli
function generate100Levels() {
    const levels = [];

    const targets = {
        tutorial: [3, 4, 5, 6],
        easy: [4, 5, 6, 8, 10],
        medium: [6, 8, 9, 10, 12, 16, 24],
        hard: [12, 16, 24, 25, 27, 32, 36],
        expert: [24, 36, 64, 81, 100, 120],
        master: [24, 36, 48, 64, 72, 81, 100, 120]
    };

    const ops = {
        tutorial: [InverseTransforms.SUM],
        easy: [InverseTransforms.SUM, InverseTransforms.MULTIPLY_2, InverseTransforms.MULTIPLY_3, InverseTransforms.NEGATE],
        medium: [InverseTransforms.SUM, InverseTransforms.MULTIPLY_2, InverseTransforms.MULTIPLY_3, InverseTransforms.NEGATE,
                 InverseTransforms.DIVIDE_2, InverseTransforms.DIVIDE_3, InverseTransforms.ABS, InverseTransforms.SQUARE, InverseTransforms.SQRT],
        hard: [InverseTransforms.SUM, InverseTransforms.MULTIPLY_2, InverseTransforms.MULTIPLY_3, InverseTransforms.NEGATE,
               InverseTransforms.DIVIDE_2, InverseTransforms.DIVIDE_3, InverseTransforms.ABS, InverseTransforms.SQUARE, InverseTransforms.SQRT,
               InverseTransforms.FLIP, InverseTransforms.SUM_DIGITS, InverseTransforms.SIGN],
        expert: [InverseTransforms.SUM, InverseTransforms.MULTIPLY_2, InverseTransforms.MULTIPLY_3, InverseTransforms.NEGATE,
                 InverseTransforms.DIVIDE_2, InverseTransforms.DIVIDE_3, InverseTransforms.ABS, InverseTransforms.SQUARE, InverseTransforms.SQRT,
                 InverseTransforms.FLIP, InverseTransforms.SUM_DIGITS, InverseTransforms.SIGN,
                 InverseTransforms.FACTORIAL, InverseTransforms.POW_2, InverseTransforms.POW_3],
        master: [InverseTransforms.SUM, InverseTransforms.MULTIPLY_2, InverseTransforms.MULTIPLY_3, InverseTransforms.NEGATE,
                 InverseTransforms.DIVIDE_2, InverseTransforms.DIVIDE_3, InverseTransforms.ABS, InverseTransforms.SQUARE, InverseTransforms.SQRT,
                 InverseTransforms.FLIP, InverseTransforms.SUM_DIGITS, InverseTransforms.SIGN,
                 InverseTransforms.FACTORIAL, InverseTransforms.POW_2, InverseTransforms.POW_3]
    };

    const names = {
        tutorial: ['Prima Coppia', 'Due Uguali', 'Somma Base', 'Catena', 'Tre Numeri', 'Primi Passi', 'Inizio', 'Semplice', 'Base', 'Avvio'],
        easy: ['Raddoppio', 'Triplice', 'Specchio', 'Doppio', 'Moltiplicazione', 'Fattore Due', 'Fattore Tre', 'Negativo', 'Inversione', 'Mix Base', 'Catena Facile', 'Somme', 'Prodotti', 'Combinazione', 'Semplice Mix'],
        medium: ['Divisione', 'Radice', 'Quadrato', 'Assoluto', 'Catena Media', 'Mix Operazioni', 'Percorso', 'Strategia', 'Calcolo', 'Ragionamento', 'Intermedio', 'Bilanciamento', 'Equilibrio', 'Scelta', 'Decisione', 'Analisi', 'Valutazione', 'Approccio', 'Metodo', 'Tecnica'],
        hard: ['Flip', 'Cifre', 'Segno', 'Complesso', 'Difficile', 'Sfida', 'Puzzle', 'Enigma', 'Rompicapo', 'Labirinto', 'Intrico', 'Nodo', 'Groviglio', 'Dedalo', 'Mistero', 'Arcano', 'Oscuro', 'Profondo', 'Arduo', 'Impegnativo', 'Tosto', 'Duro', 'Severo', 'Rigoroso', 'Esigente'],
        expert: ['Fattoriale', 'Potenza', 'Esponenziale', 'Esperto', 'Maestro', 'Virtuoso', 'Genio', 'Prodigio', 'Campione', 'Veterano', 'Elite', 'Supremo', 'Eccellente', 'Brillante', 'Luminare', 'Ultra', 'Mega', 'Super', 'Iper', 'Massimo'],
        master: ['Finale', 'Ultimo', 'Definitivo', 'Leggenda', 'Mito', 'Epico', 'Titanico', 'Colossale', 'Monumentale', 'Supremo']
    };

    // TUTORIAL (1-10)
    for (let i = 0; i < 10; i++) {
        const target = targets.tutorial[i % targets.tutorial.length];
        const level = generateLevel(target, 5 + i * 2, {
            maxSquares: 2 + Math.floor(i / 2),
            allowedTransforms: ops.tutorial,
            name: names.tutorial[i]
        });
        levels.push(level);
    }

    // FACILE (11-25)
    for (let i = 0; i < 15; i++) {
        const target = targets.easy[i % targets.easy.length];
        const level = generateLevel(target, 15 + i * 2, {
            maxSquares: 4 + Math.floor(i / 3),
            allowedTransforms: ops.easy,
            name: names.easy[i]
        });
        levels.push(level);
    }

    // MEDIO (26-45)
    for (let i = 0; i < 20; i++) {
        const target = targets.medium[i % targets.medium.length];
        const level = generateLevel(target, 30 + i * 2, {
            maxSquares: 5 + Math.floor(i / 4),
            allowedTransforms: ops.medium,
            name: names.medium[i]
        });
        levels.push(level);
    }

    // DIFFICILE (46-70)
    for (let i = 0; i < 25; i++) {
        const target = targets.hard[i % targets.hard.length];
        const level = generateLevel(target, 50 + i * 2, {
            maxSquares: 6 + Math.floor(i / 5),
            allowedTransforms: ops.hard,
            name: names.hard[i]
        });
        levels.push(level);
    }

    // ESPERTO (71-90)
    for (let i = 0; i < 20; i++) {
        const target = targets.expert[i % targets.expert.length];
        const level = generateLevel(target, 75 + i * 2, {
            maxSquares: 8 + Math.floor(i / 4),
            allowedTransforms: ops.expert,
            name: names.expert[i]
        });
        levels.push(level);
    }

    // MAESTRO (91-100)
    for (let i = 0; i < 10; i++) {
        const target = targets.master[i % targets.master.length];
        const level = generateLevel(target, 95 + i * 3, {
            maxSquares: 12 + Math.floor(i / 2),
            allowedTransforms: ops.master,
            name: names.master[i]
        });
        levels.push(level);
    }

    return levels;
}

// Ottieni chiave OperationType
function getOperationKey(value) {
    for (const [key, val] of Object.entries(OperationType)) {
        if (val === value) return key;
    }
    return value;
}

// Formatta per levels.js
function formatLevels(levels) {
    let output = `// Tipi di contenuto dei quadrati
const SquareType = {
    NUMBER: 'number',
    OPERATION: 'operation'
};

// Tipi di operazioni
const OperationType = {
    MULTIPLY_2: 'x2',
    MULTIPLY_3: 'x3',
    NEGATE: '+-',
    DIVIDE_2: '/2',
    DIVIDE_3: '/3',
    ABS: '|x|',
    SQUARE: 'x²',
    FLIP: 'flip',
    SUM_DIGITS: 'Σ',
    SIGN: 'sgn',
    FACTORIAL: 'n!',
    POW_2: '2ⁿ',
    POW_3: '3ⁿ',
    MOD_2: '%2',
    MOD_3: '%3',
    MOD_5: '%5',
    MOD_10: '%10',
    SQRT: '√',
    CLONE: '⊕',
    DIVISORS: '÷→'
};

// Operazioni speciali: non si compongono con altre operazioni
const SpecialOperations = [OperationType.ABS, OperationType.SQUARE, OperationType.FLIP, OperationType.SUM_DIGITS, OperationType.SIGN, OperationType.FACTORIAL, OperationType.POW_2, OperationType.POW_3, OperationType.MOD_2, OperationType.MOD_3, OperationType.MOD_5, OperationType.MOD_10, OperationType.SQRT, OperationType.CLONE, OperationType.DIVISORS];

// Categorie di difficoltà per 100 livelli
const DifficultyCategory = {
    TUTORIAL: { name: 'Tutorial', range: [0, 9] },
    EASY: { name: 'Facile', range: [10, 24] },
    MEDIUM: { name: 'Medio', range: [25, 44] },
    HARD: { name: 'Difficile', range: [45, 69] },
    EXPERT: { name: 'Esperto', range: [70, 89] },
    MASTER: { name: 'Maestro', range: [90, 99] }
};

// Funzione helper per ottenere la categoria di difficoltà di un livello
function getLevelDifficulty(levelIndex) {
    for (const [key, cat] of Object.entries(DifficultyCategory)) {
        if (levelIndex >= cat.range[0] && levelIndex <= cat.range[1]) {
            return cat.name;
        }
    }
    return 'Sconosciuto';
}

// 100 livelli generati con difficoltà crescente
const levels = [
`;

    for (let i = 0; i < levels.length; i++) {
        const level = levels[i];
        const category = i < 10 ? 'TUTORIAL' : i < 25 ? 'FACILE' : i < 45 ? 'MEDIO' : i < 70 ? 'DIFFICILE' : i < 90 ? 'ESPERTO' : 'MAESTRO';

        if (i === 0) output += `    // === TUTORIAL (1-10) ===\n`;
        else if (i === 10) output += `    // === FACILE (11-25) ===\n`;
        else if (i === 25) output += `    // === MEDIO (26-45) ===\n`;
        else if (i === 45) output += `    // === DIFFICILE (46-70) ===\n`;
        else if (i === 70) output += `    // === ESPERTO (71-90) ===\n`;
        else if (i === 90) output += `    // === MAESTRO (91-100) ===\n`;

        output += `    {\n`;
        output += `        name: "${level.name}",\n`;
        output += `        solution: "${level.solution}",\n`;
        output += `        maxValue: ${level.maxValue},\n`;
        output += `        squares: [\n`;

        for (const sq of level.squares) {
            if (sq.type === SquareType.NUMBER) {
                output += `            { type: SquareType.NUMBER, value: ${sq.value} },\n`;
            } else {
                output += `            { type: SquareType.OPERATION, value: OperationType.${getOperationKey(sq.value)} },\n`;
            }
        }

        output += `        ]\n`;
        output += `    }`;
        if (i < levels.length - 1) output += ',';
        output += '\n';
    }

    output += `];
`;

    return output;
}

// Esegui
console.log('Generazione 100 livelli...');
const generatedLevels = generate100Levels();
console.log(`Generati ${generatedLevels.length} livelli`);

// Statistiche
const stats = {
    total: generatedLevels.length,
    avgSquares: (generatedLevels.reduce((sum, l) => sum + l.squares.length, 0) / generatedLevels.length).toFixed(1),
    minSquares: Math.min(...generatedLevels.map(l => l.squares.length)),
    maxSquares: Math.max(...generatedLevels.map(l => l.squares.length))
};
console.log(`Statistiche: ${stats.avgSquares} quadrati medi, min ${stats.minSquares}, max ${stats.maxSquares}`);

// Scrivi file
const fs = require('fs');
const output = formatLevels(generatedLevels);
fs.writeFileSync('levels-generated.js', output);
console.log('File levels-generated.js creato!');
