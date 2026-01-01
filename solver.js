/**
 * Quadrati Numeri - Solver
 * Calcola tutte le soluzioni possibili per ogni livello
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

// Ottieni il moltiplicatore di un'operazione
function getOperationMultiplier(elem) {
    if (elem.composedMultiplier !== undefined) {
        return elem.composedMultiplier;
    }
    switch (elem.value) {
        case OperationType.MULTIPLY_2: return 2;
        case OperationType.MULTIPLY_3: return 3;
        case OperationType.NEGATE: return -1;
        default:
            // Gestisce operazioni come 'x6'
            if (typeof elem.value === 'string' && elem.value.startsWith('x')) {
                return parseInt(elem.value.substring(1));
            }
            return 1;
    }
}

// Verifica se due elementi sono uguali (per eliminazione)
function elementsEqual(a, b) {
    if (a.type !== b.type) return false;
    if (a.type === SquareType.NUMBER) {
        return a.value === b.value;
    }
    // Per operazioni, confronta i moltiplicatori
    return getOperationMultiplier(a) === getOperationMultiplier(b);
}

// Combina due elementi e restituisce il risultato (o null se si eliminano)
function combineElements(a, b) {
    // Elementi uguali: si eliminano
    if (elementsEqual(a, b)) {
        return null; // Entrambi spariscono
    }

    // Numero + Numero = Somma
    if (a.type === SquareType.NUMBER && b.type === SquareType.NUMBER) {
        return { type: SquareType.NUMBER, value: a.value + b.value };
    }

    // Numero + Operazione (o viceversa)
    if (a.type === SquareType.NUMBER && b.type === SquareType.OPERATION) {
        const mult = getOperationMultiplier(b);
        return { type: SquareType.NUMBER, value: a.value * mult };
    }
    if (a.type === SquareType.OPERATION && b.type === SquareType.NUMBER) {
        const mult = getOperationMultiplier(a);
        return { type: SquareType.NUMBER, value: b.value * mult };
    }

    // Operazione + Operazione = Composizione
    if (a.type === SquareType.OPERATION && b.type === SquareType.OPERATION) {
        const m1 = getOperationMultiplier(a);
        const m2 = getOperationMultiplier(b);
        const result = m1 * m2;

        // Se il risultato è 1 (identità), entrambi spariscono
        if (result === 1) {
            return null;
        }

        return {
            type: SquareType.OPERATION,
            value: `x${result}`,
            composedMultiplier: result
        };
    }

    return null;
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
    const result = combineElements(state[i], state[j]);

    // Se il risultato non è null, aggiungilo allo stato
    if (result !== null) {
        newState.push(result);
    }

    return newState;
}

// Descrizione della mossa in formato leggibile
function getMoveDescription(elem1, elem2, result) {
    const e1 = elem1.type === SquareType.NUMBER ? elem1.value : elem1.value;
    const e2 = elem2.type === SquareType.NUMBER ? elem2.value : elem2.value;

    if (result === null) {
        return `${e1}+${e2} spariscono`;
    }

    const r = result.type === SquareType.NUMBER ? result.value : result.value;
    if (elem1.type === SquareType.NUMBER && elem2.type === SquareType.NUMBER) {
        return `${e1}+${e2}=${r}`;
    }
    return `${e1}×${e2}=${r}`;
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
