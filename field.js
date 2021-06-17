const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(width = 40, height = 20) {
    this.height = height;
    this.width = width;
    this._field = this.generateField(width, height);
    this.placeGamePieces();
    this.playerCharacter = "@'";
    this.collision = "None";
    // console.log(this.player);
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

  placeGamePieces() {
    const hatPlace = this.somePlace();
    this._field[hatPlace[1]][hatPlace[0]] = hat;
    this.player = this.somePlace();
    this._field[this.player[1]][this.player[0]] = fieldCharacter;

  }
  checkDistance(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
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
    if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
      return "Edge";
    } else {
      const place = this._field[y][x];
      switch (place) {
        case fieldCharacter:
          return "None";
        case hole:
          return "Hole";
        case hat:
          return "Hat";
      }
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
    fieldCopy[this.player[1]][this.player[0]] = this.playerCharacter;
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
