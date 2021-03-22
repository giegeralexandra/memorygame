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

// window.addEventListener('DOMContentLoaded', (e) => {
//     const username = prompt("Please enter username")
//     while (username === null || username === ""){
//         username = prompt("Please enter username"
//     }
// })

const init = () => {
    // getUsers();
    bindUserFormEventListener();
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
        currentGame = game
        lastGame = game
    })
    setTimeout(() => {
        finalScore.className = 'px-4 py-2 border-b border-gray-800'
        finalScore.innerHTML = `Final Score: ${currentGame.score} seconds`},1500)
   startOver();
   //have something flash and same game over!!
}

function startOver(){
    window.alert(`Game Over! Final Score: ${currentGame.score}`)
    setTimeout(function() {
        cards.forEach(card => {card.className = "memory-card"});
    },1500)
    setTimeout(function(){
        createGame();
    },1500)
}

let createGame = () => {
    //CREATE a new game and assign to current user
    
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
    insertHighestScore();
    }, 1500)
    let logout = document.createElement('a')
    logout.href= "javascript:location.reload(true)"
    logout.className = 'px-4 py-2 border-gray-800'
    logout.innerHTML = "Logout"
    document.querySelector('.nav-list').appendChild(logout)

}

function insertHighestScore() {
    // document.querySelector('.highest-score').innerHTML = `<h3>Game All Time Highest Score: ${Game.highest_score}</h3>`
    //all time highest score 
    fetch('http://localhost:3000/games')
    .then((res) => {
        console.log(res)
        return res.json()})
    .then(games => {
        console.log(games)
        allGames = games;
    })
    setTimeout(function() {
        let min = Math.min.apply(Math, allGames.map(game => {return game.score == null ? Infinity : game.score;}))
        let currentUserGames = allGames.filter(game => game.user.username === username)
        let userMin = Math.min.apply(Math, currentUserGames.map(game => {return game.score == null ? Infinity : game.score;}))
        document.querySelector('.highest-score').innerHTML = `<h3 class= "px-4 py-2 border-b border-gray-800">Game All Time Highest Score: ${min}</h3>`
        document.querySelector('.user-highest-score').innerHTML = `<h3 class= "px-4 py-2 border-b border-gray-800">${currentUser.username}'s Highest Score: ${userMin}</h3>`

        
    },1500)
}



function submitUser(data){
    fetch('http://localhost:3000/users', {
        method: "POST", 
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({user: data}),
    }).then((res) => {
        console.log(res);
        console.log('fetch worked');
        isLocked = false;
        signedIn = true;
        createGame();
    })
    setTimeout(function(){ 
        logoutDisplay();  
    },2000)
}

function bindUserFormEventListener() {
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        username = document.getElementById('username').value;
        console.log(username);
        let data = {
            username, 
        };
        submitUser(data);
    })
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

