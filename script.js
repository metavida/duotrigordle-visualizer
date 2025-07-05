import { renderNewVisualization } from "./visualize.js";

const officialResult = document.getElementById("official-result");
const visualization = document.getElementById("visualization");
const copyButton = document.getElementById("copy-button");

const disableNewVisualization = () => {
  visualization.disabled = true;
  copyButton.disabled = true;
};

const enableNewVisualization = () => {
  visualization.disabled = false;
  copyButton.disabled = false;
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
