// ==========================
// APERTURA POPUP PROGRAMMA
// ==========================

function apriProgramma(titolo, orario, descrizione, immagine) {

    document.getElementById("popup").style.display = "flex";

    document.getElementById("popup-titolo").innerHTML = titolo;
    document.getElementById("popup-orario").innerHTML = orario;
    document.getElementById("popup-descrizione").innerHTML = descrizione;
    document.getElementById("popup-img").src = immagine;

}



// ==========================
// CHIUSURA POPUP
// ==========================

function chiudiProgramma() {

    document.getElementById("popup").style.display = "none";

}





// ==========================
// SCORRIMENTO TIMELINE
// ==========================

const timeline = document.querySelector(".timeline");

let premuto = false;
let posizioneInizio;
let scrollInizio;


if (timeline) {


timeline.addEventListener("mousedown", e=>{

    premuto=true;

    posizioneInizio=e.pageX-timeline.offsetLeft;

    scrollInizio=timeline.scrollLeft;

});


timeline.addEventListener("mouseleave",()=>{

    premuto=false;

});


timeline.addEventListener("mouseup",()=>{

    premuto=false;

});


timeline.addEventListener("mousemove",e=>{

    if(!premuto)return;

    e.preventDefault();

    let posizione=e.pageX-timeline.offsetLeft;

    let movimento=(posizione-posizioneInizio)*2;


    timeline.scrollLeft=scrollInizio-movimento;


});


}





// ==========================
// DATA ATTUALE
// ==========================

let oggi = new Date();


const giorniVisibili = 7;





// ==========================
// CREA GIORNI DINAMICI
// ==========================

function creaGiorni(){


const contenitore=document.getElementById("giorni-container");


contenitore.innerHTML="";



oggi = new Date();



for(let i=-giorniVisibili;i<=giorniVisibili;i++){


let giorno=new Date(oggi);


giorno.setDate(oggi.getDate()+i);



let nome;



if(i===0){

nome="OGGI";

}else{


nome=giorno.toLocaleDateString("it-IT",{

weekday:"short"

}).toUpperCase();


}



let bottone=document.createElement("button");



bottone.innerHTML=

nome+

"<br>"+

giorno.getDate();





bottone.onclick=function(){

selezionaGiorno(giorno,bottone);

};




if(i===0){

bottone.classList.add("giorno-attivo");

}



contenitore.appendChild(bottone);



}


}






// ==========================
// SELEZIONE GIORNO
// ==========================

function selezionaGiorno(giorno,bottone){


document.querySelectorAll("#giorni-container button")

.forEach(b=>{

b.classList.remove("giorno-attivo");

});


bottone.classList.add("giorno-attivo");


caricaProgrammi(giorno);


}






// ==========================
// CONTROLLO PROGRAMMA IN ONDA
// ==========================

function programmaInOnda(inizio,fine){


let adesso=new Date();



let minutiAttuali=

adesso.getHours()*60+

adesso.getMinutes();



let a=inizio.split(":");

let b=fine.split(":");



let minutiInizio=

parseInt(a[0])*60+

parseInt(a[1]);



let minutiFine=

parseInt(b[0])*60+

parseInt(b[1]);





if(minutiFine < minutiInizio){


minutiFine += 1440;


if(minutiAttuali < minutiInizio){

minutiAttuali += 1440;

}


}



return (

minutiAttuali >= minutiInizio &&

minutiAttuali < minutiFine

);


}


// ==========================
// CREA ORARI 24 ORE
// ==========================

function creaOrari(){


const contenitore=document.getElementById("orari");


contenitore.innerHTML="";



for(let ora=0;ora<24;ora++){


let span=document.createElement("span");


span.innerHTML=

ora.toString().padStart(2,"0")+":00";


contenitore.appendChild(span);


}


}






// ==========================
// DIVISIONE PROGRAMMI DOPO MEZZANOTTE
// ==========================

function preparaProgrammiGiorno(dati,data){


let programmi=[];



// programmi del giorno selezionato

if(dati[data]){


programmi = programmi.concat(dati[data]);


}




// controlla programmi iniziati il giorno precedente

let giornoPrecedente = new Date(data+"T00:00:00");


giornoPrecedente.setDate(giornoPrecedente.getDate()-1);



let precedente =

giornoPrecedente.getFullYear()+"-"+

String(giornoPrecedente.getMonth()+1).padStart(2,"0")+"-"+

String(giornoPrecedente.getDate()).padStart(2,"0");





if(dati[precedente]){


dati[precedente].forEach(programma=>{


let inizio=programma.inizio.split(":");

let fine=programma.fine.split(":");



let minutiInizio=

parseInt(inizio[0])*60+

parseInt(inizio[1]);



let minutiFine=

parseInt(fine[0])*60+

parseInt(fine[1]);





// programma che continua dopo mezzanotte

if(minutiFine <= minutiInizio){



programmi.unshift({

    ...programma,

    inizio:"00:00",

    fine:programma.fine

});



}



});


}



return programmi;


}






// ==========================
// CARICAMENTO PROGRAMMI JSON
// ==========================

function caricaProgrammi(giorno){



const lista=document.getElementById("lista-programmi");


const titolo=document.getElementById("giorno-selezionato");





let data =

giorno.getFullYear()+"-"+

String(giorno.getMonth()+1).padStart(2,"0")+"-"+

String(giorno.getDate()).padStart(2,"0");






if(

giorno.getDate()===oggi.getDate() &&

giorno.getMonth()===oggi.getMonth() &&

giorno.getFullYear()===oggi.getFullYear()

){

titolo.innerHTML="Programmazione di oggi";


}else{


titolo.innerHTML=

"Programmazione di "+

giorno.toLocaleDateString("it-IT",{

weekday:"long",

day:"numeric",

month:"long"

});


}







fetch("programmi.json")


.then(response=>response.json())


.then(dati=>{



lista.innerHTML="";


creaOrari();





let programmiGiorno = preparaProgrammiGiorno(dati,data);





if(programmiGiorno.length===0){


lista.innerHTML=

"<p>Nessun programma disponibile.</p>";

return;


}





programmiGiorno.forEach(programma=>{



let div=document.createElement("div");





// ==========================
// CONTROLLO IN ONDA AUTOMATICO
// ==========================


let inOnda=false;



if(

giorno.getDate()===oggi.getDate() &&

giorno.getMonth()===oggi.getMonth() &&

giorno.getFullYear()===oggi.getFullYear()

){


inOnda = programmaInOnda(

programma.inizio,

programma.fine

);


}



div.className=

inOnda ?

"programma in-onda":

"programma";





div.innerHTML=

`

<strong>${programma.titolo}</strong>

<span>${programma.inizio} - ${programma.fine}</span>

${inOnda ? "<small>🔴 IN ONDA</small>":""}

`;
// ==========================
// CALCOLO POSIZIONE TIMELINE
// ==========================


let inizio = programma.inizio.split(":");

let fine = programma.fine.split(":");



let minutiInizio =

parseInt(inizio[0])*60 +

parseInt(inizio[1]);



let minutiFine =

parseInt(fine[0])*60 +

parseInt(fine[1]);





if(minutiFine <= minutiInizio){

    minutiFine += 1440;

}





let durata = minutiFine - minutiInizio;



let scala = 180;



// larghezza programma

div.style.width =

(durata / 60 * scala) + "px";



// posizione sulla timeline

div.style.left =

(minutiInizio / 60 * scala) + "px";






// ==========================
// POPUP
// ==========================


div.onclick=function(){


apriProgramma(

programma.titolo,

programma.inizio+" - "+programma.fine,

programma.descrizione,

programma.immagine

);


};





lista.appendChild(div);



});



});



}









// ==========================
// AVVIO
// ==========================


creaGiorni();


caricaProgrammi(oggi);








// ==========================
// AGGIORNAMENTO IN ONDA OGNI MINUTO
// ==========================


setInterval(()=>{


let selezionato = document.querySelector(".giorno-attivo");


// aggiorna solo la giornata corrente

caricaProgrammi(new Date());


},60000);









// ==========================
// CAMBIO AUTOMATICO GIORNO
// ==========================


setInterval(()=>{


let nuovaData=new Date();



if(

nuovaData.getDate() !== oggi.getDate() ||

nuovaData.getMonth() !== oggi.getMonth() ||

nuovaData.getFullYear() !== oggi.getFullYear()

){



oggi = nuovaData;



creaGiorni();



caricaProgrammi(oggi);



}



},60000);