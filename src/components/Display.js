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

		for(let i = 0; i <= mem.byteLength; i++)
		{
			let block = document.getElementById("inMem");

			let text = document.createTextNode(mem[i]);
			block.appendChild(text);
			let breakLine = document.createElement('br');
			block.appendChild(breakLine);
		}
	}



}

module.exports.Display = Display;
