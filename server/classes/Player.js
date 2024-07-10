export default class Player {
    constructor(name, socketId, hand = [], gamesWon = 0) {
        this.name = name;
        this.socketId = socketId;
        this.hand = hand;
        this.gamesWon = gamesWon;
        this.currentCard = null;
    }

    drawCard(deck) {
        this.currentCard = deck.drawCard();
    }

    takeCard(card) {
        this.hand.push(card);
        this.currentCard = null;
    }

    playCard(card, deck) {
        deck.discard(card);
        const cardPositionInHand = this.hand.findIndex(c => c === card);
        this.hand[cardPositionInHand] = null;
    }
}