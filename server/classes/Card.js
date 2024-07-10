export default class Card {
    constructor(suit, rank) {
        if (!suit || !rank) throw new Error("Suit and value are required");

        this.suit = suit;
        this.rank = rank;
        this.shortName = value + rank;
        this.value = this.getValue();
        this.action = this.getAction();
    }

    getValue() {
        if (parseInt(this.rank) !== NaN) return parseInt(this.rank);

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
            case "H":
                return 0;
            default:
                throw new Error("Invalid card rank");
        }
    }

    getAction() {
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