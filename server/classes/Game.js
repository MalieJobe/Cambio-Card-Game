export default class Game {
    constructor(activeDeck, discards) {
        this.players = [];
        this.activeDeck = activeDeck;
        this.discards = discards;

        this.activeDeck.loadFullDeck();
        this.activeDeck.shuffle();
    }
} 