<script lang="ts">
  import { userGuessesArray, correctWord } from "../lib/gameLogic";
  import LetterInput from "./LetterInput.svelte";
  import CONSTANTS from "$lib/constants";

  export let index;
  $: word = $userGuessesArray[index];

  const generateCorrectWordFreq = (word: string) => {
    const initCorrectWord = CONSTANTS.ALPHABET.reduce((acc: Record<string, number>, cur: string) => {
      acc[cur] = 0;
      return acc;
    }, {});

    for (let i = 0; i < word.length; i++) {
      initCorrectWord[word[i]]++;
    }
    return initCorrectWord;
  };

  const generateLetterStatus = (guessWord: string) => {
    let wordFreq = generateCorrectWordFreq($correctWord);
    let letterStatus: string[] = Array(guessWord.length).fill(CONSTANTS.LETTER_STATES.NOT_AVAILABLE);

    for (let i = 0; i < guessWord.length; i++) {
      if (guessWord[i] === $correctWord[i]) {
        wordFreq[guessWord[i]]--;
        letterStatus[i] = CONSTANTS.LETTER_STATES.CORRECT_SPOT;
      }
    }

    for (let i = 0; i < guessWord.length; i++) {
      if (letterStatus[i] === CONSTANTS.LETTER_STATES.NOT_AVAILABLE && wordFreq[guessWord[i]] > 0) {
        wordFreq[guessWord[i]]--;
        letterStatus[i] = CONSTANTS.LETTER_STATES.WRONG_SPOT;
      }
    }
    return letterStatus;
  };

  $: letterStatus = generateLetterStatus($userGuessesArray[index].join(""));
</script>

{#each word as character, i}
  <LetterInput letter={character} wordIndex={index} letterIndex={i} letterStatus={letterStatus[i]}/>
{/each}
