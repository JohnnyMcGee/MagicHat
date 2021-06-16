const prompt = require('prompt-sync')({sigint: true});


class Game {
    constructor(field) {
        this.field = field;
        this.listen();
    }

    listen() {
        // console.clear();
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
        } else if (['l','r','u','d'].includes(userInput)) {
            this.move(userInput);
        }
        this.listen();
    }

    move(userInput) {
        const directions = {"l":"left", "r":"right", "u":"up", "d":"down"};
        console.log("Move ", directions[userInput]);
        this.field.move_player(directions[userInput]);
    }

    help() {
        console.log("Some Help Stuff Here");
        prompt("Press [Enter] To Continue\t")
    }
}

module.exports.Game = Game;