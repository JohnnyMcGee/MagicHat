const hatCharacter = "^";
const hole = "O";
const fieldCharacter = "░";

class Field {
  constructor(width = 40, height = 20) {
    this.height = height;
    this.width = width;
    this._field = this.generateField();
    this.hat = this.placeHat();
    this.player = this.placePlayer();
  }

  playerCharacter = "@'";
  collision = "None";

  // randomly generate a 2D game map
  generateField() {
    // Randomly return a hole 10% of the time
    const getTerrain = () => (Math.random() > 0.1 ? fieldCharacter : hole);
    // Populate each row on the map with terrain
    const getRow = () => [...Array(this.width)].map(getTerrain);
    // Fill in the field with rows(2D Array)
    return [...Array(this.height)].map(getRow);
  }

  placeHat() {
    const [x, y] = this.somePlace();
    this._field[y][x] = hatCharacter;
    return [x, y];
  }

  somePlace() {
    const y = Math.floor(Math.random() * this.height);
    const x = Math.floor(Math.random() * this.width);
    return [x, y];
  }

  placePlayer() {
    const [x, y] = this.getPlayerPosition();
    this.makeSpaceOnField(x, y);
    return [x, y];
  }

  makeSpaceOnField(x, y) {
    this._field[y][x] = fieldCharacter;
    this._field[y][x+1] = fieldCharacter;
  }

  getPlayerPosition() {
    const player = this.somePlace();
    const minDist = this.getMinDistFromHat();
    const distance = this.getHatDistance(player);

    if (distance >= minDist) {
      return player;
    } else {
      return this.getPlayerPosition();
    }
  }

  getMinDistFromHat() {
    // No matter where the hat is,
    // We can always put the player at least this far away:
    return Math.max(this.height, this.width) / 2;
  }

  getHatDistance(player) {
    // vector subtraction
    const difference = player.map((e, i) => e - this.hat[i]);
    // pythagorean theorem returns the magnitude
    const square = (x) => x ** 2;
    const sum = (x, y) => x + y;
    return Math.sqrt(difference.map(square).reduce(sum));
  }

  movePlayer(direction) {
    let [x, y] = this.player;

    const moves = {
      l: () => (x -= 2) /* move left */,
      r: () => (x += 2) /* move right */,
      u: () => y-- /* move up */,
      d: () => y++ /* move down */,
    };

    moves[direction]();

    this.player = [x, y];
    this.updateCollisionState();
  }

  updateCollisionState() {
    if (this.checkIfOutOfBounds()) {
      this.collision = "Edge";
    } else {
      this.collision = this.getCurrentCollision();
    }
  }

  checkIfOutOfBounds() {
    const [x, y] = this.player;
    if (x < -1 || y < 0 || x > this.width - 1 || y > this.height - 1) {
      return true;
    }
  }

  getCurrentCollision() {
    const [x, y] = this.player;
    // Retrieve the two map characters at the player's current position
    const leftChar = this._field[y][x];
    const rightChar = this._field[y][x + 1];
    // Check for special characters
    const isHat = [leftChar, rightChar].includes(hatCharacter);
    const isHole = [leftChar, rightChar].includes(hole);
    return isHat ? "Hat" : isHole ? "Hole" : "None";
  }

  display() {
    const field = this.copyField();
    this.addPlayerToField(field);
    this.print(field);
  }

  copyField() {
    return this._field.map((row) => row.map((element) => element));
  }

  addPlayerToField(field) {
    const [x, y] = this.player;
    const [leftChar, rightChar] = this.playerCharacter.split('');
    field[y][x] = leftChar;
    field[y][x + 1] = rightChar;
  }

  print(field=this.field) {
    field.forEach(row => console.log(row.join("")));
  }
}

module.exports.Field = Field;

if (require.main === module) {
  field = new Field();
  field.display();
}
