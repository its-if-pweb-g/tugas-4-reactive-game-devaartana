<script>
  import { userGuessesArray } from "../lib/gameLogic";
  import LetterInput from "./LetterInput.svelte";
  
  export let index;
  
  $: word = $userGuessesArray[index];
</script>

{#each word as character, i}
  <LetterInput letter={character} wordIndex={index} letterIndex={i} />
{/each}
