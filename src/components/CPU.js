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
    this._v = new Uint8Array(16);
    this._pc = 0x200;
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

    // TODO: add switch statements to process the opcode needed
	//Jiho : 0NNN , 00E0, 00EE, 1NNN, 2NNN, 3XNN, 4XNN
  }

}
