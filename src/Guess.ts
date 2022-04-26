export default class Guess {
	characters = Array.from({ length: 5 }, () => '');
	isSubmitted = false;

	private characterCount = 0;

	addCharacter = (character: string) => {
		if (this.characterCount === 5) {
			return;
		}

		this.characters[this.characterCount++] = character;
	}

	deleteCharacter = () => {
		if (this.characterCount === 0) {
			return;
		}

		this.characters[this.characterCount-- - 1] = '';
	}
}
