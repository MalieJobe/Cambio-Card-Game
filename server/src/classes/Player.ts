import type Card from "./Card.js";
import Deck from "./Deck.js";

export default class Player {
    userName: string | null;
    socketRef: WebSocket;
    hand: Array<Card | null>;
    gamesWon: Number;
    currentCard: Card | null;
    gameRef: string | null;

    constructor(socketRef: WebSocket) {
        this.userName = null;
        this.socketRef = socketRef;
        this.hand = [];
        this.gamesWon = 0;
        this.currentCard = null;
        this.gameRef = null;
    }

    anonymizedData = () => {
        return {
            userName: this.userName,
            gamesWon: this.gamesWon,
            hand: this.hand.map(card => card ? "redacted" : null),
        }
    }

    drawCard(deck: Deck): void {
        this.currentCard = deck.drawCard();
    }

    takeCard(card: Card): void {
        this.hand.push(card);
        this.currentCard = null;
    }

    playCard(card: Card, deck: Deck): void {
        deck.discard(card);
        const cardPositionInHand = this.hand.findIndex(c => c === card);
        this.hand[cardPositionInHand] = null;
    }
}