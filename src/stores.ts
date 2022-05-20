import { get, readable, writable } from "svelte/store";
import Guess from "./Guess";
import WordEncoder from "./WordEncoder";

const _createGuesses = () => {
	const { subscribe, update } = writable(Array.from({ length: 6 }, () => new Guess()));

	let nGuesses = 0;

	return {
		addCharacter: (character: string) => update(guesses => {
			guesses[nGuesses].addCharacter(character);
			return guesses;
		}),
		deleteCharacter: () => update(guesses => {
			guesses[nGuesses].deleteCharacter();
			return guesses;
		}),
		submitGuess: () => update(guesses => {
			guesses[nGuesses++].submit(WordEncoder.decode(get(encodedTargetWord)));
			return guesses;
		}),
		subscribe,
	};
};

const _urlParams = new URLSearchParams(window.location.search);

export const encodedTargetWord = readable(_urlParams.get("id"));
export const guesses = _createGuesses();
export const isGameSet = readable(_urlParams.get("id") !== null);
