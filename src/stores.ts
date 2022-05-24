import { get, readable, writable } from "svelte/store";

import Guess from "./Guess";
import { GuessCharacterColor } from "./GuessCharacter";
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
			if (guesses[nGuesses].submit(WordEncoder.decode(get(encodedTargetWord)))) {
				guesses[nGuesses].characters.forEach(guessCharacter => {
					keyColors.setKeyColor(guessCharacter.value, guessCharacter.color);
				})

				nGuesses++;
			}

			return guesses;
		}),
		subscribe,
	};
};

const _createKeyColors = () => {
	const { subscribe, update } = writable(
		[..."abcdefghijklmnopqrstuvwxyz"]
			.reduce((accumulator, key) => {
				accumulator[key] = GuessCharacterColor.Gray
				return accumulator;
			}, {})
	);

	return {
		setKeyColor: (key: string, color: GuessCharacterColor) => update(keyColors => {
			switch (color) {
				case GuessCharacterColor.Green:
					keyColors[key] = color;
					break;
				case GuessCharacterColor.Yellow:
					if (keyColors[key] !== GuessCharacterColor.Green) {
						keyColors[key] = color;
					}
			}

			return keyColors;
		}),
		subscribe,
	}
};

const _urlParams = new URLSearchParams(window.location.search);

export const encodedTargetWord = readable(_urlParams.get("id"));
export const guesses = _createGuesses();
export const isGameSet = readable(_urlParams.get("id") !== null);
export const keyColors = _createKeyColors();
