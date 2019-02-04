let CPU = require("./components/CPU.js");
let Memory = require("./components/Memory.js");
let Display = require("./components/Display.js");
let Input = require("./components/Input.js");


/*
This is the generic design of the chip8 class. It will have components that
define the chip8 system.

The components are: CPU, Memory, Display, and Input.

TODO: implement methods, add methods, solidify design
*/

class chip8 {




	constructor() {
		this._memory = new Memory.constructor();
		this._display = new Display.constructor();
		this._input = new Input.constructor();
		this._cpu = new CPU.constructor(this._memory, this._input, this._display);
	}


	sum(a,b) {
		return a + b;
	}

    /*
    A method to load the chip8 program
    */
   loadProgram(program) {
     //this._cpu.loadProgram(program);
  }


  /*
  A method to start the emulator
  */
  start() {
    this._cpu.cycle();
  }


  /*
  A method to pause the emulator
  */
   pause() {
     this._cpu.pause();
  }


  /*
  A method to step the emulator forward
  */
   stepForward() {

  }


  /*
  A method to step the emulator backward
  */
  stepBackward() {

  }
}

module.exports = chip8; // this is for the jest testing
