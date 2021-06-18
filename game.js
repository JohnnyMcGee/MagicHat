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


class Game {
    constructor() {
        this.field = new Field();
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
            console.clear();
        } else {
            this.updateGameDisplay();
        }
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
        console.clear();
        this.field.print();
        switch(collision) {
            case "Edge":
                console.log('"Watch out for that...! nevermind."');
                console.log("\nYou fell off the edge!\n");
                break;
            case "Hole":
                console.log('"Wuh, wuh, Whoooooooah!"');
                console.log("\nYou fell in a hole.\n");
                break;
            case "Hat":
                console.log('"Yippee! I\'ve finally found my magic hat!"');
                console.log('"Now, where did I leave those magic car keys...?"');
                console.log("\nCongratulations. You helped Old WizzenBeard find his magic hat.\n");
                break;
        }
        console.log("GAME OVER.")
        let playAgain;
        while (playAgain != 'y' && playAgain != 'n') {
            console.log("\nPlay Again? [Y | N]");
            playAgain = prompt("> ");
            playAgain = playAgain.toLowerCase();
            if (playAgain === 'y') {
                this.field = new Field();
                this.updateGameDisplay();
            } else if (playAgain === 'n') {
                return
            }
        }
    }
}

module.exports.Game = Game;

if (require.main === module) {
    const game = new Game();
}