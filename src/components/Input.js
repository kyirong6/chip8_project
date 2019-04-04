class Input {

    constructor(){

        this._isKeyPressed = false; // gets set whenever a key is pressed (boolean)
        this._keyPressed = 0xFF;
        document.addEventListener('keyup', (event)=>
        {
            this._isKeyPressed = false;
        }
        );
        document.addEventListener('keydown', (event)=>
        {

            switch (event.keyCode)
            {
                case 49://1
                    this._keyPressed = 0x0;
                    this._isKeyPressed = true;
                    break;
                case 50://2
                    this._keyPressed = 0x1;
                    this._isKeyPressed = true;
                    break;
                case 51://3
                    this._keyPressed = 0x2;
                    this._isKeyPressed = true;
                    break;
                case 52://4
                    this._keyPressed = 0x3;
                    this._isKeyPressed = true;
                    break;
                case 81://Q
                    this._keyPressed = 0x4;
                    this._isKeyPressed = true;
                    break;
                case 87://W
                    this._keyPressed = 0x5;
                    this._isKeyPressed = true;
                    break;
                case 69://E
                    this._keyPressed = 0x6;
                    this._isKeyPressed = true;
                    break;
                case 82://R
                    this._keyPressed = 0x7;
                    this._isKeyPressed = true;
                    break;
                case 65://A
                    this._keyPressed = 0x8;
                    this._isKeyPressed = true;
                    break;
                case 83://S
                    this._keyPressed = 0x9;
                    this._isKeyPressed = true;
                    break;
                case 68://D
                    this._keyPressed = 0xA;
                    this._isKeyPressed = true;
                    break;
                case 70://F
                    this._keyPressed = 0xB;
                    this._isKeyPressed = true;
                    break;
                case 90://Z
                    this._keyPressed = 0xC;
                    this._isKeyPressed = true;
                    break;
                case 88://X
                    this._keyPressed = 0xD;
                    this._isKeyPressed = true;
                    break;
                case 67://C
                    this._keyPressed = 0xE;
                    this._isKeyPressed = true;
                    break;
                case 86://V
                    this._keyPressed = 0xF;
                    this._isKeyPressed = true;
                    break;
                default:
                    this._keyPressed = 0xFF;
            }
        });
    }

  check()
  {
      if(this._keyPressed != 0xFF)
      {
          return true;
      }
      else
          return false
  }
  clear()
  {
      this._keyPressed = 0xFF;
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
