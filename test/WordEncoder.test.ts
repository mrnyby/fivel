import WordEncoder from "../src/WordEncoder";

describe("WordEncoder", () => {
	const randomWords = Array.from({ length: 1000 }).map(() =>
		Array.from({ length: 5 }).map(() => String.fromCharCode(Math.floor((Math.random() * 25) + 97))).join("")
	);

	it.each(randomWords)(
		"obscures every character in %s",
		word => {
			const encodedWord = WordEncoder.encode(word);
			[encodedWord].forEach((character, index) => expect(character).not.toEqual(word.charAt(index)))
		}
	);

	it.each(randomWords)(
		"can encode and decode %s",
		word => expect(WordEncoder.decode(WordEncoder.encode(word))).toBe(word)
	);
});
