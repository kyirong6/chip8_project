class Input {

    /*
        not sure if this is right, just a very rough idea to get started with
        CHANGE WHOLE CODE CODE IF YOU WISH !!!! there could be a better was for us 
        Refference from:
        https://www.raduangelescu.com/chip8emulatorjavascript.html
    */

    constructor(){

        this._keyBoardBuffer = new Uint16Array(16) // keyboard buffer (new Uint16Array(16);)
        this._isKeyPressed = false; // gets set whenever a key is pressed (boolean)
        this._keyPressed = 0;
        document.addEventListener('keyup', (event)=>
        {
            this._isKeyPressed = false;
            console.log(this._isKeyPressed);
        }
        );
        document.addEventListener('keydown', (event)=>
        {

            switch (event.keyCode)
            {
                case 49://1
                    this._keyPressed = 49;
                    this._isKeyPressed = true;
                    break;
                case 50://2
                    this._keyPressed = 50;
                    this._isKeyPressed = true;
                    break;
                case 51://3
                    this._keyPressed = 51;
                    this._isKeyPressed = true;
                    break;
                case 52://4
                    this._keyPressed = 52;
                    this._isKeyPressed = true;
                    break;
                case 81://Q
                    this._keyPressed = 81;
                    this._isKeyPressed = true;
                    break;
                case 87://W
                    this._keyPressed = 87;
                    this._isKeyPressed = true;
                    break;
                case 69://E
                    this._keyPressed = 69;
                    this._isKeyPressed = true;
                    break;
                case 82://R
                    this._keyPressed = 82;
                    this._isKeyPressed = true;
                    break;
                case 65://A
                    this._keyPressed = 65;
                    this._isKeyPressed = true;
                    break;
                case 83://S
                    this._keyPressed = 83;
                    this._isKeyPressed = true;
                    break;
                case 68://D
                    this._keyPressed = 68;
                    this._isKeyPressed = true;
                    break;
                case 70://F
                    this._keyPressed = 70;
                    this._isKeyPressed = true;
                    break;
                case 90://Z
                    this._keyPressed = 90;
                    this._isKeyPressed = true;
                    break;
                case 88://X
                    this._keyPressed = 88;
                    this._isKeyPressed = true;
                    break;
                case 67://C
                    this._keyPressed = 67;
                    this._isKeyPressed = true;
                    break;
                case 86://V
                    this._keyPressed = 86;
                    this._isKeyPressed = true;
                    break;
                default:
                    this._keyPressed = 0;
            }
            console.log(this._isKeyPressed);
        });
    }

  check()
  {
      if(this._keyPressed != 0)
      {
          return true;
      }
      else
          return false
  }
  clear()
  {
      this._keyPressed = 0;
  }
  getCode()
  {
      return this._keyPressed;
  }
  isPressed()
  {
      return this._isKeyPressed;
  }

}


// module.exports.Input = Input;
