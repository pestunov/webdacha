var MyChart = function (graph_contex, constrWidth, constrHeight) {
	this.ctx = graph_contex;
/* appearance */	
	this.width = constrWidth;
	this.height = constrHeight;
	this.X_TEXT_DATE_WIDTH = 80;
	this.X_TEXT_SPACE = 10;
	this.Y_TEXT_WIDTH = 45;
	this.X_TEXT_WIDTH = this.Y_TEXT_WIDTH;
	this.LEFT_SPACE = this.Y_TEXT_WIDTH+6;
	this.TOP_SPACE = 10;
	this.BOT_SPACE = 20;
	this.RGHT_SPACE=5;
	this.MIN_HOR_GRID_SPACE=25;
	this.MIN_VER_GRID_SPACE=25;
	this.ctx.font="13px Arial";	this.ctx.textAlign="left";

/* charts ranges */
	this.yMin = 0;	//
	this.yMax = 0;	//
	this.yTickRange;
	this.yGrid = 7;
	this.yStep;

	this.yMinRight = 0;	//
	this.yMaxRight = 0;	//
	this.yTickRangeRight;
	this.yGridRight = 7;
	this.yStepRight;

	this.xMin = 0;	//
	this.xMax = 0;	//
	this.xTickRange;
	this.xGrid = 6;
	this.xStep;

	this.xTickRangeDate;
	this.xGridDate = 6;
	this.xStepDate;
	this.xTickPointsDate;
	this.xFirstTickDate = 0;
	this.xScaleDate = 0;
	
/* styles */	
	this.color = "rgba(0,120,0,0.5)";
}

MyChart.prototype._test = function(x){
	var test = 15;
	console.log('test was changed and now it is = '+test+' '+ x);
	return test, 23, x;
}
MyChart.prototype._max = function(arr){
	var res = -Infinity, i; 
	for (i = 0; i < arr.length; i++){if (res < arr[i]) {res = arr[i];}}
return res;
}
MyChart.prototype._min = function(arr){
	var res = Infinity, i;
	for (i = 0; i < arr.length; i++){if (res > arr[i]) {res = arr[i];}}
return res;
}
MyChart.prototype._formatDate = function(data){	//transform int to string: 1986 -> '86' or 5 -> '05'
	data+='';	// int to str
	if (data.length == 1) return ('0'+data);
	if (data.length == 4) return data.substr(2);
	return data;
}	
MyChart.prototype._drawLine = function(x0, y0, x1, y1, lWidth, lColor){
	this.ctx.beginPath(); this.ctx.lineWidth=lWidth; this.ctx.lineJoin="round"; this.ctx.strokeStyle=lColor;
	this.ctx.moveTo(x0,y0); this.ctx.lineTo(x1, y1); this.ctx.stroke();	
}
MyChart.prototype._getYRange = function(yData){
	var gridMaxN, yTickSize, i, y;
	var yMax = this._max(yData);
	var yMin = this._min(yData);
	// *** choose chart y grid size *** //
	gridMaxN  = Math.ceil((this.height - this.TOP_SPACE - this.BOT_SPACE)/this.MIN_VER_GRID_SPACE);	// ceil = round to top
	if (gridMaxN > this.yGrid) {
		for (i=this.yGrid; i <= gridMaxN; i++){
			yTickSize = (yMax - yMin)/(i-1);
			y = Math.ceil(Math.log10(yTickSize)-1);
			this.yTickRange = Math.ceil(yTickSize / Math.pow(10, y));
			if ((this.yTickRange == 1) || (this.yTickRange == 2) || (this.yTickRange == 5) || (this.yTickRange == 10)){
				break;
			}
		}
	}	
	this.yTickRange *= Math.pow(10, y);
	this.yMin = this.yTickRange*Math.floor(yMin/this.yTickRange);
	this.yMax = this.yTickRange*Math.ceil(yMax/this.yTickRange);
	this.yGrid = Math.round((this.yMax-this.yMin)/this.yTickRange);
	this.yStep = (this.height-this.TOP_SPACE-this.BOT_SPACE)/this.yGrid;

}
MyChart.prototype._getXRange = function(data){
	var i, x;
	var xMax = this._max(data);
	var xMin = this._min(data);
	var gridMaxN  = Math.ceil((this.width-this.LEFT_SPACE-this.RGHT_SPACE)/(this.X_TEXT_WIDTH + this.X_TEXT_SPACE));
	if (gridMaxN > this.xGrid) {
		for (i=this.xGrid; i <= gridMaxN; i++){
			var xTickSize = (xMax - xMin)/(i-1);
			x = Math.ceil(Math.log10(xTickSize)-1);
			this.xTickRange = Math.ceil(xTickSize / Math.pow(10, x));
			if ((this.xTickRange == 1) || (this.xTickRange == 2) || (this.xTickRange == 5) || (this.xTickRange == 10)){
				break;
			}
		}
	}	
	this.xTickRange *= Math.pow(10, x);
	this.xMin = this.xTickRange*Math.floor(xMin/this.xTickRange);
	this.xMax = this.xTickRange*Math.ceil(xMax/this.xTickRange);
	this.xGrid = Math.round((this.xMax-this.xMin)/this.xTickRange);
	this.xStep = (this.width-this.LEFT_SPACE-this.RGHT_SPACE)/this.xGrid;
}
MyChart.prototype._getXRangeDate = function(data){
	var xMaxTicks, xDataRange, xTickRange;
	var xChartWidth = this.width-this.LEFT_SPACE-this.RGHT_SPACE;
	xDataRange = data[data.length-1]-data[0];
	xMaxTicks = Math.ceil((this.width-this.LEFT_SPACE-this.RGHT_SPACE)/(this.X_TEXT_DATE_WIDTH + this.X_TEXT_SPACE));
	xTickRange = xDataRange / xMaxTicks;
	
	if 		(xTickRange>60*60*24*7)	{xTickRange = 60*60*24*30; alert('more then 5 days');}
	else if (xTickRange>60*60*24*2) {xTickRange = 60*60*24*7;} 
	else if (xTickRange>60*60*24*1) {xTickRange = 60*60*24*2;}
	else if (xTickRange>60*60*12)	{xTickRange = 60*60*24;}
	else if (xTickRange>60*60*4)	{xTickRange = 60*60*12;}
	else if (xTickRange>60*60*3)	{xTickRange = 60*60*4;}
	else if (xTickRange>60*60*2)	{xTickRange = 60*60*3;}
	else if (xTickRange>60*60*1)	{xTickRange = 60*60*2;}
	else if (xTickRange>60*30)		{xTickRange = 60*60*1;}
	else if (xTickRange>60*20)		{xTickRange = 60*30;}
	else if (xTickRange>60*10)		{xTickRange = 60*20;}
	else if (xTickRange>60*5)		{xTickRange = 60*10;}
	else if (xTickRange>60*2)		{xTickRange = 60*5;}
	else if (xTickRange>60*1)		{xTickRange = 60*2;}
	else							{xTickRange = 60*1;}
	
	this.xTickRangeDate = xTickRange;
	this.xMin = data[0]; this.xMax = data[data.length-1];
	this.xGridDate = Math.floor(xDataRange/this.xTickRangeDate);
	this.xTickPointsDate = xChartWidth/this.xGridDate;
	this.xScaleDate = xChartWidth/xDataRange;
	this.xFirstTickDate = this.xTickRangeDate * Math.ceil(data[0]/this.xTickRangeDate);
/*	xGrid = Math.floor(xRange / xTickRange);
	var firstTick = xTickRange * Math.ceil(xData[0]/xTickRange);
*/
}

MyChart.prototype._drawBox = function(){
	this._drawLine(this.LEFT_SPACE,this.TOP_SPACE,this.LEFT_SPACE,this.height-this.BOT_SPACE,1,"#000");					// y axis (vertical)
	this._drawLine(this.LEFT_SPACE,this.height-this.BOT_SPACE,this.width-this.RGHT_SPACE,this.height-this.BOT_SPACE,1,"#000");		// x axis (horizontal)	
}

MyChart.prototype.drawGridDate = function(xData, yData, xText, yText){
	this._drawBox();
	this._getYRange(yData);	//yMax, yMin, yTickRange
	this._getXRangeDate(xData);
	var i, x;
	for (i = 0; i <= this.yGrid; i++){
		this._drawLine(this.LEFT_SPACE, this.yStep*i+this.TOP_SPACE,this.width-this.RGHT_SPACE, this.yStep*i+this.TOP_SPACE, 0.5, "#afafaf");
		var stepAxis = this.yMax-i*this.yTickRange;
		this.ctx.fillText(stepAxis.toPrecision(3),2,this.yStep*i+this.TOP_SPACE+3,this.LEFT_SPACE-6);	// text(toFixed(num_of_digits_after_comma)), x, y, width
	}
	for (i = 0; i <= this.xGridDate; i++){
		x = this.LEFT_SPACE+(this.xFirstTickDate-xData[0]+i*this.xTickRangeDate)*this.xScaleDate;
		var tizone = new Date();
		offset = tizone.getTimezoneOffset(); // time offset in minutes
		var xD = new Date(((this.xFirstTickDate+i*this.xTickRangeDate)+offset*60)*1000);
		console.log(xD);
		var xCaption = this._formatDate(xD.getDate())+"."+this._formatDate(xD.getMonth()+1)+"."+this._formatDate(xD.getFullYear())+" "+this._formatDate(xD.getHours())+":"+this._formatDate(xD.getMinutes());
		this._drawLine(x,this.TOP_SPACE,x,this.height-this.BOT_SPACE,0.5, "#afafaf");
		ctx.fillText(xCaption,x-this.X_TEXT_DATE_WIDTH/2,this.height-this.BOT_SPACE+15,this.X_TEXT_DATE_WIDTH);
	}
	this.ctx.textAlign = "end";
	this.ctx.fillText(xText,this.width-this.RGHT_SPACE,this.height-this.BOT_SPACE-5);
	this.ctx.textAlign = "start";
	this.ctx.fillText(yText,this.LEFT_SPACE+5,this.TOP_SPACE+15);
}

MyChart.prototype.drawGrid = function(xData, yData, xText, yText){
	this._drawBox();
	this._getYRange(yData);
	this._getXRange(xData);
	var i, x;
	for (i = 0; i <= this.yGrid; i++){
		this._drawLine(this.LEFT_SPACE, this.yStep*i+this.TOP_SPACE,this.width-this.RGHT_SPACE, this.yStep*i+this.TOP_SPACE, 0.5, "#afafaf");
		var stepAxis = this.yMax-i*this.yTickRange;
		this.ctx.fillText(stepAxis.toPrecision(3),2,this.yStep*i+this.TOP_SPACE+3,this.LEFT_SPACE-6);	// text(toFixed(num_of_digits_after_comma)), x, y, width
	}
	for (i = 0; i <= this.xGrid; i++){
		this._drawLine(this.LEFT_SPACE+i*this.xStep, this.TOP_SPACE, this.LEFT_SPACE+i*this.xStep, this.height-this.BOT_SPACE, 0.5, "#afafaf");
		var stepAxis = this.xMin+i*this.xTickRange;
		var textWidth = this.ctx.measureText(stepAxis.toPrecision(3)).width;
		this.ctx.fillText(stepAxis.toPrecision(3),this.LEFT_SPACE-textWidth/2+i*this.xStep,this.height-this.BOT_SPACE+15,this.X_TEXT_WIDTH);	// text(toFixed(num_of_digits_after_comma)), x, y, width
	}
	this.ctx.textAlign = "end";
	this.ctx.fillText(xText,this.width-this.RGHT_SPACE,this.height-this.BOT_SPACE-5);
	this.ctx.textAlign = "start";
	this.ctx.fillText(yText,this.LEFT_SPACE+5,this.TOP_SPACE+15);
}

MyChart.prototype.drawChartLine = function(xData, yData, lWidth, mColor){
	this.ctx.beginPath(); this.ctx.lineWidth=lWidth; this.ctx.lineJoin="round"; this.ctx.strokeStyle=mColor;
	var i, x, y, isPrevValid=false, isValid=false;
	var masSize = xData.length;
	var yScale = (this.height-this.TOP_SPACE-this.BOT_SPACE)/(this.yMax - this.yMin);
	var xScale = (this.width-this.LEFT_SPACE-this.RGHT_SPACE)/(this.xMax - this.xMin) //masSize;
	
	this.ctx.moveTo(this.LEFT_SPACE,(this.height-this.BOT_SPACE-(yData[0]-this.yMin)*yScale));	
	for (i = 0; i < masSize; i++){
		y = this.height-this.BOT_SPACE-(yData[i]-this.yMin)*yScale;  
		x = this.LEFT_SPACE+xScale*(xData[i]-xData[0]);
		isPrevValid = isValid;
		isValid = yData[i] || (yData[i]==0);
		if (isValid && !isPrevValid){this.ctx.moveTo(x, y);}
		if (isValid) {this.ctx.lineTo(x, y);continue;}
	}
	this.ctx.stroke();
}

MyChart.prototype.drawChartDot = function(xData, yData, dSize, Color){
	this.ctx.fillStyle = Color;
	var i, x, y;
	var masSize = xData.length;
	var yScale = (this.height-this.TOP_SPACE-this.BOT_SPACE)/(this.yMax - this.yMin);
	var xScale = (this.width-this.LEFT_SPACE-this.RGHT_SPACE)/(this.xMax - this.xMin) //masSize;
	for (i = 0; i < masSize; i++){
		y = this.height-this.BOT_SPACE-(yData[i]-this.yMin)*yScale;  
		x = this.LEFT_SPACE+xScale*(xData[i]-this.xMin);
		this.ctx.fillRect(x,y,dSize,dSize);
	}
}

MyChart.prototype.drawChartPolygon = function(xData, yData1, yData2, mColor){
	this.ctx.beginPath(); this.ctx.lineWidth=1; this.ctx.lineJoin="round"; this.ctx.strokeStyle=mColor; ctx.fillStyle = mColor;
	var i, x, y;
	var masSize = xData.length;
	var yScale = (this.height-this.TOP_SPACE-this.BOT_SPACE)/(this.yMax - this.yMin);
	var xScale = (this.width-this.LEFT_SPACE-this.RGHT_SPACE)/(this.xMax - this.xMin) //masSize;
	this.ctx.moveTo(this.LEFT_SPACE,(this.height-this.BOT_SPACE-(yData1[0]-this.yMin)*yScale));	
	for (i = 0; i < masSize; i++){
		y = this.height-this.BOT_SPACE-(yData1[i]-this.yMin)*yScale;  
		x = this.LEFT_SPACE+(xData[i]-this.xMin)*xScale;
		if (yData1[i] || (yData1[i]==0)) {this.ctx.lineTo(x, y);}
	}
	for (i = (masSize-1); i >= 0; i--){
		y = this.height-this.BOT_SPACE-(yData2[i]-this.yMin)*yScale;  
		x = this.LEFT_SPACE+(xData[i]-this.xMin)*xScale;
		if (yData2[i] || (yData2[i]==0)) {this.ctx.lineTo(x, y);}
	}
	this.ctx.fill();
}
