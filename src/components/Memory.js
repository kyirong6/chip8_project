class Memory {
	
}

//4096 (0x1000)memory locations
//chip8 emulator will occupy first 512 bytes
//most program will begin at 512 (0x1FF)
// upper most 256 bytes(0xF00 - 0xFFF) reserved for display refresh
// 96 bytes below that (0xEA0 - 0xEFF) reserved for call stack, internal use