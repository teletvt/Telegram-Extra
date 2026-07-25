async function caricaPromo() {


    const contenitore = document.getElementById("lista-promo");

    const principale = document.getElementById("promo-principale");


    try {


        const risposta = await fetch("dati/promo.json");


        const promo = await risposta.json();



        promo.forEach(elemento => {



            // PROMO PRINCIPALE

            if (elemento.principale === true) {


                principale.innerHTML = `


                <video controls>


                <source src="${elemento.video}" type="video/mp4">


                </video>


                <h2>${elemento.titolo}</h2>


                <p>${elemento.descrizione}</p>


                `;


            }





            // LISTA PROMO


            contenitore.innerHTML += `


            <div class="scheda-promo">


            <video controls>


            <source src="${elemento.video}" type="video/mp4">


            </video>



            <h3>${elemento.titolo}</h3>


            <p>${elemento.descrizione}</p>



            </div>


            `;



        });



    } catch (errore) {


        console.log("Errore caricamento promo:", errore);


    }


}



caricaPromo();