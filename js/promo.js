async function caricaPromo() {

    const contenitore = document.getElementById("lista-promo");
    const principale = document.getElementById("promo-principale");


    if (!contenitore || !principale) return;


    try {

        const risposta = await fetch("dati/promo.json?v=" + Date.now());

        const promo = await risposta.json();


        let promoAttuale = promo.find(p => p.principale === true);


        /* ==========================
           MOSTRA PROMO PRINCIPALE
        ========================== */

        function mostraPromoPrincipale(elemento) {

            principale.innerHTML = `

            <video controls autoplay muted>

                <source src="${elemento.video}" type="video/mp4">

            </video>


            <h2>
                ${elemento.titolo}
            </h2>


            <small class="data-promo">
                ${elemento.data || ""}
            </small>


            <p>
                ${elemento.descrizione}
            </p>

            `;

        }


        /* ==========================
           AGGIORNA LISTA
        ========================== */

        function aggiornaLista() {

            contenitore.innerHTML = "";


            promo.forEach(elemento => {


                /*
                 * Mostra nella lista tutti i promo
                 * TRANNE quello attualmente principale.
                 */

                if (elemento.video !== promoAttuale.video) {


                    contenitore.innerHTML += `

                    <div
                        class="scheda-promo"
                        onclick="apriPromo('${elemento.video}')"
                    >


                        <div class="anteprima-promo">

                            ▶

                        </div>


                        <h3>
                            ${elemento.titolo}
                        </h3>


                        <small class="data-promo">
                            ${elemento.data || ""}
                        </small>


                        <p>
                            ${elemento.descrizione}
                        </p>


                    </div>

                    `;

                }

            });

        }


        /* ==========================
           CLICK PROMO
        ========================== */

        window.apriPromo = function(video) {

            const nuovoPromo =
                promo.find(p => p.video === video);


            if (nuovoPromo) {

                promoAttuale = nuovoPromo;


                mostraPromoPrincipale(nuovoPromo);


                aggiornaLista();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        };


        /* ==========================
           AVVIO
        ========================== */

        if (promoAttuale) {

            mostraPromoPrincipale(promoAttuale);

            aggiornaLista();

        }


    } catch (errore) {

        console.log(
            "Errore caricamento promo:",
            errore
        );

    }

}


caricaPromo();