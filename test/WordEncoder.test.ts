import dictionary from "../src/dictionary";
import WordEncoder from "../src/WordEncoder";

describe("WordEncoder", () => {
	it.each(dictionary)(
		"obscures every character in %s",
		word => {
			const encodedWord = WordEncoder.encode(word);
			[encodedWord].forEach((character, index) => expect(character).not.toEqual(word.charAt(index)))
		}
	);

	it.each(dictionary)(
		"can encode and decode %s",
		word => expect(WordEncoder.decode(WordEncoder.encode(word))).toBe(word)
	);
});
