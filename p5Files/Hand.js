class Hand{
    hand = []
    
    //Might make this method take indexes instead of card objects
    removeCards(cardsToRemove){
        for(let i  = 0; i < this.hand.length; i++){
            if (cardsToRemove.includes(this.hand[i])){
                // Removes card from both lists to avoid any double deleting
                cardsToRemove.splice(cardsToRemove.indexOf(this.hand[i]), 1);
                this.hand.splice(i, 1);
                
            }
        }
    }

    addCard(card){
        this.hand.push(card)
    }


}