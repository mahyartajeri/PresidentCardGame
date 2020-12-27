class Deck{
    deck = [];

    //Creates a deck with all 52 cards
    constructor(){
        for(let i = 1; i <= 13; i++){
            for(let j = 1; j <= 4; j++){
                this.deck.push(new Card(i, j))
            }
        }
    }
    // Shuffle method found online
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
      }
    
    addToDeck(card){
        this.deck.push(card);
    }
    draw(){
        return this.deck.pop();
    }


}