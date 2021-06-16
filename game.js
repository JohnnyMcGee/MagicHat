const prompt = require('prompt-sync')({sigint: true});


class Game {
    constructor(field) {
        // fieldMap = Field.generateField(*args);
        // field = Field(fieldMap)
        this.field = field;
        this.listen();
    }

    listen() {
        console.clear();
        this.field.print();
        console.log("Which way? [enter [h] for help]");
        const userInput = prompt(">  ");
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
        // let newField;
        // switch(direction) {
        //     case 'l':
        //         {newField = this.field.moveLeft();}
        //     case 'r':
        //         {newField = this.field.moveRight();}
        //     case 'u':
        //         {newField = this.field.moveUp();}
        //     case 'd':
        //         {newField = this.field.moveDown();}
        // }

        // // if (newField.collision) {
        // //     this.gameOver(newField.collision)
        // // } else {
        // //     this.field = newField;
        // //     this.listen();
        // // }
        console.log("Move ", direction);
    }

    help() {
        console.log("Some Help Stuff Here");
        prompt("Press [Enter] To Continue\t")
    }
}

module.exports.Game = Game;