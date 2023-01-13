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
			if (!get(isGameOver) && guesses[nGuesses].submit(WordEncoder.decode(get(encodedTargetWord)))) {
				guesses[nGuesses].characters.forEach(guessCharacter => {
					keyColors.setKeyColor(guessCharacter.value, guessCharacter.color);
				})

				const guessIsCorrect = guesses[nGuesses].characters.every(
					character => character.color === GuessCharacterColor.Green
				);

				nGuesses++;

				if (nGuesses > 5 || guessIsCorrect) {
					isGameOver.set(true);
				}
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
				accumulator[key] = null;
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
					break;
				case GuessCharacterColor.Gray:
					if (keyColors[key] !== GuessCharacterColor.Green && keyColors[key] !== GuessCharacterColor.Yellow) {
						keyColors[key] = color;
					}
			}

			return keyColors;
		}),
		subscribe,
	};
};

const _urlParams = new URLSearchParams(window.location.search);

export const encodedTargetWord = readable(_urlParams.get("id"));
export const guesses = _createGuesses();
export const isGameSet = readable(_urlParams.get("id") !== null);
export const isGameOver = writable(false);
export const keyColors = _createKeyColors();
