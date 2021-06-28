const utils = require('./utils')
const gameRound = require('./game')

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

////* PHASE 1 *////
function evenOddPhase1() {
    const player1 = { name: '', points: 0 };
    const player2 = { name: '', points: 0 };

    //names from user
    rl.question("Player 1 Name? ", function (player1Name) {
        player1.name = player1Name;
        rl.question("Player 2 Name? ", function (player2Name) {
            player2.name = player2Name;

            //game
            gameRound(player1, player2, 5)
            rl.close();
        });
    });
}
// evenOddPhase1();

rl.on("close", function () {
    process.exit(0);
});



////* PHASE 2 *////
function runTourment() {
    function askUser(askedQ) {
        rl.question(askedQ, (answer) => {
            if ((answer === 'done' && utils.getNumOfPlayers() > 1) || utils.getNumOfPlayers() === 7) {
                console.log('closed')
                rl.close();
            } else {
                if (answer !== 'done') {
                    utils.setPlayer(answer)
                }
                askUser(askedQ);
            }
        })

        rl.on("close", function () {
            console.log('after closed')
            while (utils.getNumOfPlayers() !== 1) {
                randomPlayers = utils.rndPlayersNames();
                gameRound(utils.getPlayer(randomPlayers[0]), utils.getPlayer(randomPlayers[1]), 5)
            }
            gameRound(getPlayer(utils.rndPlayersNames()), { name: 'Boss', points: 0 }, 5)

            process.exit(0);
        });
    }
    askUser('Enter players names, when done enter \'done\'');
}

runTourment();
