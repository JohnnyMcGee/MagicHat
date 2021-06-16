const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(height=5, width=10) {
    this.height = height;
    this.width = width;
    this._field = this.generateField(width, height);
    this.player = this.somePlace();
    console.log(this.player);
  }

  somePlace() {
    const y = Math.floor(Math.random() * this.height);
    const x = Math.floor(Math.random() * this.width);
    return [x, y];
  }

  // generate a matrix of fieldCharacters and holes (and one pesky hat)
  generateField(width, height, difficulty) {
    const rows = [...Array(height)];
    let field = rows.map((_) => {
      const cols = [...Array(width)];
      return cols.map((_) => {
        return Math.random() > .1 ? fieldCharacter : hole;
      });
    });

    // hat goes randomly somewhere on the map
    let x;
    let y;
    [x, y] = this.somePlace();
    field[y][x] = hat;
    return field;
  }

  print() {
    // Get the field (copy)
    let fieldCopy = this._field.map(r => r.map(e => e));
    // Put the player on the field
    fieldCopy[this.player[1]][this.player[0]] = pathCharacter;
    // Print the field in the terminal
    for (const row of fieldCopy) {
      console.log(row.join(""));
    }
  }

  get x() {return this.player[0];}
  get y() {return this.player[1];}

  set x(newX) {
    const collision = this.isCollision(newX, this.y);
    if (collision === "None") {
      this.player[0] = newX;
    } else {this.collision = collision;}
  }

  set y(newY) {
    const collision = this.isCollision(this.x, newY);
    if (collision === "None") {
      this.player[1] = newY;
    } else {this.collision = collision;}
  }

  move_player(direction) {
    let x = this.x
    let y = this.y
    console.log(x, y);
    switch(direction) {
      case 'left':
        this.x = --x; break;
      case 'right':
        this.x = ++x; break;
      case 'up':
        this.y = --y; break;
      case 'down':
        this.y = ++y; break;
    }
  }

}

module.exports.Field = Field;

if (require.main === module) {
  field = new Field();
  field.print();
}
