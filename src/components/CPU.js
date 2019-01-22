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
}
