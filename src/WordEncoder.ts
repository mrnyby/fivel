export default class WordEncoder {
	private _alphabet = "abcdefghijklmnopqrstuvwxyz";
	private _shiftDistances = [11, 13, 17, 19, 23];

	decode(word: string) {
		return [...word.toLowerCase()]
			.map((character, index) => this._unshiftCharacter(character, this._shiftDistances[index]))
			.join("");
	}

	encode(word: string) {
		return [...word.toLowerCase()]
			.map((character, index) => this._shiftCharacter(character, this._shiftDistances[index]))
			.join("");
	}

	private _shiftCharacter(character: string, distance: number) {
		return this._alphabet.charAt((this._alphabet.indexOf(character) + distance) % this._alphabet.length);
	}

	private _unshiftCharacter(character: string, distance: number) {
		let unshiftedIndex = (this._alphabet.indexOf(character) - distance) % this._alphabet.length;
		while (unshiftedIndex < 0) {
			unshiftedIndex += this._alphabet.length;
		}

		return this._alphabet.charAt(unshiftedIndex);
	}
}
