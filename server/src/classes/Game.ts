import Deck from "./Deck.js";
import Player from "./Player.js";

export default class Game {
    players: Player[];
    activeDeck: Deck;
    discards: Deck;


    constructor(activeDeck: Deck, discards: Deck) {
        this.players = [];
        this.activeDeck = activeDeck;
        this.discards = discards;

        this.activeDeck.loadFullDeck();
        this.activeDeck.shuffle();
    }
} 