<script lang='ts'>
  import {initializeGame} from "../lib/gameLogic"
</script>

<button
  on:click={initializeGame}
  class={`bg-slate-500 opacity-80 absolute h-[356px] w-[300px] flex justify-center items-center text-4xl bold text-white`}
>
  Click to play again
</button>


