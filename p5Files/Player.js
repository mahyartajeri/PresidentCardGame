class Player{ 
    static positions = {
        PRESIDENT: "p",
        VICEPRESIDENT: "vp",
        NEUTRAL: "n",
        VICEBUM: "vb",
        BUM: "b"
    }
    position = positions.NEUTRAL;
    selectedCards = [];
    hand = new Hand();
    wincount = 0;

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

    clearHand(){
        this.hand = new Hand();
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
        this.sortCards();
        if(Game.validated(this, Game.determineMode(this.selectedCards))){
            Game.pool = this.selectedCards;
            this.selectedCards = [];
            Game.exitPlayers();
            if(Game.isGameOver()){
                Game.finishGame();
                return;
            }
            Game.nextTurn();
        }
    }

    passTurn(){
        Game.nextTurn();
    }

    done(){
        return this.hand.isEmpty();
    }


    

}