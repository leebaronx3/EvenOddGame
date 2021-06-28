const utils = require('./utils')

function gameRound(player1, player2, numOfRounds) {
    let currentRound = 1;
    const requiredPointsToWin = Math.ceil(numOfRounds / 2);

    while (player1.points < requiredPointsToWin && player2.points < requiredPointsToWin && currentRound < numOfRounds + 1) {
        let rndNum = utils.gameSpecialDiceResult();

        //player 1 wins round
        if (rndNum % 2 === 0) {
            if (player2.name === 'Boss') {
                if (rndNum > 0) {
                    player1.points++;
                    console.log(`Round #${currentRound}, random number is ${rndNum}, ${player1.name} scored!`)
                } else {
                    console.log(`Repeating Round #${currentRound}`)
                }
            } else {
                player1.points++;
                console.log(`Round #${currentRound}, random number is ${rndNum}, ${player1.name} scored!`)
            }

            //player 2 wins round
        } else {
            player2.points++;
            console.log(`Round #${currentRound}, random number is ${rndNum}, ${player2.name} scored!`)
        }
        console.log(`Status: ${player1.name} ${player1.points}, ${player2.name} ${player2.points}`)
        if (player2.name !== 'Boss' || rndNum > 0 || rndNum % 2 !== 0) {
            currentRound++;
        }
    }
    if (player1.points > player2.points) {
        console.log(`${player1.name} wins!`)
        player1.points = 0;
        if (player2.name !== 'Boss') {
            utils.removePlayer(player2.name)
        }
    } else {
        console.log(`${player2.name} wins!`);
        player2.points = 0;
        utils.removePlayer(player1.name)
    }
}

module.exports = gameRound;