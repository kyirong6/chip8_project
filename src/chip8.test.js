function assert(value, expected) {
    return (value == expected);
}

function _assert(value, expected){
    return (value != expected);
}

function greaterassert(value, expected){
    return (value > expected);
}

function testLengthOfOpcode(opcode, n) { //checking the length of the opcode
    console.log(assert(opcode.length, n));
}

//unit testing
function UtestOpcode(){
  var result = 1;
  this.chip2._cpu.execute(0x6001);
  var expected = 1;
  if (this.chip2._cpu._v[0]!=expected){result = 0}

  this.chip2._cpu.execute(0x6101);
  if (this.chip2._cpu._v[1]!=expected){result = 0}

  this.chip2._cpu.execute(0x6202);
  expected = 2;
  if (this.chip2._cpu._v[2]!=expected){result = 0}

  this.chip2._cpu.execute(0x00E0);
  expected = 0;
  for (var i = 0; i<this.chip2._cpu._display.length; i++){
    if (this.chip2._cpu._display[i] != expected){result = 0}}

  this.chip2._cpu.execute(0x2208);
  expected = 0x20A;
  if(this.chip2._cpu._stack[this.chip2._cpu._sp-1] != expected){result = 0}

  this.chip2._cpu.execute(0x00EE);
  expected = 0x20A;
  if(this.chip2._cpu._pc != expected){result = 0}
  expected = 0;
  if(this.chip2._cpu._sp != expected){result = 0}

  this.chip2._cpu.execute(0x1200);
  expected = 0x200;
  if(this.chip2._cpu._pc != expected){result = 0}

  this.chip2._cpu.execute(0x3001);
  expected = 0x204;
  if(this.chip2._cpu._pc != expected){result = 0}

  this.chip2._cpu.execute(0x3011);
  expected = 0x206;
  if(this.chip2._cpu._pc != expected){result = 0}

  this.chip2._cpu.execute(0x4012);
  expected = 0x20A;
  if(this.chip2._cpu._pc != expected){result = 0}

  this.chip2._cpu.execute(0x4001);
  expected = 0x20C;
  if(this.chip2._cpu._pc != expected){result = 0}

  this.chip2._cpu.execute(0x5100);
  expected = 0x210;
  if(this.chip2._cpu._pc != expected){result = 0}

  this.chip2._cpu.execute(0x7099);
  expected = 0x9A;
  if(this.chip2._cpu._v[0] != expected){result = 0}

  this.chip2._cpu.execute(0x7099);
  expected = 0x33;
  if(this.chip2._cpu._v[0]!= expected){result = 0}

  this.chip2._cpu.execute(0x8010);
  expected = 0x1;
  if(this.chip2._cpu._v[0] != expected){result = 0}

  this.chip2._cpu.execute(0x8121);
  expected = 0x3;
  if(this.chip2._cpu._v[1] != expected){result = 0}

  this.chip2._cpu.execute(0x8012);
  expected = 0x1;
  if(this.chip2._cpu._v[0] != expected){result = 0}

  this.chip2._cpu.execute(0x8013);
  expected = 0x2;
  if(this.chip2._cpu._v[0] != expected){result = 0}

  this.chip2._cpu.execute(0x8014);
  expected = 0x5;
  if(this.chip2._cpu._v[0] != expected){result = 0}

  this.chip2._cpu.execute(0x8015);
  expected = 0x2;
  if(this.chip2._cpu._v[0] != expected){result = 0}

  this.chip2._cpu.execute(0x8016);
  expected = 1;
  if(this.chip2._cpu._v[0] != expected){result = 0}

  this.chip2._cpu.execute(0x8017);
  expected = 0x2;
  if(this.chip2._cpu._v[0xF] != 1 && this.chip2._cpu._v[0] != expected){result = 0}

  this.chip2._cpu.execute(0x801E);
  expected = 0x4;
  if(this.chip2._cpu._v[0xF] != 0 && this.chip2._cpu._v[0] != expected){result = 0}

  this.chip2._cpu.execute(0x9020);
  expected = 0x22A;
  if(this.chip2._cpu._pc != expected){result = 0}

  this.chip2._cpu.execute(0xA123);
  expected = 0x123;
  if(this.chip2._cpu._I != expected){result = 0}

  this.chip2._cpu.execute(0xB200);
  expected = 0x204;
  if(this.chip2._cpu._pc != expected){result = 0}

  this.chip2._cpu.execute(0xF007);
  expected = this.chip2._cpu._delayTimer;
  if(this.chip2._cpu._v[0] != expected){result = 0}

  this.chip2._cpu.execute(0xF115);
  expected = 0x3;
  if(this.chip2._cpu._delayTimer != expected){result = 0}

  this.chip2._cpu.execute(0xF118);
  if(this.chip2._cpu._soundTimer != expected){result = 0}

  this.chip2._cpu.execute(0xF11E);
  expected = 0x126;
  if(this.chip2._cpu._I != expected){result = 0}

  this.chip2._cpu.execute(0xF955);
  let mem = this.chip2._cpu._memory.memDump();
  let data = [];
  for (let i = 0; i < 9; i++){
    if(this.chip2._cpu._v[i] != mem[this.chip2._cpu._I + i]){result = 0}
  }

  this.chip2._cpu.execute(0xF029);
  expected = 0x0;
  if(this.chip2._cpu._I != expected){result = 0}

  if(result === 1){console.log("success")}
  else{console.log("fail")}
}

//behaviour testing
function BtestOpcode(opcode, v, dummyv, display, pc, dummypc, stack, sp, _I, Memory, delaytimer, soundtimer, input){
  console.log("opcode:","0x"+opcode.toString(16), " pc: ", pc, ", sp: ", sp, ", I: ", _I, ", delaytimer: ", delaytimer, ", soundtimer: ", soundtimer);
  var x = (opcode & 0x0F00) >> 8; // isolate variable x from opcode
  var y = (opcode & 0x00F0) >> 4; // isolate   variable y from opcode


  switch (opcode & 0xF000){

    case 0x0000:
      switch(opcode){

        case 0x00E0://check if the display was cleared
        let result = true;
          for(var i = 0; i<display.length; i++) {
            if (display[i] != 0){result = false}
          }
          console.log(result);
            break;
        case 0x00EE://returns from Subroutine
          console.log(assert(pc, stack[sp --]));
          break;
      }
      break;
      case 0x1000:
        console.log(assert(pc, opcode & 0x0FFF));
        break;
      case 0x2000:
        var result = (assert(pc, opcode & 0x0FFF));
        if (result == true){console.log(assert(stack[sp-1], dummypc))}
        else(console.log("false"));
        break;
      case 0x3000:
        if (v[x] == (opcode & 0x00FF)){console.log(assert(pc, dummypc+2))}
        else {console.log(assert(pc, dummypc))}
          break;
      case 0x4000:
        if (v[x] != (opcode & 0x00FF)){console.log(assert(pc, dummypc+2))}
        else {console.log(assert(pc, dummypc))}
          break;
      case 0x5000:
        if (v[x] == v[y]){console.log(assert(pc, dummypc+2))}
        else {console.log(assert(pc, dummypc))}
          break;
      case 0x6000:
        console.log(assert(v[x], opcode & 0xFF));
        break;
      case 0x7000:
        console.log(greaterassert(256, v[x]));
        break;
      case 0x8000:
        switch (opcode & 0x000F){
          case 0x0000:
            console.log(assert(v[x], dummyv[y]));
            break;
          case 0x0001:
            console.log(assert(v[x], (dummyv[x] |= dummyv[y])));
            break;
          case 0x0002:
            console.log(assert(v[x], (dummyv[x] &= dummyv[y])));
            break;
          case 0x0003:
            console.log(assert(v[x], (dummyv[x] ^= dummyv[y])));
            break;
          case 0x0004:
            if (v[0xF] == 1) {
              result = greaterassert((dummyv[x]+dummyv[y]), 255);
              result = assert(v[x], (dummyv[x]+dummyv[y]-256));
            }
            if (v[0xF] == 0) {
              result = greaterassert(255, (dummyv[x] + dummyv[y]));
              result = assert(v[x], (dummyv[x] + dummyv[y]));
            }
            console.log(result);
            break;
          case 0x0005:
            if (v[0xF] == 0) {
              result = greaterassert(0, (dummyv[x]-dummyv[y]));
              result = assert(v[x], (dummyv[x]-dummyv[y]+256));
            }
            if (v[0xF] == 1) {
              result = greaterassert((dummyv[x] - dummyv[y]), 0);
              result = assert(v[x], (dummyv[x]-dummyv[y]));
            }
            console.log(result);
            break;
          case 0x0006:
            result = assert(v[0xF], (dummyv[x] & 0x000F));
            result = assert(v[x], dummyv[x]>>=1);
            break;
          case 0x0007:
          if (v[0xF] == 0) {
            result = greaterassert(0, (dummyv[y]-dummyv[x]));
            result = assert(v[x], (dummyv[y]-dummyv[x]+256));
          }
          if (v[0xF] == 1) {
            result = greaterassert((dummyv[y] - dummyv[x]), 0);
            result = assert(v[x], (dummyv[y]-dummyv[x]));
          }
          console.log(result);
          break;
          case 0x000E:
          result = assert(v[0xF], (dummyv[x] & 0x000F));
          result = assert(v[x], dummyv[x]<<=1);
          break;
        }
        break;
      case 0x9000:
        if (v[x] != v[y]) {
          console.log(assert(pc, dummypc+2));
          break;
        }
        else{console.log(assert(pc, dummypc))}
        break;
      case 0xA000:
        console.log(assert(_I, opcode & 0x0FFF));
        break;
      case 0xB000:
        console.log(assert((opcode & 0x0FFF), (pc - v[0])));
        break;
      case 0xC000:
        console.log(greaterassert(256, v[x]));
        break;
      case 0xD000:
        //implement here
        console.log(true);
        break;
      case 0xE000:
        switch (opcode & 0x000F){
          case 0x000E:
            if (input.isPressed()){
              if(input.getCode() == v[x]){console.log(assert(pc, dummypc+2))}
              break;
            }
            else{console.log(assert(pc, dummypc))}
            break;
          case 0x0001:
            if (input.isPressed()){
              if(input.getCode() != v[x]){console.log(assert(pc, dummypc+2))}
              break;
            }
            else{console.log(assert(pc, dummypc))}
            break;
        }
        break;
      case 0xF000:
        switch(opcode & 0x00FF){
          case 0x0007:
            console.log(assert(v[x], delaytimer));
            break;
          case 0x000A:
            //implement here
            console.log(true);
            break;
          case 0x0015:
            console.log(assert(v[x], delaytimer));
            break;
          case 0x0018:
            console.log(assert(v[x], soundtimer));
            break;
          case 0x001E:
            console.log(greaterassert((_I-v[x]), 0));
            break;
          case 0x0029:
            console.log(assert(_I, dummyv[x]*5));
            break;
          case 0x0033:
            //implement here
            console.log(true);
            break;
          case 0x0055:
            var result = 0;
            for(let i = 0; i <= x; i++){
              var val = Memory.readIn(_I+i);
              if (v[i] != val){
                result = 1;
              }
            }
            if(result == 1){console.log(false);}
            if(result == 0){console.log(true);}
            break;
          case 0x0065:
            result = 0;
            for(let i = 0; i <= x; i++){
              let val = Memory.readIn(_I+i);
              if (v[i] != Memory.readIn(_I + i)){
                result = 1;
              }
            }
            if(result == 1){console.log(false);}
            if(result == 0){console.log(true);}
            break;
        }
        break;
    }
}
