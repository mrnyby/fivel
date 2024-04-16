import { describe, expect, it } from "vitest";

import Guess from "../../src/util/Guess";
import GuessCharacterColor from "../../src/util/GuessCharacterColor";

class GuessTestCase {
    target: string;
    guess: string;
    colors: GuessCharacterColor[];

    constructor(target: string, guess: string, colors: number[]) {
        this.target = target;
        this.guess = guess;
        this.colors = colors.map(colorCode => {
            switch (colorCode) {
                case 2:
                    return GuessCharacterColor.Green;
                case 1:
                    return GuessCharacterColor.Yellow;
                default:
                    return GuessCharacterColor.Gray;
            }
        });
    }
}

describe("Guess", () => {
    const testCases = [
        new GuessTestCase("gooey", "geode", [2, 1, 2, 0, 0]),
        new GuessTestCase("types", "types", [2, 2, 2, 2, 2]),
        new GuessTestCase("penny", "sloth", [0, 0, 0, 0, 0]),
    ];

    testCases.forEach((testCase) => {
        it(`properly colors a guess of "${testCase.guess}" against "${testCase.target}"`, () => {
            const guess = new Guess();
            [...testCase.guess].forEach(character => guess.addCharacter(character));
            guess.submit(testCase.target);

            testCase.colors.forEach((color, index) => expect(guess.characters[index].color).toBe(color));
        });
    });
});
