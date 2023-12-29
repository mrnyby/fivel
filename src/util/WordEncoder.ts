namespace WordEncoder {
    const _alphabet = "abcdefghijklmnopqrstuvwxyz";
    const _shiftDistances = [11, 13, 17, 19, 23];

    export const decode = (word: string | null) => {
        if (word === null) {
            return "";
        }

        return [...word.toLowerCase()]
            .map((character, index) => _unshiftCharacter(character, _shiftDistances[index]))
            .join("");
    };

    export const encode = (word: string) => {
        return [...word.toLowerCase()]
            .map((character, index) => _shiftCharacter(character, _shiftDistances[index]))
            .join("");
    };

    const _shiftCharacter = (character: string, distance: number) => {
        return _alphabet.charAt((_alphabet.indexOf(character) + distance) % _alphabet.length);
    };

    const _unshiftCharacter = (character: string, distance: number) => {
        let unshiftedIndex = (_alphabet.indexOf(character) - distance) % _alphabet.length;
        while (unshiftedIndex < 0) {
            unshiftedIndex += _alphabet.length;
        }

        return _alphabet.charAt(unshiftedIndex);
    };
}

export default WordEncoder;
