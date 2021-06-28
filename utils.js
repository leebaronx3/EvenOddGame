const players = {};

function setPlayer(name) {
    players[name] = { name: 0, points: 0 }
}

function getPlayer(name) {
    return players[name];
}
function removePlayer(name) {
    delete players[name]
}

function gameSpecialDiceResult() {
    return Math.floor(Math.random() * 18) - 5;
}

function rndIdx(max) {
    return Math.floor(Math.random() * max)
}


function rndPlayersNames() {
    let rndPlayer1 = Object.keys(players)[rndIdx(Object.keys(players).length)];
    if (Object.keys(players).length > 1) {
        let rndPlayer2 = Object.keys(players)[rndIdx(Object.keys(players).length)];

        while (rndPlayer2 === rndPlayer1) {
            rndPlayer2 = Object.keys(players)[rndIdx(Object.keys(players).length)]
        }
        return [rndPlayer1, rndPlayer2];
    }
    return rndPlayer1;
}

function getNumOfPlayers() {
    return Object.keys(players).length;
}


module.exports = { setPlayer, getPlayer, gameSpecialDiceResult, rndPlayersNames, removePlayer, getNumOfPlayers };