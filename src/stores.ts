import { writable } from 'svelte/store';
import Guess from './Guess';

const createGuesses = () => {
	const { subscribe, update } = writable(Array.from({ length: 6 }, () => new Guess()));

	let guessCount = 0;

	return {
		addCharacter: (character: string) => update(guesses => {
			guesses[guessCount].addCharacter(character);
			return guesses;
		}),
		deleteCharacter: () => update(guesses => {
			guesses[guessCount].deleteCharacter();
			return guesses;
		}),
		submitGuess: () => update(guesses => {
			guesses[guessCount++].isSubmitted = true;
			return guesses;
		}),
		subscribe,
	};
};

export const guesses = createGuesses();
