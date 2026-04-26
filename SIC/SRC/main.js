const input = require("prompt-sync")();
const f = require("./inventario");

/**
 * Stampa il menu delle opzioni disponibili all'utente
 */
function menu() {
    console.log("\n--- GESTIONE INVENTARIO DISPOSITIVI ---");
    console.log("1. Registra nuovo dispositivo");
    console.log("2. Visualizza inventario completo");
    console.log("3. Cambia stato / Aggiungi manutenzione");
    console.log("4. Ricerca per stato");
    console.log("5. Esporta in JSON");
    console.log("0. Esci");
}

let continua = true;

while (continua) {
    menu();
    const scelta = input("Seleziona un'opzione: ");

    switch (scelta) {
        case "1":
            const nome = input("Nome dispositivo: ");
            const tipo = input("Tipologia: ");
            const seriale = input("Numero di serie: ");
            const risultato = f.registraDispositivo(nome, tipo, seriale);
            if (risultato === "duplicato") console.log("Errore: Seriale già presente!");
            else if (risultato) console.log("Dispositivo registrato con ID:", risultato.id);
            else console.log("Errore: Dati mancanti.");
            break;

        case "2":
            console.log("\n--- ELENCO DISPOSITIVI ---");
            console.table(f.dispositivi);
            break;

        case "3":
            const id = input("Inserisci ID del dispositivo: ");
            const nuovoStato = input("Nuovo stato (attivo/guasto/manutenzione): ");
            const nota = input("Nota tecnica (opzionale): ");
            if (f.aggiornaDispositivo(id, nuovoStato, nota)) {
                console.log("Aggiornamento completato.");
            } else {
                console.log("Errore: ID non trovato o stato non valido.");
            }
            break;

        case "4":
            const statoCercato = input("Inserisci stato da filtrare: ");
            const filtrati = f.filtraPerStato(statoCercato);
            console.table(filtrati);
            break;

        case "5":
            const fs = require('fs');
            fs.writeFileSync('inventario.json', JSON.stringify(f.dispositivi, null, 2));
            console.log("Dati esportati in inventario.json");
            break;

        case "0":
            continua = false;
            break;

        default:
            console.log("Scelta non valida.");
    }
}