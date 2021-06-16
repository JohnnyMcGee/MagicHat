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

    move(direction) {
        console.log("Move ", direction);
    }

    help() {
        console.log("Some Help Stuff Here");
        prompt("Press [Enter] To Continue\t")
    }
}

module.exports.Game = Game;