//make a fetch request to get the data from our server
const rootEl = document.getElementById('root')
const userForm = document.getElementById('user-enter')
const cards = document.querySelectorAll('.memory-card')
const finalScore = document.querySelector('.final-score')
let username; 
let currentUser;
let signedIn = false; 
let frozen = false;
let firstCard; 
let secondCard; 
let flipped = false; 
let score = 0;
let currentGame; 
let allGames;
let lastGame;
const usersUrl = 'http://localhost:3000/users';

// window.addEventListener('DOMContentLoaded', (e) => {
//     const username = prompt("Please enter username")
//     while (username === null || username === ""){
//         username = prompt("Please enter username"
//     }
// })

const init = () => {
    User.bindUserFormEventListener();
}


class User {

    constructor(username){
        this.username = username
    }

    static bindUserFormEventListener() {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault(); //prevents page from refreshing
            username = document.getElementById('username').value;
            let data = {
                username, 
            };
            User.submitUser(data);
        })
    
    
    }

    static submitUser(data){
        fetch(usersUrl, {
            method: "POST", 
            headers: {
                Accept: "application/json", 
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({user: data}),
        }).then((res) => {
            return res.json()
        }).then(data => {console.log(data),
            console.log('fetch worked'),
            isLocked = false,
            signedIn = true,
            createGame()
        })
        setTimeout(function(){ 
            logoutDisplay();  
        },2000)
    }

    
    
}


function userInfo() {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {
        currentUser = users.find(user => {
            return user.username === username});
            console.log(currentUser);
        })
    console.log(currentUser);
}

function flipCard() {
    if (!signedIn){return;}
    if (frozen){return};
    this.classList.toggle('flip')
    //check to see if a card is flipped, if flipped assign it to this 
    
    if (!flipped){
        flipped = true; 
        firstCard = this;
    } else {
        //only let two cards be flipped at once 
        if(this===firstCard){
            return;
        }
        flipped = false;
        secondCard = this;
        //if two cards are flipped, check to see if they match
        if (firstCard.innerHTML.slice(-19) === secondCard.innerHTML.slice(-19)){
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            frozen = true;
            setTimeout(function() {
            firstCard.className = "memory-card";
            secondCard.className = "memory-card";
            frozen = false; 
            }, 2000)
        }
        
    }


    let cardsLeft = 0; 
    cards.forEach(card=>{
        if (card.className === "memory-card"){
            cardsLeft +=1;
        }
    })

    if (cardsLeft === 0) {
        endGame();
    }

    //end game - stop time - calculate seconds and add as score
    //refresh board, start new game but do not make you sign in 
    //if you close tab, game is deleted
}

function endGame(){
    console.log('gameover')
    let newData = {
        end_time: new Date(),
    }
    console.log(currentGame)
    
    let currentGameId= currentGame.id
    fetch(`http://localhost:3000/games/${currentGameId}`, {
        method: "PATCH", 
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({game: newData}),
    }).then((res) => {
        return res.json();
    }).then(game => {
        console.log(game)
        currentGame = game
        
    })
    setTimeout( () => {
        console.log(currentGame)
        console.log('thisiscurrentgame')
        window.alert(`Game Over! Final Time: ${currentGame.score} seconds`)
        finalScore.innerHTML = `Final Time: ${currentGame.score} seconds`,
        finalScore.className = 'px-4 py-2 border-b border-gray-800',
        insertFastestScore()
        }, 5000)
    setTimeout( ()=> {
        startOver()}, 10000)
    }

    
    
   
   //have something flash and same game over!!

function startOver(){
    console.log('made it to start over')
    setTimeout(function() {
        cards.forEach(card => {card.className = "memory-card"});
    },1500)
    setTimeout(function(){
        createGame();
    },1500)
}

let createGame = () => {
    //CREATE a new game and assign to current user
    shuffleCards();
    setTimeout(function() {
        console.log(currentUser);
    console.log('current user');
        let gameData = {
        user_id: currentUser.id,
    };
    fetch('http://localhost:3000/games', {
        method: "POST", 
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({game: gameData}),
    }).then((res) => {
        return res.json();
    }).then(game => {
        currentGame = game;
    //     currentGame = game;
    })
    activateCards();}, 3000)
}

function shuffleCards() {
    console.log('shufflecards')
    let memoryGame = document.querySelector('.memory-game');
    var frag = document.createDocumentFragment();
    cards.forEach( card => {
        frag.appendChild(cards[Math.floor(Math.random() * 18)])
    })
    memoryGame.appendChild(frag);
}

// let findGame = function() {
//     let game = )fetch('http://localhost:3000/games')
//     .then(res => res.json())
//     .then(games => {
//         currentGame = users.find(user => {
//             return user.username === username});
//             console.log(currentUser);
//         })
//     console.log(currentUser);)
// }


//change activate cards in the create user function
let activateCards = () => {
    cards.forEach(card => card.addEventListener('click', flipCard));
//TAKES TO FLIP CARDS FUNCTION 
}







// const getUsers = () => {
//     fetch('http://localhost:3000/users')
//     .then(res => res.json())
//     .then(data => enterUser(data));
// }

// const enterUser = function(users) {
//     console.log(users);

//     // games.forEach(game => {
//     //     rootEl.innerHTML += 
//     //     <div>
//     //         <h2>${game.id}</h2>
//     //     </div>
//     // })
// }


let logoutDisplay = () => {
    let userForm = document.querySelector('.user-form');
    // console.log(userForm)
    userForm.hidden = true;
    userInfo();
    setTimeout(function(){
    document.querySelector('.welcome-user').innerHTML = `<h3 class= "px-4 py-2 border-b border-gray-800">Welcome ${currentUser.username}</h3>`
    //need to fix personal highest score
    insertFastestScore();
    }, 1500)
    let logout = document.createElement('a')
    logout.href= "javascript:location.reload(true)"
    logout.className = 'px-4 py-2 border-gray-800'
    logout.innerHTML = "Logout"
    document.querySelector('.nav-list').appendChild(logout)

}

function insertFastestScore() {
    fetch('http://localhost:3000/games')
    .then((res) => {
        console.log(res)
        return res.json()})
    .then(games => {
        console.log(games)
        allGames = games;
    })
    
    setTimeout(function(){
        console.log(allGames)
        gameMin = Math.min.apply(Math, allGames.map(game => {return game.score == null ? Infinity : game.score;}))
        let currentUserGames = allGames.filter(game => game.user.username === username)
        userMin = Math.min.apply(Math, currentUserGames.map(game => {return game.score == null ? Infinity : game.score;}))
    },2000)
    setTimeout(function() {
        console.log(gameMin)
        console.log(userMin)
        document.querySelector('.fastest-score').innerHTML = `<h3 class= "px-4 py-2 border-b border-gray-800">All Time Fastest Time: ${gameMin} seconds</h3>`
        document.querySelector('.user-fastest-score').innerHTML = `<h3 class= "px-4 py-2 border-b border-gray-800">${currentUser.username}'s Fastest Time: ${userMin} seconds</h3>`

        
    },4000)
}







init();


// const renderGames = function (games) {
//     console.log(games);

// //     games.forEach(game => {
// //         rootEl.innerHTML += 
// //         <div>
// //             <h2>${game.id}</h2>
// //         </div>
// //     })
// }

// fetch('http://localhost:3000/games')
// .then(res => res.json())
// .then(data => renderGames(data));

