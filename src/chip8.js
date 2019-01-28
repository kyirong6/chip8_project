import CPU from 'components/CPU'
import Memory from 'components/Memory'
import Display from 'components/Display'
import Input from 'components/Input'


/*
This is the generic design of the chip8 class. It will have components that
define the chip8 system.

The components are: CPU, Memory, Display, and Input.

TODO: implement methods, add methods, solidify design
*/
class chip8 {


  /*
  Initializes the emulator
  */
  constructor() {
    this._memory = new Memory();
    this._display = new Display();
    this._input = new Input();
    this._cpu = new CPU(this._memory, this._input, this._display);
  }

  // take opcode and perform operation

  emulateCycle: function(){
    var opcode = this._memory[this.pc];
    this.pc += 2;
    switch (opcode & 0xf000){
      var x = (opcode & 0x0F00) >> 8;
      var y = (opcode & 0x00F0) >> 4;

      case 0x5000:
        if(this._v[x] == this._v[y]){
          this.pc += 2;
        }
        break;
      case 0x6000:
        this._v[x] = opcode & 0xFF
        break;

      case 0x7000:
        var val = (opcode & 0xFF + this._v[x]);
        if (val > 255){ val -= 256;}
        this._v[x] = val;
        break;

      case 0x8000:
        switch(opcode & 0x000f){
          case 0x0000:
            this._v[x] = this._v[y];
            break;

          case 0x0001:
            this._v[x] |= this._v[y];
            break;

          case 0x0002:
            this._v[x] &= this._v[y];

          case 0x0003:
            thisv.[x] ^= this._v[y];
        }
    }


    /*
    A method to load the chip8 program
    */
  loadProgram(program) {

  }


  /*
  A method to start the emulator
  */
  start() {

  }


  /*
  A method to pause the emulator
  */
  pause() {

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
