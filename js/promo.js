async function caricaPromo() {


    const contenitore = document.getElementById("lista-promo");
    const principale = document.getElementById("promo-principale");


    try {


        const risposta = await fetch("dati/promo.json");

        const promo = await risposta.json();


        let promoAttuale = promo.find(p => p.principale === true);



        function mostraPromoPrincipale(elemento) {


            principale.innerHTML = `

            <video controls autoplay>

                <source src="${elemento.video}" type="video/mp4">

            </video>


            <h2>${elemento.titolo}</h2>


            <small class="data-promo">
                ${elemento.data || ""}
            </small>


            <p>
                ${elemento.descrizione}
            </p>

            `;


        }




        function aggiornaLista(){


            contenitore.innerHTML = "";



            promo.forEach(elemento => {


                // nasconde solo quello attualmente principale

                if(elemento.video !== promoAttuale.video){



                    contenitore.innerHTML += `


                    <div class="scheda-promo"
                    onclick="apriPromo('${elemento.video}')">


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






        window.apriPromo = function(video){


            const nuovoPromo =
            promo.find(p => p.video === video);



            if(nuovoPromo){


                promoAttuale = nuovoPromo;


                mostraPromoPrincipale(nuovoPromo);


                aggiornaLista();


                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });


            }


        };






        // AVVIO

        mostraPromoPrincipale(promoAttuale);

        aggiornaLista();




    } catch(errore){


        console.log(
            "Errore caricamento promo:",
            errore
        );


    }


}



caricaPromo();