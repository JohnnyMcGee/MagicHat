const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(width = 40, height = 20) {
    this.height = height;
    this.width = width;
    this._field = this.generateField(width, height);
    // Calculate position of wizard and his hat
    const gamePieces = this.placeGamePieces();
    this.player = gamePieces["player"];
    const hatPiece = gamePieces["hat"];
    // Place hat on the board
    this._field[hatPiece[1]][hatPiece[0]] = hat;
    this.playerCharacter = "@'";
    this.collision = "None";
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

  // Spread the pieces out on the field
  placeGamePieces() {
    const hatPlace = this.somePlace();
    const minDist = (this.width + this.height) * .67
    let player;
    let distance = 0;
    while (distance < minDist) {
      player = this.somePlace();
      distance = Math.abs(player[0] - hatPlace[0]) + Math.abs(player[1] - hatPlace[1]);
    }
    return {"player":player, "hat":hatPlace};
  }

  // generate a matrix of fieldCharacters and holes (and one pesky hat)
  generateField(width, height, difficulty) {
    const rows = [...Array(height)];
    let field = rows.map((_) => {
      const cols = [...Array(width)];
      return cols.map((_) => {
        return Math.random() > 0.1 ? fieldCharacter : hole;
      });
    });
    return field;
  }

  somePlace() {
    const y = Math.floor(Math.random() * this.height);
    const x = Math.floor(Math.random() * this.width);
    return [x, y];
  }

  isCollision(x, y) {
    if (x < -1 || y < 0 || x > this.width - 1 || y > this.height - 1) {
      return "Edge";
    } else {
      const place = [this._field[y][x], this._field[y][x+1]];
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
      case "left":
        this.playerCharacter = "`@"
        this.x = --x;
        break;
      case "right":
        this.playerCharacter = "@,"
        this.x = ++x;
        break;
      case "up":
        this.playerCharacter = "@'"
        this.y = --y;
        break;
      case "down":
        this.playerCharacter = ",@"
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
  field.print();
}
