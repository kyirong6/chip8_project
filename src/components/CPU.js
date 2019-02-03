/*
This defines the CPU of the chip8 emulator.

TODO: define and implement all properties and methods.
*/
class CPU {


    /*
    Initializes the CPU
    */
    constructor(memory, input, display) {

        this._memory = new ArrayBuffer[0x1000]; //raw binary data, each are a byte
        this._input = input;
        this._display = display;
        this._v = new Uint8Array(16);        //register
        this._pc = 0x200;                    //program counter
        this._stack = new Uint16Array(16);	 //is used for subroutine
        this._sp = 0;                       //stack pointer also for subroutine
        this._I = 0;
        this.Counter = 0;                     //Will be used to get out of perm iteration until op code is all done
    }


    /*
    This method resets the CPU.
    */
    reset() {
        _pc     = 0x200;  // Reset program counter to start at 0x200
        _opcode = 0;      // Reset current opcode
        _I      = 0;      // Reset index register
        _sp     = 0;      // Reset stack pointer

        /*
        defining new arrays so there is no need for the following:
        // Clear display
        // Clear stack
        // clear register V0-VF
        // clear memory
        */
        _display = new Display();
        _stack = new Array(16);
        _v = new Uint8Array(16);
        _memory = new ArrayBuffer[0x1000];

        //Load fontsets


        //set Timers


    }




    /*
    This method loads the program into the CPU
    */
    loadProgram() {//currently will always only load CONNECT4 for demo/testing purpose
        var fs = require('fs');
        var program = fs.readFileSync("connect4");
        for(var i = 0; i < program.length; i ++){
            memory[0x200 + i] = program[i]; //each array is a byte and will hold two bits of hexadecimal
            Counter ++; //TO BE DELETED IN THE FUTURE
        }
        cycle();
    }

    cycle(){
        //Every first and the second array are to be together to create opcode
        //so we move the first one by 8bits and let the second one stay to get 0xFFFF;
        //e.g. 12 32 42 52 63 77 = 0x1232 on the first opcode, 0x4252 on the second opcode etc..
        this.opcode = this._memory[this.pc] << 8 | this._memory[this.pc + 1]; 
        execute(opcode);        
    }


    /*
    This method executes a given opcode
    */
    execute(opcode) {
        this._pc += 2
        
        var x = (opcode & 0x0F00) >> 8; // isolate variable x from opcode
        var y = (opcode & 0x00F0) >> 4; // isolate variable y from opcode

        switch (opcode & 0xF000) { //grab the first nibble

            case 0x0000:
                switch (opcode) {
                    //  0NNN (ignored by modern interpreters)
                    case 0x00E0: //	00E0 Clears Screen
                       
                        break;

                    //	00EE Returns from Subroutine   
                    case 0x00EE: 
                        this._pc = this.stack[this._sp --];
                        break;
                }
                break;

            //	1NNN Jumps to address NNN *Done*
            case 0x1000:
                this._pc = opcode & 0x0FFF;
                break;

            //  2NNN Calls subroutine at NNN
            case 0x2000:
                this._stack[this._sp] = this._pc; 		//saves pc in the stacks
                this._sp++;						  		//add one to the stackpointer to avoid collision
                this._pc = (opcode & 0x0FFF);		    //grab last 3 nibbles of the opcode
                break;

            //  3XNN Skips the next instruction if VX equals NN;
            case 0x3000:
                if (this._v[x] == (opcode & 0x00FF)) {	//check if last 2 nibbles are equal to VX
                    this._pc += 2
                }
                break;

            //	4XNN Skips the next instruction if VX doesn't equal NN
            case 0x4000:
                if (this._v[x] != (opcode & 0x00FF)) {	//check if last 2 nibbles are NOT equal to VX
                    this._pc += 2
                }
                break;

            //  5XY0; skips next instruction if Vx == Vy
            case 0x5000:
                if (this._v[x] == this._v[y]) {
                    this.pc += 2;
                }
                break;

            //  6xkk; Set Vx = kk
            case 0x6000:
                this._v[x] = opcode & 0xFF
                break;

            //  7xkk; Set Vx = Vx + kk
            case 0x7000:
                var val = (opcode & 0xFF + this._v[x]);
                while (val > 255) {
                    val -= 256;
                }
                this._v[x] += val;
                break;

            case 0x8000:
                switch (opcode & 0x000F) {
                    // 8xy0; Set Vx = Vy
                    case 0x0000:
                        this._v[x] = this._v[y];
                        break;

                    // 8xy1; Set Vx = Vx OR Vy
                    case 0x0001:
                        this._v[x] |= this._v[y];
                        break;

                    // 8xy2; Set Vx = Vx AND Vy
                    case 0x0002:
                        this._v[x] &= this._v[y];
                        break;

                    // 8xy3; Set Vx = Vx XOR Vy
                    case 0x0003:
                        this._v[x] ^= this._v[y];
                        break;

                    // 8XY4 Set Vx = Vx + Vy, set VF = carry.
                    case 0x8004:
                        /*
                            Adds VY to VX. 
                            VF is set to 1 when there's a carry, 
                            and to 0 when there isn't.
                        */
                        if ( _v[x] > 255){
                            _v[0xF] = 1;
                        } else {
                            _v[0xF] = 0;
                        }
                        _v[x] += _v[y];
                        break;

                    // 8XY5 Set Vx = Vx - Vy, set VF = NOT borrow.
                    case 0x8005:
                        /*
                            VY is subtracted from VX. 
                            VF is set to 0 when there's a borrow, 
                            and 1 when there isn't.
                        */
                        if ( _v[x] > _v[y]){
                            _v[F] = 1;
                        } else {
                            _v[F] = 0;
                        }
                        _v[x] -= _v[y];
                        break;

                     //8XY6 Set Vx = Vx SHR 1.
                    case 0x8006:
                        /*
                            Stores the least significant bit of VX in VF 
                            and then shifts VX to the right by 1
                        */
                        _v[F] = _v[x] & 0x000F;
                        _v[x]>>1;
                        break;

                    //8XY7 Set Vx = Vy - Vx, set VF = NOT borrow.
                    case 0x8007:
                        /*
                            Sets VX to VY minus VX. 
                            VF is set to 0 when there's a borrow, 
                            and 1 when there isn't.
                        */
                        if ( _v[y] > _v[x]){
                            _v[0xF] = 1;
                        } else {
                            _v[0xF] = 0;
                        }
                        _v[x] = _v[y] - _v[x];
                        break;

                    //8XYE Set Vx = Vx SHL 1.
                    case 0x800E:
                        /*
                            Stores the most significant bit of VX in VF 
                            and then shifts VX to the left by 1.
                        */
                        _v[0xF] = _v[x] & 0xF000;
                        _v[x]<<1;
                        break;

                }
                break;

                // 9XY0 Skip next instruction if Vx != Vy.
                case 0x9000:
                /*
                    Skips the next instruction if VX doesn't equal VY.
                    (Usually the next instruction is a jump to skip a code block)
                */
                if(_v[x] != _v[y]){
                    pc += 2;
                }
                break;
            
            // ANNN Set I = nnn.
            case 0xA000:
                /*
                    Sets I to the address NNN.
                */
                I = opcode & 0x0FFF ; 
                break;
            
            // BNNN sets the pc to nnn + v0
            case 0xB000:
                this._pc =((opcode) & 0x0FFF) + this._v[0];
                break;
            
            //Cxkk generates random number between 0 and 255 
            case 0xC000:
                let rand =Math.floor(Math.random() * Math.floor(256));
                this._v[x] = (rand & (opcode & 0x00FF));
                break;
            
            //Dxyn draws display; todo:come back to this
            case 0xD000:
                var row;
                var cell;
                var mem;
                for(var i = 0; i < (opcode & 0x000f); i++ )
                {
                    mem = this._i + i;
                    for(var j = 0; j < 8; j++)
                    {
                        row = document.getElementById(this._v[x] + i);
                        cell = row.getElementById(this._v[y] + j);

                        if(mem.charAt(j) == 1)
                        {
                            cell.bgColor = "black";
                        }
                        else
                        {

                        }

                    }

                }
                break;

            case 0xE000:
                switch (opcode & 0x000F) {
                    //Ex9E skips next instruction if key found at vx todo:once rest is running
                    case 0x000E: 
                        document.onKeyPress = function(evt)
                        {
                            evt = evt || window.event;
                            let charCode = evt.keyCode || evt.which;
                            if(charCode == this._v[x])
                            {
                                this._pc++;
                            }
                        }
                        break;

                    //ExA1 checks if key is stored skips if not todo:once rest is running
                    case 0x0001: 
                        document.onKeyPress = function(evt)
                        {
                            evt = evt || window.event;
                            let charCode = evt.keyCode || evt.which;
                            if(charCode != this._v[x])
                            {
                                this._pc++;
                            }
                        }
                        break;
                }
                break;

            case 0xF000:
                switch(opcode & 0x00FF)
                {
                    //Fx07 sets vx to delay timer
                    case 0x0007:
                        this._v[x] = this._delayTimer;
                        break;

                    //Fx0A todo: wait for keypress
                    case 0x000A:
                        break;
                    
                    //Fx15 sets delay timer to value of vx
                    case 0x0015:
                        this._delayTimer = this._v[x];
                        break;

                    //Fx18 sets sound timer to value of vx
                    case 0x0018:
                        this._soundTimer = this._v[x];
                        break;

                    //Fx1E I to value of I + vx
                    case 0x001E:
                        this._i += this._v[x];
                        break;

                    //Fx29 sets I to location of sprite todo: create sprites
                    case 0x0029:
                        this._i = this._v[x];
                        break;

                    //Fx33 converts binary to decimal then stores the three digits
                    case 0x0033:
                        let bin = this._v[x];
                        let dec = parseInt(bin, 2);
                        let list = [dec.charAt(0),dec.charAt(1),dec.charAt(2)];
                        writeTo(this._i,list );
                        break;

                    //Fx55 stores v0 to vx in memory
                    case 0x0055:
                        let data = [];
                        for(let i = 0; i <= x; i++ )
                        {
                            data[i] = this._v[i];
                        }
                        writeTo(this._i, data);
                        break;

                    //Fx65 stores memory in v0 to vx
                    case 0x0065:
                       /* for(let i = 0; i <= x; i++ )
                        {
                            this._v[i] = this._memory.readIn(this._i + i);
                        }*/
                        break;
                }
                break;

        }

        _display.dispOp(opcode); //displays the opcode on index.html?
        
        //For Counter:
        //TO BE DELETED WHEN ALL OP CODE IS DONE/ RUN FUNCTION WORKING
        //CURRENTLY USED TO TEST AND GET OUT PERM ITERATION  
        
        if(this._pc < Counter + 0x200){
        cycle();
        }
    }
}
