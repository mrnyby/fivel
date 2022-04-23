import { writable } from 'svelte/store';

const createCurrentGuess = () => {
	const { subscribe, update } = writable("");

	return {
		sendCharacter: (character: string) => update(guess => guess.concat(character)),
		subscribe,
	};
}

export const currentGuess = createCurrentGuess();

const createPastGuesses = () => {
	const { subscribe, update } = writable([] as string[]);

	return {
		subscribe,
	}
};

export const pastGuesses = createPastGuesses();
