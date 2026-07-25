async function caricaHome() {

    const hero = document.getElementById("hero");

    if (!hero) return;

    try {

        const risposta = await fetch("dati/home.json?v=" + Date.now());

        const programma = await risposta.json();


        hero.innerHTML = `

        <img src="${programma.immagine}?v=${Date.now()}">

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


function apriMenu() {

    const menu = document.getElementById("menu");

    if (menu) {

        menu.classList.toggle("aperto");

    }

}