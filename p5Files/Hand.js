class Hand{
    hand = []
    
    //Might make this method take indexes instead of card objects
    removeCards(cardsToRemove){
        for(let i  = 0; i < this.hand.length; i++){
            if(cardsToRemove.includes(i)){
                this.hand[i] = "empty";
            }
        }

        for(let i  = 0; i < this.hand.length; i++){
            if(this.hand[i] == "empty"){
                this.hand.splice(i, 1);
            }
        }
    }

    addCard(card){
        this.hand.push(card);
    }


}