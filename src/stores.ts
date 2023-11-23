import { derived, get, readable, writable } from "svelte/store";

import Guess from "./util/Guess";
import { GuessCharacterColor } from "./util/GuessCharacter";
import WordEncoder from "./util/WordEncoder";

const _createGuesses = () => {
	const { subscribe, update } = writable(Array.from({ length: 6 }, () => new Guess()));
	const isBlocked = () =>
		get(targetWord) === ""
		|| get(guessIsCorrect)
		|| get(guessesAreExhausted)
		|| get(createGameDialogIsVisible)
		|| get(postGameDialogIsVisible);

	let nGuesses = 0;

	return {
		addCharacter: (character: string) => update(guesses => {
			if (!isBlocked()) {
				guesses[nGuesses].addCharacter(character);
			}

			return guesses;
		}),
		deleteCharacter: () => update(guesses => {
			if (!isBlocked()) {
				guesses[nGuesses].deleteCharacter();
			}

			return guesses;
		}),
		submitGuess: () => update(guesses => {
			if (!isBlocked() && guesses[nGuesses].submit(get(targetWord))) {
				guesses[nGuesses].characters.forEach(guessCharacter => {
					keyColors.setKeyColor(guessCharacter.value, guessCharacter.color);
				});

				if (nGuesses >= 5 || guesses[nGuesses].isCorrect()) {
					postGameDialogIsVisible.set(true);
				}

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
				accumulator.set(key, null);
				return accumulator;
			}, new Map<string, GuessCharacterColor | null>())
	);

	return {
		setKeyColor: (key: string, color: GuessCharacterColor) => update(keyColors => {
			switch (color) {
				case GuessCharacterColor.Green:
					keyColors.set(key, color);
					break;
				case GuessCharacterColor.Yellow:
					if (keyColors.get(key) !== GuessCharacterColor.Green) {
						keyColors.set(key, color);
					}
					break;
				case GuessCharacterColor.Gray:
					if (keyColors.get(key) !== GuessCharacterColor.Green && keyColors.get(key) !== GuessCharacterColor.Yellow) {
						keyColors.set(key, color);
					}
			}

			return keyColors;
		}),
		subscribe,
	};
};

const _urlParams = new URLSearchParams(window.location.search);

export const guesses = _createGuesses();
export const guessesAreExhausted = derived(guesses, $guesses => $guesses.every(guess => guess.isSubmitted));
export const guessIsCorrect = derived(guesses, $guesses => $guesses.find(guess => guess.isCorrect()) !== undefined);
export const keyColors = _createKeyColors();
export const nextCharacterIndices = derived(guesses, $guesses => {
	const nextGuessIndex = $guesses.findIndex(guess => !guess.isSubmitted);
	if (nextGuessIndex === -1) {
		return [-1, -1] as [number, number];
	}

	const nextCharacterIndex = $guesses[nextGuessIndex].characters.findIndex(character => character.value === "");
	return [nextGuessIndex, nextCharacterIndex] as [number, number];
});
export const targetWord = readable(WordEncoder.decode(_urlParams.get("id")));

export const createGameDialogIsVisible = writable(_urlParams.get("id") === null);
export const postGameDialogIsVisible = writable(false);
