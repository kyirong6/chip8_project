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

function testOpcode(opcode, v, dummyv, display, pc, dummypc, stack, sp, I, Memory, delaytimer, soundtimer, input){
  console.log("pc: ", pc, ", sp: ", sp, ", I: ", I, ", delaytimer: ", delaytimer, ", soundtimer: ", soundtimer);
  var x = (opcode & 0x0F00) >> 8; // isolate variable x from opcode
  var y = (opcode & 0x00F0) >> 4; // isolate   variable y from opcode


  switch (opcode & 0xF000){

    case 0x0000:
      switch(opcode){

        case 0x00E0://check if the display was cleared
        let flag = true;
          for(var i = 0; i<display.length; i++) {
            if (display[i] != 0){flag = false}
          }
          console.log(flag);
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
        console.log(assert(I, opcode & 0x0FFF));
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
            console.log(greaterassert((I-v[x]), 0));
            break;
          case 0x0029:
            console.log(assert(I, dummyv[x]*5));
            break;
          case 0x0033:
            //implement here
            console.log(true);
            break;
          case 0x0055:
            var result = 0;
            for(let i = 0; i <= x; i++){
              if (v[i] != I[i]){
                flag = 1;
              }
            }
            if(result == 1){console.log(false);}
            if(result == 0){console.log(true);}
            break;
          case 0x0065:
            result = 0;
            for(let i = 0; i <= x; i++){
              if (v[i] != I[i]){
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
