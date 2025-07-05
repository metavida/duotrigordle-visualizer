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

const renderNewVisualization = (value) => {
  const lines = value.split("\n");

  const header = lines.slice(0, 2);
  const footer = lines.slice(10);
  // the answer grid is lines 3 - 10
  const grid = lines.slice(2, 10).join(" ");

  // Next we'll get our list of numbers
  const numbers = grid
    .split(" ")
    .map(convertEmojiNumberToString)
    .sort((a, b) => a - b);

  // const grid = value.replace(regexp, "");
  console.log({ numbers });

  // TODO: Generate the hit/miss visualization
  return [...header, numbers.join(" "), ...footer].join("\n");
};

const officialResult = document.getElementById("official-result");
const visualization = document.getElementById("visualization");

const populateVisualization = () => {
  visualization.value = renderNewVisualization(officialResult.value);
};

// When the user pastes in their answer, convert it to the new visualization!
officialResult.addEventListener("input", function ({ target }) {
  populateVisualization();
});

populateVisualization();
