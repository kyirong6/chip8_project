class Memory {

	constructor() {
		this._mem = new ArrayBuffer(0xFFF);
	}


	write(location, value) {
		for (let i = 0; i < value.length; i++) {
			this._mem[location + i] = value[i];
		}
	}

	read(location) {
		return this._mem[location];
	}
}


//4096 (0x1000)memory locations
//chip8 emulator will occupy first 512 bytes
//most program will begin at 512 (0x1FF)
// upper most 256 bytes(0xF00 - 0xFFF) reserved for display refresh
// 96 bytes below that (0xEA0 - 0xEFF) reserved for call stack, internal use
