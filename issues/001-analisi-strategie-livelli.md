# Issue #001: Analisi delle strategie sicure nei livelli

**Tipo:** Game Design Analysis
**Priorità:** Media
**Stato:** Aperto

## Contesto

Il gioco presenta 25 livelli con meccaniche di combinazione tra numeri e operazioni. È necessaria un'analisi formale per identificare strategie "sicure" che garantiscano il progresso verso la vittoria.

## Domanda principale

> Se un livello contiene due quadrati identici (es. `[5]` e `[5]`), è sempre una mossa sicura eliminarli immediatamente?

## Analisi preliminare

### Caso 1: Coppie di numeri identici

**Ipotesi:** Eliminare `[N]` + `[N]` è sempre sicuro.

**Potenziali controesempi da verificare:**
- Un livello potrebbe richiedere di usare uno dei due `[5]` per creare un valore intermedio necessario
- Esempio teorico: `[5], [5], [3], [x2]` → se la soluzione richiede `5+3=8`, `8×x2=16`, allora eliminare `5+5` subito potrebbe bloccare

**Verifica nei livelli esistenti:**
- Livello 5 "Catena": contiene `[5], [5]` → soluzione documentata li elimina subito ✓
- Livello 21 "Decine": contiene `[10], [10]` → verifica necessaria
- Livello 25 "Finale": contiene `[15], [15]` → soluzione li elimina subito ✓

### Caso 2: Coppie di operazioni identiche

**Ipotesi:** Eliminare `[x2]` + `[x2]` è sempre sicuro.

**Potenziali controesempi:**
- Potrebbe servire applicare `x2` a due numeri diversi
- Livello 6 "Doppio x2": contiene `[x2], [x2]` → soluzione li elimina subito ✓

### Caso 3: Operazioni che si annullano

**Ipotesi:** Comporre operazioni che danno identità (es. `[+-]` × `[+-]` = `x1`) è sempre sicuro.

**Da verificare:** esistono livelli dove servono entrambe le negazioni separatamente?

## Tasks di analisi

- [ ] Creare un risolutore automatico per verificare tutte le soluzioni possibili di ogni livello
- [ ] Per ogni livello con coppie identiche, verificare se esistono soluzioni che NON eliminano la coppia subito
- [ ] Identificare se esistono livelli "trappola" dove la mossa ovvia porta a vicolo cieco
- [ ] Documentare le invarianti strategiche confermate

## Metriche da raccogliere

Per ogni livello:
1. Numero minimo di mosse per la vittoria
2. Numero di soluzioni distinte
3. Esistenza di "vicoli ciechi" (stati irrisolvibili raggiungibili)
4. Mosse "sicure" garantite (che non portano mai a vicolo cieco)

## Proposta tecnica

Implementare una funzione `analyzeSolvability(levelConfig)` che:
1. Genera tutti gli stati raggiungibili tramite BFS/DFS
2. Identifica stati vincenti (0 quadrati) e stati bloccati
3. Per ogni coppia identica, verifica se eliminarla subito preserva la risolvibilità

```javascript
// Pseudocodice
function isSafeMove(state, move) {
    const newState = applyMove(state, move);
    return isSolvable(newState);
}

function isSolvable(state) {
    if (state.squares.length === 0) return true;
    if (getPossibleMoves(state).length === 0) return false;
    return getPossibleMoves(state).some(move =>
        isSolvable(applyMove(state, move))
    );
}
```

## Note aggiuntive

L'analisi potrebbe rivelare che alcuni livelli hanno bisogno di ribilanciamento, o che le soluzioni documentate nei commenti del codice non sono le uniche possibili.
