# Tabella Combinazioni Drag-Drop

Questo documento descrive tutte le possibili combinazioni quando si trascina un elemento (riga) su un altro elemento (colonna).

## Legenda

- **n** = numero qualsiasi
- **=** = risultato dell'operazione
- **X** = combinazione non ammessa (feedback "rejected")
- **spariscono** = entrambi gli elementi vengono rimossi

### Operazioni Componibili (moltiplicative)
| Simbolo | Nome | Effetto |
|---------|------|---------|
| x2 | Moltiplica per 2 | n → n×2 |
| x3 | Moltiplica per 3 | n → n×3 |
| +- | Inverti segno | n → -n |
| /2 | Dividi per 2 | n → n÷2 (solo pari) |
| /3 | Dividi per 3 | n → n÷3 (solo multipli di 3) |

### Operazioni Speciali (non componibili)
| Simbolo | Nome | Effetto |
|---------|------|---------|
| \|x\| | Valore assoluto | n → \|n\| |
| x² | Quadrato | n → n² |
| flip | Inverti cifre | 123 → 321 |
| Σ | Somma cifre | 123 → 6 |
| sgn | Segno | n → 1, -1, o 0 |
| n! | Fattoriale | n → n! (solo 1-6) |
| 2ⁿ | Potenza di 2 | n → 2ⁿ (solo 1-10) |
| 3ⁿ | Potenza di 3 | n → 3ⁿ (solo 1-6) |
| %2 | Modulo 2 | n → n mod 2 |
| %3 | Modulo 3 | n → n mod 3 |
| %5 | Modulo 5 | n → n mod 5 |
| %10 | Modulo 10 | n → ultima cifra |
| √ | Radice quadrata | n → √n (solo quadrati perfetti) |
| ⊕ | Clone | duplica l'altro elemento |
| ÷→ | Fattori primi | scompone in fattori primi |

---

## Tabella Principale delle Combinazioni

La cella indica: **Dragged (riga) → Target (colonna)**

### Numeri e Operazioni Componibili

|  | **n** | **x2** | **x3** | **+-** | **/2** | **/3** |
|---|---|---|---|---|---|---|
| **n** | n₁+n₂ (o spariscono se =) | n×2 | n×3 | -n | n÷2 * | n÷3 ** |
| **x2** | n×2 | x4 | x6 | x-2 | spariscono | x⅔ *** |
| **x3** | n×3 | x6 | x9 | x-3 | x1.5 *** | spariscono |
| **+-** | -n | x-2 | x-3 | spariscono | /-2 | /-3 |
| **/2** | n÷2 * | spariscono | x⅔ *** | /-2 | /4 | /6 |
| **/3** | n÷3 ** | x⅔ *** | spariscono | /-3 | /6 | /9 |

\* Solo se n è pari
\** Solo se n è multiplo di 3
\*** Le operazioni frazionarie risultanti si comportano come divisioni

---

### Operazioni Speciali su Numeri

|  | **n** (target) |
|---|---|
| **\|x\|** | \|n\| |
| **x²** | n² |
| **flip** | cifre invertite |
| **Σ** | somma cifre |
| **sgn** | 1, -1, o 0 |
| **n!** | n! (solo se n ∈ [1,6]) |
| **2ⁿ** | 2ⁿ (solo se n ∈ [1,10]) |
| **3ⁿ** | 3ⁿ (solo se n ∈ [1,6]) |
| **%2** | n mod 2 |
| **%3** | n mod 3 |
| **%5** | n mod 5 |
| **%10** | n mod 10 |
| **√** | √n (solo quadrati perfetti ≥0) |
| **⊕** | duplica n |
| **÷→** | fattori primi di n (solo n>1 composti) |

**Nota:** Numero su operazione speciale = stesso risultato (l'ordine non conta).

---

### Operazioni Speciali tra loro

| Dragged → Target | **\|x\|** | **x²** | **flip** | **Σ** | **sgn** | **n!** | **2ⁿ** | **3ⁿ** | **%2** | **%3** | **%5** | **%10** | **√** | **⊕** | **÷→** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **\|x\|** | spariscono | X | X | X | X | X | X | X | X | X | X | X | X | dup | X |
| **x²** | X | spariscono | X | X | X | X | X | X | X | X | X | X | **spariscono** | dup | X |
| **flip** | X | X | spariscono | X | X | X | X | X | X | X | X | X | X | dup | X |
| **Σ** | X | X | X | spariscono | X | X | X | X | X | X | X | X | X | dup | X |
| **sgn** | X | X | X | X | spariscono | X | X | X | X | X | X | X | X | dup | X |
| **n!** | X | X | X | X | X | spariscono | X | X | X | X | X | X | X | dup | X |
| **2ⁿ** | X | X | X | X | X | X | spariscono | X | X | X | X | X | X | dup | X |
| **3ⁿ** | X | X | X | X | X | X | X | spariscono | X | X | X | X | X | dup | X |
| **%2** | X | X | X | X | X | X | X | X | spariscono | X | X | X | X | dup | X |
| **%3** | X | X | X | X | X | X | X | X | X | spariscono | X | X | X | dup | X |
| **%5** | X | X | X | X | X | X | X | X | X | X | spariscono | X | X | dup | X |
| **%10** | X | X | X | X | X | X | X | X | X | X | X | spariscono | X | dup | X |
| **√** | X | **spariscono** | X | X | X | X | X | X | X | X | X | X | spariscono | dup | X |
| **⊕** | dup | dup | dup | dup | dup | dup | dup | dup | dup | dup | dup | dup | dup | spariscono | dup |
| **÷→** | X | X | X | X | X | X | X | X | X | X | X | X | X | dup | spariscono |

**Eccezione speciale:** √ + x² = spariscono (funzioni inverse)

---

### Operazioni Speciali su Operazioni Componibili

| Speciale → Componibile | **x2** | **x3** | **+-** | **/2** | **/3** |
|---|---|---|---|---|---|
| **Tutte le speciali** | X | X | X | X | X |
| **⊕ (clone)** | dup x2 | dup x3 | dup +- | dup /2 | dup /3 |

**E viceversa (Componibile → Speciale):** Sempre X, eccetto che con ⊕ (clone).

---

## Combinazioni NON Ammesse - Possibili Estensioni

Di seguito, per ogni combinazione attualmente non ammessa, una proposta su come potrebbe funzionare.

### 1. Operazioni Speciali + Operazioni Speciali

**Stato attuale:** Non si combinano (X)

**Possibili estensioni:**

| Combinazione | Proposta |
|--------------|----------|
| **\|x\| + +-** | Potrebbero annullarsi: il valore assoluto e il cambio segno sono concettualmente opposti |
| **\|x\| + sgn** | Potrebbe creare un'operazione "normalizza": n → sgn(n) × \|n\| = n (identità, spariscono) |
| **x² + √** | *GIÀ IMPLEMENTATO* - si annullano |
| **flip + flip** | *GIÀ IMPLEMENTATO* - spariscono (identiche) |
| **Σ + Σ** | *GIÀ IMPLEMENTATO* - spariscono |
| **n! + qualsiasi** | Difficile da comporre matematicamente, potrebbe restare X |
| **%N + %M** | Potrebbe creare %MCD(N,M) o %mcm(N,M) |
| **2ⁿ + 3ⁿ** | Potrebbe creare 6ⁿ (prodotto delle basi) |
| **÷→ + qualsiasi** | ÷→ è molto speciale, difficile da comporre |

### 2. Operazioni Speciali + Operazioni Componibili

**Stato attuale:** Non si combinano (X)

**Possibili estensioni:**

| Combinazione | Proposta |
|--------------|----------|
| **x² + x2** | Potrebbe creare un'operazione "x² poi ×2" = 2n² |
| **x² + x3** | Potrebbe creare "3n²" |
| **√ + /2** | Potrebbe creare "√n ÷ 2" (poco utile) |
| **\|x\| + +-** | Potrebbe creare "\|−n\|" = "\|n\|" (equivalente a solo \|x\|) |
| **n! + x2** | Potrebbe creare "2×n!" |
| **2ⁿ + x2** | Potrebbe creare "2ⁿ⁺¹" (shift della potenza) |
| **%N + xM** | Potrebbe creare "(n×M) mod N" |
| **Σ + xN** | Potrebbe creare "N × Σ(cifre)" |
| **flip + xN** | Potrebbe creare "N × flip(n)" |

### 3. Composizioni Matematicamente Interessanti

| Combinazione | Proposta di funzionamento |
|--------------|---------------------------|
| **√ + x²** | *GIÀ IMPLEMENTATO* - identità |
| **n! + sgn** | Potrebbe restituire sgn(n!) = 1 (sempre positivo per n≥0) |
| **\|x\| + \|x\|** | *GIÀ IMPLEMENTATO* - spariscono |
| **2ⁿ + log₂** | Se esistesse log₂, sarebbero inverse |
| **flip + Σ** | Potrebbe "sommare le cifre invertite" = Σ (stesso risultato) → spariscono? |
| **%2 + %2** | *GIÀ IMPLEMENTATO* - spariscono |

### 4. Nuove Operazioni Suggerite per Completare le Coppie Inverse

| Operazione esistente | Inversa proposta |
|---------------------|------------------|
| x² | √ (già esiste) |
| 2ⁿ | log₂ (nuovo) |
| 3ⁿ | log₃ (nuovo) |
| n! | n dalla fattoriale (troppo complesso) |
| Σ | "espandi cifre" (troppo ambiguo) |
| flip | flip (è la sua stessa inversa) |
| sgn | "applica segno a 1" (n → sgn(n) potrebbe invertirsi?) |

### 5. Composizione di Moduli

**%N + %M potrebbero comportarsi così:**

```
%2 + %3 → %6 (mcm)
%2 + %2 → spariscono
%2 + %4 → %4 (il più restrittivo)
%3 + %5 → %15
%5 + %10 → %10
```

### 6. Composizione di Potenze

**2ⁿ + 3ⁿ potrebbero comportarsi così:**

```
2ⁿ + 2ⁿ → spariscono (identiche)
2ⁿ + 3ⁿ → 6ⁿ (prodotto basi)
2ⁿ + x2 → 2ⁿ⁺¹ (shift)
3ⁿ + x3 → 3ⁿ⁺¹ (shift)
```

---

## Riepilogo Regole Attuali

1. **Elementi identici** → spariscono
2. **Numero + Numero** → somma
3. **Numero + Operazione** → applica operazione (se valida)
4. **Componibile + Componibile** → moltiplica i coefficienti
5. **√ + x²** → spariscono (eccezione speciale)
6. **Speciale + Speciale** → X (non ammesso)
7. **Speciale + Componibile** → X (non ammesso)
8. **⊕ (Clone) + qualsiasi** → duplica l'altro elemento
9. **÷→ + Numero** → scompone in fattori primi
