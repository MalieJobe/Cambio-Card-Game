export default class Player {
    constructor(socketRef) {
        this.name = null;
        this.socketRef = socketRef;
        this.hand = null;
        this.gamesWon = 0;
        this.currentCard = null;
        this.gameRef = null;
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