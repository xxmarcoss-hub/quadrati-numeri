# Issue #004: Cestino per elementi di disturbo

**Tipo:** Feature / Game Mechanic
**Priorità:** Media
**Stato:** Aperto

## Descrizione

Aggiungere un elemento "cestino" esterno all'area di gioco dove il giocatore può scartare elementi che impedirebbero la vittoria.

## Motivazione

Alcuni livelli potrebbero contenere elementi "trappola" o "di disturbo" che:
- Non possono essere combinati utilmente con altri elementi
- Bloccano la soluzione se non rimossi
- Aggiungono una dimensione strategica: capire COSA scartare

## Meccanica proposta

### Comportamento base
- Il cestino è un'area fissa fuori dalla griglia di gioco
- Trascinare un elemento nel cestino lo elimina permanentemente
- L'elemento scompare con animazione (dissolvenza, caduta, ecc.)

### Limitazioni (opzioni di design)

#### Opzione A: Cestino illimitato
- Si può buttare qualsiasi cosa, quante volte si vuole
- Pro: più accessibile
- Contro: riduce la sfida, si può "bruteforcare"

#### Opzione B: Cestino limitato per livello
- Ogni livello specifica quanti elementi si possono cestinare (es. 1, 2, 0)
- Indicatore visivo: "🗑️ 2/2" → "🗑️ 1/2" → "🗑️ 0/2"
- Pro: bilanciato, parte del puzzle
- Contro: più complesso da progettare i livelli

#### Opzione C: Cestino a costo
- Cestinare costa "punti" o "mosse"
- Punteggio finale penalizzato per ogni uso
- Pro: incentiva soluzioni "pulite"
- Contro: meccanica extra da spiegare

### Opzione consigliata: B (limitato per livello)

```javascript
const level = {
    name: "Trappola",
    trashSlots: 1,  // Può cestinare 1 elemento
    squares: [
        { type: SquareType.NUMBER, value: 2 },
        { type: SquareType.NUMBER, value: 2 },
        { type: SquareType.NUMBER, value: 7 },  // Elemento trappola!
        { type: SquareType.NUMBER, value: 3 },
        { type: SquareType.NUMBER, value: 5 },
        { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
    ]
    // Soluzione: cestina [7], poi 2+3=5, 5+5 spariscono, 2×x2=4... ecc.
};
```

## Design UI

```
┌─────────────────────────────────────────────┐
│  QUADRATI NUMERI           Livello: 5       │
├─────────────────────────────────────────────┤
│                                             │
│   ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│   │ 2  │ │ 2  │ │ 7  │ │ 3  │              │
│   └────┘ └────┘ └────┘ └────┘              │
│                                             │
│   ┌────┐ ┌────┐                            │
│   │ 5  │ │ x2 │                            │
│   └────┘ └────┘                            │
│                                             │
├─────────────────────────────────────────────┤
│                              ┌──────────┐   │
│   [Ricomincia] [← Prec] [→]  │ 🗑️ 1/1  │   │
│                              └──────────┘   │
└─────────────────────────────────────────────┘
```

### Animazione cestino
- Hover su cestino mentre si trascina: cestino si "apre" (cambia icona)
- Drop: elemento cade/dissolve nel cestino
- Cestino esaurito: appare grigio/barrato, rifiuta drop

## Impatto sul gameplay

### Nuovi tipi di livelli possibili

1. **Livelli con distrattore ovvio**
   - Un numero primo grande (es. 17) impossibile da costruire/eliminare
   - Insegna: "non tutto è utile"

2. **Livelli con scelta strategica**
   - Due elementi problematici, un solo slot cestino
   - Bisogna capire quale buttare

3. **Livelli senza cestino**
   - `trashSlots: 0` → cestino non appare
   - Tutti gli elementi sono necessari

4. **Livelli generosi**
   - `trashSlots: 2` ma solo 1 elemento da buttare
   - Margine di errore per principianti

## Integrazione con Issue #003 (Calcolatore soluzioni)

Il calcolatore deve considerare anche le mosse "cestina elemento X":

```javascript
function getUniqueMoves(state, trashSlotsRemaining) {
    const moves = [...getCombinationMoves(state)];

    if (trashSlotsRemaining > 0) {
        // Aggiungi mosse di cestinamento (una per tipo di valore unico)
        const uniqueValues = [...new Set(state.map(s => s.toString()))];
        for (const val of uniqueValues) {
            moves.push({
                type: 'trash',
                value: val,
                result: null
            });
        }
    }

    return moves;
}
```

## Tasks

- [ ] Decidere meccanica (A/B/C) - consigliata B
- [ ] Aggiungere proprietà `trashSlots` alla struttura livelli
- [ ] Creare elemento UI cestino
- [ ] Implementare drag-and-drop verso cestino
- [ ] Animazioni cestino (aperto, chiuso, pieno)
- [ ] Aggiornare stato gioco con contatore cestino
- [ ] Creare 3-5 livelli che richiedono uso del cestino
- [ ] Aggiornare calcolatore soluzioni (Issue #003)
- [ ] Tutorial per meccanica cestino

## Livelli di esempio

### Livello "Intruso" (facile, 1 slot)
```javascript
{
    name: "Intruso",
    trashSlots: 1,
    squares: [
        { type: NUMBER, value: 4 },
        { type: NUMBER, value: 4 },
        { type: NUMBER, value: 13 }  // Numero primo, impossibile
    ]
}
// Soluzione: cestina 13, elimina 4+4
```

### Livello "Scelta" (medio, 1 slot)
```javascript
{
    name: "Scelta",
    trashSlots: 1,
    squares: [
        { type: NUMBER, value: 3 },
        { type: NUMBER, value: 3 },
        { type: NUMBER, value: 7 },
        { type: NUMBER, value: 11 },
        { type: OPERATION, value: 'x2' }
    ]
}
// Cestinare 7 o 11? Solo una scelta porta alla vittoria
```
