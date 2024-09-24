import { get, writable } from "svelte/store"
import CONSTANTS from "./constants"
import words from "./words"
import { ALERT_TYPES, displayAlert } from "./alert"

export const correctWord = writable<string>()
export const userGuessesArray = writable<string[][]>([])
export const currentWordIndex = writable<number>(0)
export const currentLetterIndex = writable<number>(0)
export const gameState = writable<string>(CONSTANTS.GAME_STATES.PLAYING)
export const letterStatuses = writable<Record<string, string>>({})


const generateRandomWord = async (): Promise<string> => {
  const randomNum = Math.floor(Math.random() * words.words.length)
  console.log(words.words[randomNum].toUpperCase())
  return words.words[randomNum].toUpperCase()
}

export const guessLetter = (letter: string) => {
  if (letter.length > 1 || get(currentLetterIndex) >= CONSTANTS.MAX_LETTERS) {
    return
  }

  userGuessesArray.update(prev => {
    prev[get(currentWordIndex)][get(currentLetterIndex)] = letter.toUpperCase()
    currentLetterIndex.set(get(currentLetterIndex) + 1)
    return prev
  })
}

export const deleteLetter = () => {
  if (get(currentLetterIndex) > 0) {
    userGuessesArray.update(prev => {
      prev[get(currentWordIndex)][get(currentLetterIndex) - 1] = ""
      currentLetterIndex.set(get(currentLetterIndex) - 1)
      return prev
    })
  }
}

export const guessWord = () => {
  if (get(currentLetterIndex) < CONSTANTS.MAX_LETTERS) {
    return displayAlert('Not enough letters.', ALERT_TYPES.INFO, 2000)
  }
  const guessesArr = get(userGuessesArray)
  const currentGuessArray = guessesArr[get(currentWordIndex)]
  const guessWord = currentGuessArray.join('')

  const updatedGameState = getUpdatedGameState(guessWord, get(currentWordIndex))
  gameState.set(updatedGameState)
  displayFeedback(updatedGameState)

  currentWordIndex.set(get(currentWordIndex) + 1)
  currentLetterIndex.set(0)
  updateLetterStatuses(guessesArr, get(correctWord))
}

const getUpdatedGameState = (guessWord: string, wordIndex: number): string => {
  if (guessWord === get(correctWord)) {
    return CONSTANTS.GAME_STATES.WIN
  } else if (wordIndex === CONSTANTS.MAX_GUESSES - 1) {
    return CONSTANTS.GAME_STATES.LOSE
  } else {
    return CONSTANTS.GAME_STATES.PLAYING
  }
}

const displayFeedback = (state: string) => {
  if (state === CONSTANTS.GAME_STATES.WIN) {
    displayAlert('Congratulations, you win!', ALERT_TYPES.SUCCESS, 2000)
  } else if (state === CONSTANTS.GAME_STATES.LOSE) {
    displayAlert('Sorry, but you lost.', ALERT_TYPES.DANGER, 2000)
  }
}

const generateEmptyGuessesArray = (): string[][] => {
  const emptyGuesses: string[][] = []
  for (let i = 0; i < CONSTANTS.MAX_GUESSES; i++) {
    emptyGuesses.push(Array(CONSTANTS.MAX_LETTERS).fill(""))
  }
  return emptyGuesses
}

export const initializeGame = async () => {
  correctWord.set(await generateRandomWord())
  letterStatuses.set(generateInitialLetterStatuses())
  currentLetterIndex.set(0)
  currentWordIndex.set(0)
  userGuessesArray.set(generateEmptyGuessesArray())
  gameState.set(CONSTANTS.GAME_STATES.PLAYING)
  
  updateLetterStatuses(get(userGuessesArray), get(correctWord))
}

const updateLetterStatuses = (guessesArray: string[][], correctWord: string) => {
  letterStatuses.update(prevLetterStatuses => {
    guessesArray.forEach(singleGuessArray => {
      singleGuessArray.forEach((letter, i) => {
        if (prevLetterStatuses[letter] === CONSTANTS.LETTER_STATES.CORRECT_SPOT) {
          return;
        }
        if (letter.toUpperCase() === correctWord[i]) {
          prevLetterStatuses[letter] = CONSTANTS.LETTER_STATES.CORRECT_SPOT;
        } else if (correctWord.includes(letter)) {
          prevLetterStatuses[letter] = CONSTANTS.LETTER_STATES.WRONG_SPOT;
        } else {
          prevLetterStatuses[letter] = CONSTANTS.LETTER_STATES.NOT_FOUND;
        }
      });
    });
    return prevLetterStatuses;
  });
}


const generateInitialLetterStatuses = () => {
  const initialLetterStatuses = CONSTANTS.ALPHABET.reduce((acc: Record<string, string>, cur: string) => {
    acc[cur] = CONSTANTS.LETTER_STATES.AVAILABLE
    return acc
  }, {})
  return initialLetterStatuses
}

export const resetGame = () => {
  currentLetterIndex.set(0)
  currentWordIndex.set(0)
  userGuessesArray.set(generateEmptyGuessesArray())
  updateLetterStatuses(get(userGuessesArray), get(correctWord))
  gameState.set(CONSTANTS.GAME_STATES.PLAYING)
}