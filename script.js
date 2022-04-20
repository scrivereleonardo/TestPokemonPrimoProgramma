// var pokeList //solo nome 
// var allPokeInfo = [] //Solo i tipi 
let allPokeEverything = [] //Tutte le info - SERVE SOLO QUESTO
let usefullResultPoke = []



const output = document.querySelector("#counterTest");

window.addEventListener("scroll", event => {

    if (window.pageYOffset >= document.getElementById("151").offsetTop) {

        document.getElementById("jumpToGen").innerHTML = "GEN 1"

    } else {

        document.getElementById("jumpToGen").innerHTML = "GEN 2"
    }

});

function checkOffsetY() {
    let genOneStart = 0;
    let genTwoStart = document.getElementById("151").offsetTop;

    if (window.pageYOffset >= genTwoStart) {
        window.scroll(0, genOneStart);
    } else {
        window.scroll(0, genTwoStart);
    }
}

document.getElementById("jumpToGen").addEventListener("click", (event) => {
    checkOffsetY()

});

window.addEventListener('load', (event) => {
    if ( localStorage.getItem("allPokeArray") == undefined ||localStorage.getItem("allPokeArray") == null || localStorage.getItem("allPokeArray")==[{}])  {
        localStorage.setItem("allPokeArray", [{}])
        alert("Il PRIMO caricamento ci metterà un po, che deve caricare 251 Pokemon e le loro immagini")
        getAllPoke2()

        let usefullResultPokeSTR = localStorage.getItem("allPokeArray")
        usefullResultPoke = JSON.parse(usefullResultPokeSTR)
    }
    else{


        let usefullResultPokeSTR = localStorage.getItem("allPokeArray")
        usefullResultPoke = JSON.parse(usefullResultPokeSTR)
        console.log(usefullResultPoke);
        generateCard()
    }

    


    


});


document.getElementById("getSinglePoke").addEventListener("click", (event) => {
    getPoke(document.getElementById('inputPoke').value)
});



//Funzione che Prende tutti i pokemon e li stampa a schermo //NON VA //NON USARE
// function getAllPoke() {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };

//     fetch("https://pokeapi.co/api/v2/pokemon?limit=151", requestOptions)
//         .then(response => response.json())
//         .then(result => pokeList = result)
//         .then(() => {
//             console.log(pokeList)
//             var counter = 0;
//             pokeList.results.forEach(element => {

//                 counter++
//                 document.getElementById("divList").innerHTML += "<div class='card' onclick='openPokeModal()' name='" + element.name + "' id='" + counter + "'> <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/" + counter + ".png' alt='Avatar' style='width:100%'> <div class='containerCard'><p><b>" + uppercaseFirstLetter(element.name) + "</b></p><p class='center'>N°" + counter + "</p></div></div>"

//                 fetch("https://pokeapi.co/api/v2/pokemon/" + element.name, requestOptions)
//                     .then(response => response.json())
//                     .then(result => {
//                         allPokeInfo.push({
//                             "type": result.types[0].type.name,
//                             "sprite": result.sprites.versions["generation-i"]["red-blue"].front_default,
//                             "description": "Non trovo le descrizioni nell'API"
//                         })
//                         if (allPokeInfo.length == 151) {
//                             // backgroundColorFinder()
//                         }
//                     })

//             });
//         })
//         .catch(error => console.log('ERRORE CARICAMENTO', error));
// }


//Prende solo tutti i pokemon // VA!
async function getAllPoke2() {
    var counterLoad=0
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    for (let index = 1; index < 251; index++) {
        await fetch("https://pokeapi.co/api/v2/pokemon/" + index, requestOptions)
            .then(response => response.json())
            .then(result => {
                counterLoad=counterLoad+1
                document.getElementById("test").innerHTML="Pokemon Caricati "+counterLoad+"/251"
                if (counterLoad>249) {
                    document.getElementById("test").classList.add("hidden2")
                }
                allPokeEverything.push(result)
                usefullResultPoke.push({
                    id: result.id,
                    name: result.name,
                    moves: iterateMoves(result),
                    weight: result.weight,
                    sprites_I: result.sprites.versions["generation-i"]["red-blue"]?.front_transparent,
                    sprites_II: result.sprites.versions["generation-ii"]["silver"]?.front_transparent,
                    type: result.types[0].type.name
                })

                //     localStorage.setItem(index, JSON.stringify(result))

            })
            .catch(error => console.log('ERRORE CARICAMENTO', error));
    }
    var usefullResultPokeSTR = JSON.stringify(usefullResultPoke)

    localStorage.setItem("allPokeArray", usefullResultPokeSTR)

    generateCard()
    //localStorage.clear()
}
function iterateMoves(singlePoke) {
    let moveRes = ""
    let moveResArray = []
    singlePoke.moves.forEach(element => {
        moveRes = element.move.name
        moveResArray.push(moveRes)
        // console.log(moveRes)
    });
    return moveResArray
}


function generateCard() {
    var counter = 1;
    usefullResultPoke.forEach(element => {
        if (counter <= 151) { //GEN 1
            document.getElementById("divList").innerHTML += "<div class='card dashed' onclick='openPokeModal(" + counter + ")' name='" + element.name + "' id='" + counter + "'> <img src=' " + element.sprites_I + "' alt='Avatar' style='width:100%'> <div class='containerCard'><p style='font-size:auto'><b>" + uppercaseFirstLetter(element.name) + "</b></p><p class='center'>N°" + counter + "</p></div></div>"
            if (counter == 151) {
                document.getElementById("divList").innerHTML += "<br>"
            }
        } else { //GEN 2
            document.getElementById("divList").innerHTML += "<div class='card dashed' onclick='openPokeModal(" + counter + ")' name='" + element.name + "' id='" + counter + "'> <img src=' " + element.sprites_II + "' alt='Avatar' style='width:100%'> <div class='containerCard'><p style='font-size:auto'><b>" + uppercaseFirstLetter(element.name) + "</b></p><p class='center'>N°" + counter + "</p></div></div>"
        }
        counter++;
    });

    backgroundColors()
}


//Usa ancora l'array con TUUUUUTTI i dati
function backgroundColors() {
    //Non funziona array.length????
    for (let index = 1; index < 252; index++) {
        if (usefullResultPoke[index - 1].type == "fire") {
            document.getElementById(index).setAttribute("style", "background-color: #EE8130;");
        } else if (usefullResultPoke[index - 1].type == "grass") {
            document.getElementById(index).setAttribute("style", "background-color: #7AC74C;");
        } else if (usefullResultPoke[index - 1].type == "water") {
            document.getElementById(index).setAttribute("style", "background-color: #6390F0;");
        } else if (usefullResultPoke[index - 1].type == "normal") {
            document.getElementById(index).setAttribute("style", "background-color: #A8A77A;");
        } else if (usefullResultPoke[index - 1].type == "bug") {
            document.getElementById(index).setAttribute("style", "background-color: #A6B91A;");
        } else if (usefullResultPoke[index - 1].type == "electric") {
            document.getElementById(index).setAttribute("style", "background-color: #F7FE2E;");
        } else if (usefullResultPoke[index - 1].type == "poison") {
            document.getElementById(index).setAttribute("style", "background-color: #A33EA1;");
        } else if (usefullResultPoke[index - 1].type == "fairy") {
            document.getElementById(index).setAttribute("style", "background-color: #D685AD;");
        } else if (usefullResultPoke[index - 1].type == "fighting") {
            document.getElementById(index).setAttribute("style", "background-color: #C22E28;");
        } else if (usefullResultPoke[index - 1].type == "ground") {
            document.getElementById(index).setAttribute("style", "background-color: #E2BF65;");
        } else if (usefullResultPoke[index - 1].type == "psychic") {
            document.getElementById(index).setAttribute("style", "background-color: #F95587;");
        } else if (usefullResultPoke[index - 1].type == "rock") {
            document.getElementById(index).setAttribute("style", "background-color: #B6A136;");
        } else if (usefullResultPoke[index - 1].type == "ghost") {
            document.getElementById(index).setAttribute("style", "background-color: #735797;");
        } else if (usefullResultPoke[index - 1].type == "dragon") {
            document.getElementById(index).setAttribute("style", "background-color: #6F35FC;");
        } else if (usefullResultPoke[index - 1].type == "ice") {
            document.getElementById(index).setAttribute("style", "background-color: #96D9D6;");
        } else if (usefullResultPoke[index - 1].type == "dark") {
            document.getElementById(index).setAttribute("style", "background-color: #705746;");
        } else if (usefullResultPoke[index - 1].type == "steel") {
            document.getElementById(index).setAttribute("style", "background-color: #B7B7CE;");
        } else if (usefullResultPoke[index - 1].type == "ice") {
            document.getElementById(index).setAttribute("style", "background-color: #A98FF3;");
        }

    }
}


//Inutile ma è per abbellire
function uppercaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//DA RIELAVORARE
function getPoke(namePoke) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch("https://pokeapi.co/api/v2/pokemon/" + namePoke.toLowerCase(), requestOptions)
        .then(response => response.json())
        .then(result => {
            openPokeModal(result.id)
        })
        .catch(error => {
            console.log('ERRORE, POKEMON NON TROVATO!!', error)
            if (error) {
                document.getElementById('dialog-default').showModal()
            }

        });
}
/*, document.getElementById('dialog-default').showModal() */

function openPokeModal(idPoke) {

    if (isNaN(idPoke)) {
        document.getElementById('dialog-default').showModal();

    } else {
        document.getElementById("modal").style.display = "block"
        document.getElementById("closeModal").onclick = () => {
            modal.style.display = "none";
        }

        document.getElementById("idModal").innerHTML = idPoke

        let randomApp = Math.round(Math.random() * ((usefullResultPoke[idPoke - 1].moves.length) - (1)));

        let namePoke = usefullResultPoke[idPoke - 1].name;
        let weight = usefullResultPoke[idPoke - 1].weight;

        console.log(randomApp)


        document.getElementById("balloonTalking").innerHTML = "This is a " + uppercaseFirstLetter(namePoke) + "! and the weight is " + weight + "! One of his known moves is '" + usefullResultPoke[idPoke - 1].moves[randomApp] + "' , keep this in mind!"

        if (idPoke <= 151) { //GEN 1
            // document.getElementById("pokeImg").setAttribute("src", "" + allPokeEverything[idPoke - 1].sprites.versions["generation-i"]["red-blue"].front_transparent)
            document.getElementById("pokeImg").setAttribute("src", "" + usefullResultPoke[idPoke - 1].sprites_I)
        } else {
            document.getElementById("pokeImg").setAttribute("src", "" + usefullResultPoke[idPoke - 1].sprites_II)

        }
    }


}

// const interval = setInterval(function () { //FORSE E' TERRIBILE , UNA FUNZIONE RICHIAMATA SEMPRE? PAZZIA, ma non so come fare

//     if (window.pageYOffset >= 21055) {

//         document.getElementById("jumpToGen").innerHTML = "GEN 1"
//         document.getElementById("jumpToGen").setAttribute("href", "#1")

//     } else {

//         document.getElementById("jumpToGen").innerHTML = "GEN 2"
//         document.getElementById("jumpToGen").setAttribute("href", "#151")

//     }

// }, 2000);




//Per la chiusira della modale


// Card Ogni pokemon
/* <div class='card' onclick='test()'>
   <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/" + counter + ".png' alt='Avatar' style='width:100%'> 
   <div class='containerCard'>
      <p><b>" + uppercaseFirstLetter(element.name) + "</b></p>
      <p class='center'>N°" + counter + "</p>
   </div>
</div> */