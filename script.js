const officialResult = document.getElementById("official-result");
const visualization = document.getElementById("visualization");
const copyButton = document.getElementById("copy-button");

const numberMap = {
  "0️⃣": "0",
  "1️⃣": "1",
  "2️⃣": "2",
  "3️⃣": "3",
  "4️⃣": "4",
  "5️⃣": "5",
  "6️⃣": "6",
  "7️⃣": "7",
  "8️⃣": "8",
  "9️⃣": "9",
};

// Given a 2-digit UTF-8 emoji number like "2️⃣7️⃣", return the number "27"
const convertEmojiNumberToString = (emojiNumber) => {
  const numberString = emojiNumber
    .split("")
    .filter((char) => Number.isInteger(parseInt(char, 10)))
    .join("");
  return parseInt(numberString, 10);
};

const disableNewVisualization = () => {
  visualization.disabled = true;
  copyButton.disabled = true;
};

const enableNewVisualization = () => {
  visualization.disabled = false;
  copyButton.disabled = false;
};

const renderNewVisualization = (value) => {
  const lines = value.split("\n");

  const header = lines.slice(0, 2);
  const footer = lines.slice(10);
  // the answer grid is lines 3 - 10
  const grid = lines.slice(2, 10).join(" ");

  console.log({ header, footer, grid: grid.length });
  if (header.length !== 2 || grid.length < 10) {
    return "";
  }

  // Next we'll get our sorted list of integers
  const numbers = grid
    .split(" ")
    .map(convertEmojiNumberToString)
    .sort((a, b) => a - b);

  // Then we'll generate an array of emoji results
  const results = [];
  let currentGuess = 0;
  let numWrongGuesses = 0;
  numbers.forEach((nextCorrectGuess) => {
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

  // Now we'll join the results into a string
  // with a line break after every 8 characters

  let numLineBreaks = Math.floor(results.length / 8.0);
  while (numLineBreaks > 0) {
    // Add a line break after every 8 results
    // starting with the "end" of the results
    // so that it doesn't thow off the index count.
    results.splice(numLineBreaks * 8, 0, "\n");
    numLineBreaks--;
  }

  return [...header, results.join(""), ...footer].join("\n");
};

const populateVisualization = () => {
  const newVisualization = renderNewVisualization(officialResult.value);

  if (!newVisualization) {
    disableNewVisualization();
    visualization.value = "";
    return;
  }

  visualization.value = newVisualization;
  enableNewVisualization();
};

// When the user pastes in their answer, convert it to the new visualization!
officialResult.addEventListener("input", function ({ target }) {
  populateVisualization();
});
populateVisualization();

const copyToClipboard = () => {
  // Copy the value to the clipboard
  navigator.clipboard.writeText(visualization.value).then(
    () => {
      copyButton.textContent = "Copied!";
    },
    (err) => {
      console.error("Failed to copy: ", err);
    }
  );
};

copyButton.addEventListener("click", copyToClipboard);
visualization.addEventListener("focus", copyToClipboard);
