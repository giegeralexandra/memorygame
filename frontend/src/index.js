//make a fetch request to get the data from our server
const rootEl = docuement.getElementById('root)')

fetch('http://localhost:3000/games')
.then(res => res.json())
.then(data => renderGames(data));

const renderGames = function (games) {
    console.log(games);

//     games.forEach(game => {
//         rootEl.innerHTML += 
//         <div>
//             <h2>${game.id}</h2>
//         </div>
//     })
// }