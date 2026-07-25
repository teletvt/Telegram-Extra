async function caricaPromoHome() {


const contenitore = document.getElementById("lista-promo-home");


if (!contenitore) return;



try {


const risposta = await fetch("dati/promo.json");


const promo = await risposta.json();



promo.forEach(elemento => {


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


console.log("Errore promo home:", errore);


}


}



caricaPromoHome();