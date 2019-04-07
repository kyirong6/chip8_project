# CHIP8 EMULATOR - JAVASCRIPT

## Description
This project consists of building a **chip8 emulator**, a **visualizer** that shows various steps of program execution, a **tool** for chip8 developers, and **2 original chip8 games**.

#### Team Members:
  1. Jiho Shin
  2. Gabriel Kwong
  3. Andrew Turner
  4. Choenden Kyirong
  5. Jack Jiang


## The Emulator
#### Begin Here:
1. Open **index.html** file.
2. Click on **choose file** and select a chip8 ROM of your choice or select a game from the folder **chip8_project/src/components/games**
3. Click on **start** to run the emulator.

#### Buttons:
1. **START:** Once a chip8 ROM has been selected, this button will run the emulator.
2. **PAUSE:** Halts the program. The program will resume upon pressing **START**.
3. **RESTART:** Begins and resets the program from the beginning.
4. **STEP BACKWARDS:** Pauses the program and reverses the emulator to its pervious states opcode by opcode.
5. **STEP FORWARDS:** Pauses the program and runs the emulator to its next state opcode by opcode.
6. **HELP:** Displays a brief instruction set.

#### Visualizer:
1. **OPCODE LOG:** Displays all executed opcodes in real time appending them into the bottom of the log.
2. **REGISTERS:** Displays all values inside each registers in real time.
3. **COUNTERS & POINTERS:** Displays the values of the counters and pointers in real time.
4. **MEMORY:** Displays the contents of memory in real time.


## The Games

#### mazerunner
An original chip8 game where the user must reach the end of the maze by correctly changing direction of the automatic movement without hitting any of the walls.  Each level increases in difficulty. There are 3 levels.

#### tic-tac-toe
A two player game in which users play tic-tac-toe against each other. 


## Testing Manual
We created a file called "test.html", which will take one opcode as an input to the emulator, here's a detailed step on how the testing works:
1. Open test.html file.
2. click on "Start".
3. Enter an opcode with prefix "0x".
4. the screen will then display the opcode, what has changed to the register and memory.

# Connect 4 2 Player game
 *CONNECT4 USED FOR TESTING PURPOSES FOUND AT https://www.zophar.net/pdroms/chip8.html*
 1.Align 4 of your tokens to win.
 2.Turns will alternate between solid and empty.
 3.Q to move left and E to move right.
 4.W to place token.

# Running Editor
1. open Editor.html
2. click on choose file 
3. Select any Chip 8 program
4. Right click in the web browser, and click inspect to see the console
5. The opcode will be displayed in sentence form
