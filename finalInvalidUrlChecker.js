<!DOCTYPE HTML>
<html>

<head>
	<title>
		JavaScript
	| Regular expression to match a URL.
	</title>
</head>

<body style="text-align:center;"
	id="body">
	<h1 style="color:cadetblue;">
			PHISER
		</h1>
	<p id="UP" style="font-size: 15px;
						font-weight: bold;">
	</p>
	<button onclick="RUN()">
		click here
	</button>
	<p id="DOWN" style="color:blueviolet;
							font-size: 20px;
							font-weight: bold;">
	</p>
	<script>
		var el_up = document.getElementById("UP");
		var el_down = document.getElementById("DOWN");

		var expression =
/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
		var regex = new RegExp(expression);
		var url = 'https://hjhjj.com';
		el_up.innerHTML = "URL = '" + url + "'";

		function RUN() {
			var res = "";
			if (url.match(regex)) {
				res = "Valid URL";
			} else {
				res = "Invalid URL";
			}
			el_down.innerHTML = res;
		}
	</script>
</body>

</html>
