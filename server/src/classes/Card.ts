import { Rank, Suit, Action } from "src/helper_types.js";

export default class Card {
    suit: Suit;
    rank: Rank;
    shortName: string;
    value: number;
    action: Action | null;

    constructor(rank: Rank, suit: Suit) {
        this.suit = suit;
        this.rank = rank;
        this.shortName = this.rank + this.suit;
        this.value = this.getValue();
        this.action = this.getAction();
    }

    getValue(): number {
        const numericalValue = parseInt(this.rank);
        if (Number.isInteger(numericalValue)) return numericalValue;

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