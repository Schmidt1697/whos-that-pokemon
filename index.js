playBtn = document.querySelector("#play-btn");
playBtn.addEventListener('click', play)

function play(){
    playBtn.classList.add("hidden")
    const randPkmnId = Math.floor(Math.random() * 898) +1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randPkmnId}`)
    .then(res => res.json())
    .then(pkmn => playGame(pkmn))
}

function playGame(pkmn){
    const pkmnName = pkmn.name
    const pkmnImg = document.querySelector("#pokemon-img")
    pkmnImg.src = pkmn.sprites.other['official-artwork']['front_default']
    
}