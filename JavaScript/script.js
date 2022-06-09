var wordList = [
"margarida",
"aviao",
"egito",
"dado",
"dinamite",
"cenoura",
"abacaxi",
"espada",
"computador",
"policial",
"bombeiro",
"lenhador",
"garfo",
"esmeralda",
"estacionamento",
"celeiro",
"estatua",
"futebol",
"handebol",
"motocicleta",
"professor",
"caminhao"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = wordList[Math.floor(Math.random() * wordList.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map((letter,i) =>
    `
      <button
        class="buttonPrimary"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button> ${(i+1)%9===0?'<br>':''}

    `
    
    ).join('')
      .concat(`<button class="btnInfo" onClick="reset()">&#10227;</button>`)

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './img/' + mistakes + '.png';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 
    `Você acertou!!! <br> <button class="btnInfo" style="margin-top: 10px; width:150px" onClick="reset()">&#10227;</button>`;
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'A palavra era: ' + answer;
    document.getElementById('keyboard').innerHTML = 
    'Você errou!!! <br> <button class="btnInfo" style="margin-top: 10px; width:150px" onClick="reset()">&#10227;</button>';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes');
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './img/0.png';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong');

function registerWord() {
  let input = document.getElementById('wordInput')
  wordList.push(input.value)
  alert("Palavra cadastrada com sucesso!")
  input.value = '';
}

randomWord();
generateButtons();
guessedWord();