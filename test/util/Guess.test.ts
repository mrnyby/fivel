import { describe, expect, it } from "vitest";

import Guess from "../../src/util/Guess";
import { GuessCharacterColor } from "../../src/util/GuessCharacter";

class GuessTestCase {
    guess: string;
    target: string;
    colors: GuessCharacterColor[];

    constructor(guess: string, target: string, colors: number[]) {
        this.guess = guess;
        this.target = target;
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
        new GuessTestCase("geode", "gooey", [2, 1, 2, 0, 0]),
        new GuessTestCase("types", "types", [2, 2, 2, 2, 2]),
        new GuessTestCase("sloth", "penny", [0, 0, 0, 0, 0]),
    ];

    testCases.forEach(testCase => {
        it(`properly colors a guess of "${testCase.guess}" against "${testCase.target}"`, () => {
            const guess = new Guess();
            [...testCase.guess].forEach(character => guess.addCharacter(character));
            guess.submit(testCase.target);

            testCase.colors.forEach((color, index) => expect(guess.characters[index].color).toBe(color));
        });
    });
});
