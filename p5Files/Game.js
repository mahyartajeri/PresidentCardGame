class Game{
    gaming = true;
    players = []
    mode = modes.SINGLE;
    modes = {
        SINGLE: "single",
        DOUBLE: "double",
        TRIPLE: "triple",
        POKER: "poker"
    }
    
    setMode(mode){
        this.mode = mode
    }

    addPlayer(player){
        player.push(player)
    }

    setState(state){
        gaming = state
    }

    
}