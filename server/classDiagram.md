Game
+ players: Map<String, Player>
+ currentTurn: Player
+ startGame()
+ endGame()
+ nextTurn()
+ handleReconnection(username: String, newConnectionID: String)

Deck
+ cards: List<Card>
+ shuffle()
+ drawCard(): Card

Card
+ suit: String
+ value: int
+ action(): void

Player
+ username: String
+ connectionID: String
- hand: List<Card>
- penalties: int
+ drawCard(deck: Deck)
+ discardCard(deck: Deck, card: Card)
+ callCambio()
+ useCardAction(card: Card)
+ peekCard(index: int)
+ switchCard(card1: Card, card2: Card)
+ stickCard(card: Card, targetPlayer: Player)
+ reconnect(newConnectionID: String)
