class Player{ 
    selectedCards = [];
    hand = new Hand();

    constructor(playerID){
        this.playerID = playerID;
    }

    selectCard(i){
        this.selectedCards.push(i);
    }

    deselectCard(i){
        for(let j = 0; j < this.selectedCards.length; j++){
            if(this.selectedCards[i] == j){
                this.selectedCards.splice(i, 1);
            }
        }
    }

    sortCards(){
        for(let i = 0; i < this.selectedCards.length-1; i++){
            for(let j = 0; j < this.selectedCards.length-i-1; i++){
                if (this.selectedCards[j].rank > this.selectedCards[j+1].rank){ 
                    // swap  
                    temp = this.selectedCards[j]; 
                    this.selectedCards[j] = this.selectedCards[j+1]; 
                    this.selectedCards[j+1] = temp; 
                } 
            }
        }
    }


    playCards(){
        sortCards()
        if(Game.validated(this, Game.determineMode(this.selectedCards))){
            Game.pool = this.selectedCards;
        }
    }

}