const Game = require('./game.js').Game;
const Field = require ('./field.js').Field;







map = Field.generateField();
field = new Field(map);
new Game(field);