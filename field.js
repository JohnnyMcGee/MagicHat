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
    const getTerrain = () => Math.random() > 0.1 ? fieldCharacter : hole;
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
    const player = this.somePlace();
    return this.checkDistanceFromHat(player);
  }

  getMinDistFromHat() {
    // No matter where the hat is,
    // We can always put the player at least this far away:
    return Math.max(this.height, this.width) / 2;
  }

  getDistFromHat(player) {
    // vector subtraction
    const difference = player.map((e, i) => e - this.hat[i]);
    // pythagorean theorem returns the magnitude
    const square = (x) => x ** 2;
    const sum = (x, y) => x + y;
    return Math.sqrt(difference.map(square).reduce(sum));
  }

  checkDistanceFromHat(player) {
    const minDist = this.getMinDistFromHat();
    const distance = this.getDistFromHat(player);

    if (distance >= minDist) {
      return player;
    } else {
      return this.placePlayer();
    }
  }

  get x() {
    return this.player[0];
  }
  get y() {
    return this.player[1];
  }

  set x(newX) {
    const collision = this.isCollision(newX, this.y);
    if (collision === "None") {
      this.player[0] = newX;
    } else {
      this.collision = collision;
    }
  }

  set y(newY) {
    const collision = this.isCollision(this.x, newY);
    if (collision === "None") {
      this.player[1] = newY;
    } else {
      this.collision = collision;
    }
  }

  isCollision(x, y) {
    if (x < -1 || y < 0 || x > this.width - 1 || y > this.height - 1) {
      return "Edge";
    } else {
      const place = [this._field[y][x], this._field[y][x + 1]];
      for (let char of place) {
        switch (char) {
          case hole:
            return "Hole";
          case hat:
            return "Hat";
        }
      }
      return "None";
    }
  }

  move_player(direction) {
    let x = this.x;
    let y = this.y;
    // console.log(x, y);
    switch (direction) {
      case "l":
        this.playerCharacter = "`@";
        this.x = x - 2;
        break;
      case "r":
        this.playerCharacter = "@,";
        this.x = x + 2;
        break;
      case "u":
        this.playerCharacter = "@'";
        this.y = --y;
        break;
      case "d":
        this.playerCharacter = ",@";
        this.y = ++y;
        break;
    }
  }

  print() {
    // Get the field (copy)
    let fieldCopy = this._field.map((r) => r.map((e) => e));
    // Put the player on the field
    fieldCopy[this.player[1]][this.player[0]] = this.playerCharacter[0];
    fieldCopy[this.player[1]][this.player[0] + 1] = this.playerCharacter[1];

    // Print the field in the terminal
    for (const row of fieldCopy) {
      console.log(row.join(""));
    }
  }
}

module.exports.Field = Field;

if (require.main === module) {
  field = new Field();
  // console.log(field._field);
  field.print();
}
