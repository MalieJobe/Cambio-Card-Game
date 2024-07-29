import Deck from "./Deck.js";
import Player from "./Player.js";

export default class Game {
    uid: string;
    players: Player[];
    activeDeck: Deck;
    discards: Deck;


    constructor(uid: string, activeDeck: Deck, discards: Deck) {
        this.uid = uid;
        this.players = [];
        this.activeDeck = activeDeck;
        this.discards = discards;

        this.activeDeck.loadFullDeck();
        this.activeDeck.shuffle();
    }

    static generateUID(): string {
        return Math.random().toString(36).substring(2, 8);
    }
}