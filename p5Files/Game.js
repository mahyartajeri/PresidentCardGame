class Game{
    static gaming = true;
    static playerCount = 2;
    static players = [];
    static pool = [];
    static modes = {
        SINGLE: "single",
        DOUBLE: "double",
        TRIPLE: "triple",
        POKER: "poker"
    }
    static deck = new Deck();
    static mode = modes.SINGLE;
    
    static setMode(mode){
        mode = mode;
    }

    static addPlayer(player){
        player.push(player);
    }

    static setState(state){
        gaming = state;
    }

    static initializeGame(){
        deck.shuffle();
        createPlayers();
        for(let i = 0; i < players.length; i++){
            fillHands(players[i]);
        }
    }

    static createPlayers(){
        for(let i = 0; i < playerCount; i++){
            this.players.push(new Player(i));
        }
    }

    static fillHands(player){
        for(let i = 0; i < 52/playerCount; i++){
            player.hand.addCard(deck.draw());
        }
    }

    static determineMode(cards){
        //determines the type of cards given ex. Singles, Doubles, Poker, etc.
        let determinedMode;
        //if pool is empty then mode becomes whatever is played
        if(pool == []){
            mode = determinedMode;
        }
    }

    static validated(cards, cardMode){
        //Check if selected cards are valid to play on current pool

        //An empty pool means anything can be played 
        if(pool == []){
            return true;
        }
        else if(cardMode != mode){
            return false;
        }

    }

    

    
    

    
}