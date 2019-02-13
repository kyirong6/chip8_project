/*
This is the generic design of the chip8 class. It will have components that
define the chip8 system.

The components are: CPU, Memory, Display, and Input.

TODO: implement methods, add methods, solidify design
*/
class chip8 {




	constructor() {
		this._memory = new Memory();
		this._display = new Display();
		this._input = new Input();
    this._cpu = new CPU(this._memory, this._input, this._display);

    //fontsets
    this._fontsets = [
      0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
      0x20, 0x60, 0x20, 0x20, 0x70, // 1
      0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
      0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
      0x90, 0x90, 0xF0, 0x10, 0x10, // 4
      0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
      0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
      0xF0, 0x10, 0x20, 0x40, 0x40, // 7
      0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
      0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
      0xF0, 0x90, 0xF0, 0x90, 0x90, // A
      0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
      0xF0, 0x80, 0x80, 0x80, 0xF0, // C
      0xE0, 0x90, 0x90, 0x90, 0xE0, // D
      0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
      0xF0, 0x80, 0xF0, 0x80, 0x80  // F
  ];
  this._memory.writeTo(0,this._fontsets); // load fontsets

	}


	sum(a,b) {
		return a + b;
	}



    /*
    A method to load the chip8 program
    */
   loadProgram() {
     this._cpu.loadProgram();
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

// module.exports = chip8; // this is for the jest testing
