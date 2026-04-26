"use strict";
const fs = require('fs');

const StatiValidi=Object.freeze({
    ATTIVO: "attivo",
    GUASTO: "guasto",
    MANUTENZIONE: "manutenzione",
});

let dispositivi=[];
let prossimoId= 1;

/**
 * Registra un nuovo dispositivo nell'inventario
 * @param {string} nome - Nome del dispositivo
 * @param {string} tipologia - Categoria del dispositivo
 * @param {string} seriale - Numero di serie 
 * @returns {Object|null} L'oggetto dispositivo creato o null in caso di dati mancanti.
 */
function registraDispositivo(nome,tipologia, seriale){
    if(!nome||!tipologia||!seriale) return null;
    const nuovo={
         id: prossimoId++,
         nome, 
         tipologia, 
         seriale, 
         stato: StatiValidi.ATTIVO,
         manutenzioni:[]
        };
    dispositivi.push(nuovo);
    return nuovo;
}

/**
 * Aggiorna lo stato di un dispositivo e registra un intervento tecnico
 * @param {number|string} id - ID del dispositivo da modificare
 * @param {string} nuovoStato - Nuovo stato da assegnare
 * @param {string} [nota=""] - Descrizione del tipo di manutenzione avvenuta
 * @returns {boolean} True se l'operazione è riuscita, false se non è riuscita
 */
function aggiornaDispositivo(id, nuovoStato, nota=""){
    const dispositivo= dispositivi.find(d=>d.id==id);
    if(!dispositivo||!Object.values(StatiValidi).includes(nuovoStato)) return false;
    dispositivo.stato=nuovoStato;
    if(nota){
        if(!dispositivo.manutenzioni)dispositivo.manutenzioni=[]; 
        dispositivo.manutenzioni.push({data:new Date().toLocaleDateString(),nota});
    }
    return true;
}

/**
 * Filtra i dispositivi in base allo stato 
 * @param {string} stato - Lo stato da ricercare
 * @returns {Array<Object>} Lista dei dispositivi che corrispondono allo stato
 */
function filtraPerStato(stato){
    return dispositivi.filter(d=>d.stato===stato);
}

/**
 * Esporta l'intero database dei dispositivi in un file JSON
 * @returns {string} Messaggio di conferma o di errore
 */
function esportaJSON(){
    try{
        const data = JSON.stringify(dispositivi, null ,2 );
        fs.writeFileSync("inventario.json", data);
        return "Inventario esportato in 'inventario.json'";
    }catch(error){
        return "Errore durante l'esportazione del file: "+ error.message;
    }
}
module.exports={
    registraDispositivo,
    dispositivi,
    StatiValidi,
    aggiornaDispositivo,
    filtraPerStato,
    esportaJSON,
};