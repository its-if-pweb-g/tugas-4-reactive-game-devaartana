<script>
  export let letter;
  export let letterIndex;
  export let wordIndex;
  import { correctWord, currentWordIndex } from "../lib/gameLogic";
  import { fade } from "svelte/transition";

  $: bgClass = () => {
    const submitedWord = wordIndex < $currentWordIndex;
    
    if (submitedWord) {
      if (letter === $correctWord[letterIndex]) return "bg-green-500";
      else if ($correctWord.includes(letter)) return "bg-yellow-500";
      else return "bg-gray-500";
    } else {
      return "bg-transparent";
    }
  };
</script>

{#if wordIndex < $currentWordIndex}
  <div
    class={`w-14 h-14 ${bgClass()} flex items-center justify-center`}
    in:fade={{delay: 100 * letterIndex }}
  >
    <span class={`text-4xl font-bold`}>{letter}</span>
  </div>
{:else}
  <div
    class="w-14 h-14 border-2 border-gray-600 flex items-center justify-center"
  >
    <span class="text-4xl font-bold" in:fade={{}}>{letter}</span>
  </div>
{/if}
