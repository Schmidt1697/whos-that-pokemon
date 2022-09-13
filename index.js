playBtn = document.querySelector("#play-btn");
playBtn.addEventListener('click', play)
const answerForm = document.querySelector("#pkmn-form");

function play(){
    answerForm.classList.remove('hidden')
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
    liName.textContent = pkmnName.charAt(0).toUpperCase() + pkmnName.slice(1);
    const liType = document.querySelector('#type')

    liType.textContent = pkmn.types[0].type.name;
    liType.textContent = liType.textContent.charAt(0).toUpperCase() + liType.textContent.slice(1) 
    if(pkmn.types.length > 1){
        let type2 = pkmn.types[1].type.name
        type2 = type2.charAt(0).toUpperCase() + type2.slice(1)
        //liType.textContent += ` / ${pkmn.types[1].type.name}` 
        liType.textContent += ` / ${type2}`
    }
    
    const liGen = document.querySelector('#gen')
    if (pkmn.id < 152){liGen.textContent = "Generation I"}
    else if (pkmn.id < 252){liGen.textContent = "Generation II"}
    else if (pkmn.id < 387){liGen.textContent = "Generation III"}
    else if (pkmn.id < 494){liGen.textContent = "Generation IV"}
    else if (pkmn.id < 650){liGen.textContent = "Generation V"}
    else if (pkmn.id < 722){liGen.textContent = "Generation VI"}
    else if (pkmn.id < 803){liGen.textContent = "Generation VII"}
    else{liGen.textContent = "Generation VIII"}

    const liAbility = document.querySelector('#ability')
    liAbility.textContent=''
    pkmn.abilities.forEach(abi => {
        const newAbi = document.createElement('p')
        newAbi.textContent = abi.ability.name.replace('-', ' ')
        liAbility.append(newAbi)
        //liAbility.textContent += " " + abi.ability.name.replace('-', ' ') + "\r\n"
        //console.log(liAbility.textContent)
    })

    const liStats = document.querySelector('#stats')
    const liHp = document.querySelector('#hp')
    liHp.textContent += pkmn.stats[0]['base_stat']
    const liAtt = document.querySelector('#att')
    liAtt.textContent += pkmn.stats[1]['base_stat']
    const liDefense = document.querySelector('#defense')
    liDefense.textContent += ' ' + pkmn.stats[2]['base_stat']
    const liSpa = document.querySelector('#spa')
    liSpa.textContent += pkmn.stats[3]['base_stat']
    const liSpd = document.querySelector('#spd')
    liSpd.textContent += pkmn.stats[4]['base_stat']
    const liSpeed = document.querySelector('#speed')
    liSpeed.textContent += pkmn.stats[5]['base_stat']
    let bst = 0;
    const liBst = document.querySelector('#bst')
    pkmn.stats.forEach(stat => {
        bst += stat['base_stat']
    })
    liBst.textContent += bst;

    console.log(pkmn.name)
    
    ////get user info from submit and compare to pkmn name
    const handleAnswer = (e) => {
        e.preventDefault();
        console.log(e.target.name.value);
    
        const newAnswer = e.target.name.value;
    
        answerForm.classList.add('hidden')
        playBtn.classList.remove('hidden')

        if(newAnswer === pkmn.name){
            console.log('right') 
            //show pkmn name
            //show correct message to user
            //add 1 to win-streak
            //push correct name/id to db.json
        } else {
            console.log('wrong')

        }    
    }
    //Event Listener - Answer Form
    answerForm.addEventListener('submit', handleAnswer);
    
    
    }





//   // Data to store in db.json if user is correct
//   let postData = {
//     name: pkmn.name,
//     id: pkmn.id
// }

// //POST REQUEST to send pkmn name to 
// fetch('http://localhost:3000/pokemon', {
//     method: 'POST',
//        headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(postData),
// })
// .then(res => res.json())
// .catch(console.error)