import Guess from "../src/Guess";
import { GuessCharacterColor } from "../src/GuessCharacter";

describe("Guess", () => {
	it('properly colors a guess of "geode" against "gooey"', () => {
		const guess = new Guess();
		[..."geode"].forEach(character => guess.addCharacter(character));
		guess.submit("gooey");

		expect(guess.characters[0].color).toBe(GuessCharacterColor.Green);
		expect(guess.characters[1].color).toBe(GuessCharacterColor.Yellow);
		expect(guess.characters[2].color).toBe(GuessCharacterColor.Green);
		expect(guess.characters[3].color).toBe(GuessCharacterColor.Gray);
		expect(guess.characters[4].color).toBe(GuessCharacterColor.Gray);
	});
});
