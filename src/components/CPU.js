/*
This defines the CPU of the chip8 emulator.
*/
var flag = 0; // has to be declared as a global variable, for testing purpose
class CPU {
    /*
    Initializes the CPU
    */
    constructor(memory, input, display) {

        this._memory = memory; //raw binary data, each are a byte
        this._input = input;
        this._display = display;
        this._v = new Uint8Array(16);        //register
        this._pc = 0x200;                    //program counter
        this._stack = new Uint16Array(16);	 //is used for subroutine
        this._sp = 0;                        //stack pointer also for subroutine
        this._I = 0;
        this.Counter = 0;   //Will be used to get out of perm iteration until op code is all done
        this.id = "";
        this._delayTimer = 0;
        this._soundTimer = 0;
        this._isRunning = false;
        this._waitingForKey = false;
        this._escape = false;
        this._spStack = [];           //for testing
        this._stateStack = [];
        this._loaded = false;


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

        this.counter();

    }


    /*
    This method resets the CPU.
    */
    reset() {
        this._isRunning = false;
        this._pc = 0x200;  // Reset program counter to start at 0x200
        this._I = 0;      // Reset index register
        this._sp = 0;      // Reset stack pointer
        this._stateStack = [];
        this._loaded = false;
        document.getElementById("inMem").innerHTML = "";
        document.getElementById("inLog").innerHTML = "";

        document.getElementById("0").innerHtml = "V0 =";
        document.getElementById("1").innerHtml = "V1 =";
        document.getElementById("2").innerHtml = "V2 =";
        document.getElementById("3").innerHtml = "V3 =";
        document.getElementById("4").innerHtml = "V4 =";
        document.getElementById("5").innerHtml = "V5 =";
        document.getElementById("6").innerHtml = "V6 =";
        document.getElementById("7").innerHtml = "V7 =";
        document.getElementById("8").innerHtml = "V8 =";
        document.getElementById("9").innerHtml = "V9 =";
        document.getElementById("A").innerHtml = "VA =";
        document.getElementById("B").innerHtml = "VB =";
        document.getElementById("C").innerHtml = "VC =";
        document.getElementById("D").innerHtml = "VD =";
        document.getElementById("E").innerHtml = "VE =";
        document.getElementById("F").innerHtml = "VF =";

        document.getElementById("I").innerHtml = "Adress I =";
        document.getElementById("PC").innerHtml = "Program Counter =";
        document.getElementById("S").innerHtml = "Stack Pointer =";
        document.getElementById("sound").innerHtml = "Sound Timer =";
        document.getElementById("delay").innerHtml = "Delay Timer =";



        /*
        defining new arrays so there is no need for the following:
        // Clear display
        // Clear stack
        // clear register V0-VF
        // clear memory
        // clear keyboard buffer
        */
        this._display.clearDisp();
        this._display.displayChange();
        this._stack = new Uint16Array(16);
        this._v = new Uint8Array(16);
        this._memory = new Memory();
        this._input.clear();

        //set Timers
        this._delayTimer = 0;
        this._soundTimer = 0;
    }


    counter()
    {

        let audio = new Audio('beep.mp3');

        let a = this;
        setInterval( function()
        {
            //Update delay timer
            if(a._delayTimer > 0){
                --a._delayTimer;
            }

            //Update sound timer
            if(a._soundTimer > 0){
                if(a._soundTimer === 1){
                    audio.play();
                }
                --a._soundTimer;
            }
            a._display.dispReg(a._soundTimer,"O");
            a._display.dispReg(a._delayTimer,"L");
        },17)
    }


    pause() {
      this._isRunning = false;
      this._escape = true;
      //cancelAnimationFrame(this.id);
    }

    isPaused() {
      return !this._isRunning;
    }


    stepBackward() {
      pause();

      if (this._stateStack.length != 1) {
      this.revert();
      } else {
        alert("Cannot Step Further Back");
        }
    }


    revert() {
      //prevState = {mem: this._memory._mem, disp: this._display._disp, v: this._v.slice(), pc: this._pc, stack: this._stack.slice(), sp: this._sp, i: this._I};
      this._waitingForKey = false;
      this._escape = true;
      var prevState = this._stateStack.pop();
      this._stack = prevState.stack;
      this._sp = prevState.sp;
      this._v = prevState.v;
      this._display._disp = prevState.disp;
      this._I = prevState.i;
      this._pc = prevState.pc;
      this._memory._mem = prevState.mem;
      this._display.displayChange();
      this._display.dispMem(this._memory._mem);
      for(let i = 0; i < 16; i++)
      {
          this._display.dispReg(this._v[i], i.toString(16).toUpperCase());
      }
      this._display.dispReg(this._I, "I");
      this._display.dispReg(this._pc, "P");
      this._display.dispReg(this._sp,"S");
      this._display.dispReg(this._soundTimer,"O");
      this._display.dispReg(this._delayTimer,"L");

    }


    stepForward() {
      if (this._waitingForKey) {
        alert("waiting for key press...");
        return;
      }

      this.pause();
      this.cycle();
    }


    // testing implementations starts here
    opcodetest(_opcode) {
       flag = 1;
       _opcode = parseInt(_opcode);
       let test = new Uint8Array(2);
       test[0] = _opcode >> 8;
       test[1] = _opcode;
       this._memory.writeTo(0, this._fontsets);
       this._memory.writeTo(this._pc, test);
       this._display.dispMem( this._memory.memDump());
       this.Counter = test.byteLength + 0x200;
       this._isRunning = true;
       _opcode = this._memory.readIn(this._pc) << 8 | this._memory.readIn(this._pc + 1);
       let dummypc = this._pc + 2;
       var dummyv = this._v.slice(0);
       this.execute(_opcode);
       BtestOpcode(_opcode, this._v, dummyv, this._display, this._pc, dummypc, this._stack, this._sp, this._I, this._Memory, this._delayTimer, this._soundTimer, this._input);
       this._display.displayChange();
        for(let i = 0; i < 16; i++)
        {
            this._display.dispReg(this._v[i], i.toString(16).toUpperCase());
        }
       this._display.dispMem( this._memory.memDump());
    }


    //unit testing
    Utest(){
      UtestOpcode(this._v, this._display, this._pc, this._stack, this._sp, this._I, this._Memory, this._delayTimer, this._soundTimer, this._input);
    }


    //Behaviour testing
    filetest(){
      flag = 1;
      let self = this;
      this._isRunning = true;
      this._waitingForKey = false;
      requestAnimationFrame(function run() {
        // console.log(self.isrunning, self.pc, self.Counter);
            if (self._isRunning && self._pc < self.Counter) {
              self.test();
              self.id = requestAnimationFrame(run);
          }
      });
    }


    test(){
      let opcode = this._memory.readIn(this._pc) << 8 | this._memory.readIn(this._pc + 1);
      let dummypc = this._pc + 2;
      var dummyv = this._v.slice(0);
      this.execute(opcode)
      BtestOpcode(opcode, this._v, dummyv, this._display, this._pc, dummypc, this._stack, this._sp, this._I, this._memory, this._delayTimer, this._soundTimer, this._input);
      this._display.displayChange();
        for(let i = 0; i < 16; i++)
        {
            this._display.dispReg(this._v[i], i.toString(16).toUpperCase());
        }
      this._display.dispMem( this._memory.memDump());
        this._display.dispReg(this._I, "I");
        this._display.dispReg(this._pc, "P");
        this._display.dispReg(this._sp,"S");
        this._display.dispReg(this._soundTimer,"O");
        this._display.dispReg(this._delayTimer,"L");
      if(this._delayTimer > 0){
          --this._delayTimer;
      }
      if(this._soundTimer > 0){
          if(this.sound_timer== 1){
              //have it to print BEEP for now
              console.log("BEEP!\n");
          }
              --this._soundTimer;
      }
  }
    // testing implementations ends here


    /*
    This method loads the program into the CPU
    */
     loadProgram(game) {
         const reader = new FileReader();
         let program;
         let a = this;
         let done = false;
         reader.readAsArrayBuffer(game);

         function read(callback){
             reader.onload = function (e){
                 program = new Uint8Array(reader.result);
                 a._memory.writeTo(0,a._fontsets); // load fontsets
                 a._memory.writeTo(0x200, program);
                 a._display.dispMem( a._memory.memDump());
                 a.Counter = program.byteLength + 0x200;
                 var prevState = {mem: a._memory._mem.slice(), disp: a._display._disp.slice(), v: a._v.slice(), pc: a._pc, stack: a._stack.slice(), sp: a._sp, i: a._I};
                 a._stateStack.push(prevState);
                 callback(true);
                 //this.loop();
             };
         }

         read(function(bool){
             a._loaded = bool;
         });
    }


    loop() {
         if(!this._loaded)
         {
             let a = this;
             setTimeout(function(){a.loop();}, 100);
             return;
         }
      let self = this;
      this._isRunning = true;
      this._waitingForKey = false;
      requestAnimationFrame(function run() {
          for(let i = 0; i < 10; i++)
            {
                if (self._isRunning && self._pc < self.Counter) {
                    self.cycle();
                }
            }
          if (self._isRunning && self._pc < self.Counter) {
              self.id = requestAnimationFrame(run);
          }

      });
    }


    cycle() {
        //Every first and the second array are to be together to create opcode
        //so we move the first one by 8bits and let the second one stay to get 0xFFFF;
        //e.g. 12 32 42 52 63 77 = 0x1232 on the first opcode, 0x4252 on the second opcode etc..

        let opcode;
        opcode = this._memory.readIn(this._pc) << 8 | this._memory.readIn(this._pc + 1);
        this.execute(opcode);

        this._display.dispReg(this._pc, "P");
        this._display.dispReg(this._sp,"S");
    }


    /*
    This method executes a given opcode
    */
    execute(opcode) {
        var prevState = {mem: JSON.parse(JSON.stringify(this._memory._mem)), disp: JSON.parse(JSON.stringify(this._display._disp)), v: JSON.parse(JSON.stringify(this._v)), pc: this._pc, stack: JSON.parse(JSON.stringify(this._stack)), sp: this._sp, i: this._I};
        if (this._stateStack.length > 100) {
          this._stateStack.length = 0;
        }
        this._stateStack.push(prevState);

        this._pc += 2;
        var x = (opcode & 0x0F00) >> 8; // isolate variable x from opcode
        var y = (opcode & 0x00F0) >> 4; // isolate variable y from opcode

        switch (opcode & 0xF000) { //grab the first nibble

            case 0x0000:
                switch (opcode) {
                    //  0NNN (ignored by modern interpreters)
                    case 0x00E0: //	00E0 Clears Screen
                        this._display.clearDisp();
                        this._display.displayChange();
                        break;

                    //	00EE Returns from Subroutine
                    case 0x00EE:

                        this._pc = this._stack[--this._sp];
                        break;
                }
                break;

            //	1NNN Jumps to address NNN *Done*
            case 0x1000:

                this._pc = opcode & 0x0FFF;
                break;

            //  2NNN Calls subroutine at NNN
            case 0x2000:
                this._stack[this._sp] = this._pc;
                this._sp++;
                this._pc = opcode & 0x0FFF;
                break;
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
                if (this._v[x] === this._v[y]) {
                    this._pc += 2;
                }
                break;

            //  6xkk; Set Vx = kk
            case 0x6000:
                this._v[x] = opcode & 0xFF;
                this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                break;

            //  7xkk; Set Vx = Vx + kk
            case 0x7000:
                var val = (opcode & 0x00FF);
                val += this._v[x];
                while (val > 255) {
                    val -= 256;
                }
                this._v[x] = val;
                this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                break;

            case 0x8000:
                let temp;
                switch (opcode & 0x000F) {
                    // 8xy0; Set Vx = Vy
                    case 0x0000:
                        this._v[x] = this._v[y];
                        this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                        break;

                    // 8xy1; Set Vx = Vx OR Vy
                    case 0x0001:
                        this._v[x] |= this._v[y];
                        this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                        break;

                    // 8xy2; Set Vx = Vx AND Vy
                    case 0x0002:
                        this._v[x] &= this._v[y];
                        this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                        break;

                    // 8xy3; Set Vx = Vx XOR Vy
                    case 0x0003:
                        this._v[x] ^= this._v[y];
                        this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                        break;

                    // 8XY4 Set Vx = Vx + Vy, set VF = carry.
                    case 0x0004:
                        /*
                            Adds VY to VX.
                            VF is set to 1 when there's a carry,
                            and to 0 when there isn't.
                        */
                        temp = this._v[x] + this._v[y]
                        if ( temp > 255){
                            this._v[0xF] = 1;
                            this._v[x] = temp - 256;
                        } else {
                            this._v[0xF] = 0;
                            this._v[x] = temp;
                        }
                        this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                        break;

                    // 8XY5 Set Vx = Vx - Vy, set VF = NOT borrow.
                    case 0x0005:
                        /*
                            VY is subtracted from VX.
                            VF is set to 0 when there's a borrow,
                            and 1 when there isn't.
                        */
                        temp= this._v[x] - this._v[y];
                        if ( temp < 0){
                            this._v[0xF] = 0;
                            this._v[x] = temp + 256;
                        } else {
                            this._v[0xF] = 1;
                            this._v[x] = temp;
                        }
                        this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                        break;

                     //8XY6 Set Vx = Vx SHR 1.
                    case 0x0006:
                        /*
                            Stores the least significant bit of VX in VF
                            and then shifts VX to the right by 1
                        */
                        this._v[0xF] = this._v[x] & 0x1;
                        this._v[x]>>=1;
                        this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                        break;

                    //8XY7 Set Vx = Vy - Vx, set VF = NOT borrow.
                    case 0x0007:
                        /*
                            Sets VX to VY minus VX.
                            VF is set to 0 when there's a borrow,
                            and 1 when there isn't.
                        */
                        temp= this._v[y] - this._v[x];
                        if ( temp < 0){
                            this._v[0xF] = 0;
                            this._v[x] = temp + 256;
                        } else {
                            this._v[0xF] = 1;
                            this._v[x] = temp;
                        }
                        this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                        break;

                    //8XYE Set Vx = Vx SHL 1.
                    case 0x000E:
                        /*
                            Stores the most significant bit of VX in VF
                            and then shifts VX to the left by 1.
                        */
                        this._v[0xF] = this._v[x] & 0xF000;
                        this._v[x]<<=1;
                        this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                        break;

                }
                break;

                // 9XY0 Skip next instruction if Vx != Vy.
                case 0x9000:
                /*
                    Skips the next instruction if VX doesn't equal VY.
                    (Usually the next instruction is a jump to skip a code block)
                */
                if(this._v[x] != this._v[y]){
                    this._pc += 2;
                }
                break;

            // ANNN Set I = nnn.
            case 0xA000:
                /*
                    Sets I to the address NNN.
                */
                this._I = opcode & 0x0FFF ;
                this._display.dispReg(this._I, "I");
                break;

            // BNNN sets the pc to nnn + v0
            case 0xB000:
                this._pc =((opcode) & 0x0FFF) + this._v[0];
                break;

            //Cxkk generates random number between 0 and 255
            case 0xC000:
                let rand =Math.floor(Math.random() * Math.floor(256));
                this._v[x] = (rand & (opcode & 0x00FF));
                this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                break;

            //Dxyn draws display;
            case 0xD000:
                let binary = 0;
                let height = this._v[y];
                let width = this._v[x];
                this._v[0xF] = 0;
                let h = opcode & 0x000F;
                let a = this
                let run = function( w, y, i)
                {

                    let x = w;
                    if(i == h)
                        return;
                    if(y > 31)
                        y = 0;

                    binary = a._memory.readIn(a._I + i);
                    for(let j = 0; j < 8; j++)
                    {
                        if(x > 63)
                            x = 0;

                        if( a._display.modDisp(x, y, binary))
                            a._v[0xF] = 1;
                        binary <<= 1;
                        x++;
                    }

                    y++;
                    i++;

                    setTimeout(run(w,y,i), 1);

                }
                run(width, height, 0);
                break;

            case 0xE000:
                switch (opcode & 0x000F) {
                    //Ex9E skips next instruction if key found at vx
                    case 0x000E:
                        if(this._input.isPressed())
                        {
                            let key = this._input.getCode();
                            if(key == this._v[x] )
                            {

                                this._pc += 2;
                            }

                        }


                        break;

                    //ExA1 checks if key is stored skips if not
                    case 0x0001:

                            let key = this._input.getCode();
                            if(key != this._v[x] )
                            {
                                this._pc += 2;
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
                        this._display.dispReg(this._v[x], x.toString(16).toUpperCase());
                        break;


                    case 0x000A://pauses program until key is pressed
                        this.pause();
                        this._input.clear();
                        this._waitingForKey = true;
                        let press = false;
                        let a = this;
                        let pos = (opcode & 0x0F00);
                        this._escape = false;
                        this._v[x] = 0;

                        let hold =  function()
                        {

                            if (a._escape) {
                              return;
                            }
                            press = a._input.check();
                            if(press)
                            {
                              if(flag ==1){
                                a._v[x] = a._input.getCode();
                                a.filetest();
                                return;}
                              else{
                                a._v[x] = a._input.getCode();
                                a.loop();
                                return;
                              }
                            }
                            setTimeout(hold, 1);

                        }
                        hold();




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
                        this._I += this._v[x];
                        this._display.dispReg(this._I, "I");
                        break;

                    //Fx29 sets I to location of sprite for fontsets
                    case 0x0029:
                        this._I = this._v[x] * 5;
                        this._display.dispReg(this._I, "I");
                        break;

                    //Fx33 converts binary to decimal then stores the three digits
                    case 0x0033:
                        let bin = this._v[x];
                        let m = [];
                        for(let i = 3; i > 0; i--)
                        {
                            m[i-1] = parseInt(bin % 10);
                            bin /= 10;
                        }
                        this._memory.writeTo(this._I, m);
                        //this._display.dispMem();

                        break;

                    //Fx55 stores v0 to vx in memory
                    case 0x0055:
                        let data = [];
                        for(let i = 0; i <= x; i++ )
                        {
                            data[i] = this._v[i];
                        }
                        this._memory.writeTo(this._I, data);
                        //this._display.dispMem();
                        break;

                    //Fx65 stores memory in v0 to vx
                    case 0x0065:
                       for(let i = 0; i <= x; i++ )
                        {
                            this._v[i] = this._memory.readIn(this._I + i);
                            this._display.dispReg(this._v[i], i.toString(16).toUpperCase());
                        }

                        break;
                }
                break;

        }
        this._display.dispOp(opcode);
    }
}
