<!DOCTYPE html>
<HTML>
	<HEAD>
		<meta charset = "utf-8">
		<link rel="icon" type="image/gif" href='/static/img/myico.ico' />
		<link rel="stylesheet" href='/static/css/style.css' />
		<TITLE>BaikalDataViewer</TITLE>
	</HEAD>
	<BODY>
		<h1>.    Baikal Data Viewer    .</h1>
		<table border = "0" width = "100%" align = "center" cellspacing="0" cellpadding="0">
			<tr align = "center">
				<td id = "cell1" width = "45%">
					<canvas id = "chart1"></canvas>
				</td>
				<td id = "cell1" width = "45%">
					<canvas id = "chart1"></canvas>
				</td>
			</tr><tr>
				<td id = "cell2">
					<canvas id = "chart2"></canvas>
				</td>
			</tr><tr>
				<td id = "cell3"> 
					<canvas id = "chart3"></canvas>
				</td>
			</tr>
		</table>	
		<script src = "ServerData/data1.js"></script>
		<script src = "MyChart.js"></script>
		<script src = "code.js"></script>
	</BODY>
</HTML>
