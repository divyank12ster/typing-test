const userInput = document.getElementById("user-input");
const timerElement = document.getElementById("time");
const keyboard = document.getElementById("keyboard");
const resultElement = document.getElementById("result");
const resetButton = document.getElementById("reset");

let timer;
let remainingTime = 60;
let currentText = "";
let correctChars = 0;

function generateRandomText() {
  const words = [
    "the",
    "typing",
    "test",
    "will",
    "have",
    "words",
    "like",
    "education",
    "and",
    "university",
    "and",
    "blitzekrig",
    "petersburg",
  ];
  let text = "";
  while (text.length < 40) {
    text += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return text.trim();
}

currentText = generateRandomText();
userInput.placeholder = currentText;

function updateTimer() {
  remainingTime--;
  if (remainingTime >= 0) {
    timerElement.textContent = `${remainingTime} seconds`;
  } else {
    clearInterval(timer);
    userInput.disabled = true;
    resultElement.textContent = `You typed ${correctChars} characters in 60 seconds.`;
  }
}

function startTypingTest() {
  remainingTime = 60;
  correctChars = 0;
  userInput.disabled = false;
  userInput.value = "";
  currentText = generateRandomText();
  userInput.placeholder = currentText;
  timer = setInterval(updateTimer, 1000);
}

userInput.addEventListener("input", function () {
  const inputText = userInput.value;
  const expectedChar = currentText[0];

  if (inputText === expectedChar) {
    correctChars++;
    currentText = currentText.substring(1);
    userInput.value = "";
    userInput.placeholder = currentText;
    highlightKey(expectedChar);

    if (currentText.length < 40) {
      currentText += " " + generateRandomText();
    }
  } else {
    userInput.value = "";
  }
});

const keyboardLayout = [
  "1234567890",
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
  " "
];

keyboardLayout.forEach(row => {
  const rowDiv = document.createElement("div");
  row.split('').forEach(char => {
    const keyButton = document.createElement("button");
    keyButton.textContent = char;
    keyButton.addEventListener("click", function () {
      userInput.value = char;
      userInput.dispatchEvent(new Event("input"));
      userInput.focus();
    });
    rowDiv.appendChild(keyButton);
  });
  keyboard.appendChild(rowDiv);
});

function highlightKey(char) {
  const keys = document.querySelectorAll("#keyboard button");
  keys.forEach((key) => {
    if (key.textContent.toLowerCase() === char.toLowerCase()) {
      key.style.backgroundColor = "pink";
      setTimeout(() => {
        key.style.backgroundColor = "";
      }, 300);
    }
  });
}

resetButton.addEventListener("click", function () {
  clearInterval(timer);
  resultElement.textContent = "";
  userInput.disabled = false;
  userInput.value = "";
  currentText = generateRandomText();
  userInput.placeholder = currentText;
  startTypingTest();
});

startTypingTest();
