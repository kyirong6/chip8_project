const chip8 = require('./chip8');

test('Testing an instance of chip8 class for its properties and functions', () => {
	let chip8_1 = new chip8();	
	expect(chip8_1.sum(1,2)).toBe(3);
});