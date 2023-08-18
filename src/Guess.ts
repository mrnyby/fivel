import dictionary from "./dictionary";
import GuessCharacter, { GuessCharacterColor } from "./GuessCharacter";

export default class Guess {
	characters = Array.from({ length: 5 }, () => new GuessCharacter());

	private _characterCount = 0;
	private _isSubmitted = false;
	private _isValid = true;

	public get isSubmitted() {
		return this._isSubmitted;
	}

	public get isValid() {
		return this._isValid;
	}

	addCharacter(character: string) {
		if (this._characterCount === 5) {
			return;
		}

		this._isValid = true;
		this.characters[this._characterCount++].value = character;
	}

	deleteCharacter() {
		if (this._characterCount === 0) {
			return;
		}

		this._isValid = true;
		this.characters[this._characterCount-- - 1].value = '';
	}

	isCorrect() {
		return this._characterCount === 5
			&& this.characters.every(character => character.color === GuessCharacterColor.Green);
	}

	submit(targetWord: string) {
		if (this._characterCount < 5 || !dictionary.includes(this.characters.map(c => c.value).join(""))) {
			this._isValid = false;
			return false;
		} else {
			this._isValid = true;
		}

		this._isSubmitted = true;

		const unguessedCharacterCounts: { [character: string]: number; } = {};

		[...targetWord].forEach(targetWordCharacter => {
			if (!(targetWordCharacter in unguessedCharacterCounts)) {
				unguessedCharacterCounts[targetWordCharacter] = 0;
			}

			unguessedCharacterCounts[targetWordCharacter]++;
		})

		this.characters.forEach((guessCharacter, index) => {
			if (guessCharacter.value === targetWord.charAt(index)) {
				unguessedCharacterCounts[guessCharacter.value]--;
			}
		});

		this.characters.forEach((guessCharacter, index) => {
			if (guessCharacter.value === targetWord.charAt(index)) {
				guessCharacter.color = GuessCharacterColor.Green;
			} else if (unguessedCharacterCounts[guessCharacter.value] > 0) {
				guessCharacter.color = GuessCharacterColor.Yellow;
				unguessedCharacterCounts[guessCharacter.value]--;
			}
		});

		return true;
	}
}
