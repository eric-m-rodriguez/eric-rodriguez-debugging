const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; /*added +1 to include the max number in the range*/
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value.trim(), 10);

  if (isNaN(guess)) { /*added this loop to check to see if input is invalid*/
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = 'Please enter a valid number between 1 and 99.';
    return; /*added return to stop the function if the input is invalid*/
  }

attempts++; /*corrected increment*/

  hideAllMessages();

  if (guess === targetNumber) {
    correctMessage.style.display = '';
    correctMessage.innerHTML = `You guessed ${guess}. Correct!`; /*updated for clarity and consistency with other messages*/
    submitButton.disabled = true;
    guessInput.disabled = true;
    return; /*added return to stop the function if the guess is correct*/
  }

    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
      tooLowMessage.innerHTML = `You guessed ${guess}. Too low`; /*added a more precise tooLowMessage*/
    } else if (guess > targetNumber) { /*changed "if" to "else if" to make the code more efficient*/
      tooHighMessage.style.display = ''; /*changed tooLowMessage to tooHighMessage*/
      tooHighMessage.innerHTML = `You guessed ${guess}. Too high`; /*added a more precise tooHighMessage*/
    }

  if (attempts === maxNumberOfAttempts) { /*removed one = sign to debug*/
    maxGuessesMessage.style.display = ''; /*added maxGuessesMessage.style.display = ''; to display the message when attempts run out*/
    numberOfGuessesMessage.innerHTML =`You guessed ${guess}. 0 guesses remaining`; /*changed display to display.innerHTML*/
    submitButton.disabled = true;
    guessInput.disabled = true;
    resetButton.style.display = '';
    return; /*added return to stop the function if the max number of attempts is reached*/
  }

  const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. ${remainingAttempts} guesses remaining`;

    guessInput.value = ''; /*added guessInput.value = ''; to clear the input field*/
  }


function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { /*changed <= messages.length to < messages.length*/
    messages[elementIndex].style.display = 'none';
    messages[elementIndex].innerHTML = ''; /*added messages[elementIndex].innerHTML = ''; to clear the messages when they are hidden*/
  }
}

function setup() { /*changed funtion to function*/
  // Get random number

  resetButton.style.display = 'none'; /*changed resetButton.style.display = 'none'; to hide the reset button*/
  hideAllMessages(); /*hide messages and the reset button when script initially runs*/
  targetNumber = getRandomNumber(1, 100);

  // Reset number of attempts
  attempts = 0; /*changed maxNumberofAttempts to attempts; maxNumberofAttempts is already defined as 5 by const*/
  submitButton.disabled = false; /*edited typo from "disabeld" to "disabled"*/
  guessInput.disabled = false;
  
    // Enable the input and submit button
  // Clear the input field //
  guessInput.value = ''; /*added guessInput.value = ''; to clear the input field*/
  console.log(`target number: ${targetNumber}`);
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
