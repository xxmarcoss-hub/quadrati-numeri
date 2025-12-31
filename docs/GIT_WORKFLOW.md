# Git Workflow

## Github
Il remote è https://github.com/xxmarcoss-hub/quadrati-numeri/

## Sviluppo normale
Sviluppa su un branch chiamato "develop".

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

5. **Fai code review** della PR e implementa le necessarie modifiche; commi e push delle eventuali modifiche.

6.  Mergia il brnch su develoop.

7.  Se il branch è stato aperto per una issue, chiudi la issue.

## Merge su main
Quando è rimasto il merge di develop su main, crea su main un nuovo tag di release. 

## Tipi di commit

- `feat:` nuova funzionalità
- `fix:` correzione bug
- `docs:` documentazione
- `refactor:` refactoring
- `test:` aggiunta test
- `analysis:` analisi/ricerca
