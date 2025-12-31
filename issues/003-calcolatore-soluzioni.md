# Issue #003: Calcolatore delle soluzioni di un livello

**Tipo:** Feature / Tool
**Priorità:** Alta
**Stato:** Aperto

## Descrizione

Implementare un algoritmo che calcola tutte le soluzioni possibili di un livello, considerando che elementi identici sono intercambiabili (non contano come mosse separate).

## Problema da risolvere

Se un livello contiene `[3], [3], [5]`, le mosse:
- "primo 3 + 5" poi "secondo 3 rimasto"
- "secondo 3 + 5" poi "primo 3 rimasto"

Sono **la stessa soluzione** e devono contare come 1, non 2.

## Definizione formale

### Stato del gioco
Multiset (insieme con ripetizioni) di contenuti:
```
{3, 3, 5} oppure {2, 2, x2, x3}
```

### Mossa
Coppia non ordinata di elementi distinti del multiset:
```
{a, b} dove a ≠ b (come posizione, non valore)
```

### Equivalenza di soluzioni
Due sequenze di mosse sono equivalenti se:
1. Portano dallo stesso stato iniziale allo stesso stato finale
2. Differiscono solo per la scelta tra elementi con stesso valore

### Rappresentazione canonica
Per evitare duplicati, rappresentare le mosse usando i **valori**, non gli indici:
```
Mossa: (valore1, valore2, risultato)
Esempio: (3, 5, 8) significa "combina un 3 con un 5 per ottenere 8"
```

## Algoritmo proposto

```javascript
function findAllSolutions(level) {
    const solutions = [];
    const visited = new Set(); // Stati già esplorati

    function solve(state, moves) {
        // Stato canonico: multiset ordinato come stringa
        const stateKey = canonicalize(state);

        if (state.length === 0) {
            solutions.push([...moves]);
            return;
        }

        if (visited.has(stateKey)) return;
        visited.add(stateKey);

        // Genera mosse uniche (evita duplicati per elementi uguali)
        const uniqueMoves = getUniqueMoves(state);

        for (const move of uniqueMoves) {
            const newState = applyMove(state, move);
            solve(newState, [...moves, move]);
        }

        visited.delete(stateKey); // Backtrack
    }

    solve(levelToState(level), []);
    return solutions;
}

function getUniqueMoves(state) {
    const moves = new Set();
    const seen = new Set(); // Coppie di valori già considerate

    for (let i = 0; i < state.length; i++) {
        for (let j = i + 1; j < state.length; j++) {
            const v1 = state[i].toString();
            const v2 = state[j].toString();
            const pairKey = [v1, v2].sort().join('|');

            if (!seen.has(pairKey)) {
                seen.add(pairKey);
                moves.add({
                    values: [state[i], state[j]],
                    result: combine(state[i], state[j])
                });
            }
        }
    }

    return [...moves];
}

function canonicalize(state) {
    return state.map(s => s.toString()).sort().join(',');
}
```

## Output atteso

Per ogni livello, produrre:

```javascript
{
    levelIndex: 0,
    levelName: "Tutorial",
    totalSolutions: 1,
    minMoves: 1,
    maxMoves: 1,
    solutions: [
        {
            moves: [
                { from: [3, 3], action: "match", result: null }
            ],
            moveCount: 1
        }
    ],
    hasDeadEnds: false,  // Esistono stati irrisolvibili?
    safeFirstMoves: ["3+3"]  // Mosse iniziali che garantiscono vittoria
}
```

## Casi particolari da gestire

### 1. Operazioni composte
`x2 × x3 = x6` - il risultato è un'operazione con moltiplicatore composto

### 2. Operazioni che si annullano
`+- × +- = x1` (identità) → entrambi spariscono

### 3. Numeri zero
`5 + (-5) = 0` → il risultato è `[0]`, che può combinarsi con altri `[0]`

### 4. Loop infiniti teorici
Impossibili nel gioco attuale (ogni mossa riduce o mantiene il numero di elementi), ma verificare

## Metriche da calcolare

| Livello | Nome | Soluzioni | Min mosse | Max mosse | Vicoli ciechi |
|---------|------|-----------|-----------|-----------|---------------|
| 1 | Tutorial | 1 | 1 | 1 | No |
| 2 | Somma | ? | ? | ? | ? |
| ... | ... | ... | ... | ... | ... |

## Interfaccia utente

### Opzione A: Console/CLI
Script Node.js che stampa report per tutti i livelli

### Opzione B: Pannello debug nel gioco
Bottone "🔍 Analizza" che mostra soluzioni del livello corrente

### Opzione C: Pagina web separata
`solver.html` con:
- Dropdown per selezionare livello
- Bottone "Calcola"
- Visualizzazione albero delle soluzioni
- Replay animato di una soluzione selezionata

## Tasks

- [ ] Implementare rappresentazione canonica dello stato
- [ ] Implementare generatore di mosse uniche
- [ ] Implementare algoritmo di ricerca con backtracking
- [ ] Gestire casi particolari (operazioni composte, annullamenti)
- [ ] Creare report per tutti i 25 livelli
- [ ] Validare che tutti i livelli siano risolvibili
- [ ] Verificare le soluzioni documentate nei commenti
- [ ] Identificare livelli con soluzioni multiple vs. uniche

## Collegamento con Issue #001

Questo calcolatore risponde direttamente alle domande poste nell'Issue #001 sull'analisi delle strategie sicure.
