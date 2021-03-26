const userSubmit = document.getElementById('user-enter')
const cards = document.querySelectorAll('.memory-card')
const finalScore = document.querySelector('.final-score')
const usersUrl = 'http://localhost:3000/users';
const gamesUrl = 'http://localhost:3000/games';
const memoryGame = document.querySelector('.memory-game');
const userForm = document.querySelector('.user-form')
const welcomeUser = document.querySelector('.welcome-user');
let currentUser;
let username;
let signedIn = false; 
let frozen = false;
let firstCard; 
let secondCard; 
let flipped = false; 
let score = 0;
let currentGame; 
let gameMin;
let userMin;
let allGames;
let currentUserGames;




const init = () => {
    User.userFormEventListener();
}


class User {

    constructor(username, id, games){
        this.username = username
        this.id = id 
        this.games = games 
    }

    static getUsers() {
        fetch(usersUrl)
        .then(res => res.json())
        .then(users => {
            allUsers = users;
            return users;
        })
    }

    static userFormEventListener() {
        userSubmit.addEventListener('submit', function(e) {
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
        }).then(user => {
            User.assignUser(user);
            // console.log('user fetch worked'),
        })
        logoutNavBarDisplay();
        frozen = false,
        signedIn = true,
        Game.startGame()
        
    }

    static assignUser(user){
        currentUser = new User(user.username, user.id, user.games)
    }
    
}

class Game {

    constructor(id, startTime, userId, score){
        this.id = id, 
        this.startTime = startTime, 
        this.userId = userId,
        this.score = null
    }

    static getGames(){
        fetch(gamesUrl)
        .then((res) => {
            return res.json()})
        .then(games => {
            allGames = games;
        })
    }


    static startGame() {
        // this.shuffleCards();
        Game.insertFastestScores();
        setTimeout(function() {
        welcomeNavBarDisplay();
        Game.createGame();
        Game.activateCardsListener();}, 200)
    }

    static createGame(){
        let gameData = {
            user_id: currentUser.id,
        };
        fetch(gamesUrl, {
            method: "POST", 
            headers: {
                Accept: "application/json", 
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({game: gameData}),
        }).then((res) => {
            return res.json();
        }).then(game => {
            Game.setCurrentGame(game);
        })
    }

    static shuffleCards() {
        console.log('shufflecards')
        var frag = document.createDocumentFragment();
        cards.forEach( card => {
            frag.appendChild(cards[Math.floor(Math.random() * 18)])
        })
        memoryGame.appendChild(frag);
    }

    static setCurrentGame(game){
        currentGame = new Game(game.id, game.start_time, game.user_id)

    }

    static activateCardsListener() {
        cards.forEach(card => card.addEventListener('click', Game.flipCard.bind(card)));
    }

    static flipCard() {
        if (!signedIn){return;} //dont give flip card access if not signed in
        if (frozen){return}; //give flip card access if frozen 
        this.classList.toggle('flip')
        //check to see if a card is flipped, if flipped assign it to this 
        if (!flipped){
            flipped = true; 
            firstCard = this;
        } else {
            if(this===firstCard){return;}//to prevent double clicking first card
            flipped = false;
            secondCard = this;
            //if two cards are flipped, check to see if they match
            Game.checkForMatch();
            Game.checkForGameOver();
        }


    }

    static checkForMatch(){
        if (firstCard.innerHTML.slice(-19) === secondCard.innerHTML.slice(-19)){
            firstCard.removeEventListener('click', Game.flipCard.bind(firstCard));
            secondCard.removeEventListener('click', Game.flipCard.bind(secondCard));
        } else {
            frozen = true;
            setTimeout(function() {
            firstCard.className = "memory-card";
            secondCard.className = "memory-card";
            frozen = false; 
            }, 2000)
        }
    }

    static checkForGameOver(){
        let cardsLeft = 0; 
        cards.forEach(card=>{
            if (card.className === "memory-card"){
                cardsLeft +=1;
            }
        })
        if (cardsLeft === 0) {
            Game.endGame();
        }
    }

    static endGame(){
        console.log('gameover')
        this.updateScore();
        setTimeout( () => {
            window.alert(`Game Over! Final Time: ${currentGame.score} seconds`)
            this.finalScoreNavBarDisplay();
            Game.insertFastestScores();
            }, 2000)
        setTimeout( ()=> {
            Game.startOver()}, 6000)
    }

    static updateScore(){
        let newData = {
            end_time: new Date(),
        }
        fetch(`http://localhost:3000/games/${currentGame.id}`, {
            method: "PATCH", 
            headers: {
                Accept: "application/json", 
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({game: newData}),
        }).then((res) => {
            return res.json();
        }).then(game => {
            // console.log(game),
            currentGame.score = game.score
        })
    }

    static finalScoreNavBarDisplay(){
        finalScore.innerHTML = `Final Time: ${currentGame.score} seconds`,
        finalScore.className = 'px-4 py-2 border-b border-gray-800'
    }
        
    static insertFastestScores() {
        Game.getGames();
        setTimeout(function(){
            Game.fastestGame();
            Game.userFastestGame()
        }, 300)
        setTimeout(function() {
            console.log(userMin)
            document.querySelector('.fastest-score').innerHTML = `<h3 class= "px-4 py-2 border-b border-gray-800">All Time Fastest Time: ${gameMin} seconds</h3>`
            document.querySelector('.user-fastest-score').innerHTML = `<h3 class= "px-4 py-2 border-b border-gray-800">${currentUser.username}'s Fastest Time: ${userMin} seconds</h3>`
        },600)
    }

    static fastestGame(){
        gameMin = Math.min.apply(Math, allGames.map(game => {return game.score == null ? Infinity : game.score;}))
    }

    static userFastestGame(){
        currentUserGames = allGames.filter(game => game.user.username === username)
        userMin = Math.min.apply(Math, currentUserGames.map(game => {return game.score == null ? Infinity : game.score;}))
    }

    static startOver(){
        console.log('made it to start over')
        // setTimeout(function() {
            cards.forEach(card => {card.className = "memory-card"});
        // },1500)
        // setTimeout(function(){
            Game.createGame();
        // },1500)
    }
}

function logoutNavBarDisplay() {
    userForm.hidden = true;
    let logout = document.createElement('a')
    logout.href= "javascript:location.reload(true)"
    logout.className = 'px-4 py-2 border-gray-800'
    logout.innerHTML = "Logout"
    document.querySelector('.nav-list').appendChild(logout)
}

function welcomeNavBarDisplay(){
    welcomeUser.innerHTML = `<h3 class= "px-4 py-2 border-b border-gray-800">Welcome ${currentUser.username}</h3>`
}

init();
