async function caricaHome() {


    const hero = document.getElementById("hero");


    try {


        const risposta = await fetch("dati/home.json");


        const programma = await risposta.json();



        hero.innerHTML = `


        <img src="${programma.immagine}">


        <div class="hero-testo">


        <h1>${programma.titolo}</h1>


        <p>${programma.descrizione}</p>


        <h3>${programma.orario}</h3>


        </div>


        `;



    } catch (errore) {


        console.log("Errore Home:", errore);


    }


}



caricaHome();



function apriMenu(){

    document.getElementById("menu").classList.toggle("aperto");

}


