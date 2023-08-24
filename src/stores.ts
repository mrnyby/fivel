import { derived, get, readable, writable } from "svelte/store";

import { GameStatus } from "./GameStatus";
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
			if (
				get(gameStatus) !== GameStatus.Post
				&& guesses[nGuesses].submit(get(targetWord))
			) {
				guesses[nGuesses].characters.forEach(guessCharacter => {
					keyColors.setKeyColor(guessCharacter.value, guessCharacter.color);
				});

				if (nGuesses >= 5 || guesses[nGuesses].isCorrect()) {
					gameStatus.set(GameStatus.Post);
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

export const gameStatus = writable(_urlParams.get("id") === null ? GameStatus.Pre : GameStatus.Peri);
export const guesses = _createGuesses();
export const guessIsCorrect = derived(guesses, ($guesses) => $guesses.find(guess => guess.isCorrect()) !== undefined);
export const keyColors = _createKeyColors();
export const targetWord = readable(WordEncoder.decode(_urlParams.get("id")));
