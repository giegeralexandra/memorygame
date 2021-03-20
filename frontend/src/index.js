//make a fetch request to get the data from our server
const rootEl = document.getElementById('root')


const getUsers = () => {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => console.log(data));
}
getUsers()

const renderUsers = function(users) {
    console.log(users);

    // games.forEach(game => {
    //     rootEl.innerHTML += 
    //     <div>
    //         <h2>${game.id}</h2>
    //     </div>
    // })
}

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

