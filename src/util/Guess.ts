import dictionary from "../dictionary";
import GuessCharacterColor from "./GuessCharacterColor";

export default class Guess {
    characters = Array.from({ length: 5 }, () => ({ value: "", color: GuessCharacterColor.Gray }));

    private _isSubmitted = false;
    private _isValid = true;

    public get isSubmitted() {
        return this._isSubmitted;
    }

    public get isValid() {
        return this._isValid;
    }

    setCharacter(index: number, character: string) {
        if (index < 0 || index > 4) {
            return;
        }

        this._isValid = true;
        this.characters[index].value = character.toLowerCase();
    }

    deleteCharacter(index: number) {
        if (index < 0 || index > 4) {
            return;
        }

        this._isValid = true;
        this.characters[index].value = "";
    }

    isCorrect() {
        return this.characters.every(character => character.value !== "")
            && this.characters.every(character => character.color === GuessCharacterColor.Green);
    }

    /**
     * @param targetWord The target word to submit this guess against
     * @returns true if this guess was valid, else false
     */
    submit(targetWord: string) {
        if (
            this.characters.some(character => character.value === "")
            || !dictionary.includes(this.characters.map(c => c.value).join(""))
        ) {
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
};
