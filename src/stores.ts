import { derived, get, readable, writable } from "svelte/store";

import type GameCache from "./util/GameCache";
import GameConfig from "./util/GameConfig";
import Guess from "./util/Guess";
import GuessCharacterColor from "./util/GuessCharacterColor";

const _createGuesses = () => {
    const { subscribe, update } = writable(Array.from({ length: 6 }, () => new Guess()));
    const isBlocked = () =>
        get(gameConfig)?.word === undefined
        || get(guessIsCorrect)
        || get(guessesAreExhausted)
        || get(createGameDialogIsVisible)
        || get(postGameDialogIsVisible);

    let nGuesses = 0;

    return {
        addCharacter: (character: string) => update(guesses => {
            if (!isBlocked()) {
                guesses[nGuesses].addCharacter(character);
            }

            return guesses;
        }),
        deleteCharacter: () => update(guesses => {
            if (!isBlocked()) {
                guesses[nGuesses].deleteCharacter();
            }

            return guesses;
        }),
        submitGuess: (isFromCache = false) => update(guesses => {
            // Because `get(gameConfig)` can return null, save it off in a new variable so we can manually check its
            // nullness and appease the compiler. `isBlocked()` will already do the same thing, but the compiler can't
            // know that.
            const nullCheckGameConfig = get(gameConfig);
            if (!isBlocked() && nullCheckGameConfig !== null && guesses[nGuesses].submit(nullCheckGameConfig.word)) {
                guesses[nGuesses].characters.forEach(guessCharacter => {
                    keyColors.setKeyColor(guessCharacter.value, guessCharacter.color);
                });

                let submittedGuesses = guesses
                    .filter(guess => guess.isSubmitted)
                    .map(guess => guess.characters.reduce(
                        (accumulator, guessCharacter) => accumulator += guessCharacter.value,
                        ""
                    ));

                const newCache = {
                    gameId: nullCheckGameConfig.gameId,
                    guesses: submittedGuesses,
                    timestamp: isFromCache ? get(gameCache).timestamp : Date.now(),
                };
                gameCache.set(newCache);
                localStorage.setItem(
                    _getCacheKey(nullCheckGameConfig.gameId, nullCheckGameConfig.word),
                    JSON.stringify(newCache)
                );

                if (nGuesses >= 5 || guesses[nGuesses].isCorrect()) {
                    postGameDialogIsVisible.set(true);
                }

                nGuesses++;
            }

            return guesses;
        }),
        subscribe,
    };
};

const _createKeyColors = () => {
    const { subscribe, update } = writable(
        [..."abcdefghijklmnopqrstuvwxyz"]
            .reduce((accumulator, key) => {
                accumulator.set(key, null);
                return accumulator;
            }, new Map<string, GuessCharacterColor | null>())
    );

    return {
        setKeyColor: (key: string, color: GuessCharacterColor) => update(keyColors => {
            switch (color) {
                case GuessCharacterColor.Green:
                    keyColors.set(key, color);
                    break;
                case GuessCharacterColor.Yellow:
                    if (keyColors.get(key) !== GuessCharacterColor.Green) {
                        keyColors.set(key, color);
                    }
                    break;
                case GuessCharacterColor.Gray:
                    if (keyColors.get(key) !== GuessCharacterColor.Green && keyColors.get(key) !== GuessCharacterColor.Yellow) {
                        keyColors.set(key, color);
                    }
            }

            return keyColors;
        }),
        subscribe,
    };
};

const _getCacheKey = (gameId: string|undefined, word: string) => `${gameId ?? ""}${word}`;

// Using URLSearchParams might seem easier than manually parsing this URL. Unfortunately, URLSearchParams parses the
// URL, and that includes decoding values. If our Base64 includes a "+", this is bad news. That plus will be decoded as
// a space. That is *not* valid Base64 and will break when passed into GameConfig.deserialize().
let _serializedGameConfig: string | null = null;
if (location.search.length > 3) {
    // Trim the "?f=" from our search
    _serializedGameConfig = location.search.substring(3);
}

export const guesses = _createGuesses();
export const guessesAreExhausted = derived(guesses, $guesses => $guesses.every(guess => guess.isSubmitted));
export const guessIsCorrect = derived(guesses, $guesses => $guesses.find(guess => guess.isCorrect()) !== undefined);
export const keyColors = _createKeyColors();
export const nextCharacterIndices = derived(guesses, $guesses => {
    const nextGuessIndex = $guesses.findIndex(guess => !guess.isSubmitted);
    if (nextGuessIndex === -1) {
        return [-1, -1] as [number, number];
    }

    const nextCharacterIndex = $guesses[nextGuessIndex].characters.findIndex(character => character.value === "");
    return [nextGuessIndex, nextCharacterIndex] as [number, number];
});
export const gameConfig = readable(_serializedGameConfig === null ? null : GameConfig.deserialize(_serializedGameConfig));

const gotGameConfig = get(gameConfig);
let cache = { gameId: gotGameConfig?.gameId, guesses: [], timestamp: Date.now() };
if (gotGameConfig !== null) {
    // No need to be fancy with our keys. These will be unique for any possible gameId+word combintation.
    const cacheKey = _getCacheKey(gotGameConfig.gameId, gotGameConfig.word);
    cache = JSON.parse(localStorage.getItem(cacheKey) ?? "null") ?? cache;
}
export const gameCache = writable<GameCache>(cache);

export const createGameDialogIsVisible = writable(_serializedGameConfig === null);
export const postGameDialogIsVisible = writable(false);
