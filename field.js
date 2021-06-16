const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(fieldMap) {
    //
    if (!fieldMap) {
      this.fieldMap = Field.generateField();
    } else {
      this.fieldMap = fieldMap;
    }
    this.player = Field.randomPlace(this.fieldMap);
    // put the player on the field
    this.fieldMap[this.player[1]][this.player[0]] = pathCharacter;
  }

  static randomPlace(fieldMap) {
    // Check the field dimensions
    const height = fieldMap.length;
    if (height===0) {return;}
    const width = fieldMap[0].length;
    if (width === 0) {return;}
    // Pick a random coordinate
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    return [x, y];
  }

  static generateField(width = 20, height = 10, difficulty) {
    // percentage of map covered by holes
    const holePercent = 0.10;
    // generate a grid of fieldCharacters and holes
    const rows = [...Array(height)];
    let fieldMap = rows.map((_) => {
      const cols = [...Array(width)];
      return cols.map((_) => {
        return Math.random() > holePercent ? fieldCharacter : hole;
      });
    });

    // place hat randomly somewhere on the map
    let hat_x;
    let hat_y;
    [hat_x, hat_y] = Field.randomPlace(fieldMap);
    fieldMap[hat_y][hat_x] = hat;
    return fieldMap;
  }

  print() {
    for (const row of this.fieldMap) {
      console.log(row.join(""));
    }
  }

}

module.exports.Field = Field;

if (require.main === module) {
  field = new Field();
  field.print();
}
