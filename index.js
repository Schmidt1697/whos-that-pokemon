playBtn = document.querySelector("#play-btn");
playBtn.addEventListener('click', play);
let answMsg = document.querySelector('#answer-msg');
const answerForm = document.querySelector("#pkmn-form");
const yourPkmnBtn = document.querySelector("#yourPkmn-Btn");
let currPkmnId = 0;

function play(){
    answerForm.classList.remove('hidden')
    playBtn.classList.add("hidden")
    answMsg.classList.add('hidden')

    const randPkmnId = Math.floor(Math.random() * 898) +1;
    currPkmnId = randPkmnId;
    //const randPkmnId = 718;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randPkmnId}`)
    .then(res => res.json())
    .then(pkmn => playGame(pkmn))
}

function playGame(pkmn){
    let pkmnName = pkmn.name
    const pkmnImg = document.querySelector("#pokemon-img")
    pkmnImg.src = pkmn.sprites.other['official-artwork']['front_default']

    //populate info list
    const liName = document.querySelector('#name')
    liName.textContent = '???'; //start w. hidden name
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
    liHp.textContent = "HP: " + pkmn.stats[0]['base_stat']
    const liAtt = document.querySelector('#att')
    liAtt.textContent = "Attack: " + pkmn.stats[1]['base_stat']
    const liDefense = document.querySelector('#defense')
    liDefense.textContent = "Defense: " + pkmn.stats[2]['base_stat']
    const liSpa = document.querySelector('#spa')
    liSpa.textContent = "Special Attack: " + pkmn.stats[3]['base_stat']
    const liSpd = document.querySelector('#spd')
    liSpd.textContent = "Special Defense: " + pkmn.stats[4]['base_stat']
    const liSpeed = document.querySelector('#speed')
    liSpeed.textContent = "Speed: " + pkmn.stats[5]['base_stat']
    let bst = 0;
    const liBst = document.querySelector('#bst')
    pkmn.stats.forEach(stat => {
        bst += stat['base_stat']
    })
    liBst.textContent = "BST: " + bst;

    console.log(pkmnName)

    ////get user info from submit and compare to pkmn name

    //Event Listener - Answer Form
    answerForm.addEventListener('submit', handleAnswer);
    
    
    }
    const handleAnswer = (e) => {

        e.preventDefault();

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${currPkmnId}`)
        .then(res => res.json())
        .then(newPkmn => {
            let realAnswer = '';
            realAnswer = newPkmn.name.replace('-', '')
            let newAnswer = e.target.name.value.toLowerCase()
            // console.log(realAnswer + ` ` + newAnswer)
    
            answerForm.classList.add('hidden')
            playBtn.classList.remove('hidden')

            if(newAnswer === realAnswer){
                //show Pokemon Name
                liName = document.querySelector('#name')
                liName.textContent = realAnswer.charAt(0).toUpperCase() + realAnswer.slice(1);
                
                rightAnswerMsg();
                //add 1 to win-streak

                //push correct name/id to db.json
                let realAnsData = {
                    name: realAnswer,
                    id: currPkmnId
                }
                
                sendPkmnInfo('http://localhost:3000/pokemon', realAnsData)

            } else {
                wrongAnswerMsg()
                yourPkmnBtn.classList.remove('hidden');

            } 
            answerForm.reset()   
    
    
            
        })
    }

    //Messages for right/wrong answers
    function rightAnswerMsg() {
        answMsg.textContent = "CORRECT!!!";
        answMsg.classList.add('right');
        answMsg.classList.remove('hidden');
    }

    function wrongAnswerMsg() {
        answMsg.textContent = "WRONG!!! Click Play to restart.";
        answMsg.classList.add('wrong');
        answMsg.classList.remove('hidden');
    }


// //POST REQUEST to send pkmn name to 
function sendPkmnInfo(url, data){
    fetch(url, {
        method: 'POST',
           headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
    })
    .then(res => res.json())
    .catch(console.error)

}