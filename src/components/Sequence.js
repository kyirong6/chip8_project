class sequence{
    //may need to use linked list
    constructor(){
        this.sequenceOrder = 0;
        this.opcodeStored = null
        this.opcodeString = null;
    }

    set(sequence, stored, display){
        this.sequenceOrder = sequence;
        this.opcodeStored = stored;
        this.opcodeDisplay = display;
    }

    /*
    setSequenceOrder(sequence){
        sequenceOrder = sequence;
    }

    setOpcode(stored){
        opcodeStored = stored;
    }

    setOpcodeString(display){
        opcodeDisplay = display;
    }
    */
    showAll(){
        console.log(this.sequenceOrder + ". 0x" + this.opcodeStored + ": " + this.opcodeDisplay);
    }
    
    //add a way to easily change sequence through GUI
    
    
    
}