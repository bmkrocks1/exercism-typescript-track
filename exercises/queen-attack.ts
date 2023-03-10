type Position = readonly [number, number];

type Positions = {
  white: Position;
  black: Position;
};

type Piece = 'W' | 'B' | '_';

const BlackQueenStartPos: Position = [0, 3];
const WhiteQueenStartPos: Position = [7, 3];

export class QueenAttack {
  public readonly black: Position;
  public readonly white: Position;

  private board: Piece[][] = [
    new Array(8).fill('_'),
    new Array(8).fill('_'),
    new Array(8).fill('_'),
    new Array(8).fill('_'),
    new Array(8).fill('_'),
    new Array(8).fill('_'),
    new Array(8).fill('_'),
    new Array(8).fill('_'),
  ];

  constructor({
    black = BlackQueenStartPos,
    white = WhiteQueenStartPos,
  }: Partial<Positions> = {}) {
    if (
      !(
        QueenAttack.isValidPosition(black) && QueenAttack.isValidPosition(white)
      )
    ) {
      throw new Error('Queen must be placed on the board');
    }

    if (black[0] === white[0] && black[1] === white[1]) {
      throw new Error('Queens cannot share the same space');
    }

    this.black = black;
    this.board[black[0]][black[1]] = 'B';

    this.white = white;
    this.board[white[0]][white[1]] = 'W';
  }

  public static isValidPosition([row, col]: Position) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  toString(): string {
    const output: string[] = [];
    for (let i = 0; i < 8; i++) {
      output[i] = this.board[i].join(' ');
    }
    return output.join('\n');
  }

  get canAttack() {
    const [blackRow, blackCol] = this.black;
    const [whiteRow, whiteCol] = this.white;

    return (
      blackRow === whiteRow || // the same row
      blackCol === whiteCol || // the same column
      // the same diagonal
      blackRow - blackCol === whiteRow - whiteCol ||
      blackRow + blackCol === whiteRow + whiteCol
    );
  }
}
