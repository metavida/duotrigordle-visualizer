// Given a 2-digit UTF-8 emoji number like "2️⃣7️⃣", return the number "27"
const convertEmojiNumberToNumber = (emojiNumber: string): number => {
  const numberString = emojiNumber
    .split("")
    .filter((char) => Number.isInteger(parseInt(char, 10)))
    .join("");
  return parseInt(numberString, 10);
};

class Visualize {
  private header: string[];
  private footer: string[];
  private guesses: number[];
  private isValid: boolean;

  constructor() {
    this.header = [];
    this.footer = [];
    this.guesses = [];
    this.isValid = false;
  }

  // Initialize the Visualize object given
  // the original Duotrigordle share visualization.
  initOrigVisualization(value: string): void {
    const lines = value.split("\n");

    this.header = lines.slice(0, 2);
    this.footer = lines.slice(10);
    // the answer grid is lines 3 - 10
    const grid = lines.slice(2, 10).join(" ");

    if (
      this.header.length !== 2 ||
      !this.header[1].match(/^Guesses/) ||
      grid.length < 10
    ) {
      this.isValid = false;
      this.guesses = [];
      return;
    }

    // Get our sorted list of integers (guesses)
    this.guesses = grid.split(" ").map(convertEmojiNumberToNumber);

    this.isValid = true;
  }

  renderNewVisualization(): string {
    if (!this.isValid || this.guesses.length === 0) {
      return "";
    }

    // Generate an array of emoji results
    const results: string[] = [];
    let currentGuess = 0;
    let numWrongGuesses = 0;

    this.guesses
      .sort((a, b) => a - b)
      .forEach((nextCorrectGuess) => {
        currentGuess++;

        // If the next correct guess is greater than the current guess
        // we need to fill in the missing numbers
        while (currentGuess < nextCorrectGuess) {
          currentGuess++;
          numWrongGuesses++;
          results.push(numWrongGuesses > 5 ? "🟥" : "🟨");
        }

        // Now we can add the correct guess
        results.push("🟩");
      });

    // Join the results into a string with a line break after every 8 characters
    let numLineBreaks = Math.floor(results.length / 8.0);
    while (numLineBreaks > 0) {
      // Add a line break after every 8 results
      // starting with the "end" of the results
      // so that it doesn't throw off the index count.
      results.splice(numLineBreaks * 8, 0, "\n");
      numLineBreaks--;
    }

    return [...this.header, results.join(""), ...this.footer].join("\n");
  }
}

export { Visualize };
