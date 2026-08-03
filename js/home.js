async function caricaHome() {


    const hero = document.getElementById("hero");


    if (!hero) return;



    try {


        const risposta = await fetch("dati/home.json?v=" + Date.now());


        const programmi = await risposta.json();




        const adesso = new Date();


        const ore = adesso.getHours();

        const minuti = adesso.getMinutes();


        const minutiAttuali = ore * 60 + minuti;




        function convertiMinuti(orario) {


            const parti = orario.split(":");


            return Number(parti[0]) * 60 + Number(parti[1]);


        }






        let dataRiferimento = new Date();



        /*
        Prima delle 06:00
        appartiene ancora alla sera precedente
        */


        if (minutiAttuali < 360) {


            dataRiferimento.setDate(
                dataRiferimento.getDate() - 1
            );


        }




        const oggi =
        dataRiferimento.toISOString().split("T")[0];




        const programmaOggi = programmi[oggi];



        if (!programmaOggi) {


            console.log("Nessun programma trovato");


            return;


        }






        let programmaMostrato = programmaOggi;


        let scritta = "STASERA IN PRIMA SERATA";







        const inizio =
        convertiMinuti(programmaOggi.inizio);



        let fine =
        convertiMinuti(programmaOggi.fine);





        /*
        Gestione programmi che finiscono dopo mezzanotte
        */


        if (fine < inizio) {


            fine += 1440;


        }






        /*
        Programma in onda
        */


        if (
            minutiAttuali >= inizio &&
            minutiAttuali < fine
        ) {


            scritta = "ORA IN ONDA";


        }







        /*
        Programma terminato:
        mostra quello del giorno dopo
        */


        if (
            minutiAttuali >= fine ||
            minutiAttuali < 360
        ) {



            const domani =
            new Date(dataRiferimento);



            domani.setDate(
                domani.getDate() + 1
            );



            const dataDomani =
            domani.toISOString().split("T")[0];




            if(programmi[dataDomani]) {


                programmaMostrato =
                programmi[dataDomani];


                scritta =
                "DOMANI IN PRIMA SERATA";


            }


        }







        hero.style.backgroundImage =
        `url("${programmaMostrato.immagine}?v=${Date.now()}")`;





        document.getElementById("hero-orario").innerHTML =
        scritta;




        document.getElementById("hero-titolo").innerHTML =
        programmaMostrato.titolo;




        document.getElementById("hero-descrizione").innerHTML =
        programmaMostrato.descrizione;




    }


    catch(errore) {


        console.log(
            "Errore Home:",
            errore
        );


    }


}





caricaHome();