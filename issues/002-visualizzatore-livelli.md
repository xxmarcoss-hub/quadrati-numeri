# Issue #002: Visualizzatore dei livelli

**Tipo:** Feature
**Priorità:** Media
**Stato:** Aperto

## Descrizione

Creare un'interfaccia per visualizzare e navigare tutti i livelli del gioco senza doverli giocare, utile per:
- Game designer che vogliono analizzare la progressione di difficoltà
- Debug e testing dei livelli
- Documentazione visiva del gioco

## Requisiti funzionali

### Vista panoramica
- Griglia con miniature di tutti i 25 livelli
- Ogni miniatura mostra i quadrati del livello in scala ridotta
- Indicatore di difficoltà (Tutorial/Facile/Medio/Difficile/Esperto/Sfida Finale)
- Nome del livello visibile

### Vista dettaglio livello
- Click su miniatura apre vista espansa
- Mostra tutti i quadrati a dimensione normale
- Lista testuale degli elementi: `[2], [3], [x2], [-5]...`
- Soluzione documentata (dai commenti nel codice)
- Statistiche: numero quadrati, numeri, operazioni

### Navigazione
- Filtro per categoria di difficoltà
- Ricerca per nome livello
- Frecce o swipe per navigare tra livelli adiacenti

## Mockup interfaccia

```
┌─────────────────────────────────────────────┐
│  VISUALIZZATORE LIVELLI                     │
├─────────────────────────────────────────────┤
│ [Tutorial ▼] [Tutti i livelli ▼]  🔍 cerca  │
├─────────────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │ 3 3 │ │1 2 3│ │2 4  │ │5 -5 │ │1 2 3│    │
│ │     │ │     │ │ x2  │ │ +-  │ │4 5 5│    │
│ └──1──┘ └──2──┘ └──3──┘ └──4──┘ └──5──┘    │
│ Tutorial Somma  Raddop. Invers. Catena     │
│                                             │
│ ┌─────┐ ┌─────┐ ┌─────┐ ...                │
│ │1 2 3│ │2 4  │ │1 2 4│                    │
│ │4 x2 │ │-6 +-│ │5 6x3│                    │
│ └──6──┘ └──7──┘ └──8──┘                    │
└─────────────────────────────────────────────┘
```

## Proposta tecnica

### Opzione A: Pagina separata
Creare `viewer.html` con proprio CSS/JS che importa i livelli da `script.js`

### Opzione B: Modal nel gioco
Aggiungere bottone "📋 Livelli" che apre overlay con la griglia

### Opzione C: Generatore statico
Script Node.js che genera `levels-preview.html` statico con screenshot/SVG di ogni livello

## Tasks

- [ ] Estrarre array `levels` in file separato `levels.js` per riuso
- [ ] Creare componente miniatura livello
- [ ] Implementare griglia responsive
- [ ] Aggiungere filtri e ricerca
- [ ] Styling coerente con tema del gioco
