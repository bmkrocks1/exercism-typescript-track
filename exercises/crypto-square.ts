export class Crypto {
  constructor(private plainText: string) {}

  get ciphertext(): string {
    if (!this.plainText) {
      return '';
    }

    const normalized = Crypto.normalize(this.plainText);
    const [r, c] = Crypto.calculateDimension(normalized.length);
    const rect: string[][] = [];

    for (let i = 0; i < r; i++) {
      const start = i * c;
      const end = c * (i + 1);

      rect[i] = normalized.substring(start, end).padEnd(c, ' ').split('');
    }

    const output: string[] = [];

    for (let i = 0; i < c; i++) {
      const temp = [];

      for (let j = 0; j < r; j++) {
        temp.push(rect[j][i]);
      }

      output[i] = temp.join('');
    }

    return output.join(' ');
  }

  public static normalize(str: string): string {
    return str
      .replace(/[^\w\s]|_/g, '') // Removes punctuations
      .replace(/\s+/g, '') // Removes spaces
      .toLowerCase();
  }

  // Example:
  // len = 54
  // output = [r, c] = [7, 8]
  // c >= r and c - r <= 1
  public static calculateDimension(len: number): [number, number] {
    let [r, c] = [1, 1];

    // get equal factors
    while (r * c < len) {
      r++;
      c++;
    }

    if (r * c === len) {
      return [r, c];
    }

    while (--r * c >= len) {}

    return [r + 1, c];
  }
}
