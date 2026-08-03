async function caricaHome() {

    const hero = document.getElementById("hero");

    if (!hero) return;

    try {

        const risposta = await fetch("dati/home.json?v=" + Date.now());

        const programmi = await risposta.json();

        const adesso = new Date();

        const minutiAttuali =
        adesso.getHours() * 60 + adesso.getMinutes();


        function convertiMinuti(orario) {

            const parti = orario.split(":");

            return Number(parti[0]) * 60 + Number(parti[1]);

        }


        let dataRiferimento = new Date();


        if (minutiAttuali < 360) {

            dataRiferimento.setDate(
                dataRiferimento.getDate() - 1
            );

        }


        const oggi =
        dataRiferimento.toISOString().split("T")[0];


        const programmaOggi = programmi[oggi];


        if (!programmaOggi) return;


        let programmaMostrato = programmaOggi;

        let scritta = "STASERA IN PRIMA SERATA";


        const inizio =
        convertiMinuti(programmaOggi.inizio);


        let fine =
        convertiMinuti(programmaOggi.fine);


        if (fine < inizio) {

            fine += 1440;

        }


        if (
            minutiAttuali >= inizio &&
            minutiAttuali < fine
        ) {

            scritta = "ORA IN ONDA";

        }


        if (
            minutiAttuali >= fine ||
            minutiAttuali < 360
        ) {

            const domani = new Date(dataRiferimento);

            domani.setDate(
                domani.getDate() + 1
            );


            const dataDomani =
            domani.toISOString().split("T")[0];


            if (programmi[dataDomani]) {

                programmaMostrato =
                programmi[dataDomani];

                scritta =
                "DOMANI IN PRIMA SERATA";

            }

        }


        hero.style.backgroundImage =
        `url("${programmaMostrato.immagine}?v=${Date.now()}")`;


        document.getElementById("hero-orario").textContent =
        scritta;


        document.getElementById("hero-titolo").textContent =
        programmaMostrato.titolo;


        document.getElementById("hero-descrizione").textContent =
        programmaMostrato.descrizione;


    }
    catch(errore) {

        console.log("Errore Home:", errore);

    }

}


caricaHome();