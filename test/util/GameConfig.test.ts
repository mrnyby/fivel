import { describe, expect, it } from "vitest";

import dictionary from "../../src/dictionary";
import GameConfig from "../../src/util/GameConfig";

describe("GameConfig", () => {
    it("can serialize and deserialize a game using only a word", () => {
        const randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
        expectSuccessfulSerialization(new GameConfig(randomWord));
    });

    it("can serialize and deserialize a game using only a word and hint", () => {
        expectSuccessfulSerialization(new GameConfig("shire", undefined, "Baggins"));
    });

    it("can serialize and deserialize a game using only a word and game ID", () => {
        expectSuccessfulSerialization(new GameConfig("tests", "42 🧪"));
    });

    it("can serialize and deserialize a game using a word, hint, and game ID", () => {
        expectSuccessfulSerialization(new GameConfig("beach", "43", "😎 and 🌊"));
    });
});

const expectSuccessfulSerialization = (gameConfig: GameConfig) => {
    const deserializedGameConfig = GameConfig.deserialize(gameConfig.serialize());

    expect(deserializedGameConfig.word).toBe(gameConfig.word);
    expect(deserializedGameConfig.gameId).toBe(gameConfig.gameId);
    expect(deserializedGameConfig.hint).toBe(gameConfig.hint);
};
