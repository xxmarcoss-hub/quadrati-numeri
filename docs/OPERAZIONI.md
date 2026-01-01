# Documentazione Operazioni

Quadrati Numeri include 20 tipi di operazioni divise in due categorie: **operazioni moltiplicative** (componibili tra loro) e **operazioni speciali** (non componibili).

---

## Regole Generali

### Combinazione di Quadrati
- **Numero + Numero**: somma i valori
- **Numero + Operazione**: applica l'operazione al numero
- **Operazione + Operazione**:
  - Se entrambe moltiplicative: si compongono (es. x2 + x3 = x6)
  - Se almeno una speciale: rifiutato (eccezione: √ + x² = identità)
- **Stesso contenuto**: entrambi spariscono

### Feedback Visivo
Quando un'operazione non è applicabile (es. divisione su numero non divisibile), i quadrati mostrano un'animazione di "rifiuto" (shake rosso).

---

## Operazioni Moltiplicative

Queste operazioni si compongono tra loro. Combinando due operazioni moltiplicative, i loro moltiplicatori vengono moltiplicati.

### x2 - Moltiplica per 2
| Simbolo | `x2` |
|---------|------|
| **Effetto** | Moltiplica il numero per 2 |
| **Esempi** | `3 × x2 = 6`, `10 × x2 = 20` |
| **Restrizioni** | Nessuna |
| **Colore** | Arancione |

### x3 - Moltiplica per 3
| Simbolo | `x3` |
|---------|------|
| **Effetto** | Moltiplica il numero per 3 |
| **Esempi** | `4 × x3 = 12`, `7 × x3 = 21` |
| **Restrizioni** | Nessuna |
| **Colore** | Arancione |

### +- - Inverti Segno (Negazione)
| Simbolo | `+-` |
|---------|------|
| **Effetto** | Inverte il segno del numero |
| **Esempi** | `5 × +- = -5`, `-3 × +- = 3` |
| **Restrizioni** | Nessuna |
| **Moltiplicatore** | -1 |
| **Colore** | Arancione |

### /2 - Dividi per 2
| Simbolo | `/2` |
|---------|------|
| **Effetto** | Divide il numero per 2 |
| **Esempi** | `8 × /2 = 4`, `6 × /2 = 3` |
| **Restrizioni** | Solo numeri pari |
| **Moltiplicatore** | 0.5 |
| **Colore** | Verde |

### /3 - Dividi per 3
| Simbolo | `/3` |
|---------|------|
| **Effetto** | Divide il numero per 3 |
| **Esempi** | `9 × /3 = 3`, `15 × /3 = 5` |
| **Restrizioni** | Solo multipli di 3 |
| **Moltiplicatore** | 1/3 |
| **Colore** | Verde |

### Composizione Operazioni Moltiplicative

Quando due operazioni moltiplicative si combinano, i loro effetti si moltiplicano:

| Combinazione | Risultato | Spiegazione |
|--------------|-----------|-------------|
| `x2 + x3` | `x6` | 2 × 3 = 6 |
| `x2 + x2` | `x4` | 2 × 2 = 4 |
| `x2 + +-` | `x-2` | 2 × (-1) = -2 |
| `x2 + /2` | identità | 2 × 0.5 = 1 (spariscono) |
| `x3 + /3` | identità | 3 × (1/3) = 1 (spariscono) |
| `/2 + /2` | `/4` | 0.5 × 0.5 = 0.25 |

---

## Operazioni Speciali

Le operazioni speciali **non si compongono** con altre operazioni. Tentare di combinarle produce un rifiuto, con l'eccezione di √ + x² che producono identità.

### |x| - Valore Assoluto
| Simbolo | `\|x\|` |
|---------|---------|
| **Effetto** | Restituisce il valore assoluto |
| **Esempi** | `-5 × \|x\| = 5`, `3 × \|x\| = 3` |
| **Restrizioni** | Nessuna |
| **Colore** | Viola |

### x² - Quadrato
| Simbolo | `x²` |
|---------|------|
| **Effetto** | Eleva il numero al quadrato |
| **Esempi** | `3 × x² = 9`, `-4 × x² = 16` |
| **Restrizioni** | Nessuna |
| **Caso speciale** | `x² + √ = identità` (entrambi spariscono) |
| **Colore** | Viola |

### √ - Radice Quadrata
| Simbolo | `√` |
|---------|-----|
| **Effetto** | Calcola la radice quadrata |
| **Esempi** | `16 × √ = 4`, `25 × √ = 5` |
| **Restrizioni** | Solo quadrati perfetti positivi (1, 4, 9, 16, 25, ...) |
| **Caso speciale** | `√ + x² = identità` (entrambi spariscono) |
| **Colore** | Viola |

### flip - Inverti Cifre
| Simbolo | `flip` |
|---------|--------|
| **Effetto** | Inverte l'ordine delle cifre |
| **Esempi** | `123 × flip = 321`, `12 × flip = 21` |
| **Restrizioni** | Nessuna (mantiene il segno) |
| **Note** | I palindromi rimangono invariati (11 → 11) |
| **Colore** | Viola |

### Σ - Somma Cifre
| Simbolo | `Σ` |
|---------|-----|
| **Effetto** | Somma tutte le cifre del numero |
| **Esempi** | `234 × Σ = 9`, `99 × Σ = 18` |
| **Restrizioni** | Nessuna (mantiene il segno) |
| **Colore** | Viola |

### sgn - Segno
| Simbolo | `sgn` |
|---------|-------|
| **Effetto** | Restituisce il segno: 1, -1, o 0 |
| **Esempi** | `42 × sgn = 1`, `-7 × sgn = -1`, `0 × sgn = 0` |
| **Restrizioni** | Nessuna |
| **Colore** | Viola |

### n! - Fattoriale
| Simbolo | `n!` |
|---------|------|
| **Effetto** | Calcola il fattoriale |
| **Tabella** | 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720 |
| **Restrizioni** | Solo numeri interi da 1 a 6 |
| **Colore** | Viola |

### 2^n - Potenza di 2
| Simbolo | `2^n` |
|---------|-------|
| **Effetto** | Calcola 2 elevato a n |
| **Esempi** | `3 × 2^n = 8`, `10 × 2^n = 1024` |
| **Tabella** | 2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32, ... |
| **Restrizioni** | Solo numeri interi da 1 a 10 |
| **Colore** | Viola |

### 3^n - Potenza di 3
| Simbolo | `3^n` |
|---------|-------|
| **Effetto** | Calcola 3 elevato a n |
| **Esempi** | `2 × 3^n = 9`, `4 × 3^n = 81` |
| **Tabella** | 3^1=3, 3^2=9, 3^3=27, 3^4=81, 3^5=243, 3^6=729 |
| **Restrizioni** | Solo numeri interi da 1 a 6 |
| **Colore** | Viola |

### %2, %3, %5, %10 - Modulo
| Simbolo | `%N` |
|---------|------|
| **Effetto** | Restituisce il resto della divisione per N |
| **Esempi** | `7 × %2 = 1`, `17 × %3 = 2`, `23 × %5 = 3`, `234 × %10 = 4` |
| **Risultati possibili** | %2: 0-1, %3: 0-2, %5: 0-4, %10: 0-9 |
| **Note** | Per negativi usa modulo matematico (sempre positivo): -7 mod 3 = 2 |
| **Colore** | Viola |

---

## Operazioni Speciali con Comportamento Unico

### ⊕ - Clone
| Simbolo | `⊕` |
|---------|-----|
| **Effetto** | Duplica l'elemento target |
| **Comportamento** | L'elemento rimane + appare una copia + clone sparisce |
| **Esempi** | `7 + ⊕` → `7, 7` (due quadrati 7) |
| **Funziona con** | Numeri e operazioni |
| **Colore** | Viola |

**Meccanica Clone:**
```
Prima:  [7] [⊕]
Dopo:   [7] [7]  (clone sparisce, 7 viene duplicato)
```

### ÷→ - Divisori (Explode)
| Simbolo | `÷→` |
|---------|------|
| **Effetto** | "Esplode" il numero in tutti i suoi divisori > 1 |
| **Esempi** | `6 × ÷→` → `[2] [3] [6]`, `7 × ÷→` → `[7]` (primo) |
| **Restrizioni** | Solo numeri interi > 1 e ≤ 100 |
| **Colore** | Viola |

**Meccanica Divisori:**
```
Prima:  [12] [÷→]
Dopo:   [2] [3] [4] [6] [12]  (tutti i divisori > 1)

Prima:  [7] [÷→]
Dopo:   [7]  (7 è primo, solo se stesso)
```

**Tabella divisori comuni:**
| Numero | Divisori > 1 |
|--------|--------------|
| 6 | 2, 3, 6 |
| 8 | 2, 4, 8 |
| 12 | 2, 3, 4, 6, 12 |
| 7 | 7 (primo) |
| 15 | 3, 5, 15 |
| 24 | 2, 3, 4, 6, 8, 12, 24 |

---

## Riassunto Colori

| Tipo | Colore | Operazioni |
|------|--------|------------|
| Moltiplicative | Arancione | x2, x3, +- |
| Divisioni | Verde | /2, /3 |
| Speciali | Viola | Tutte le altre |

---

## Strategie di Gioco

### Creare Coppie
L'obiettivo è eliminare tutti i quadrati. Due quadrati con lo stesso valore spariscono.

### Usare le Composizioni
Le operazioni moltiplicative possono essere combinate strategicamente:
- `x2 + /2` = identità (elimina due operazioni)
- `x3 + /3` = identità

### Sinergia √ e x²
Queste due operazioni si annullano a vicenda, creando puzzle eleganti.

### Clone Strategico
Usa il clone per creare la copia mancante di un numero.

### Divisori per Semplificare
L'operazione divisori può semplificare numeri grandi in componenti più gestibili.

---

## Livelli per Categoria

| Categoria | Livelli | Descrizione |
|-----------|---------|-------------|
| Tutorial | 1-4 | Meccaniche base |
| Facile | 5-8 | Combinazioni semplici |
| Medio | 9-12 | Più quadrati |
| Difficile | 13-16 | Strategie avanzate |
| Esperto | 17-20 | Puzzle complessi |
| Sfida Finale | 21-25 | Livelli grandi |
| Cestino | 26-29 | Meccanica cestino |
| Valore Assoluto | 30-31 | Focus su \|x\| |
| Quadrato | 32-33 | Focus su x² |
| Flip | 34-35 | Focus su flip |
| Somma Cifre | 36-37 | Focus su Σ |
| Segno | 38-39 | Focus su sgn |
| Divisioni | 40-42 | Focus su /2, /3 |
| Fattoriale | 43-44 | Focus su n! |
| Potenza di 2 | 45-46 | Focus su 2^n |
| Potenza di 3 | 47-48 | Focus su 3^n |
| Modulo | 49-52 | Focus su %N |
| Radice Quadrata | 53-55 | Focus su √ |
| Clone | 56-57 | Focus su ⊕ |
| Divisori | 58-59 | Focus su ÷→ |
