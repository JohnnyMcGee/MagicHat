const { Field } = require('./field');

const prompt = require('prompt-sync')({sigint: true});


class Game {
    constructor() {
        this.field = new Field(40, 20);
        this.help();
        this.listen();
    }

    listen() {
        console.clear();
        console.log("Help Old WizzenBeard Find His Magic Hat");
        console.log("----------------------------------------");
        this.field.print();
        console.log("Which way? [enter [h] for help]");
        const userInput = prompt("> ");
        this.mapUserInputToState(userInput);
    }

    mapUserInputToState(userInput) {
        if (userInput === 'x') {
            return
        } else if (userInput === 'h') {
            this.help();
            this.listen();
        } else if (['l','r','u','d'].includes(userInput)) {
            this.move(userInput);
        }
    }

    move(userInput) {
        const directions = {"l":"left", "r":"right", "u":"up", "d":"down"};
        this.field.move_player(directions[userInput]);
        if (this.field.collision == "None") {
            this.listen();
        } else {
            this.gameOver(this.field.collision);
        }
    }

    help() {
        console.log(`


        HELP
        ----------------------------------------
        WizzenBeard, that forgetful old wizard,
        has lost his magic hat. Or perhaps it wandered off?
        It does seem to have a mind of its own at times...

        Help him find it by telling him which way to go.
        Don't let him fall into a dark hole or wander of the edge of the map.
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


        `);
        prompt("Press [Enter] To Continue\n> ")
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
            playAgain = prompt("Play Again? [Y | N]\n> ");
            playAgain = playAgain.toLowerCase();
            if (playAgain == 'y') {
                this.field = new Field();
                this.listen();
            } else if (playAgain == 'n') {
                return
            }
        }
    }
}

module.exports.Game = Game;

if (require.main === module) {
    new Game();
}