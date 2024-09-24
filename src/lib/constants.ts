const GAME_STATES = {
  PLAYING: "PLAYING",
  WIN: "WIN",
  LOSE: "LOSE"
} as const;

const LETTER_STATES = {
  WRONG_SPOT: "WRONG_SPOT",
  CORRECT_SPOT: "CORRECT_SPOT",
  NOT_FOUND: "NOT_FOUND",
  AVAILABLE: "AVAILABLE",
  NOT_AVAILABLE: "NOT_AVAILABLE"
} as const;

const LETTER_STATUS_TO_BG_MAP: Record<typeof LETTER_STATES[keyof typeof LETTER_STATES], string> = {
  [LETTER_STATES.WRONG_SPOT]: "bg-yellow-500",
  [LETTER_STATES.CORRECT_SPOT]: "bg-green-500",
  [LETTER_STATES.NOT_FOUND]: "bg-gray-500",
  [LETTER_STATES.NOT_AVAILABLE]: "bg-gray-500",
  [LETTER_STATES.AVAILABLE]: "bg-transparent"
};

const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] as const;

const KEYBOARD_ROWS_ARR: readonly (readonly string[])[] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'DEL'],
  [ 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
] as const;

const MAX_LETTERS = 5 as const;
const MAX_GUESSES = 6 as const;

const CONSTANTS = {
  GAME_STATES,
  LETTER_STATES,
  LETTER_STATUS_TO_BG_MAP,
  ALPHABET,
  MAX_LETTERS,
  MAX_GUESSES,
  KEYBOARD_ROWS_ARR
} as const;

export default CONSTANTS;
