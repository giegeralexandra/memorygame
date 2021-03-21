//make a fetch request to get the data from our server
const rootEl = document.getElementById('root')
const userForm = document.getElementById('user-enter')
const cards = document.querySelectorAll('.memory-card')
let username; 
let currentUser;
let signedIn = false; 
let frozen = false;
let firstCard; 
let secondCard; 
let flipped = false; 
let score = 0;

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

    if (!cards.find(card =>
        card.class === "memory-game flip"
        )){
            endGame();
        }
    // let activateCards = () => {
    //     cards.forEach(card => card.addEventListener('click', flipCard));
    // //TAKES TO FLIP CARDS FUNCTION 
    // }
    //if all are flipped, end game 
    //end game - stop time - calculate seconds and add as score
    //refresh board, start new game but do not make you sign in 
    //if you close tab, game is deleted
}

function endGame(){
    let newData = {
        score: getTime(),
    }
    fetch('http://localhost:3000/games', {
        method: "PATCH", 
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({game: newData}),
    }).then((res) => {
        console.log(res);
        console.log('patch fetch worked');
    })
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
        console.log(res);
        console.log('game fetch worked');
    })
    activateCards();}, 3000)
}


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
    document.querySelector('.welcome-user').innerHTML = `<h3>Welcome ${currentUser.username}</h3>`
    document.querySelector('.user-highest-score').innerHTML = `<h3>${currentUser.username}'s Highest Score: ${currentUser.highest_score}</h3>`
    // insertHighestScore();
    }, 1500)
    let logout = document.createElement('a')
    logout.href= "javascript:location.reload(true)"
    logout.className = 'logout-button'
    logout.innerHTML = "logout"
    document.querySelector('.welcome-user').appendChild(logout)

}

function insertHighestScore() {
    // document.querySelector('.highest-score').innerHTML = `<h3>Game All Time Highest Score: ${Game.highest_score}</h3>`
    //all time highest score 
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

