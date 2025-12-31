# Analisi delle Strategie Sicure

**Issue:** #1
**Data:** 2025-12-31

## Sintesi

Le ipotesi iniziali sono state **entrambe falsificate**:

| Ipotesi | Risultato |
|---------|-----------|
| Eliminare [N]+[N] è sempre sicuro | **FALSO** |
| Eliminare [op]+[op] è sempre sicuro | **FALSO** |

## Caso 1: Coppie di numeri identici [N]+[N]

### Controesempio teorico (dall'issue)

**Configurazione:** `[2], [2], [3], [5], [x2]`

**Se elimino 2+2 subito:**
- Rimangono [3], [5], [x2]
- 3+5=8 → [8], [x2] - bloccato
- 3×x2=6 → [5], [6] - bloccato
- 5×x2=10 → [3], [10] - bloccato

**Soluzione corretta:**
1. 2+5=7 → [2], [3], [7], [x2]
2. 2×x2=4 → [3], [7], [4]
3. 3+4=7 → [7], [7]
4. 7+7 spariscono ✓

### Controesempio nel gioco: Livello 22 "Venti"

**Configurazione:** `[4], [5], [6], [10], [10], [15], [20], [x2]`

**Se elimino 10+10 subito:**
- Rimangono [4], [5], [6], [15], [20], [x2]
- 5+15=20 → [4], [6], [20], [20], [x2]
- 20+20 spariscono → [4], [6], [x2]
- Tutte le combinazioni portano a blocco

**Nota:** La soluzione documentata nel codice (`script.js:372`) termina con [20] rimasto.
Questo potrebbe indicare un **bug nel design del livello**.

Il controesempio rimane comunque valido: eliminare 10+10 subito porta sicuramente a un blocco.

## Caso 2: Coppie di operazioni identiche [op]+[op]

### Controesempio costruito

**Configurazione:** `[2], [2], [-4], [+-], [+-]`

**Se elimino [+-]+[+-]:**
- [+-]×[+-] = (-1)×(-1) = 1 (identità) → spariscono
- Rimangono [2], [2], [-4]
- 2+2 spariscono → [-4] bloccato

**Soluzione corretta:**
1. 2×[+-]=-2 → [2], [-2], [-4], [+-]
2. (-4)×[+-]=4 → [2], [-2], [4]
3. (-2)+4=2 → [2], [2]
4. 2+2 spariscono ✓

## Caso 3: [+-] × [+-]

Quando due operazioni [+-] vengono composte:
- Moltiplicatore: (-1) × (-1) = 1
- Risultato: identità → entrambi spariscono

Questo caso segue le stesse conclusioni del Caso 2.

## Invarianti Confermate

### Nessuna strategia "greedy" è sempre sicura

Non esiste una regola semplice del tipo "elimina sempre X" che garantisca la vittoria.

### L'ordine delle mosse è critico

Il gioco richiede **pianificazione** e valutazione delle conseguenze a più passi.

### Le operazioni sono risorse strategiche

Le operazioni (x2, x3, +-) devono essere "spese" nel momento giusto per creare i valori necessari.

## Raccomandazioni per Issue #3 (Risolutore)

Un risolutore automatico dovrebbe:

1. **Usare backtracking** - non esistono euristiche locali affidabili
2. **Esplorare l'albero delle mosse** - ogni stato ha multiple continuazioni
3. **Riconoscere stati terminali:**
   - Vittoria: 0 quadrati
   - Sconfitta: nessuna mossa porta a eliminazioni utili
4. **Ottimizzare con memoization** - stati equivalenti (stesso multiset di valori)

## Appendice: Livelli con coppie identiche

| Livello | Nome | Coppie identiche | Note |
|---------|------|------------------|------|
| 1 | Tutorial | [3], [3] | Unica mossa |
| 5 | Catena | [5], [5] | Eliminazione sicura all'inizio |
| 6 | Doppio x2 | [x2], [x2] | Eliminazione sicura |
| 9 | Otto per Due | [x3], [x3] | Eliminazione alla fine |
| 10 | Somma Otto | [2], [2] | Eliminazione sicura all'inizio |
| 14 | Dodici | [8], [8] | Eliminazione alla fine |
| 20 | Maestro | [x3], [x3] | Eliminazione all'inizio |
| 21 | Decine | [10], [10] | **NON** eliminare subito |
| 22 | Venti | [10], [10] | **NON** eliminare subito |
| 24 | Caos Totale | [6], [6] | Da verificare |
| 25 | Finale | [15], [15] | Da verificare |
