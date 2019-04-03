/*
This defines the CPU of the chip8 emulator.

TODO: define and implement all properties and methods.
*/
class Assembler {
    /*
    Initializes the CPU
    */
    constructor() {


        this._memory = new Memory();
		
		
        this._pc = 0x200;                    //program counter
        this._sp = 0;                        //stack pointer also for subroutine
        this.Counter = 0;   //Will be used to get out of perm iteration until op code is all done
        this.id = "";
        this.SequenceCounter = 0;
        this.SequenceString = "";
        this.Sequence = new Array(4096);
        

        this.selectedAction = ""; 
        this.selectedSequenceNumber = 0;

    }


 


    /*
    This method loads the program into the CPU
    */
     readProgram(game) {
         console.log("Reading...");
         const reader = new FileReader();
         let program;
         reader.readAsArrayBuffer(game);
  
         reader.onloadend = () =>{
             program = new Uint8Array(reader.result);
             console.log(reader.result.toString(16));
             this._memory.writeTo(0x200, program);
             this.Counter = program.byteLength + 0x200;
         }
         this.selectedAction = "read";

         
       }

    //update the display based on which opcode is clicked from Reader/Writer
    displaySelected(sequenceNumber){
        document.getElementById("editorTextBox").innerHTML =  document.getElementById(sequenceNumber).innerText;
        document.getElementById("opcode").value = this.Sequence[sequenceNumber].getOpcode().toString(16).toUpperCase();
        
        this.selectedSequenceNumber = sequenceNumber;
        console.log(this.selectedSequenceNumber);
        console.log(this.Sequence[sequenceNumber].getOpcode().toString(16));
    }

    //update the downloadable content 
    updateDownloadData(){
        
        var data = new Uint8Array(this.SequenceCounter * 2);
        for(var i = 0 ; i < this.SequenceCounter ; i++){
            
            var split1 = (this.Sequence[i].getOpcode() & 0xFF00) >> 8;
            var split2 = (this.Sequence[i].getOpcode() & 0x00FF);
            
            var e = i * 2;

            data[e] = split1;
            data[e+1] = split2;
        }
        return data;
    }

    addOpcode(){
       
        console.log("adding...");
        this.Sequence[this.SequenceCounter] = new sequence();
        this.selectedAction = "add";

        for(var i = this.SequenceCounter; i > this.selectedSequenceNumber; i--){
            //Add to Sequence Class by incrementing by one
            var e = parseInt(i) - 1;
            this.Sequence[i].set(i, this.Sequence[e].getOpcode().toString(16), this.Sequence[e].getString() );


            if(document.getElementById(i) == null){
                //create a room to add in HTML
                document.getElementById("programsequence").innerHTML += 
                '<li onclick="onClickReader(this.id)">'  + i.toString() + ". 0x" + this.Sequence[e].getOpcode().toString(16).toUpperCase() + ": " + this.Sequence[e].getString() +  '</li>'; 
                //assign ID to new sequence
                document.getElementsByTagName("li")[this.SequenceCounter].id = this.SequenceCounter.toString(); 
            }
            else{
                document.getElementById(i).innerText = (i.toString() + ". 0x" + this.Sequence[e].getOpcode().toString(16).toUpperCase() + ": " + this.Sequence[e].getString());
            }
        }

        this.SequenceCounter++;
        console.log("Determining opcode...")
        var e =  parseInt(document.getElementById("opcode").value,16);
        this.read(e);
        

       
    }

    deleteOpcode(){
        this.SequenceCounter--;
        console.log("Deleting...");
        this.selectedAction = "delete";

        for(var i = this.selectedSequenceNumber; i < this.SequenceCounter; i++){
            //Delete from Sequence class by incrementing by one
            var e = parseInt(i) + 1;
            this.Sequence[i].set( i.toString() , this.Sequence[e].getOpcode().toString(16).toUpperCase(), this.Sequence[e].getString() );
           

            //Delete it in HTML
            document.getElementById(i).innerText = (i.toString() + ". 0x" + this.Sequence[e].getOpcode().toString(16).toUpperCase() + ": " + this.Sequence[e].getString());
  
        }
        document.getElementById(this.SequenceCounter).innerText = "";
    }

    editOpcode(){
        
        this.selectedAction = "edit";
        var e =  parseInt(document.getElementById("opcode").value,16);
        this.read(e);
       

       
    }

    cycle() {
        let opcode = this._memory.readIn(this._pc) << 8 | this._memory.readIn(this._pc + 1);
        this.read(opcode);
    }

    read(opcode) {
        
        this.SequenceString = "Not valid Opcode";

        
        var x = ((opcode & 0x0F00) >> 8).toString(16); //used for displaying
        var y = ((opcode & 0x00F0) >> 4).toString(16);

        console.log((opcode & 0xF000).toString(16));
        switch (opcode & 0xF000) {

            case 0x0000:
                switch (opcode) {
                    case 0x00E0:
                        this.SequenceString = "Clear Display" ;
                        break;
                    case 0x00EE:
                        this.SequenceString = "Return from Subroutine";
                        break;
                }
                break;

            //	1NNN Jumps to address NNN *Done*
            case 0x1000:
                //Jump to (NNN)
                this.SequenceString = "Jump to 0x" + (opcode & 0x0FFF).toString(16).toUpperCase();
                break;

            //  2NNN Calls subroutine at NNN
            case 0x2000:
                //Call Subroutine at (NNN)
                this.SequenceString = "Call subroutine at 0x" + (opcode & 0x0FFF).toString(16).toUpperCase();
                break;

            //  3XNN Skips the next instruction if VX equals NN;
            case 0x3000:
                //Skip if V(X) = (NN)
                this.SequenceString = "Skip next instruction if v[" + x + "] = 0x" + (opcode & 0x00FF).toString(16).toUpperCase();
                break;

            //	4XNN Skips the next instruction if VX doesn't equal NN
            case 0x4000:
                 //Skip if V(X) != (NN)
                 this.SequenceString = "Skip next instruction if v[" + x + "] != 0x" + (opcode & 0x00FF).toString(16).toUpperCase();
                break;

            //  5XY0; skips next instruction if Vx == Vy
            case 0x5000:
                //skips if V(x) = V(y)
                this.SequenceString = "Skip next instruction if v[" + x + "] = v[" + y + "]";
                
                break;

            //  6xkk; Set Vx = kk
            case 0x6000:
                //Set V(x) to (kk)
                this.SequenceString = "set v[" + x + "] to 0x" + (opcode & 0x00FF).toString(16).toUpperCase();
                break;

            //  7xkk; Set Vx = Vx + kk
            case 0x7000:
                this.SequenceString = "set v[" + x + "] to" + "v[" + x + "] + " + (opcode & 0x00FF).toString(16).toUpperCase();
                break;

            case 0x8000:
                console.log("Beep");
                switch (opcode & 0x000F) {
                    // 8xy0; Set Vx = Vy
                    case 0x0000:
                    this.SequenceString = "set v[" + x + "] = v[" +  y + "]";
                        break;

                    // 8xy1; Set Vx = Vx OR Vy
                    case 0x0001:
                    this.SequenceString = "set v[" + x + "] = v[" + x + "] OR v[" + y + "]";
                        break;

                    // 8xy2; Set Vx = Vx AND Vy
                    case 0x0002:
                    this.SequenceString = "set v[" + x + "] = v[" + x + "] AND v[" + y + "]";
                        //this._v[x] &= this._v[y];
                        break;

                    // 8xy3; Set Vx = Vx XOR Vy
                    case 0x0003:
                    this.SequenceString = "set v[" + x + "] = v[" + x + "] XOR v[" + y + "]";
                        break;

                    // 8XY4 Set Vx = Vx + Vy, set VF = carry.
                    case 0x0004:
                        /*
                            Adds VY to VX.
                            VF is set to 1 when there's a carry,
                            and to 0 when there isn't.
                        */
                    this.SequenceString = "set v[" + x + "] = v[" + x + "] + v[" + y + "] and set v[F] to 1 when there is carry";


                    // 8XY5 Set Vx = Vx - Vy, set VF = NOT borrow.
                    case 0x0005:
                        /*
                            VY is subtracted from VX.
                            VF is set to 0 when there's a borrow,
                            and 1 when there isn't.
                        */
                    this.SequenceString = "set v[" + x + "] = v[" + x + "] - v[" + y + "] and set v[F] to 1 when there is carry";
                        break;

                     //8XY6 Set Vx = Vx SHR 1.
                    case 0x0006:
                        /*
                            Stores the least significant bit of VX in VF
                            and then shifts VX to the right by 1
                        */
                       this.SequenceString = "Store least significant bit of v[" + x + "] in V[F] and shift v[" + x + "] to the right by 1" ;
                        break;

                    //8XY7 Set Vx = Vy - Vx, set VF = NOT borrow.
                    case 0x0007:
                        /*
                            Sets VX to VY minus VX.
                            VF is set to 0 when there's a borrow,
                            and 1 when there isn't.
                        */
                        this.SequenceString = "set v[" + x + "] = v[" + x + "] - v[" + y + "] and Set v[F] to 0 if there is a burrow";
                        break;

                    //8XYE Set Vx = Vx SHL 1.
                    case 0x000E:
                        /*
                            Stores the most significant bit of VX in VF
                            and then shifts VX to the left by 1.
                        */
                       this.SequenceString = "Store most significant bit of v[" + x + "] in V[F] and shift v[" + x + "] to the left by 1" ;
                        break;

                }
                break;

                // 9XY0 Skip next instruction if Vx != Vy.
                case 0x9000:
                /*
                    Skips the next instruction if VX doesn't equal VY.
                    (Usually the next instruction is a jump to skip a code block)
                */
               this.SequenceString = "Skip next instruction if V[" + x + "] != v[" + y + "]";
                break;

            // ANNN Set I = nnn.
            case 0xA000:
                /*
                    Sets I to the address NNN.
                */
                this.SequenceString = "Set I to the adress 0x" + (opcode & 0x0FFF).toString(16).toUpperCase();
                break;

            // BNNN sets the pc to nnn + v0
            case 0xB000:
                this.SequenceString = "Set pc to 0x" + (opcode & 0x0FFF).toString(16).toUpperCase() + " + v[0]";
                break;

            //Cxkk generates random number between 0 and 255
            case 0xC000:
                this.SequenceString = "generate random number between 0 to 255"
                break;

            //Dxyn draws display; todo:come back to this
            case 0xD000:
                this.SequenceString = "Draw display at coordinates v[" + x + "] and v[" + y + "] that has width of 8 pixels and height of " + (opcode & 0x000F).toString(16);
                break;

            case 0xE000:
                switch (opcode & 0x000F) {
                    //Ex9E skips next instruction if key found at vx todo:once rest is running
                    case 0x000E:
                        this.SequenceString = "Skip next instruction if key is found at v[" + x +"]";
                        break;

                    //ExA1 checks if key is stored skips if not todo:once rest is running
                    case 0x0001:
                        this.SequenceString = "Skip next instruction if key isnt found at v[" + x +"]";
                        break;
                }
                break;

            case 0xF000:
                switch(opcode & 0x00FF)
                {
                    //Fx07 sets vx to delay timer
                    case 0x0007:
                        this.SequenceString = "Set v[" + x + "] to delay timer";
                        break;

                    //Fx0A todo: wait for keypress
                    case 0x000A:
                        this.SequenceString = "Wait for keypress";
                        break;

                    //Fx15 sets delay timer to value of vx
                    case 0x0015:
                    this.SequenceString = "Set delay timer to v[" + x + "]";
                        break;

                    //Fx18 sets sound timer to value of vx
                    case 0x0018:
                    this.SequenceString = "Set sound timer to v[" + x + "]";
                        break;

                    //Fx1E I to value of I + vx
                    case 0x001E:
                    this.SequenceString = "Set I to value of I + v[" + x + "]";
                        break;

                    //Fx29 sets I to location of sprite todo: create sprites
                    case 0x0029:
                    this.SequenceString = "Set I to location of sprite v[" + x + "]";
                        break;

                    //Fx33 converts binary to decimal then stores the three digits
                    case 0x0033:
                    this.SequenceString = "convert v[" + x + "] to decimal and store the three digits in I";
                        break;

                    //Fx55 stores v0 to vx in memory
                    case 0x0055:
                    this.SequenceString = "store v[0] to v[" + x + "] in memory";
                        break;

                    //Fx65 stores memory in v0 to vx
                    case 0x0065:
                    this.SequenceString = "store memory from v[0] to v[" + x + "]";
                        break;
                }
                break;
            

        }

        
        
        if(this.selectedAction == "edit"){
   
            this.Sequence[this.selectedSequenceNumber].set(this.selectedSequenceNumber.toString(), opcode.toString(16).toUpperCase() , this.SequenceString);

            document.getElementById(this.selectedSequenceNumber).innerText =  (this.selectedSequenceNumber.toString() + ". 0x" + opcode.toString(16).toUpperCase() + ": " + this.SequenceString);
            document.getElementById("editorTextBox").innerText =  (this.selectedSequenceNumber.toString() + ". 0x" + opcode.toString(16).toUpperCase() + ": " + this.SequenceString);
        }

        if(this.selectedAction == "add"){
            console.log("Almost done add");
            var SQN = this.selectedSequenceNumber;
            this.Sequence[SQN].set(SQN.toString(), opcode.toString(16).toUpperCase() , this.SequenceString);
            document.getElementById(SQN).innerText = (SQN.toString() + ". 0x" + opcode.toString(16).toUpperCase() + ": " + this.SequenceString);
        }

        if(this.selectedAction == "read"){
            

             if(this._pc < this.Counter)
             {
             this.Sequence[this.SequenceCounter] = new sequence();

                if((opcode < 0x00FF) && (opcode != 0x00EE) && (opcode != 0x00E0)){                   
                    this.SequenceString = "---------";
                    this.Sequence[this.SequenceCounter].set((this.SequenceCounter).toString(10), 0 , this.SequenceString);
                    this.Sequence[this.SequenceCounter].showAll();
                    this.SequenceCounter ++;
                    this._pc +=1
                    this.cycle();
                    
                }
                else{
                    this.Sequence[this.SequenceCounter].set((this.SequenceCounter).toString(10), opcode.toString(16).toUpperCase() , this.SequenceString);
                    this.Sequence[this.SequenceCounter].showAll();
                    this.SequenceCounter ++;
                    this._pc += 2;
                    this.cycle();
                }
              
             }
        }
    

    }
    
}






// module.exports.CPU = CPU;
