export class Matrix {
  parsedRows: number[][];

  constructor(matrix: string) {
    this.parsedRows = matrix
      .split("\n")
      .map((row) => row.split(" ").map((val) => Number(val)));
  }

  get rows(): number[][] {
    return this.parsedRows;
  }

  get columns(): number[][] {
    return this.parsedRows[0].map((_, i) =>
      this.parsedRows.map((row) => row[i]),
    );
  }
}
