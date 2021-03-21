//make a fetch request to get the data from our server
const rootEl = document.getElementById('root')
const userForm = document.getElementById('user-enter')
const cards = document.querySelectorAll('.memory-card')
let username; 
let signedIn = false; 
let islocked = true;
let isFlipped = false; 
let firstCard; 
let secondCard; 
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
    this.classList.toggle('flip')
    //check to see if a card is flipped, if flipped assign it to this 
    if (!firstCard && this.className === "memory-card flip"){
        firstCard = this;
    } else if ((!secondCard && this.className === "memory-card flip")) {
        console.log(this)
        secondCard = this;
        if ((firstCard.innerHTML.slice(-19)) === (secondCard.innerHTML.slice(-19))){
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            firstCard.className = "memory-card"
            firstCard.className = "memory-card"

        }
    }
    //if two cards are flipped, check to see if they match
    
    //only let two cards be flipped at once 
}

let activateCards = () => {
    cards.forEach(card => card.addEventListener('click', flipCard));
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
    console.log(userForm)
    userForm.hidden = true;
    document.querySelector('.welcome-user').innerHTML = `<h3>Welcome!</h3>`
    let logout = document.createElement('a')
    logout.href= "javascript:location.reload(true)"
    logout.className = 'logout-button'
    logout.innerHTML = "logout"
    document.querySelector('.welcome-user').appendChild(logout)

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
        isLocked = false;
        signedIn = true;
        activateCards();
    })
    logoutDisplay();
}

function bindUserFormEventListener() {
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let username = document.getElementById('username').value;
        console.log(username);
        const data = {
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

