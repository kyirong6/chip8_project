function assert(value, expected) {
    return value == expected;
}

function testLengthOfOpcode(opcode, n) {
    console.log(assert(opcode.length, n));
}  
