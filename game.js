const { Field } = require('./field');

const prompt = require('prompt-sync')({sigint: true});

const helpMessage = `


HELP
----------------------------------------
WizzenBeard, that forgetful old wizard,
has lost his magic hat. Or perhaps it wandered off?
It does seem to have a mind of its own at times...

Help him find it by telling him which way to go.
Don't let him fall into a dark hole or wander off the edge of the map.
Otherwise I fear the magic of the hat may be lost forever...
----------------------------------------
Controls: (type the key, then press enter)

[l] Move Left
[r] Move Right
[u] Move Up
[d] Move Down
[x] Exit Game
[h] Help

Characters: (as seen on the map)
@' WizzenBeard
^ Wizzenbeard's Missing Hat
O dark hole (full of black magic)

`;

const gameTitle = `
Help Old WizzenBeard Find His Magic Hat
----------------------------------------`;

const gamePromptMessage = "Which way? [enter [h] for help]";

const edgeCollisionMessage = `
Watch out for that...! nevermind.

You fell off the edge!
`;

const holeCollisionMessage = `
"Wuh, wuh, Whoooooooah!"

You fell in a hole.
`;

const hatCollisionMessage = `
"Yippee! I've finally found my magic hat!"
"Now, where did I leave those magic car keys...?"

Congratulations. You helped Old WizzenBeard find his magic hat.
`;

const collisionMessage = {
    "Edge": edgeCollisionMessage,
    "Hole": holeCollisionMessage,
    "Hat": hatCollisionMessage,
};

const gameOverMessage = `
----------------------------------------
GAME OVER.
----------------------------------------

Play Again? [Y | N]
`

const exitGameMessage = `
Thank you for playing Magic Hat.
----------------------------------------

Goodbye!
`

class Game {
    constructor() {
        this.field = new Field();
    }

    play() {
        this.displayHelp();
    }

    displayHelp() {
        console.log(helpMessage);
        prompt("Press [Enter] To Continue\n> ")
        // Return to game screen when user presses enter
        this.updateGameDisplay();
    }

    updateGameDisplay() {
        this.updateFieldDisplay();
        const userInput = this.promptUser();
        this.mapUserInputToState(userInput);
    }

    updateFieldDisplay() {
        console.clear();
        console.log(gameTitle);
        this.field.print();
    }

    promptUser() {
    console.log(gamePromptMessage);
    return prompt("> ");
    }

    mapUserInputToState(userInput) {
        const isMoveCommand = ['l','r','u','d'].includes(userInput);
        const isHelpCommand = userInput === 'h';
        const isExitCommand = userInput === 'x';

        if (isMoveCommand) {
            this.move(userInput);
        } else if (isHelpCommand) {
            this.displayHelp();
        } else if (isExitCommand) {
            this.exitGame();
        } else {
            this.updateGameDisplay();
        }
    }

    exitGame() {
        console.clear();
        console.log(exitGameMessage);
    }

    move(userInput) {
        this.field.move_player(userInput);
        this.checkForCollision();
    }

    checkForCollision() {
        const collision = this.field.collision;

        if (collision === "None") {
            this.updateGameDisplay();
        } else {
            this.gameOver(collision);
        }
    }

    gameOver(collision) {
        this.updateFieldDisplay();
        this.displayCollision(collision);
        this.promptToPlayAgain();
    }

    displayCollision(collision) {
        const message = collisionMessage[collision];
        console.log(message);
        console.log(gameOverMessage)
    }

    promptToPlayAgain() {
        const playAgain = prompt("> ").toLowerCase();
        const yes = playAgain === 'y';
        const no = playAgain === 'n';

        if (yes) {
            this.restartGame();
        } else if (no) {
            this.exitGame();
        } else {
            this.gameOver();
        }
    }

    restartGame() {
        this.field = new Field();
        this.updateGameDisplay();
    }
}

module.exports.Game = Game;

if (require.main === module) {
    const game = new Game();
    game.play();
}