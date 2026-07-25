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
// SCORRIMENTO TIMELINE CON MOUSE
// ==========================


const timeline = document.querySelector(".timeline");

let premuto = false;
let posizioneInizio;
let scrollInizio;


if (timeline) {


    timeline.addEventListener("mousedown", (e) => {

        premuto = true;

        posizioneInizio = e.pageX - timeline.offsetLeft;

        scrollInizio = timeline.scrollLeft;

    });



    timeline.addEventListener("mouseleave", () => {

        premuto = false;

    });



    timeline.addEventListener("mouseup", () => {

        premuto = false;

    });



    timeline.addEventListener("mousemove", (e) => {

        if (!premuto) return;


        e.preventDefault();


        const posizione = e.pageX - timeline.offsetLeft;


        const movimento = (posizione - posizioneInizio) * 2;


        timeline.scrollLeft = scrollInizio - movimento;

    });

}





// ==========================
// GESTIONE GIORNI GUIDA TV
// ==========================


let oggi = new Date();

let giornoSelezionato = new Date(oggi);





function creaGiorni() {


    const contenitore = document.getElementById("giorni-container");


    contenitore.innerHTML = "";



    // settimana precedente + oggi + settimana successiva

    for (let i = -7; i <= 7; i++) {


        let giorno = new Date(oggi);


        giorno.setDate(oggi.getDate() + i);



        let nome;



        if (i === 0) {


            nome = "OGGI";


        } else {


            nome = giorno.toLocaleDateString("it-IT", {

                weekday: "short"

            }).toUpperCase();


        }





        let bottone = document.createElement("button");



        bottone.innerHTML = `

        ${nome}

        <br>

        ${giorno.getDate()}

        `;



        bottone.onclick = function() {


            selezionaGiorno(giorno, bottone);


        };




        if (i === 0) {


            bottone.classList.add("giorno-attivo");


        }




        contenitore.appendChild(bottone);


    }


}







function selezionaGiorno(giorno, bottone) {



    giornoSelezionato = giorno;



    document.querySelectorAll("#giorni-container button")

    .forEach(b => {

        b.classList.remove("giorno-attivo");

    });




    bottone.classList.add("giorno-attivo");



    caricaProgrammi(giorno);



}







// ==========================
// CARICAMENTO PROGRAMMI
// ==========================


function caricaProgrammi(giorno) {


    const lista = document.getElementById("lista-programmi");

    const titolo = document.getElementById("giorno-selezionato");




    if (

        giorno.getDate() === oggi.getDate() &&

        giorno.getMonth() === oggi.getMonth() &&

        giorno.getFullYear() === oggi.getFullYear()

    ) {


        titolo.innerHTML = "Programmazione di oggi";


    } else {


        titolo.innerHTML = "Programmazione di " +

        giorno.toLocaleDateString("it-IT", {

            weekday:"long",

            day:"numeric",

            month:"long"

        });



    }





    lista.innerHTML = `



<div class="programma tg">

<strong>TG Extra</strong>

<span>18:00 - 18:30</span>

</div>




<div class="programma quiz">

<strong>Quiz del Sabato</strong>

<span>18:30 - 20:00</span>

</div>




<div class="programma prima in-onda">

<strong>Super Sarabanda</strong>

<span>21:20 - 23:30</span>

<small>🔴 IN ONDA</small>

</div>




<div class="programma film">

<strong>Film</strong>

<span>23:30 - 01:00</span>

</div>



`;



}







// ==========================
// AVVIO GUIDA TV
// ==========================


creaGiorni();


caricaProgrammi(oggi);