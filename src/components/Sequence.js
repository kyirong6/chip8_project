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
    getString(){
        return this.opcodeDisplay;
    }
    getOpcode(){
        var e = parseInt(this.opcodeStored, 16);
        return e;
    }
    getAll(){
        return this.sequenceOrder + ". 0x" + this.opcodeStored + ": " + this.opcodeDisplay;
    }
    
    showAll(){
        console.log(this.sequenceOrder + ". 0x" + this.opcodeStored + ": " + this.opcodeDisplay);
        document.getElementById("programsequence").innerHTML += '<li onclick="onClickReader(this.id)">'  + this.sequenceOrder + ". 0x" + this.opcodeStored + ": " + this.opcodeDisplay +  '</li>'; //display in textbox
        document.getElementsByTagName("li")[this.sequenceOrder].id = this.sequenceOrder.toString(); //assign ID
        
    }
    
    //add a way to easily change sequence through GUI
    
    
    
}