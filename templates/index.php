<!DOCTYPE html>
<HTML>
	<HEAD>
		<meta charset = "utf-8">
		<link rel="icon" type="image/gif" href='../static/img/myico.ico' />
		<link rel="stylesheet" href='../static/css/style.css' />
		<TITLE>DachaController</TITLE>
	</HEAD>
	<BODY>
		<h1>.    Relay module    .</h1>
		{% for pin in ports %}
		<input type="button" value=" {{ ports[pin].name }} "><br>
		{% endfor %}
	</BODY>
</HTML>
