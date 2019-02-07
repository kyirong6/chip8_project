class Display {

	constructor() {
		this._disp = this.buildArray();
		this.displayChange();

	}

	buildArray()
	{
		let t = 1;
		let arr = new Array(64);
		for(let i = 0; i < 32; i++)
		{
			arr[i] = new Array(32);
			for(let j = 0; j < 64; j++)
			{
				arr[i][j] = 1;

			}
		}
		return arr;
	}

	displayChange()
	{

		for(let i = 0; i < 32; i++)
		{

			for(let j = 0; j < 64; j++)
			{
				let cell = document.getElementById("cell"+i+"-"+j);

				if(this._disp[i][j] == 0)
				{
					cell.style.backgroundColor = 'black';
				}
				else if(this._disp[i][j] == 1)
				{
					cell.style.backgroundColor = 'white';
				}

			}
		}

	}

	clearDisp()
	{
		for(let i = 0; i < 32; i++)
		{

			for(let j = 0; j < 64; j++)
			{
				this._disp[i][j] = 0;

			}
		}
	}

	dispOp(opcode)
	{
		let block = document.getElementById("inLog");

		let text = document.createTextNode(opcode);
		block.appendChild(text);
		let breakLine = document.createElement('br');
		block.appendChild(breakLine);
	}

	dispMem(mem)
	{
		let holder;

		for(let i = 0; i <= mem.byteLength; i++)
		{
			let block = document.getElementById("inMem");
			holder = i.toString(16)
				holder = '0x' + holder;


			let text = document.createTextNode(holder+": "+mem[i] );

			block.appendChild(text);
			let breakLine = document.createElement('br');
			block.appendChild(breakLine);
		}
	}

    modDisp(x, y, val)
    {

        for(let i =0; i < 8; i++ )
        {


            if(x > 63)
            {
                x = 0;
            }
            if((val & 0x80 ) > 0)
            {


                if(this._disp[y][x]==1)
                {
                    this._disp[y][x] = 1;
                    return true;
                }
                else
                {
                    this._disp[y][x] = 1;
                }

            }
            else
            {

                this._disp[y][x] = 0;

            }
            val <<= 1;
            x++;
        }
        this.displayChange();


    }



}

// module.exports.Display = Display;
