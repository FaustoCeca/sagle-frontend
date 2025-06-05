import type { Saga } from "../types/game";

export const getSortedGameYears = (saga: Saga): number[] => {
  return saga.games.map(g => g.birthYear).sort((a, b) => a - b);
};

export const getGameYear = (saga: Saga, position: 'first' | 'last'): number => {
  const sortedYears = getSortedGameYears(saga);
  
  return position === 'first' 
    ? sortedYears[0] 
    : sortedYears[sortedYears.length - 1];
};