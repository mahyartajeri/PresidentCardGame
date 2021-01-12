class Game{
    static gaming = true;
    static playerCount = 0;
    static turn = 0;
    static players = [];
    static pool = [];
    static winners = [];
    static order = [];
    static modes = {
        SINGLE: "single",
        DOUBLE: "double",
        TRIPLE: "triple",
        POKER: "poker"
    }
    static deck = "empty!"
    static mode = Game.modes.SINGLE;

    static clearPool(){
        pool = [];
    }
    
    static setMode(mode){
        mode = mode;
    }

    static addPlayer(player){
        player.push(player);
        playerCount ++;
    }

    static setState(state){
        gaming = state;
    }

    static initializeGame(){
        order = [];
        deck = new Deck();
        deck.shuffle();
        createPlayers();
        for(let i = 0; i < players.length; i++){
            fillHands(players[i]);
        }
        //fill up the order 
        for(let i = 0; i < players.length; i++){
            order.push(players[i].playerID);
        }
        
        
    }

    static resetGame(){
        order = [];
        deck = new Deck();
        deck.shuffle();

        for(let i = 0; i < players.length; i++){
            players[i].clearHand();
            fillHands(players[i]);
        }

        //after the first game, the bum will go first
        
        for(let i = 0; i < players.length; i++){
            //bum goes first 
            if(players[i].position == "b"){
                if(i > 0){
                    //shifts the order of player so that the bum is first
                    shiftArr(order, players.length-i);
                    break;
                }
            }
            
        }

        winners = [];
        
    }

    static shiftArr(arr, shift){
        let temp1 = []
        let temp2 = []
        for(let i = arr.length-shift; i < arr.length; i++){
            temp1.push(arr[i]);
        }
        for(let i = 0; i < arr.length-shift; i++){
            temp2.push(arr[i]);
        }
        return temp1.concat(temp2);
    }

    static createPlayers(){
        for(let i = 0; i < playerCount; i++){
            this.players.push(new Player(i));
        }
    }

    static fillHand(player){
        for(let i = 0; i < 52/playerCount; i++){
            player.hand.addCard(deck.draw());
        }
    }

    static exitPlayers(){
        for(let i = 0; i < players.length; i++){
            // adds the player id of players who are done
            if(players[i].done()){
                winners.push(players[i].playerID);
            }
        }
        // removing won player from order
        for(let i = 0; i < order.length; i++){
            if(winners.includes(order[i])){
                this.order.splice(i, 1);
            }
        }
    }

    static isGameOver(){
        let remaining = player.length;
        for(let i = 0; i < player.length; i++){
            if(players[i].done()){
                remaining --;
            }
        }

        return remaining == 1;
    }

    static FinishGame(){
        setWinners();
        resetGame();
    }

    static setWinners(){
        for(let i = 0; i < winners.length; i++){
            if(i == 0){
                winners[i].wincount += 1;
                winners[i].position = Player.positions.PRESIDENT;
            }
            else if(i == 1){
                winners[i].position = Player.positions.VICEPRESIDENT;
            }
            else if(i < length - 2){
                winners[i].position = Player.positions.NEUTRAL;
            }
            else if(i == length - 2){
                winners[i].position = Player.positions.VICEBUM;
            }
            else if(i == length - 1){
                winners[i].position = Player.positions.BUM;
            }
        }
    }

    static nextTurn(){
        for(let i = 0; i < order.length; i++){
            if(order[i] == turn){
                if(i < order.length + 1){
                    turn = order[i+1];
                }
                else{
                    turn = order[0];
                }
            }
        }
    }

    static determineMode(cards){
        //determines the type of cards given ex. Singles, Doubles, Poker, etc.
        let determinedMode;
        
        switch(cards.length){
            case 1:
                determinedMode = modes.SINGLE;
                break;
            case 2:
                determinedMode = modes.DOUBLE;
                break;
            case 3:
                determinedMode = modes.TRIPLE;
                break;
            default:
                determinedMode = modes.POKER;
        }

        //if pool is empty then mode becomes whatever is played
        if(pool == []){
            mode = determinedMode;
        }
    }

    static validated(player, cardMode){
        //Check if selected cards are valid to play on current pool

        //can't play nothing
        if(player.selectedCards == []){
            return false;
        }

        //An empty pool means anything can be played 
        if(pool == []){
            return true;
        }
        else if(cardMode != mode){
            return false;
        }

        // checks which type of cards to check depending on the type played
        switch(cardMode){
            case modes.SINGLE:
                return singleCheck(player);
            case modes.DOUBLE:
                return singleCheck(player);
            case modes.TRIPLE:
                return singleCheck(player);
            case modes.POKER:
                return pokerCheck(player);
        }
    }

    static singleCheck(player){
        if(player.selectedCards.length != 1){
            return false;
        }
        // higher cards can be placed
        if(player.selectedCards[0].rank > pool[0].rank){
            return true;
        }

        //if same rank then suit takes priority (spades, hearts, clubs, diamond)
        else if(player.selectedCards[0].rank == pool[0].rank){
            if(player.selectedCards[0].suit > pool[0].suit){
                return true;
            }
        }

        return false;
    }

    static doubleCheck(player){
        if(player.selectedCards.length != 2){
            return false;
        }
        // cards have to be the same rank to be considered a double
        if(player.selectedCards[0].rank != player.selectedCards[1].rank){
            return false;
        }

        // greater rank means you can play it
        if(player.selectedCards[0].rank > pool[0].rank){
            return true;
        }

        // Whichever equivalent pair has the spade wins
        else if(player.selectedCards[0].rank == pool[0].rank){
            if(player.selectedCards[0].suit == 4 || player.selectedCards[1].suit == 4){
                return true;
            }
        }

        return false;
    }

    static tripleCheck(player){
        if(player.selectedCards.length != 3){
            return false;
        }
        // check if all three cards are equal rank
        if(player.selectedCards[0].rank != player.selectedCards[1].rank || player.selectedCards[0].rank != player.selectedCards[2].rank){
            return false;
        }

        // greater rank means you can play it
        if(player.selectedCards[0].rank > pool[0].rank){
            return true;
        }

        // Whichever equivalent triple has the spade wins
        else if(player.selectedCards[0].rank == pool[0].rank){
            if(player.selectedCards[0].suit == 4 || player.selectedCards[1].suit == 4 || player.selectedCards[2].suit == 4){
                return true;
            }
        }
    }

    static pokerCheck(player){
        //check for straight flush 
        if(isStraightFlush(pool)){
            if(!isStraightFlush(player.selectedCards)){
                return false;
            }
            
            else{
                if(player.selectedCards[0].rank > pool[0].rank){
                    return true;
                }
                else if(player.selectedCards[0].rank == pool[0].rank){
                    return player.selectedCards[0].suit > pool[0].suit;
                }
                else{
                    return false;
                }
            }
        }

        //check for quad
        if(isQuad(pool)){

            if(isStraightFlush(player.selectedCards)){
                return true;
            }
            if(!isQuad(player.selectedCards)){
                return false;
            }

            else{
                if(player.selectedCards[0].rank > pool[0].rank){
                    return true;
                }
                else if(player.selectedCards[0].rank == pool[0].rank){
                    return player.selectedCards[0].suit > pool[0].suit;
                }
                else{
                    return false;
                }
            }
        }

        //check for full house 
        if(isFullHouse(pool)){
            if(isStraightFlush(player.selectedCards)){
                return true;
            }
            if(isQuad(player.selectedCards)){
                return true;
            }
            if(!isFullHouse(player.selectedCards)){
                return false;
            }

            else{
                //3-2 case:
                if(player.selectedCards[0].rank == player.selectedCards[1].rank && player.selectedCards[1].rank == player.selectedCards[2].rank){
                    //3-2 case:
                    if(pool[0].rank == pool[1].rank && pool[1].rank == pool[2].rank){
                        return player.selectedCards[0].rank > pool[0].rank;
                    }
                    //2-3 case:
                    if(pool[2].rank == pool[3].rank && pool[3].rank == pool[4].rank){
                        return player.selectedCards[0].rank > pool[2].rank;
                    }
                }

                //2-3 case:
                if(player.selectedCards[2].rank == player.selectedCards[3].rank && player.selectedCards[3].rank == player.selectedCards[4].rank){
                    //3-2 case:
                    if(pool[0].rank == pool[1].rank && pool[1].rank == pool[2].rank){
                        return player.selectedCards[2].rank > pool[0].rank;
                    }
                    //2-3 case:
                    if(pool[2].rank == pool[3].rank && pool[3].rank == pool[4].rank){
                        return player.selectedCards[2].rank > pool[2].rank;
                    }
                }
            }
        }

        //check for flush
        if(isFlush(pool)){
            if(isStraightFlush(player.selectedCards)){
                return true;
            }
            if(isQuad(player.selectedCards)){
                return true;
            }
            if(isFullHouse(player.selectedCards)){
                return true;
            }
            if(!isFlush(player.selectedCards)){
                return false;
            }

            //for flushes, the highest cards are comapred and if everything is equal the suits are
            for(let i = pool.length - 1; i >= 0; i ++){
                if(player.selectedCards[i].rank < pool[i].rank){
                    return false;
                }
                else if(player.selectedCards[i].rank > pool[i].rank){
                    return true;
                }
            }

            return player.selectedCards[0].suit > pool[0].suit;
        }

        //check for straight
        if(isStraight(pool)){
            if(isStraightFlush(player.selectedCards)){
                return true;
            }
            if(isQuad(player.selectedCards)){
                return true;
            }
            if(isFullHouse(player.selectedCards)){
                return true;
            }
            if(isFlush(player.selectedCards)){
                return true;
            }
            if(!isStraight(player.selectedCards)){
                return false;
            }

            //checks card ranks first then suit
            else{
                if(player.selectedCards[0].rank > pool[0].rank){
                    return true;
                }
                else if(player.selectedCards[0].rank < pool[0].rank){
                    return false;
                }
                else if(player.selectedCards[0].rank == pool[0].rank){
                    return player.selectedCards[0].suit > pool[0].suit;
                }
            }

        }
    }

    static isStraight(cards){
        for (let i = 0; i < cards.length-1; i++){
            if(cards[i].rank != cards[i+1].rank -1){
                return false;
            }
        }
        return true;
    }

    static isFlush(cards){
        for (let i = 0; i < cards.length-1; i++){
            if(cards[i].suit != cards[i+1].suit){
                return false;
            }
        }
        return true;
    }

    static isQuad(cards){
        //only 4 cards for the quad (no extra card)
        for (let i = 0; i < cards.length-1; i++){
            if(cards[i].rank != cards[i+1].rank){
                return false;
            }
        }

        return true;
    }

    static isFullHouse(cards){
        if(cards.length != 5){
            return false;
        }
        //one possibility is 2-3 (since cards are sorted)
        check1 = true
        for(let i = 0; i < cards.length-1; i++){
            if(i != 1){
                if(cards[i] != cards[i].rank){
                    check1 = false;
                }
            }
        }
        //one possibility is 3-2
        if(check1 == false){
            for(let i = 0; i < cards.length-1; i++){
                if(i != 2){
                  if(cards[i] != cards[i].rank){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    static isStraightFlush(cards){
        for (let i = 0; i < cards.length-1; i++){
            if(cards[i].rank != cards[i+1].rank -1 || cards[i].suit != cards[i+1].suit){
                return false;
            }
        }
        return true;
    }
    
    

    

    

    
    

    
}