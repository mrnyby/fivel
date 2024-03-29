export default class GameCache {
    guesses: String[];
    timestamp: number;

    constructor(guesses: String[], timestamp: number = Date.now()) {
        this.guesses = guesses;
        this.timestamp = timestamp;
    }
}
