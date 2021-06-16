const Game = require('./game.js').Game;
const Field = require ('./field.js').Field;







// map = Field.generateField();
// field = new Field(map);
field = new Field();
new Game(field);