async function caricaPromoHome() {

alert("HOME PROMO AGGIORNATA");


const contenitore = document.getElementById("lista-promo-home");



try {


const risposta = await fetch("dati/promo.json?v=2");


const promo = await risposta.json();



/* MOSTRA SOLO I PRIMI 3 PROMO */


promo.slice(0,3).forEach(elemento => {


contenitore.innerHTML += `


<div class="scheda-promo">


<video controls>


<source src="${elemento.video}" type="video/mp4">


</video>


<h3>${elemento.titolo}</h3>


<small class="data-promo">${elemento.data || ""}</small>


<p>${elemento.descrizione}</p>


</div>


`;


});



} catch (errore) {


console.log("Errore promo home:", errore);


}


}



caricaPromoHome();