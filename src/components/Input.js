class Input {

    /*
        not sure if this is right, just a very rough idea to get started with
        CHANGE WHOLE CODE CODE IF YOU WISH !!!! there could be a better was for us 
        Refference from:
        https://www.raduangelescu.com/chip8emulatorjavascript.html
    */

    constructor(){

        this._keyBoardBuffer = new Uint16Array(16) // keyboard buffer (new Uint16Array(16);)
        this._isKeyPressed = false // gets set whenever a key is pressed (boolean)
        
    }

    setKeys(){ // might not be a good function name 
         /*
            receive a key pressed or released event and then map it to CHIP-8 keyboard “space”,
            store it in the keyboard buffer and update our KEY_PRESSED variable 
            (this notes if there have been any key presses):
        */

        let charStr = String.fromCharCode(evt.which);
        let value   = (evt.type == 'keydown') ? true : false;

        index =
            {
                '1': 0x1,'2': 0x2,'3': 0x3,'4': 0x4,
                'Q': 0x4,'W':0x5,'E': 0x6,'R': 0xD,
                'A': 0x7,'S':0x8,'D': 0x9,'F': 0xE,
                'Z': 0xA,'X':0x0,'C': 0xB, 'V':0xF,
            }[charStr];

        if(index !== undefined){
            this._keyBoardBuffer[index] = value;
        }

        this._isKeyPressed = this._keyBoardBuffer.reduce( ((prevValue,currentValue) => (prevValue | currentValue)) )

    }

}

// module.exports.Input = Input;
