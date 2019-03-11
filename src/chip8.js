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
        this._assembler = new Assembler(this._memory, this._input, this._display);
  }


	 //testing implementations starts here
	 opcodetest(_opcode){
			this._cpu.opcodetest(_opcode);
		}
	 filetest(){
 		 this._cpu.filetest();
 	 }
	 //testing implementations ends here
	 
    /*
    A method to load the chip8 program
    */
   loadProgram(game) {
     this._cpu.loadProgram(game);
  }

  /*
  A method to start the emulator
  */
  start() {
    this._cpu.loop();
  }


  /*
  A method to pause the emulator
  */
   pause() {
     this._cpu.pause();
  }


	/*
  A method to restart the emulator
  */
	restart() {
		this._cpu.reset();
	}


  /*
  A method to step the emulator forward
  */
   stepForward() {
		 this._cpu.stepForward();
  }


  /*
  A method to step the emulator backward
  */
  stepBackward() {
		this._cpu.stepBackward();
  }

  //Assembler functions
  readProgram(game) {
    this._assembler.readProgram(game);
  }
  //read it in assembler, used only by Editor.html

  startRead(){
    this._assembler.cycle();
  }

  updateEditor(number){
    this._assembler.updateEditor(number);
  }
}

// module.exports = chip8; // this is for the jest testing
