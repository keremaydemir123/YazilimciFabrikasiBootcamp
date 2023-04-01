const operationGameButton = document.getElementById("operation-game-button");
const wordGameButton = document.getElementById("word-game-button");

const operationGameNumbers = document.getElementById("operation-game-numbers");
const operationGameOperators = document.getElementById(
  "operation-game-operators"
);
const operationGameAnswer = document.getElementById("operation-game-answer");
const operationGameAnswerButtons = document.getElementById(
  "operation-game-buttons"
);

const wordGameLetters = document.getElementById("word-game-letters");
const wordGameWordInput = document.getElementById("word-game-word-input");
const wordGameAnswerButtons = document.getElementById("word-game-buttons");

const gameBoard = document.getElementById("game-board");
const operators = document.getElementById("operators");
const answer = document.getElementById("answer");
const answerButtons = document.getElementById("answer-buttons");

const GAME_MODES = {
  OPERATION: "operation",
  WORD: "word",
};

let GAME_MODE;
let isTurnForNumber = true;
let evalStringArray = [];

// Game values
let operationGameValues = {
  result: 0,
  isAllSelected: false,
  numbers: [],
  operations: [],
};

let wordGameValues = {
  letters: [],
};

operationGameButton.addEventListener("click", function () {
  removeParentFromDisplay(this);
  GAME_MODE = GAME_MODES.OPERATION;
  startGame();
});

wordGameButton.addEventListener("click", function () {
  removeParentFromDisplay(this);
  GAME_MODE = GAME_MODES.WORD;
  startGame();
});

function startGame() {
  isTurnForNumber = true;
  if (document.querySelector(".success")) {
    document.querySelector(".success").remove();
  }
  if (document.querySelector(".fail")) {
    document.querySelector(".fail").remove();
  }

  startCountdown();
  showAnswerButtons();

  document.getElementById("game-select").style.display = "none";

  if (GAME_MODE === GAME_MODES.OPERATION) {
    // Start operation game
    const { numbers, result, operations } = generateNumbersAndResult();
    operationGameValues.result = result;
    operationGameValues.numbers = [...numbers];
    operationGameValues.operations = operations;
    const shuffledNumbers = shuffleArray(numbers);
    showNumbersOnScreen(shuffledNumbers, result);
    showAnswerOperators();
    showAnswerInput();
  } else if (GAME_MODE === GAME_MODES.WORD) {
    // Start word game
    generateLetters();
    generateWordInput();
  }
}

function removeParentFromDisplay(element) {
  element.parentElement.style.display = "none";
}

function generateNumbersAndResult() {
  let numbers;
  let operations;
  let result;
  while (result % 1 !== 0) {
    numbers = generateSixRandomNumbers();
    operations = generateRandomOperations();
    result = calculateResult(numbers, operations);
  }
  return { numbers, result, operations };
}

function generateSixRandomNumbers() {
  const numbers = [];
  for (let i = 0; i < 6; i++) {
    numbers.push(Math.floor(Math.random() * 10) + 1);
  }
  return numbers;
}

function generateRandomOperations() {
  const operators = ["+", "-", "*", "/"];
  const operations = [];
  for (let i = 0; i < 5; i++) {
    operations.push(operators[Math.floor(Math.random() * 4)]);
  }
  return operations;
}

function calculateResult(numbers, operations) {
  let result = numbers[0];
  for (let i = 0; i < operations.length; i++) {
    switch (operations[i]) {
      case "+":
        result += numbers[i + 1];
        break;
      case "-":
        result -= numbers[i + 1];
        break;
      case "*":
        result *= numbers[i + 1];
        break;
      case "/":
        result /= numbers[i + 1];
        break;
    }
  }
  return result;
}

function showNumbersOnScreen(numbers, result) {
  const temp = operationGameNumbers.content.cloneNode(true);
  for (let i = 0; i < temp.children.length - 1; i++) {
    temp.children[i].innerText = numbers[i];
    temp.children[i].addEventListener("click", function () {
      if (isTurnForNumber) {
        let clone = this.cloneNode(true);
        answer.querySelector(".operation-answer").appendChild(clone);
        this.classList.add("selected");
        clone.classList.add("selected");
        evalStringArray.push(this.innerText);
        isTurnForNumber = false;
        operationGameValues.isAllSelected = checkIsAllSelected();
        if (checkIsAllSelected()) {
          answerButtons.querySelector("#check").classList.remove("disabled");
          answerButtons.querySelector("#check").removeAttribute("disabled");
        } else {
          answerButtons.querySelector("#check").classList.add("disabled");
          answerButtons
            .querySelector("#check")
            .setAttribute("disabled", "true");
        }
      }
    });
  }
  temp.children[6].innerText = result;

  gameBoard.style.display = "flex";
  gameBoard.appendChild(temp);
}

function startCountdown() {
  const countdown = document.getElementById("countdown");
  let count = 60;

  const countdownTimer = setInterval(function () {
    count--;
    countdown.innerText = count;

    if (count === 0) {
      clearInterval(countdownTimer);
      countdown.style.fontSize = "1.2rem";
      countdown.innerHTML = "Time's up!";
      endGame();
    }
  }, 1000);
}

function endGame() {
  if (GAME_MODE === GAME_MODES.OPERATION) {
    if (operationGameValues.isAllSelected) {
      const evalString = evalStringArray.join("");
      if (eval(evalString) === operationGameValues.result) {
        success("Correct!");
      } else {
        fail("Try again!");
      }
    } else {
      fail("Time's up!");
    }
  } else if (GAME_MODE === GAME_MODES.WORD) {
    fail("Time's up!");
  }

  setTimeout(function () {
    window.location.reload();
  }, 5000);
}

function showAnswerOperators() {
  const temp = operationGameOperators.content.cloneNode(true);
  for (let i = 0; i < temp.children.length; i++) {
    temp.children[i].addEventListener("click", function () {
      if (!isTurnForNumber && !checkIsAllSelected()) {
        answer
          .querySelector(".operation-answer")
          .appendChild(this.cloneNode(true));
        evalStringArray.push(this.innerText);
        isTurnForNumber = true;
      }
    });
  }
  operators.style.display = "flex";
  operators.appendChild(temp);
}

function showAnswerInput() {
  const div = operationGameAnswer.content
    .cloneNode(true)
    .querySelector(".operation-answer");
  answer.style.display = "flex";
  answer.appendChild(div);
}

function shuffleArray(array) {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray;
}

function showAnswerButtons() {
  let wrapper;
  if (GAME_MODE === GAME_MODES.OPERATION) {
    wrapper = operationGameAnswerButtons.content
      .cloneNode(true)
      .querySelector(".buttons-wrapper");
    answerButtons.style.display = "flex";
  } else if (GAME_MODE === GAME_MODES.WORD) {
    wrapper = wordGameAnswerButtons.content
      .cloneNode(true)
      .querySelector(".buttons-wrapper");
    answerButtons.style.display = "flex";
  }

  for (let i = 0; i < wrapper.children.length; i++) {
    wrapper.children[i].addEventListener("click", function () {
      if (this.innerText === "HOME") {
        window.location.reload();
        return;
      }
      if (this.innerText === "CHECK") {
        // Check numbers div, if every number is selected then check answer
        checkAnswer();
      } else if (this.innerText === "CLEAR") {
        // Delete last element
        answerButtons.querySelector("#check").classList.add("disabled");
        answerButtons.querySelector("#check").setAttribute("disabled", "true");
        clearAnswer();
      } else if (this.innerText === "RESTART") {
        // Restart all elements
        restartGame();
      }
    });
  }

  answerButtons.appendChild(wrapper);
}

function checkAnswer() {
  const evalStr = evalStringArray.join("");
  const result = eval(evalStr);
  if (document.querySelector(".success")) {
    document.querySelector(".success").remove();
  }
  if (document.querySelector(".fail")) {
    document.querySelector(".fail").remove();
  }
  if (result === operationGameValues.result) {
    success("Correct answer");
  } else {
    fail("Wrong answer");
    showCorrectAnswer();
  }
}

function clearAnswer() {
  const selectedButtons = document.querySelectorAll(".selected");
  selectedButtons.forEach((button) => button.classList.remove("selected"));
  answer.querySelector(".operation-answer").innerHTML = "";
  document.getElementById("result").classList.add("selected");
  if (document.querySelector(".success")) {
    document.querySelector(".success").remove();
  }
  if (document.querySelector(".fail")) {
    document.querySelector(".fail").remove();
  }
  isTurnForNumber = true;
}

function restartGame() {
  clearContainers();
  startGame();
}

function warn(message) {
  if (document.querySelector(".warn")) {
    document.querySelector(".warn").remove();
  }

  const warn = document.createElement("div");
  warn.classList.add("warn");
  warn.innerText = message;
  document.body.appendChild(warn);
  setTimeout(() => {
    warn.remove();
  }, 2000);
}

function success(message) {
  if (document.querySelector(".success")) {
    document.querySelector(".success").remove();
  }
  if (document.querySelector(".fail")) {
    document.querySelector(".fail").remove();
  }
  const success = document.createElement("div");
  success.innerText = message;
  success.classList.add("success");
  success.classList.add("container");
  document.body.appendChild(success);
}

function fail(message) {
  if (document.querySelector(".success")) {
    document.querySelector(".success").remove();
  }
  if (document.querySelector(".fail")) {
    document.querySelector(".fail").remove();
  }

  const fail = document.createElement("div");
  fail.classList.add("fail");
  fail.classList.add("container");
  fail.innerHTML = message;
  document.body.appendChild(fail);
}

function showGameRules() {
  if (GAME_MODE === GAME_MODES.OPERATION) {
    const rules = operationGameRules.content.cloneNode(true);
    document.body.appendChild(rules);
  } else if (GAME_MODE === GAME_MODES.WORD) {
    const rules = wordGameRules.content.cloneNode(true);
    document.body.appendChild(rules);
  }
}

function showCorrectAnswer() {
  const correctAnswer = document.createElement("div");
  const h5 = document.createElement("h5");
  h5.innerText = "Correct answer:";
  correctAnswer.classList.add("correct-answer");
  let k = 0;
  for (let i = 0; i < 11; i++) {
    const circle = document.createElement("div");
    circle.classList.add("number");
    if (i % 2 === 0) {
      circle.innerText = operationGameValues.numbers[k];
    } else {
      circle.innerText = operationGameValues.operations[k];
      k += 1;
    }
    correctAnswer.appendChild(circle);
  }

  document.querySelector(".fail").appendChild(h5);
  document.querySelector(".fail").appendChild(correctAnswer);
}

function checkIsAllSelected() {
  const numbersArray = Array.from(gameBoard.querySelectorAll(".number"));
  const isAllSelected = numbersArray.every((number) =>
    number.classList.contains("selected")
  );
  return isAllSelected;
}

function clearContainers() {
  document.querySelectorAll(".container").forEach((container) => {
    container.innerHTML = "";
  });

  if (document.querySelector(".success")) {
    document.querySelector(".success").remove();
  }
  if (document.querySelector(".fail")) {
    document.querySelector(".fail").remove();
  }
}

// WORD GAME

function generateLetters() {
  const length = 10;
  let result = "";
  let characters = "abcçdefghıijklmnoöprsştuüvyz";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const arr = result.split("");
  wordGameValues.letters = [...arr];

  const temp = wordGameLetters.content.cloneNode(true);
  for (let i = 0; i < temp.children.length; i++) {
    temp.children[i].innerText = arr[i];
  }
  gameBoard.style.display = "flex";
  gameBoard.appendChild(temp);
}

function generateWordInput() {
  const temp = wordGameWordInput.content.cloneNode(true);
  const input = temp.querySelector("input");
  input.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      if (isValidWord(this.value)) {
        searchWord(this.value);
      }
    }
  });
  answer.style.display = "flex";
  answer.appendChild(input);
}

function isValidWord(word) {
  let isValid = true;
  if (word.length < 3) {
    warn("Kelime 3 harften az olamaz");
    isValid = false;
  }
  if (word.length > 8) {
    warn("Kelime 8 harften fazla olamaz");
    isValid = false;
  }

  const letters = wordGameValues.letters;

  document.querySelectorAll(".letter").forEach((letter) => {
    letter.classList.remove("selected");
  });

  for (let i = 0; i < word.length; i++) {
    if (!letters.includes(word[i])) {
      isValid = false;
    }
    if (letters.includes(word[i])) {
      document.querySelectorAll(".letter").forEach((letter) => {
        if (letter.innerText === word[i]) {
          letter.classList.add("selected");
        }
      });
    }
  }

  if (!isValid) {
    warn("Kelime geçersiz");
  }

  return isValid;
}

async function searchWord(word) {
  const response = await fetch("https://sozluk.gov.tr/yazim?ara=" + word);
  let data = await response.json();
  if (!data.error) {
    success("Kelime geçerli");
  } else {
    fail("Kelime geçersiz");
  }
}
