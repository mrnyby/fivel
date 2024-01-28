export default class GameConfig {
    word: string;
    gameId?: string;
    hint?: string;

    constructor(word: string, gameId?: string, hint?: string) {
        this.word = word;
        this.gameId = gameId;
        this.hint = hint;
    }

    serialize() {
        const jsonString = JSON.stringify(this);
        const bytes = new TextEncoder().encode(jsonString);
        const binaryString = String.fromCodePoint(...bytes);
        return btoa(binaryString);
    }

    static deserialize(s: string) {
        const binaryString = atob(s);
        const bytes = Uint8Array.from(binaryString, (m) => m.codePointAt(0) || 0);
        const jsonString = new TextDecoder().decode(bytes);
        const json = JSON.parse(jsonString);
        return new GameConfig(json.word, json.gameId, json.hint);
    }
};
