const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const btnReset = document.querySelector('.btn__reset');

const phrases = [
  "He shoots he scores",
  "Take a hint",
  "Its a wild ride",
  "Penny for your thoughts",
  "Never give up"
];

let missed = 0;

btnReset.addEventListener('click', () => {
  overlay.style.display = 'none';
});

//gets a random phrase from the array
function getRandomPhraseAsArray (arr) {
  return arr[Math.floor(Math.random() * arr.length)].split('');
};

function addPhraseToDisplay (arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const li = document.createElement('li');
    li.textContent = arr[i];

    if (arr[i] !== ' ') {
      li.classList.add('letter');
    }

    phrase.appendChild(li);
  }
}

const randPhrase = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(randPhrase);

//checks if the letter is in the phrase
function checkLetter(selected) {
  let match = null;

  for (const letter of document.querySelectorAll('.letter')) {
    if (letter.textContent.toLowerCase() === selected) {
      match = selected;
      letter.classList.add('show');
    }
  }

  return match;
}

//checks if the player has won or lost
function checkWin() {
  const letter = document.querySelectorAll('li.letter')
  const show = document.querySelectorAll('li.show')

  if (letter.length === show.length) {
    overlay.classList.add('win');
    overlay.style.display = 'flex';
    overlay.textContent = 'You Won!';

  } else if (missed >= 5) {
    overlay.classList.add('lose');
    overlay.style.display = 'flex';
    overlay.textContent = 'You Lost';
  }
}

keyboard.addEventListener('click', ({ target }) => {
  if (target.tagName === 'BUTTON') {
    target.classList.add('chosen');
    target.disabled = true;
    const letterFound = checkLetter(target.textContent.toLowerCase());

    if (letterFound === null) {
      document.querySelector('.tries').remove();
      missed += 1;
    }

    checkWin();
  }
});
