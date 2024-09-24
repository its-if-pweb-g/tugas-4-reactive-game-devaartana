<script lang="ts">
  import Keyboard from "../components/Keyboard.svelte";
  import Alert from "../components/Alert.svelte";
  import WordInput from "../components/WordInput.svelte";
  import {
    guessLetter,
    deleteLetter,
    guessWord,
    gameState,
    initializeGame,
  } from "../lib/gameLogic";
  import CONSTANTS from "../lib/constants";
  import { onMount } from "svelte";
  import Playagain from "../components/PlayAgain.svelte";

  let loaded = false;

  onMount(async () => {
    await initializeGame();
    loaded = true;
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (
      $gameState !== CONSTANTS.GAME_STATES.PLAYING ||
      e.shiftKey ||
      e.ctrlKey
    ) {
      return;
    }

    const { key } = e;
    if (e.code === "Backspace") {
      deleteLetter();
    } else if (e.code === "Enter") {
      guessWord();
    } else if (isLetter(e.key)) {
      guessLetter(key);
    }
  };

  function isLetter(str: string) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  $: isPlaying = $gameState === CONSTANTS.GAME_STATES.PLAYING;
</script>

<svelte:window on:keydown={handleKeydown} />
{#if loaded}
  <div
    class="w-full h-full text-white mx-auto max-w-10 py-10 flex flex-col items-center"
  >
    <Alert />
    <h1 class="text-2xl sm:text-4xl mb-4 text-center">Mordle</h1>
    <div
      class="flex flex-col gap-6 max-w-2xl h-full justify-between items-center"
    >
      <div class="grow">
        {#each Array(CONSTANTS.MAX_GUESSES) as _, i}
          <div class="flex mx-auto space-x-1 mb-1 text-white">
            <WordInput index={i} />
          </div>
        {/each}
      </div>
      {#if !isPlaying}
        <Playagain />
      {/if}

      <Keyboard />
    </div>
  </div>
{/if}
