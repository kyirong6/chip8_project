# CHIP8 PROJECT
*cmpt 276 - software engineering*

### Description:
This project consists of building a **chip8 emulator**, a **visualizer** that shows various steps of program execution, a **tool** for chip8 developers, and **2 original chip8 games**.

### Team Members:
  1. Jiho Shin
  2. Gabriel Kwong
  3. Andrew Turner
  4. Choenden Kyirong
  5. Jack Jiang


# Testing Manual
1. Open test.html file.
2. For Unit testing:
    1)click "START UNIT TESTING", If the page shows "success", It passes all test cases, otherwise shows "fail".
3. We've also implemented some useful testing methods just for our own convenience.
4. If user wants to test individual opcode:
    1) Press F12.
    2) Click START TETING INDIVIDUAL OPCODE to start a new emulator.
    3) Click CONTINUE TO NEXT OPCODE for next opcode within the same emulator.
    4) In console, this should print "true" for right performing opcodes, "false" otherwise.

5. If user wants to test a testing file:
    1) Press F12.
    2) Click Choose File.
    3) Choose the testing file.
    4) Click START TESTING FILE.
    5) In console, this should print "true" for right performing opcodes, "false" otherwise.
    note: we'll be using CONNECT4 in the games folder as a testing script for now, will implement it for the next release.

#Running Emulator
1. Open index.html file.
2. Click on Choose File on left hand side.
3. Navigate to Chip8 file games 'CONNECT4' stored in chip8_project\src\components\games
4. Program will then load and display memory usage on bottom right of screen if succesful.
5. Click start button to begin game.

#Tic Tac Toe 1st game:
 1. W to move up, S to move down, A to move left, D to move right.
 2. Turns will alternate between O and X.
 2. 1st player: Q to select and draw in current box.
 3. 2nd player: press Q again to select and draw in the current box.
 5. Align 3 of your tokens to win.


#Running Editor
1. open Editor.html
2. click on choose file
3. Select any Chip 8 program
4. Right click in the web browser, and click inspect to see the console
5. The opcode will be displayed in sentence form

*this is just a generic readme. we will update and be more specific as we go along...*
