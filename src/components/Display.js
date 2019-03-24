class Display {

	constructor() {
		this._disp =new Array(2048);
		this.displayChange();

	}


	displayChange()
	{
		let c = document.getElementById("tbl");
		let ctx = c.getContext("2d");
		let loc;

		for(let i = 0; i < 64; i++)
		{
			for(let j = 0; j < 32; j++ )
			{
				loc = i +(j*64);
				if(this._disp[loc] == 0)
				{
					ctx.fillStyle = "#000000";
					ctx.fillRect(i*10, j*10, 10, 10);
				}
				else if(this._disp[loc] == 1)
				{
					ctx.fillStyle = "#FFFFFF";
					ctx.fillRect(i*10, j*10, 10, 10);
				}
			}
		}


	}

	clearDisp()
	{
		for(let i = 0; i < 2048; i++)
		{
			this._disp[i] = 0;
		}
	}

	dispOp(opcode)
	{
		let block = document.getElementById("inLog");
		let text = document.createTextNode(opcode.toString(16).toUpperCase() );
		block.appendChild(text);
		let breakLine = document.createElement('br');
		block.appendChild(breakLine);
	}
	dispReg(reg)
	{

		let holder;
		let block = document.getElementById("inCon");
		let text;
		let breakLine;
		block.innerHTML = "";
		for(let i = 0; i <= 16; i++)
		{
			holder = i.toString(16)
			holder = '0x' + holder;
			if(reg[i] != null)
			{
				text = document.createTextNode(holder+": "+reg[i].toString(16).toUpperCase() );
				block.appendChild(text);
				breakLine = document.createElement('br');
				block.appendChild(breakLine);
			}


		}
	}
	dispOther(I, pc, sp )
	{
		let holder;
		let block = document.getElementById("inOther");
		let text;
		let breakLine;
		block.innerHTML = "";
		text = document.createTextNode("I: "+I.toString(16).toUpperCase() );
		block.appendChild(text);
		breakLine = document.createElement('br');
		block.appendChild(breakLine);
		text = document.createTextNode("PC: "+pc.toString(16).toUpperCase() );
		block.appendChild(text);
		breakLine = document.createElement('br');
		block.appendChild(breakLine);
		text = document.createTextNode("SP: "+sp.toString(16).toUpperCase() );
		block.appendChild(text);
		breakLine = document.createElement('br');
		block.appendChild(breakLine);
	}


	dispMem(mem)
	{
		let holder;
		let block = document.getElementById("inMem");
		let text;
		let breakLine;
		block.innerHTML = "";
		for(let i = 0; i <= 4095; i++)
		{

			holder = i.toString(16)
			holder = '0x' + holder;


			if(mem[i] != null)
			{
				text = document.createTextNode(holder+": "+mem[i].toString(16).toUpperCase() );
				block.appendChild(text);
				let breakLine = document.createElement('br');
				block.appendChild(breakLine);
			}


		}
	}

	modDisp(x,y, val) {
		let flag = false;
		var c = document.getElementById("tbl");
		var ctx = c.getContext("2d");
		let loc = x +(y*64);

		if ((val & 0x80) > 0) {
			if (this._disp[loc] == 1) {
				this._disp[loc] = 0;
				flag = true;
			}
			else
			{
				this._disp[loc] = 1;
			}
		}
		else
		{
			if(this._disp[loc] != 1)
				this._disp[loc] = 0;
		}

		if (this._disp[loc] == 0) {
			ctx.fillStyle = "#000000";
			ctx.fillRect(x * 10, y * 10, 10, 10);
		} else if (this._disp[loc] == 1) {
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(x * 10, y * 10, 10, 10);
		}


		return flag;
	}


}

// module.exports.Display = Display;
