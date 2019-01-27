/*
This defines the CPU of the chip8 emulator.

TODO: define and implement all properties and methods.
*/
class CPU {


  /*
  Initializes the CPU
  */
  constructor(memory, input, display) {
    this._memory = memory;
    this._input = input;
    this._display = display;
    this._v = new Uint8Array(16); //register
    this._pc = 0x200;
	this._stack = new Array(16);	 //is used for subroutine
	this._sp = 0;						 // stack pointer also for subroutine
  }


  /*
  This method resets the CPU.
  */
  reset() {

  }


  /*
  This method loads the program into the CPU
  */
  loadProgram() {

  }


  /*
  This method executes a given opcode
  */
  execute(opcode) {
    this._pc += 2

    var x = (opcode & 0x0F00) >> 8; // isolate variable x from opcode
    var y = (opcode & 0x00F0) >> 4; // isolate variable y from opcode

	switch(opcode & 0xF000){ //grab the first nibble
	
		case 0x0000:
			switch(opcode){
				//  0NNN (ignored by modern interpreters)
				case 0x00E0: //	00E0 Clears Screen
				//display.clear() to be added later
				break;
			
				case 0x00EE: //	00EE Returns from Subroutine
				this._pc = this.stack[this._sp - 1];
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
			if(this._v[x] == (opcode & 0x00FF)){	//check if last 2 nibbles are equal to VX
				this._pc += 2
			}
		break;
		
		//	4XNN Skips the next instruction if VX doesn't equal NN
		case 0x4000: 
		if(this._v[x] != (opcode & 0x00FF)){	//check if last 2 nibbles are NOT equal to VX
			this._pc += 2
		}
		break;
		
	}
	
    // TODO: add switch statements to process the opcode needed
		
		
  

}
