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
module.exports={registraDispositivo,dispositivi,StatiValidi};