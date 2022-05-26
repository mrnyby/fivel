import GuessCharacter, { GuessCharacterColor } from './GuessCharacter';

export default class Guess {
	characters = Array.from({ length: 5 }, () => new GuessCharacter());

	private _characterCount = 0;
	private _isSubmitted = false;

	public get isSubmitted() {
		return this._isSubmitted;
	}

	addCharacter(character: string) {
		if (this._characterCount === 5) {
			return;
		}

		this.characters[this._characterCount++].value = character;
	}

	deleteCharacter() {
		if (this._characterCount === 0) {
			return;
		}
		this.characters[this._characterCount-- - 1].value = '';
	}

	submit(targetWord: string) {
		if (this._characterCount < 5) {
			return false;
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
			}
		});

		return true;
	}
}
