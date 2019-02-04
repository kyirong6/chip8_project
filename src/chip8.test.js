const chip8 = require('./chip8');

test('Testing an instance of chip8 class for its properties and functions', () => {
	let chip8_1 = new chip8();	
	expect(typeof(chip8_1)).toBe(chip8);
});