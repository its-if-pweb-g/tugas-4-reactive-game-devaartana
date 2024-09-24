<script lang="ts">
  import CONSTANTS from "../lib/constants";
  import {
    deleteLetter,
    guessLetter,
    guessWord,
    letterStatuses,
  } from "../lib/gameLogic";

  $: bgClass = (letter: string) => {
    const status = $letterStatuses[
      letter.toUpperCase()
    ] as keyof typeof CONSTANTS.LETTER_STATUS_TO_BG_MAP;

    if (status in CONSTANTS.LETTER_STATUS_TO_BG_MAP) {
      return CONSTANTS.LETTER_STATUS_TO_BG_MAP[status];
    }

    return CONSTANTS.LETTER_STATUS_TO_BG_MAP["AVAILABLE"];
  };

  const handleClick = (letter: string) => {
    if (letter === "ENTER") {
      guessWord();
    } else if (letter === "DEL") {
      deleteLetter();
    } else {
      guessLetter(letter);
    }
  };
</script>

<div>
  {#each CONSTANTS.KEYBOARD_ROWS_ARR as row}
    <div class="flex gap-2 justify-center mb-2 mr">
      {#each row as key}
        <button
          on:click={() => handleClick(key)}
          class={`p-2 rounded-md text-sm sm:text-md h-9 sm:h-12 flex items-center justify-center border-2 border-gray-100 ${bgClass(key)} ${key == "ENTER" ? "w-20 sm:w-20" : key == "DEL" ? "w-10 sm:w-14 text-[10px]" : "w-7 sm:w-12"} `}
          >{key}</button
        >
      {/each}
    </div>
  {/each}
</div>
