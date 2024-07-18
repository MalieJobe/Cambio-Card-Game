import type { Rank, Suit, Action } from "../helper_types";

export default class Card {
    suit: Suit;
    rank: Rank;
    shortName: string;
    value: number;
    action: Action | null;

    constructor(suit: Suit, rank: Rank) {
        this.suit = suit;
        this.rank = rank;
        this.shortName = this.suit + this.rank;
        this.value = this.getValue();
        this.action = this.getAction();
    }

    getValue(): number {
        if (Number.isNaN(this.rank)) return parseInt(this.rank);

        switch (this.rank) {
            case "T":
            case "J":
            case "Q":
                return 10;
            case "K":
                if (this.suit === "H" || this.suit === "D")
                    return -2; // red king
                else return 20; // black king
            case "A":
                return 1;
            case "F":
                return 0;
            default:
                throw new Error("Invalid card rank");
        }
    }

    getAction(): Action | null {
        switch (this.rank) {
            case "7":
            case "8":
                return "peek_self";
            case "9":
            case "T":
                return "peek_other";
            case "J":
                return "swap";
            case "Q":
                return "peek_and_swap";
            default:
                return null;
        }
    }
}