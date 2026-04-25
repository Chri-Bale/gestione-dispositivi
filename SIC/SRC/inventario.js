"use strict";
const StatiValidi=Object.freeze({
    ATTIVO: "attivo",
    GUASTO: "guasto",
    MANUTENZIONE: "manutenzione",
});

let dispositivi=[];
let prossimoId= 1;

function registraDispositivo(nome,tipologia, seriale){
    if(!nome||!tipologia||!seriale) return null;
    const nuovo={id: prossimoId++, nome, tipologia, seriale, stato: StatiValidi};
    dispositivi.push(nuovo);
    return nuovo;
}

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

function filtraPerStato(stato){
    return dispositivi.filter(d=>d.stato===stato);
}

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