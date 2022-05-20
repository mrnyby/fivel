import dictionary from "../src/dictionary";
import WordEncoder from "../src/WordEncoder";

describe("WordEncoder", () => {
	// TODO: The dictionary should only store lowercase words
	const lowerCaseDictionary = dictionary.map(word => word.toLowerCase());

	it.each(lowerCaseDictionary)(
		"obscures every character in %s",
		word => {
			const encodedWord = WordEncoder.encode(word);
			[encodedWord].forEach((character, index) => expect(character).not.toEqual(word.charAt(index)))
		}
	);

	it.each(lowerCaseDictionary)(
		"can encode and decode %s",
		word => expect(WordEncoder.decode(WordEncoder.encode(word))).toBe(word)
	);
});
