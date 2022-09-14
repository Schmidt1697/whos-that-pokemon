playBtn = document.querySelector("#play-btn");
playBtn.addEventListener('click', play);
let answMsg = document.querySelector('#answer-msg');
const answerForm = document.querySelector("#pkmn-form");
const yourPkmnBtn = document.querySelector("#yourPkmn-btn");
const seeYourList = document.querySelector("#see-list")
const yourPkmnModal = document.querySelector("#modal")
const yourPkmnList = document.querySelector("#pkmn-list")
const overlay = document.querySelector(".overlay")
let currPkmnId = 0;
let bestWinStreak = 0
let currWinStreak = 0
const winDiv = document.querySelector("#best-streak")

function play(){
    answerForm.classList.remove('hidden')
    playBtn.classList.add("hidden")
    answMsg.classList.add('hidden')
    ///////reset right and wrong after each answer //////////
    answMsg.classList.remove('right', 'wrong')
    seeYourList.classList.add('hidden')
    yourPkmnModal.classList.add('hidden')

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

    //Event Listener - Answer Form
    // answerForm.addEventListener('submit',(e) =>  handleAnswer(pkmnSprite, e));
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

            //show Pokemon Name
            liName = document.querySelector('#name')
            liName.textContent = realAnswer.charAt(0).toUpperCase() + realAnswer.slice(1);

            if(newAnswer === realAnswer){
                rightAnswerMsg();
                fetch(`https://pokeapi.co/api/v2/pokemon/${currPkmnId}`)
                .then(res => res.json())
                .then(pkmn => { 
                    let sprite = pkmn.sprites['front_default']
                   
                        //push correct name/id to db.json
                    let realAnsData = {
                        sprite: sprite,
                        name: realAnswer,
                        id: currPkmnId,
                    }
                
                sendPkmnInfo('http://localhost:3000/pokemon', realAnsData)
                })

            } else {
                wrongAnswerMsg()
                seeYourList.classList.remove('hidden');
                getCorrectPkmn('http://localhost:3000/pokemon');

            } 
            answerForm.reset()   
    
    
            
        })
    }

    //Messages for right/wrong answers
    function rightAnswerMsg() {
        document.querySelector("#curr-streak").textContent = `Current Streak: ${++currWinStreak}`
        if (bestWinStreak < currWinStreak){
            bestWinStreak = currWinStreak
            winDiv.textContent = `Best Win Streak: ${bestWinStreak}`
        }
        answMsg.textContent = "CORRECT!!!";
        answMsg.classList.add('right');
        answMsg.classList.remove('hidden');
    }

    function wrongAnswerMsg() {
        currWinStreak = 0
        document.querySelector("#curr-streak").textContent = "Current Streak: 0"
        answMsg.textContent = "WRONG!!! Click Play to restart.";
        answMsg.classList.add('wrong');
        answMsg.classList.remove('hidden');
    }


// //POST REQUEST to send correct pkmn name to db.json
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



//GET req to db.json to fill pkmn List
function getCorrectPkmn(url){
    fetch(url)
    .then(res => res.json())
    .then(pkmArr => {
        yourPkmnList.innerHTML = ''
        pkmArr.forEach(pkmn => fillPkmnList(pkmn))
    }) 

}

//function to fill pkmn list w/ results from db.json
function fillPkmnList(pkmn){
    const img = document.createElement('img');
    img.src = pkmn.sprite;
    const imgCapt = document.createElement('figcaption')
    imgCapt.textContent = pkmn.name
    imgCapt.classList.add('img-capt')
    const singPkmnDiv = document.createElement('div');
    singPkmnDiv.append(img, imgCapt)
   yourPkmnList.append(singPkmnDiv)
}



//open
function openPkmnList() {
    yourPkmnModal.classList.remove('hidden');
    overlay.classList.remove("hidden");
};
//close
function closePkmnList(){
yourPkmnModal.classList.add("hidden");
overlay.classList.add("hidden");

};

//Event Listeners to open/close pkmn modal/box
yourPkmnBtn.addEventListener('click', openPkmnList);
overlay.addEventListener('click', closePkmnList);




