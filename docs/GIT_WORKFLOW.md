# Git Workflow

## Procedura per nuove modifiche

1. **Crea un branch** dal nome dell'issue:
   ```bash
   git checkout -b issue-XXX-descrizione
   ```

2. **Lavora** sulle modifiche necessarie

3. **Commit** con messaggio descrittivo:
   ```bash
   git add .
   git commit -m "tipo: descrizione breve (#XXX)"
   ```

4. **Push** e crea PR:
   ```bash
   git push -u origin issue-XXX-descrizione
   gh pr create --title "Descrizione" --body "Closes #XXX"
   ```

## Tipi di commit

- `feat:` nuova funzionalità
- `fix:` correzione bug
- `docs:` documentazione
- `refactor:` refactoring
- `test:` aggiunta test
- `analysis:` analisi/ricerca
