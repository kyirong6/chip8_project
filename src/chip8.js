
//import CPU from 'components/CPU'
//import Memory from 'components/Memory'
//import Display from 'components/Display'
//import Input from 'components/Input'


/*
This is the generic design of the chip8 class. It will have components that
define the chip8 system.

The components are: CPU, Memory, Display, and Input.

TODO: implement methods, add methods, solidify design
*/


  /*
  Initializes the emulator
  */
 function construct() {
	this._memory = new Memory();
    this._display = new Display();
    this._input = new Input();
    this._cpu = new CPU(this._memory, this._input, this._display);

  }


    /*
    A method to load the chip8 program
    */
  function loadProgram(program) {

  }


  /*
  A method to start the emulator
  */
  function start() {

  }


  /*
  A method to pause the emulator
  */
  function pause() {

  }


  /*
  A method to step the emulator forward
  */
  function stepForward() {

  }


  /*
  A method to step the emulator backward
  */
  function stepBackward() {

  }

