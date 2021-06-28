const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/////////////////////////////////////
// function askUser(askedQ) {
//     rl.question(askedQ, (answer) => {
//         if (answer === 'done') {
//             rl.close();
//         } else {
//             console.log(answer)
//             // askUser(askedQ);
//         }
//         // rl.close();
//     })
//     rl.on("close", function () {
//         console.log('closed')
//         process.exit(0);
//     });
// }


// function returnUserInput(input) {
//     console.log(input)
//     return input;
// }
//////////////////////////////////////////

function evenOddPhase1() {
    const player1 = { name: '', points: 0 };
    const player2 = { name: '', points: 0 };
    let rounds = 1;

    //names from user
    rl.question("Player 1 Name? ", function (player1Name) {
        player1.name = player1Name;
        rl.question("Player 2 Name? ", function (player2Name) {
            player2.name = player2Name;

            //game
            while (player1.points < 3 && player2.points < 3 && rounds < 6) {
                let rndNum = Math.floor(Math.random() * 18) - 5;

                if (rndNum % 2 === 0) { //player 1 wins round
                    player1.points++;
                    console.log(`Round #${rounds}, random number is ${rndNum}, ${player1.name} scored!`)
                } else { //player 2 wins round
                    player2.points++;
                    console.log(`Round #${rounds}, random number is ${rndNum}, ${player2.name} scored!`)
                }
                console.log(`Status: ${player1.name} ${player1.points}, ${player2.name} ${player2.points}`)
                rounds++;
            }
            player1.points > player2.points ? console.log(`${player1.name} wins!`) : console.log(`${player2.name} wins!`);
            rl.close();
        });
    });
}
// evenOddPhase1();
// rl.on("close", function () {
//     process.exit(0);
// });

const players = {};
function tourmentRound() {

    function askUser(askedQ) {
        rl.question(askedQ, (answer) => {
            if ((answer === 'done' && Object.keys(players).length > 1) || Object.keys(players).length === 7) {
                rl.close();
            } else {
                if (answer !== 'done') {
                    players[answer] = { name: answer, points: 0 };
                }
                askUser(askedQ);
            }
        })
        rl.on("close", function () {
            console.log('all players:', players)

            while (Object.keys(players).length !== 1) {
                randomPlayers = rndPlayers();
                game(players[randomPlayers[0]], players[randomPlayers[1]], 5)
            }
            game(players[rndPlayers()], { name: 'Boss', points: 0 }, 5)

            process.exit(0);
        });
    }
    askUser('Enter players names, when done enter \'done\'');

    function rndPlayers() {
        let rndPlayer1 = Object.keys(players)[rndIdx(Object.keys(players).length)];
        if (Object.keys(players).length > 1) {
            let rndPlayer2 = Object.keys(players)[rndIdx(Object.keys(players).length)];

            while (rndPlayer2 === rndPlayer1) {
                rndPlayer2 = Object.keys(players)[rndIdx(Object.keys(players).length)]
            }
            console.log(rndPlayer1, rndPlayer2)
            return [rndPlayer1, rndPlayer2];
        }
        console.log(rndPlayer1)
        return rndPlayer1;
    }
}


function game(player1, player2, numOfRounds) {
    console.log('in game:', player1, player2)

    let currentRound = 1;
    while (player1.points < Math.ceil(numOfRounds / 2) && player2.points < Math.ceil(numOfRounds / 2) && currentRound < numOfRounds + 1) {
        let rndNum = Math.floor(Math.random() * 18) - 5;

        if (rndNum % 2 === 0) { //player 1 wins round
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

        } else { //player 2 wins round
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
            delete players[player2.name]
        }
    } else {
        console.log(`${player2.name} wins!`);
        player2.points = 0;
        delete players[player1.name]
    }
}

function rndIdx(max) {
    return Math.floor(Math.random() * max)
}

function fullTourment() {
    tourmentRound()
}
fullTourment();
