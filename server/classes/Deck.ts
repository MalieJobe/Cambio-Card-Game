import Card from "./Card.js";
import type { Suit, Rank } from "../helper_types";

export default class Deck {
    cards: Array<Card>;
    isBurned: Boolean;

    constructor(cards: Array<Card>) {
        if (!Array.isArray(cards)) throw new Error("Deck must be an array (Can be empty)");

        this.cards = cards;
        this.isBurned = false;
    }

    loadFullDeck() {
        const cardsTemplates = [
            "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "TC", "JC", "QC", "KC",
            "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "TD", "JD", "QD", "KD",
            "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "TH", "JH", "QH", "KH",
            "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "TS", "JS", "QS", "KS",
            "F1", "F2"
        ];

        cardsTemplates.forEach(template => this.cards.push(
            new Card(template[0] as Suit, template[1] as Rank)
        ))
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    drawCard() {
        if (this.cards.length <= 0) throw Error("deck is empty! should not happen")
        return this.cards.shift() || null; // because shift can return undefined
    }

    discard(card: Card): void {
        this.cards.push(card);
    }
}