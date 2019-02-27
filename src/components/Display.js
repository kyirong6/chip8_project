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
				arr[i][j] = 0;

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
		let text = document.createTextNode(opcode.toString(16));
		block.appendChild(text);
		let breakLine = document.createElement('br');
		block.appendChild(breakLine);
	}
	dispReg(reg)
	{
		let holder;
		let block = document.getElementById("inCon");
		block.innerHTML = "";
		for(let i = 0; i <= reg.length; i++)
		{

			holder = i.toString(16)
			holder = '0x' + holder;


			let text = document.createTextNode(holder+": "+reg[i] );
			if(reg[i] != null)
			{
				block.appendChild(text);
				let breakLine = document.createElement('br');
				block.appendChild(breakLine);
			}


		}
	}


	dispMem(mem)
	{
		let holder;
		let block = document.getElementById("inMem");
		block.innerHTML = "";
		for(let i = 0; i <= mem.byteLength; i++)
		{


			holder = i.toString(16)
				holder = '0x' + holder;


			let text = document.createTextNode(holder+": "+mem[i] );
            if(mem[i] != null)
            {
                block.appendChild(text);
                let breakLine = document.createElement('br');
                block.appendChild(breakLine);
            }


		}
	}

    modDisp(x, y, val)
    {
		let flag  = false;

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
                    this._disp[y][x] = 0;
                    flag = true;
                }
                else
                {
                    this._disp[y][x] = 1;
                }

            }
            else
            {
				if(this._disp[y][x] != 1)
				{
					this._disp[y][x] = 0;
				}



            }
            val <<= 1;
            x++;
        }
        this.displayChange();
        return flag;


    }



}

// module.exports.Display = Display;
