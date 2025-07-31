# Express Blog SQL

## Descrizione

In questo progetto Express.js integrato con MySQL si sviluppa un blog backend con API REST per gestire i post salvati in un database SQL. 

Il flusso di lavoro prevede:

- Configurazione della connessione al database MySQL tramite il client mysql2.
- Implementazione di endpoint API per:
  - Recuperare la lista completa dei post in formato JSON (Index).
  - Visualizzare un singolo post dettagliato (Show), con possibilità di includere i tag correlati tramite relazioni SQL.
  - Eliminare un post specifico dal database (Destroy).

Il progetto si concentra sul corretto collegamento tra applicazione e database, sulla gestione delle risposte API e sulla verifica tramite strumenti come Postman e MySQL Workbench.

L’obiettivo finale è creare un backend solido e funzionante per un blog con gestione completa dei post e dei relativi tag.
