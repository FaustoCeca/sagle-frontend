import type { AttemptField, AttemptResult, FieldState } from "../types/game";

/** Each field state maps to the same colour the player sees in the grid. */
const STATE_EMOJI: Record<FieldState, string> = {
  correct: "🟩",
  partial: "🟨",
  incorrect: "🟥",
};

/**
 * The seven comparable columns, in the same order they appear on screen
 * (the "Saga" image column is not part of the colour grid).
 */
const FIELDS: ((attempt: AttemptResult) => AttemptField)[] = [
  (a) => a.categories,
  (a) => a.games,
  (a) => a.firstGame,
  (a) => a.lastGame,
  (a) => a.perspectives,
  (a) => a.artStyles,
  (a) => a.multiplayer,
];

const attemptToRow = (attempt: AttemptResult): string =>
  FIELDS.map((getField) => STATE_EMOJI[getField(attempt).state]).join("");

/** Local YYYY-MM-DD (the puzzle is daily; use the player's own day). */
const localISODate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

interface BuildShareArgs {
  /** Today's attempts as returned by the API (newest first). */
  attempts: AttemptResult[];
  /** Pre-translated line, e.g. "Solved in 4 guesses". */
  solvedLine: string;
  /** Current streak; appended with a flame when > 0. */
  streak: number;
  /** Public site URL to drive new players in. */
  url: string;
  /** Override for testing; defaults to now. */
  date?: Date;
}

/**
 * Builds the shareable, spoiler-free result text (Wordle-style emoji grid).
 * The grid reproduces the on-screen green/yellow/red squares so it is instantly
 * recognisable, and never leaks the saga name.
 */
export const buildShareText = ({
  attempts,
  solvedLine,
  streak,
  url,
  date = new Date(),
}: BuildShareArgs): string => {
  // Attempts arrive newest-first; reverse so the winning all-green row sits at
  // the bottom — the familiar Wordle "ending on green" shape.
  const grid = [...attempts].reverse().map(attemptToRow).join("\n");
  const header = `🎮 The Sagle — ${localISODate(date)}`;
  const summary = streak > 0 ? `${solvedLine} · 🔥 ${streak}` : solvedLine;
  return `${header}\n${summary}\n\n${grid}\n\n${url}`;
};
