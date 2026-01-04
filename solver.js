/**
 * Quadrati Numeri - Solver
 * Calcola tutte le soluzioni possibili per ogni livello
 * Supporta tutte le 17 operazioni
 */

// Rappresentazione canonica di un elemento
function elementToString(elem) {
    if (elem.type === SquareType.NUMBER) {
        return `N:${elem.value}`;
    }
    // Per operazioni, include il moltiplicatore se composto
    if (elem.composedMultiplier !== undefined) {
        return `O:x${elem.composedMultiplier}`;
    }
    return `O:${elem.value}`;
}

// Verifica se un'operazione è speciale (non componibile)
function solverIsSpecialOperation(opValue) {
    return SpecialOperations.includes(opValue);
}

// Ottieni il moltiplicatore di un'operazione (solo per operazioni componibili)
function getOperationMultiplier(elem) {
    if (elem.composedMultiplier !== undefined) {
        return elem.composedMultiplier;
    }
    switch (elem.value) {
        case OperationType.MULTIPLY_2: return 2;
        case OperationType.MULTIPLY_3: return 3;
        case OperationType.NEGATE: return -1;
        case OperationType.DIVIDE_2: return 0.5;
        case OperationType.DIVIDE_3: return 1/3;
        default:
            // Gestisce operazioni come 'x6'
            if (typeof elem.value === 'string' && elem.value.startsWith('x')) {
                return parseInt(elem.value.substring(1));
            }
            if (typeof elem.value === 'string' && elem.value.startsWith('/')) {
                return 1 / parseInt(elem.value.substring(1));
            }
            return null; // Operazione speciale, non ha moltiplicatore
    }
}

// Verifica se un numero è primo
function solverIsPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Scomponi in fattori primi
function solverPrimeFactors(n) {
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

// Verifica se un'operazione può essere applicata a un numero
function solverCanApply(num, opValue) {
    switch (opValue) {
        case OperationType.DIVIDE_2:
            return num % 2 === 0;
        case OperationType.DIVIDE_3:
            return num % 3 === 0;
        case OperationType.FACTORIAL:
            return Number.isInteger(num) && num >= 1 && num <= 6;
        case OperationType.POW_2:
            return Number.isInteger(num) && num >= 1 && num <= 10;
        case OperationType.POW_3:
            return Number.isInteger(num) && num >= 1 && num <= 6;
        case OperationType.SQRT:
            if (num < 0) return false;
            const sqrt = Math.sqrt(num);
            return Number.isInteger(sqrt);
        case OperationType.DIVISORS:
            return Number.isInteger(num) && num > 1 && num <= 100 && !solverIsPrime(num);
        default:
            return true;
    }
}

// Applica un'operazione a un numero
function solverApplyOp(num, opValue) {
    const factorials = [1, 1, 2, 6, 24, 120, 720];

    switch (opValue) {
        case OperationType.MULTIPLY_2: return num * 2;
        case OperationType.MULTIPLY_3: return num * 3;
        case OperationType.NEGATE: return -num;
        case OperationType.DIVIDE_2: return num / 2;
        case OperationType.DIVIDE_3: return num / 3;
        case OperationType.ABS: return Math.abs(num);
        case OperationType.SQUARE: return num * num;
        case OperationType.FLIP: {
            const sign = num < 0 ? -1 : 1;
            const flipped = parseInt(Math.abs(num).toString().split('').reverse().join(''), 10);
            return sign * flipped;
        }
        case OperationType.SUM_DIGITS: {
            const sign = num < 0 ? -1 : 1;
            const sum = Math.abs(num).toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
            return sign * sum;
        }
        case OperationType.SIGN:
            return num > 0 ? 1 : (num < 0 ? -1 : 0);
        case OperationType.FACTORIAL:
            return factorials[num];
        case OperationType.POW_2:
            return Math.pow(2, num);
        case OperationType.POW_3:
            return Math.pow(3, num);
        case OperationType.MOD_2:
            return ((num % 2) + 2) % 2;
        case OperationType.MOD_3:
            return ((num % 3) + 3) % 3;
        case OperationType.MOD_5:
            return ((num % 5) + 5) % 5;
        case OperationType.MOD_10:
            return ((num % 10) + 10) % 10;
        case OperationType.SQRT:
            return Math.sqrt(num);
        default:
            // Operazioni composte (es. 'x6')
            if (typeof opValue === 'string' && opValue.startsWith('x')) {
                return num * parseInt(opValue.substring(1));
            }
            if (typeof opValue === 'string' && opValue.startsWith('/')) {
                return num / parseInt(opValue.substring(1));
            }
            return num;
    }
}

// Verifica se due elementi sono uguali (per eliminazione)
function elementsEqual(a, b) {
    if (a.type !== b.type) return false;
    if (a.type === SquareType.NUMBER) {
        return a.value === b.value;
    }
    // Per operazioni speciali, devono essere identiche
    if (solverIsSpecialOperation(a.value) || solverIsSpecialOperation(b.value)) {
        return a.value === b.value;
    }
    // Per operazioni componibili, confronta i moltiplicatori
    const m1 = getOperationMultiplier(a);
    const m2 = getOperationMultiplier(b);
    return m1 !== null && m2 !== null && Math.abs(m1 - m2) < 0.0001;
}

// Combina due elementi e restituisce il risultato
// Ritorna: { result: [...elementi], eliminated: boolean }
function combineElements(a, b) {
    // Elementi uguali: si eliminano
    if (elementsEqual(a, b)) {
        return { result: [], eliminated: true };
    }

    // Caso speciale: √ + x² si annullano
    if (a.type === SquareType.OPERATION && b.type === SquareType.OPERATION) {
        if ((a.value === OperationType.SQRT && b.value === OperationType.SQUARE) ||
            (a.value === OperationType.SQUARE && b.value === OperationType.SQRT)) {
            return { result: [], eliminated: true };
        }
    }

    // Numero + Numero = Somma
    if (a.type === SquareType.NUMBER && b.type === SquareType.NUMBER) {
        return { result: [{ type: SquareType.NUMBER, value: a.value + b.value }], eliminated: false };
    }

    // Numero + Operazione
    if (a.type === SquareType.NUMBER && b.type === SquareType.OPERATION) {
        return applyOperationToNumber(a.value, b);
    }
    if (a.type === SquareType.OPERATION && b.type === SquareType.NUMBER) {
        return applyOperationToNumber(b.value, a);
    }

    // Operazione + Operazione
    if (a.type === SquareType.OPERATION && b.type === SquareType.OPERATION) {
        return combineOperations(a, b);
    }

    return null; // Combinazione non valida
}

// Applica un'operazione a un numero
function applyOperationToNumber(num, op) {
    const opValue = op.composedMultiplier !== undefined ? `x${op.composedMultiplier}` : op.value;

    // Verifica se applicabile
    if (!solverCanApply(num, opValue)) {
        return null; // Non applicabile
    }

    // Caso speciale: CLONE duplica l'elemento
    if (opValue === OperationType.CLONE) {
        return {
            result: [
                { type: SquareType.NUMBER, value: num },
                { type: SquareType.NUMBER, value: num }
            ],
            eliminated: false
        };
    }

    // Caso speciale: DIVISORS scompone in fattori primi
    if (opValue === OperationType.DIVISORS) {
        const factors = solverPrimeFactors(num);
        return {
            result: factors.map(f => ({ type: SquareType.NUMBER, value: f })),
            eliminated: false
        };
    }

    // Operazioni normali
    const result = solverApplyOp(num, opValue);
    return { result: [{ type: SquareType.NUMBER, value: result }], eliminated: false };
}

// Combina due operazioni
function combineOperations(a, b) {
    // Operazioni speciali non si compongono
    if (solverIsSpecialOperation(a.value) || solverIsSpecialOperation(b.value)) {
        return null; // Non possono combinarsi
    }

    const m1 = getOperationMultiplier(a);
    const m2 = getOperationMultiplier(b);

    if (m1 === null || m2 === null) return null;

    const result = m1 * m2;

    // Se il risultato è 1 (identità), entrambi spariscono
    if (Math.abs(result - 1) < 0.0001) {
        return { result: [], eliminated: true };
    }

    // Determina se il risultato è una divisione o moltiplicazione
    if (result < 1 && result > 0) {
        const divisor = Math.round(1 / result);
        return {
            result: [{
                type: SquareType.OPERATION,
                value: `/${divisor}`,
                composedMultiplier: result
            }],
            eliminated: false
        };
    }

    return {
        result: [{
            type: SquareType.OPERATION,
            value: `x${Math.round(result)}`,
            composedMultiplier: result
        }],
        eliminated: false
    };
}

// Rappresentazione canonica di uno stato (multiset ordinato)
function stateToCanonical(state) {
    return state.map(elementToString).sort().join(',');
}

// Genera tutte le mosse uniche da uno stato (incluse cestinazioni se disponibili)
function getUniqueMoves(state, trashSlotsRemaining = 0) {
    const moves = [];
    const seenPairs = new Set();

    // Mosse normali: combinazione di due elementi
    for (let i = 0; i < state.length; i++) {
        for (let j = i + 1; j < state.length; j++) {
            // Crea una chiave canonica per la coppia
            const key1 = elementToString(state[i]);
            const key2 = elementToString(state[j]);
            const pairKey = [key1, key2].sort().join('|');

            if (!seenPairs.has(pairKey)) {
                seenPairs.add(pairKey);
                moves.push({
                    type: 'combine',
                    indices: [i, j],
                    elements: [state[i], state[j]],
                    description: `${key1} + ${key2}`
                });
            }
        }
    }

    // Mosse cestino: scarta un singolo elemento
    if (trashSlotsRemaining > 0) {
        const seenTrash = new Set();
        for (let i = 0; i < state.length; i++) {
            const key = elementToString(state[i]);
            if (!seenTrash.has(key)) {
                seenTrash.add(key);
                moves.push({
                    type: 'trash',
                    index: i,
                    element: state[i],
                    description: `Cestina ${key}`
                });
            }
        }
    }

    return moves;
}

// Applica una mossa e restituisce il nuovo stato
function applyMove(state, move) {
    const newState = [];

    // Mossa cestino: rimuovi solo un elemento
    if (move.type === 'trash') {
        for (let k = 0; k < state.length; k++) {
            if (k !== move.index) {
                newState.push({ ...state[k] });
            }
        }
        return newState;
    }

    // Mossa combinazione: rimuovi due elementi e aggiungi risultato
    const [i, j] = move.indices;

    // Copia tutti gli elementi tranne quelli coinvolti nella mossa
    for (let k = 0; k < state.length; k++) {
        if (k !== i && k !== j) {
            newState.push({ ...state[k] });
        }
    }

    // Combina i due elementi
    const combineResult = combineElements(state[i], state[j]);

    // Se la combinazione non è valida, ritorna null
    if (combineResult === null) {
        return null;
    }

    // Aggiungi i risultati allo stato (può essere 0, 1 o più elementi)
    for (const elem of combineResult.result) {
        newState.push(elem);
    }

    return newState;
}

// Descrizione della mossa in formato leggibile
function getMoveDescription(elem1, elem2, combineResult) {
    const e1 = elem1.type === SquareType.NUMBER ? elem1.value : elem1.value;
    const e2 = elem2.type === SquareType.NUMBER ? elem2.value : elem2.value;

    // Elementi eliminati (uguali o annullamento)
    if (combineResult === null || combineResult.result.length === 0) {
        return `${e1}+${e2} spariscono`;
    }

    // Risultato singolo
    if (combineResult.result.length === 1) {
        const r = combineResult.result[0].value;
        if (elem1.type === SquareType.NUMBER && elem2.type === SquareType.NUMBER) {
            return `${e1}+${e2}=${r}`;
        }
        return `${e1}×${e2}=${r}`;
    }

    // Risultati multipli (clone, divisori)
    const results = combineResult.result.map(r => r.value).join(',');
    return `${e1}×${e2}=[${results}]`;
}

// Algoritmo di backtracking per trovare tutte le soluzioni
function solve(state, path = [], solutions = [], visited = new Set(), trashSlotsRemaining = 0) {
    // Stato canonico per evitare rivisitazioni
    const canonical = stateToCanonical(state);

    // Se lo stato è già stato visitato con lo stesso percorso di lunghezza, skip
    // (ma permettiamo percorsi diversi allo stesso stato)

    // Vittoria: nessun elemento rimasto
    if (state.length === 0) {
        solutions.push([...path]);
        return;
    }

    // Genera tutte le mosse uniche (incluse cestinazioni se disponibili)
    const moves = getUniqueMoves(state, trashSlotsRemaining);

    // Nessuna mossa disponibile = dead end
    if (moves.length === 0) {
        return;
    }

    // Prova ogni mossa
    for (const move of moves) {
        const newState = applyMove(state, move);

        // Se la mossa non è valida (es. operazione non applicabile), salta
        if (newState === null) continue;

        let moveDesc;
        let newTrashSlots = trashSlotsRemaining;

        if (move.type === 'trash') {
            const elemStr = move.element.type === SquareType.NUMBER
                ? move.element.value
                : move.element.value;
            moveDesc = `Cestina ${elemStr}`;
            newTrashSlots--;
        } else {
            const result = combineElements(move.elements[0], move.elements[1]);
            moveDesc = getMoveDescription(move.elements[0], move.elements[1], result);
        }

        solve(newState, [...path, moveDesc], solutions, visited, newTrashSlots);
    }
}

// Trova tutte le prime mosse sicure (che portano sempre a una soluzione)
function findSafeFirstMoves(state) {
    const moves = getUniqueMoves(state);
    const safeMoves = [];

    for (const move of moves) {
        const newState = applyMove(state, move);

        // Se la mossa non è valida, salta
        if (newState === null) continue;

        const solutions = [];
        solve(newState, [], solutions);

        // Se c'è almeno una soluzione da questo stato, la mossa è "possibile"
        // Ma per essere "sicura", ogni stato raggiungibile deve avere soluzioni
        if (solutions.length > 0) {
            const result = combineElements(move.elements[0], move.elements[1]);
            const moveDesc = getMoveDescription(move.elements[0], move.elements[1], result);
            safeMoves.push({
                move: moveDesc,
                solutionsCount: solutions.length
            });
        }
    }

    return safeMoves;
}

// Analizza un livello completo
function analyzeLevel(levelIndex) {
    const level = levels[levelIndex];
    const initialState = level.squares.map(sq => ({ ...sq }));
    const trashSlots = level.trashSlots || 0;

    const solutions = [];
    solve(initialState, [], solutions, new Set(), trashSlots);

    // Calcola statistiche
    const moveLengths = solutions.map(s => s.length);
    const minMoves = solutions.length > 0 ? Math.min(...moveLengths) : 0;
    const maxMoves = solutions.length > 0 ? Math.max(...moveLengths) : 0;

    // Trova prime mosse sicure (incluse cestinazioni)
    const firstMoves = getUniqueMoves(initialState, trashSlots);
    const safeFirstMoves = [];
    const unsafeFirstMoves = [];

    for (const move of firstMoves) {
        const newState = applyMove(initialState, move);

        // Se la mossa non è valida, salta
        if (newState === null) continue;

        const moveSolutions = [];
        const newTrashSlots = move.type === 'trash' ? trashSlots - 1 : trashSlots;
        solve(newState, [], moveSolutions, new Set(), newTrashSlots);

        let moveDesc;
        if (move.type === 'trash') {
            const elemStr = move.element.type === SquareType.NUMBER
                ? move.element.value
                : move.element.value;
            moveDesc = `Cestina ${elemStr}`;
        } else {
            const result = combineElements(move.elements[0], move.elements[1]);
            moveDesc = getMoveDescription(move.elements[0], move.elements[1], result);
        }

        if (moveSolutions.length > 0) {
            safeFirstMoves.push(moveDesc);
        } else {
            unsafeFirstMoves.push(moveDesc);
        }
    }

    // Rimuovi duplicati dalle soluzioni (percorsi identici)
    const uniqueSolutions = [];
    const seenPaths = new Set();
    for (const sol of solutions) {
        const pathKey = sol.join(' -> ');
        if (!seenPaths.has(pathKey)) {
            seenPaths.add(pathKey);
            uniqueSolutions.push(sol);
        }
    }

    return {
        levelIndex: levelIndex + 1,
        levelName: level.name,
        difficulty: getLevelDifficulty(levelIndex),
        totalSquares: level.squares.length,
        trashSlots: trashSlots,
        totalSolutions: uniqueSolutions.length,
        minMoves,
        maxMoves,
        safeFirstMoves,
        unsafeFirstMoves,
        hasDeadEnds: unsafeFirstMoves.length > 0,
        isSolvable: uniqueSolutions.length > 0,
        solutions: uniqueSolutions,
        documentedSolution: level.solution || null
    };
}

// Analizza tutti i livelli
function analyzeAllLevels() {
    const results = [];
    for (let i = 0; i < levels.length; i++) {
        results.push(analyzeLevel(i));
    }
    return results;
}

// Estrae il "finale" dall'ultima mossa (la coppia che sparisce per ultima)
function extractFinale(lastMove) {
    // L'ultima mossa è del tipo "4+4 spariscono" o "x2+x2 spariscono"
    const match = lastMove.match(/^(.+)\+.+ spariscono$/);
    if (match) {
        return match[1];
    }
    return lastMove; // fallback
}

// Raggruppa le soluzioni per finale
function groupSolutionsByFinale(solutions) {
    const groups = {};

    for (const sol of solutions) {
        if (sol.length === 0) continue;
        const lastMove = sol[sol.length - 1];
        const finale = extractFinale(lastMove);

        if (!groups[finale]) {
            groups[finale] = [];
        }
        groups[finale].push(sol);
    }

    return groups;
}

// Formatta i risultati per la visualizzazione
function formatResults(results) {
    let output = '';

    for (const r of results) {
        output += `\n${'='.repeat(50)}\n`;
        output += `Livello ${r.levelIndex}: ${r.levelName} (${r.difficulty})\n`;
        output += `${'='.repeat(50)}\n`;
        output += `Quadrati: ${r.totalSquares}\n`;
        output += `Risolvibile: ${r.isSolvable ? 'SI' : 'NO'}\n`;
        output += `Soluzioni totali: ${r.totalSolutions}\n`;

        if (r.totalSolutions > 0) {
            output += `Mosse: min ${r.minMoves}, max ${r.maxMoves}\n`;
            output += `Prime mosse sicure: ${r.safeFirstMoves.join(', ') || 'nessuna'}\n`;

            if (r.unsafeFirstMoves.length > 0) {
                output += `Prime mosse PERICOLOSE: ${r.unsafeFirstMoves.join(', ')}\n`;
            }

            // Raggruppa soluzioni per finale
            const groupedByFinale = groupSolutionsByFinale(r.solutions);
            const finali = Object.keys(groupedByFinale);

            output += `\nFinali diversi trovati: ${finali.length} (${finali.join(', ')})\n`;

            for (const finale of finali) {
                const soluzioniFinale = groupedByFinale[finale];
                const numDaMostrare = Math.min(5, soluzioniFinale.length);

                output += `\n--- Finale: ${finale}+${finale} (${soluzioniFinale.length} soluzioni, prime ${numDaMostrare}) ---\n`;

                for (let i = 0; i < numDaMostrare; i++) {
                    output += `  ${i + 1}. ${soluzioniFinale[i].join(' -> ')}\n`;
                }
            }
        }
    }

    return output;
}

// Genera report riassuntivo
function generateSummary(results) {
    const solvable = results.filter(r => r.isSolvable).length;
    const unsolvable = results.filter(r => !r.isSolvable);
    const withDeadEnds = results.filter(r => r.hasDeadEnds);

    let summary = '\n' + '='.repeat(60) + '\n';
    summary += 'RIEPILOGO ANALISI\n';
    summary += '='.repeat(60) + '\n';
    summary += `Livelli totali: ${results.length}\n`;
    summary += `Livelli risolvibili: ${solvable}\n`;
    summary += `Livelli NON risolvibili: ${unsolvable.length}\n`;
    summary += `Livelli con mosse pericolose: ${withDeadEnds.length}\n`;

    if (unsolvable.length > 0) {
        summary += `\nLivelli NON risolvibili:\n`;
        unsolvable.forEach(r => {
            summary += `  - ${r.levelIndex}. ${r.levelName}\n`;
        });
    }

    if (withDeadEnds.length > 0) {
        summary += `\nLivelli con mosse pericolose (dead ends):\n`;
        withDeadEnds.forEach(r => {
            summary += `  - ${r.levelIndex}. ${r.levelName}: ${r.unsafeFirstMoves.join(', ')}\n`;
        });
    }

    return summary;
}
