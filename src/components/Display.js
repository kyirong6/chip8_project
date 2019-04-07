class Display {

	constructor() {
		this._disp =new Array(2048);
		this.displayChange();
		let c = document.getElementById("tbl");
		this.ctx = c.getContext("2d");

	}


	displayChange()
	{

		let loc;

		for(let i = 0; i < 64; i++)
		{
			for(let j = 0; j < 32; j++ )
			{
				loc = i +(j*64);
				if(this._disp[loc] == 0)
				{
					this.ctx.fillStyle = "#000000";
					this.ctx.fillRect(i*10, j*10, 10, 10);
				}
				else if(this._disp[loc] == 1)
				{
					this.ctx.fillStyle = "#FFFFFF";
					this.ctx.fillRect(i*10, j*10, 10, 10);
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
	dispReg(reg, index)
	{

		let holder;
		let block
			/*= document.getElementById("inCon");
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


		}*/

		switch (index)
		{
			case '0':
				block = document.getElementById("0");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "1":
				block = document.getElementById("1");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "2":
				block = document.getElementById("2");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "3":
				block = document.getElementById("3");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "4":
				block = document.getElementById("4");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "5":
				block = document.getElementById("5");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "6":
				block = document.getElementById("6");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "7":
				block = document.getElementById("7");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "8":
				block = document.getElementById("8");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "9":
				block = document.getElementById("9");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "A":
				block = document.getElementById("A");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "B":
				block = document.getElementById("B");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "C":
				block = document.getElementById("C");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "D":
				block = document.getElementById("D");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "E":
				block = document.getElementById("E");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "F":
				block = document.getElementById("F");
				block.innerHTML = "V"+index + " = " + reg;
				break;
			case "I":
				block = document.getElementById("I");
				block.innerHTML =  "Address I = " + reg;
				break;
			case "O":
				block = document.getElementById("sound");
				block.innerHTML = "Sound Timer = " + reg;
				break;
			case "L":
				block = document.getElementById("delay");
				block.innerHTML = "Delay Timer = " + reg;
				break;
			case "S":
				block = document.getElementById("S");
				block.innerHTML = "Stack Pointer = " + reg;
				break;
			case "P":
				block = document.getElementById("PC");
				block.innerHTML = "Program Counter = " + reg;
				break;
		}

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
			this.ctx.fillStyle = "#000000";
			this.ctx.fillRect(x * 10, y * 10, 10, 10);
		} else if (this._disp[loc] == 1) {
			this.ctx.fillStyle = "#FFFFFF";
			this.ctx.fillRect(x * 10, y * 10, 10, 10);
		}


		return flag;
	}


}

// module.exports.Display = Display;
