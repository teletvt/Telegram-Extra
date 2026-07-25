// ==========================
// POPUP PROGRAMMA
// ==========================


function apriProgramma(titolo, orario, descrizione, immagine) {


    document.getElementById("popup").style.display = "flex";


    document.getElementById("popup-titolo").innerHTML = titolo;

    document.getElementById("popup-orario").innerHTML = orario;

    document.getElementById("popup-descrizione").innerHTML = descrizione;

    document.getElementById("popup-img").src = immagine;


}





function chiudiProgramma(){


    document.getElementById("popup").style.display = "none";


}





// chiusura con X

const pulsanteChiudi = document.getElementById("chiudi-popup");


if(pulsanteChiudi){


    pulsanteChiudi.addEventListener("click", function(e){


        e.stopPropagation();


        chiudiProgramma();


    });



    pulsanteChiudi.addEventListener("touchend", function(e){


        e.preventDefault();


        e.stopPropagation();


        chiudiProgramma();


    });


}









// ==========================
// SCORRIMENTO TIMELINE
// ==========================


const timeline = document.querySelector(".timeline");


let premuto = false;

let posizioneInizio;

let scrollInizio;



if(timeline){


timeline.addEventListener("mousedown",e=>{


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


let oggi=new Date();


const giorniVisibili=7;









// ==========================
// CREA GIORNI
// ==========================


function creaGiorni(){


const contenitore=document.getElementById("giorni-container");


contenitore.innerHTML="";


oggi=new Date();



for(let i=-giorniVisibili;i<=giorniVisibili;i++){


let giorno=new Date(oggi);


giorno.setDate(
    oggi.getDate()+i
);



let nome;



if(i===0){


nome="OGGI";


}else{


nome=giorno.toLocaleDateString(
    "it-IT",
    {
        weekday:"short"
    }
).toUpperCase();


}



let bottone=document.createElement("button");



bottone.innerHTML=
nome+
"<br>"+
giorno.getDate();



bottone.onclick=function(){


selezionaGiorno(
    giorno,
    bottone
);


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


document
.querySelectorAll("#giorni-container button")
.forEach(b=>{


b.classList.remove("giorno-attivo");


});



bottone.classList.add("giorno-attivo");



caricaProgrammi(giorno);



}









// ==========================
// PROGRAMMA IN ONDA
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




if(minutiFine<minutiInizio){


minutiFine+=1440;


if(minutiAttuali<minutiInizio){

minutiAttuali+=1440;

}


}



return(
minutiAttuali>=minutiInizio &&
minutiAttuali<minutiFine
);


}









// ==========================
// CREA ORARI
// ==========================


function creaOrari(){


const contenitore=document.getElementById("orari");


contenitore.innerHTML="";



for(let ora=0;ora<24;ora++){


let span=document.createElement("span");


span.innerHTML=
ora.toString().padStart(2,"0")
+":00";



contenitore.appendChild(span);


}



}









// ==========================
// CARICA PROGRAMMI
// ==========================


function caricaProgrammi(giorno){



const lista=document.getElementById("lista-programmi");


const titolo=document.getElementById("giorno-selezionato");





let data=

giorno.getFullYear()
+"-"+
String(giorno.getMonth()+1).padStart(2,"0")
+"-"+
String(giorno.getDate()).padStart(2,"0");






if(

giorno.getDate()===oggi.getDate()
&&
giorno.getMonth()===oggi.getMonth()
&&
giorno.getFullYear()===oggi.getFullYear()

){


titolo.innerHTML="Programmazione di oggi";


}else{


titolo.innerHTML=
"Programmazione di "+
giorno.toLocaleDateString(
"it-IT",
{
weekday:"long",
day:"numeric",
month:"long"
}
);


}






fetch("programmi.json?v="+Date.now())


.then(r=>r.json())


.then(dati=>{



lista.innerHTML="";


creaOrari();



let programmiGiorno=dati[data] || [];



if(programmiGiorno.length===0){


lista.innerHTML=
"<p>Nessun programma disponibile.</p>";


return;


}





programmiGiorno.forEach(programma=>{



let div=document.createElement("div");



let inOnda=false;



if(

giorno.getDate()===oggi.getDate()
&&
giorno.getMonth()===oggi.getMonth()
&&
giorno.getFullYear()===oggi.getFullYear()

){


inOnda=programmaInOnda(
programma.inizio,
programma.fine
);


}





div.className=
inOnda
?
"programma in-onda"
:
"programma";






div.innerHTML=`

<strong>${programma.titolo}</strong>

<span>
${programma.inizio} - ${programma.fine}
</span>

${inOnda ? "<small>🔴 IN ONDA</small>" : ""}

`;







// larghezza timeline


let inizio=programma.inizio.split(":");

let fine=programma.fine.split(":");



let minutiInizio=
parseInt(inizio[0])*60+
parseInt(inizio[1]);



let minutiFine=
parseInt(fine[0])*60+
parseInt(fine[1]);



if(minutiFine<=minutiInizio){

minutiFine=1440;

}



let durata=minutiFine-minutiInizio;



let scala=120;



div.style.width=
((durata/60)*scala)
+"px";



div.style.left=
((minutiInizio/60)*scala)
+"px";






div.onclick=function(){


apriProgramma(

programma.titolo,

programma.inizio+
" - "+
programma.fine,

programma.descrizione,

programma.immagine

);



};





lista.appendChild(div);



});



})



.catch(e=>console.log(
"Errore programmi:",
e
));


}









// ==========================
// AVVIO
// ==========================


creaGiorni();


caricaProgrammi(oggi);









// ==========================
// AGGIORNAMENTI
// ==========================


setInterval(()=>{


caricaProgrammi(new Date());


},300000);





setInterval(()=>{


let nuovaData=new Date();



if(

nuovaData.getDate()!==oggi.getDate()
||
nuovaData.getMonth()!==oggi.getMonth()
||
nuovaData.getFullYear()!==oggi.getFullYear()

){


oggi=nuovaData;


creaGiorni();


caricaProgrammi(oggi);


}



},60000);