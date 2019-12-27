/*function color_change(){
//	alert("Hello from JS_function");
	var pp = document.getElementById("color_change");

	var sizze = '"'+(Math.random()*30)+'px"';
	pp.style.fontSize = sizze;
//	pp.style.fontSize = "30px";
	var hue = 'rgb('+(Math.floor(Math.random()*256))+','+(Math.floor(Math.random()*256))+','+(Math.floor(Math.random()*256))+')';
	pp.style.color = hue;
	pp.innerHTML = hue;
}

function bord(){
	var bor = document.getElementById("but_id");
	var dot = document.getElementById("chart");
	var texxt = " hello!"
	bor.style.fontSize = "20px";
//	bor.style.border-radius = 100 + n+'px';
	n++;
	bor.innerHTML = "helloo "+ n+ dot;
}
*/
//ctx.fillRect(x,10,1,1); 

function myMax(arr){
	var res = -Infinity;
	for (ii = 0; ii < arr.length; ii++){if (res < arr[ii]) {res = arr[ii];}}
return res;
}
function myMin(arr){
	var res = Infinity;
	for (ii = 0; ii < arr.length; ii++){if (res > arr[ii]) {res = arr[ii];}}
return res;
}
//Array.prototype.max = function(){return myMax(this);}
//Array.prototype.min = function(){return myMin(this);}

function obnovit_stranicu() {
	location.reload();
}

/********************************* program here ****************************************/

var winWidth = document.documentElement.clientWidth;
var cell1 = document.getElementById("cell1");

var c=document.getElementById("chart1");
var ctx=c.getContext("2d");
c.width = cell1.offsetWidth;
c.height = 300;

var chart1 = new MyChart(ctx, c.width, c.height);
chart1.drawGridDate(DateTimeSec,Data1, "Datetime", "CO2air");
chart1.drawChartDot(DateTimeSec, Data1, 3, 'lightgreen');

var c=document.getElementById("chart2");
var ctx=c.getContext("2d");
var cell2 = document.getElementById("cell2");
c.width = cell2.offsetWidth;
c.height = 300;

var chart2 = new MyChart(ctx, c.width, c.height);

//var Dataa = Data2.concat(Data3);
chart2.drawGridDate(DateTimeSec, Data2, "Datetime", "Light");
//chart2.drawChartPolygon(DateTimeSec,Data2,Data3, 'rgba(225,10,0,0.2)');
chart2.drawChartLine(DateTimeSec, Data2, 2, 'darkgreen');
//chart2.drawChartLine(DateTimeSec, Data3, 4, 'darkred');

var c=document.getElementById("chart3");
var ctx=c.getContext("2d");
c.width = document.documentElement.clientWidth;
c.height = 300;

var chart3 = new MyChart(ctx, c.width, c.height);
chart3.drawGridDate(DateTimeSec, Data3, "Datetime", "CO2Bot");
chart3.drawChartDot(DateTimeSec, Data3, 2, 'magenta');

var timer_reload = setInterval("obnovit_stranicu()", 60000);
