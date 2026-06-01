export class Matrix {
  private matrix: number[][];

  constructor(matrixString: string) {
    this.matrix = matrixString
      .split("\n")
      .map((row) => row.split(" ").map((val) => Number(val)));
  }

  get rows(): number[][] {
    return this.matrix;
  }

  get columns(): number[][] {
    return this.matrix[0].map((_, i) => this.matrix.map((row) => row[i]));
  }
}
