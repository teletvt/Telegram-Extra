async function caricaPromo() {

    const contenitore = document.getElementById("lista-promo");
    const principale = document.getElementById("promo-principale");

    try {

        const risposta = await fetch("dati/promo.json");
        const promo = await risposta.json();

        contenitore.innerHTML = "";

        function mostraPromoPrincipale(elemento) {

            principale.innerHTML = `

                <video controls autoplay muted>
                    <source src="${elemento.video}" type="video/mp4">
                </video>

                <h2>${elemento.titolo}</h2>

                <small class="data-promo">${elemento.data}</small>

                <p>${elemento.descrizione}</p>

            `;

        }

        // promo principale iniziale
        const promoPrincipale = promo.find(p => p.principale === true);

        if (promoPrincipale) {
            mostraPromoPrincipale(promoPrincipale);
        }

        // lista promo
        promo.forEach(elemento => {

            const scheda = document.createElement("div");

            scheda.className = "scheda-promo";

            scheda.innerHTML = `

                <video controls>
                    <source src="${elemento.video}" type="video/mp4">
                </video>

                <h3>${elemento.titolo}</h3>

                <small class="data-promo">${elemento.data}</small>

                <p>${elemento.descrizione}</p>

            `;

            scheda.addEventListener("click", () => {

                mostraPromoPrincipale(elemento);

                principale.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

            contenitore.appendChild(scheda);

        });

    } catch (errore) {

        console.log("Errore caricamento promo:", errore);

    }

}

caricaPromo();