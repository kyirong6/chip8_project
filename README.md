# CHIP8 EMULATOR - JAVASCRIPT

## Description
This project consists of building a **chip8 emulator**, a **visualizer** that shows various steps of program execution, an **assembler** as a tool for chip8 development, and **2 original chip8 games**: **mazerunner** and **tic-tac-toe**.
This project has *node_modules* dependencies.

#### Team Members:
  1. Jiho Shin
  2. Gabriel Kwong
  3. Andrew Turner
  4. Choenden Kyirong
  5. Jack Jiang


## The Emulator
#### Begin Here:
*chip8_project/src*
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
*chip8_project/src/components/games*
#### Tic-Tac-Toe:
 1. **W** to move up, **S** to move down, **A** to move left, **D** to move right.
 2. Turns will alternate between **O** and **X**.
 2. 1st player: **Q** to select and draw in current box.
 3. 2nd player: press **Q** again to select and draw in the current box.
 5. Align **3** of your tokens to win.

#### Maze Runner:
1. **W** to move up, **S** to move down, **A** to move left, **D** to move right.
2. The Runner will never stop after moving once in the beginning of the game.
2. Touching the wall will result in a startover.
3. Navigate your way to the end.


## Testing Manual
*chip8_project/src*
1. Open **test.html** file.
2. For Unit testing:
    1)click **START UNIT TESTING**, If the page shows **success**, It passes all test cases, otherwise shows **fail**.
3. We've also implemented some useful testing methods just for our own convenience.
4. If user wants to test individual opcode:
    1) Press **F12**.
    2) Click **START TETING INDIVIDUAL OPCODE** to start a new emulator.
    3) Click **CONTINUE TO NEXT OPCODE** for next opcode within the same emulator.
    4) In console, this should print **true** for right performing opcodes, **false** otherwise.

5. If user wants to test a testing file:
    1) Press **F12**.
    2) Click **Choose File**.
    3) Choose the testing file.
    4) Click **START TESTING FILE**.
    5) In console, this should print **true** for right performing opcodes, **false** otherwise.
    note: we'll be using CONNECT4 in the games folder as a testing script for now, will implement it for the next release.


## Running Editor
*chip8_project/src*
1. open **Editor.html**
2. click on **choose file** on the top left
3. Select any Chip8 program in binary file format
4. The list of opcodes will be displayed in the left box

#### To Edit:
1. in the left text box, click on the opcode you wish to change.
2. The description of this selceted opcode will be displayed, as well as the 4 digit opcode.
3. In the center textbox with 4 digit opcode, write a different opcode you wish to change to.
4. Click the edit button
5. The selected opcode will be edited to whatever you changed it to

#### To Add:
1. In the left textbox, all opcodes will have a number in their sequence
2. Click on the opcode where you wish to add a new opcode. (e.g click on the 5th if you want to add an opcode there)
4. Press add button.
5. A new opcode will be inserted to where you have clicked.

#### To Delete:
1. In the left textbox, click on the opcode you wish to delete.
2. Press delete button
