function assert(value, expected) {
    return value == expected;
}

function _assert(value, expected){
    return value != expected;
}

function greaterassert(value, expected){
    return value > expected;
}

function testLengthOfOpcode(opcode, n) { //checking the length of the opcode
    console.log(assert(opcode.length, n));
}

function testOpcode(opcode, v, display, pc, stack, sp, I, Memory, delaytimer, soundtimer){ //making sure each opcode performs the correct operation
  var x = (opcode & 0x0F00) >> 8; // isolate variable x from opcode
  var y = (opcode & 0x00F0) >> 4; // isolate   variable y from opcode


  switch (opcode & 0xF000){

    case 0x0000:
      switch(opcode){

        case 0x00E0://check if the display was cleared
          if (display == undefined || display.length == 0) {
            console.log("True");
            break;
          }
        case 0x00EE://returns from Subroutine
          console.log(assert(opcode, stack[sp --]));
          break;
      }

      case 0x1000:
        console.log(assert(pc, opcode & 0x0FFF));
        break;
      case 0x2000:
        let result = (assert(pc, opcode & 0x0FFF));
        if (result == true){console.log(assert(stack[sp-1], 514))}
        else(console.log("false"));
        break;
      case 0x3000:
        if (v[x] == (opcode & 0x00FF)){console.log(assert(pc, 516))}
          break;
      case 0x4000:
        if (v[x] != (opcode & 0x00FF)){console.log(asert(pc, 516))}
          break;
      case 0x5000:
        if (v[x] == v[y]){console.log(assert(pc, 516))}
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
            console.log(assert(v[x], v[y]));
            break;
          case 0x0001:
            console.log(assert(v[x], (v[x] |= v[y])));
            break;
          case 0x0002:
            console.log(assert(v[x], (v[x] &= v[y])));
            break;
          case 0x0003:
            console.log(assert(v[x], (v[x] ^= v[y])));
            break;
          case 0x0004:
            if (v[0xF] == 1) {
              console.log(greaterassert(1, (v[x] - v[y])));
              break;
            }
            if (v[0xF] == 0) {
              console.log(greaterassert((v[x] - v[y]), 0));
              break;
            }
          case 0x0005:
            if (v[0xF] == 1) {
              console.log(greaterassert(256, (v[x] + v[y])));
              break;
            }
            if (v[0xF] == 0) {
              console.log(greaterassert((v[x] + v[y]), 255));
              break;
            }
          case 0x0006:
            if (v[0xF] != 1 || 0) {
              console.log("False");
              break;
            }
          case 0x0007:
            if (v[0xF] == 1) {
              console.log(greaterassert((v[y] - v[x]), -1));
              break;
            }
          case 0x000E:
            console.log(greaterassert(256, v[x]));
            break;
        }
      case 0x9000:
        if (v[x] != v[y]) {
          console.log(_assert(0x200, pc));
          break;
        }
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
        console.log("true");
      case 0xE000:
        switch (opcode & 0x000F){
          case 0x000E:
          console.log("true");
          break;
          case 0x0001:
          console.log("true");
          break;
        }
      case 0xF000:
        switch(opcode & 0x00FF){
          case 0x0007:
            console.log(assert(v[x], delaytimer));
          case 0x000A:
            console.log("true");
          case 0x0015:
            console.log(assert(v[x], delaytimer));
          case 0x0018:
            console.log(assert(v[x], soundtimer));
          case 0x001E:
            console.log(greaterassert((I-v[x]), 0));
          case 0x0029:
            console.log(assert(I, v[x]));
          case 0x0033:
            console.log("true");
          case 0x0055:
            let flag = 0;
            for(let i = 0; i <= x; i++){
              if (v[i] != I[i]){
                flag = 1;
              }
            }
            if(flag == 1){console.log("false");}
            if(flag == 0){console.log(true);}
          case 0x0065:
            let flag1 = 0;
            for(let i = 0; i <= x; i++){
              if (v[i] != I[i]){
                flag1 = 1;
              }
            }
            if(flag1 == 1){console.log("false");}
            if(flag1 == 0){console.log(true);}
        }
    }
}
