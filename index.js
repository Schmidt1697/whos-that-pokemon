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

    //populate info list
    const liName = document.querySelector('#name')
    //capitalize first letter
    liName.textContent = pkmnName;
    const liType = document.querySelector('#type')

    liType.textContent = pkmn.types[0].type.name; 
    if(pkmn.types.length > 1){
        liType.textContent += ` / ${pkmn.types[1].type.name}` 
    }
    
    const liGen = document.querySelector('#gen')
    const liAbility = document.querySelector('#ability')
    const liStats = document.querySelector('#stats')
    const liHp = document.querySelector('#hp')
    const liAtt = document.querySelector('#att')
    const liDefense = document.querySelector('#defense')
    const liSpa = document.querySelector('#spa')
    const liSpd = document.querySelector('#spd')
    const liSpeed = document.querySelector('#speed')
    const liBst = document.querySelector('#bst')

    
}