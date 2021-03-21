//make a fetch request to get the data from our server
const rootEl = document.getElementById('root')
const userForm = document.getElementById('user-enter')
const cards = document.querySelectorAll('.memory-card')
let islocked = true;
// window.addEventListener('DOMContentLoaded', (e) => {
//     const username = prompt("Please enter username")
//     while (username === null || username === ""){
//         username = prompt("Please enter username"
//     }
// })

function flipCard() {
    if(!!islocked){return;}
    this.classList.toggle('flip')
}

let activateCards = () => {
    isLocked = false; 
    cards.forEach(card => card.addEventListener('click', flipCard));
}


const init = () => {
    // getUsers();
    bindUserFormEventListener();
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


function submitUser(data){
    fetch('http://localhost:3000/users', {
        method: "POST", 
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({user: data}),
    }).then((res) => console.log(res));
    isLocked = false; 

}

function bindUserFormEventListener() {
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        // var formData = new FormData(e.target);
        console.log(username);
        const data = {
            username, 
        };
        submitUser(data);
        isLocked = false; 
        activateCards;
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

