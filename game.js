const { Field } = require("./field");

// Import the text for the game.
const messages = require("./messages.js");
const gameMessage = messages.gameMessage;
const collisionMessage = messages.collisionMessage;

const promptSync = require("prompt-sync")({ sigint: true });
const prompt = (ask = "> ", value, opts) => promptSync(ask, value, opts);

class Game {
  constructor() {
    this.field = new Field();
  }

  play() {
    this.displayHelp();
  }

  displayHelp() {
    console.log(gameMessage["Help"]);
    prompt();
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
    console.log(gameMessage["Title"]);
    this.field.display();
  }

  promptUser() {
    console.log(gameMessage["Prompt"]);
    return prompt();
  }

  mapUserInputToState(userInput) {
    const isMoveCommand = ["l", "r", "u", "d"].includes(userInput);
    const isHelpCommand = userInput === "h";
    const isExitCommand = userInput === "x";

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
    console.log(gameMessage["Exit"]);
  }

  move(userInput) {
    this.field.movePlayer(userInput);
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
    console.log(gameMessage["Game Over"]);
  }

  promptToPlayAgain() {
    const playAgain = prompt().toLowerCase();
    const yes = playAgain === "y";
    const no = playAgain === "n";

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
