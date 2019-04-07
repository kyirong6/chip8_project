class Memory {

	constructor() {
		this._mem = new ArrayBuffer(0xFFF);
	}


	 writeTo(location, value) {
		for (let i = 0; i < value.length; i++) {
			this._mem[location + i] = value[i];
		}
	}

	 readIn(location) {
		return this._mem[location];
	}

	memDump()
	{
		return this._mem;
	}
}


// module.exports.Memory = Memory;
//4096 (0x1000)memory locations
//chip8 emulator will occupy first 512 bytes
//most program will begin at 512 (0x1FF)
// upper most 256 bytes(0xF00 - 0xFFF) reserved for display refresh
// 96 bytes below that (0xEA0 - 0xEFF) reserved for call stack, internal use
