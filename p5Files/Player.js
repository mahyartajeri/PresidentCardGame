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

    playCards(){
        if(Game.validated(this.selectedCards, Game.determineMode(this.selectedCards))){
            Game.pool = this.selectedCards;
        }
    }

}