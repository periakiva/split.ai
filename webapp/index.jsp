<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Home Page</title>

<style>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333333;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 16px;
    text-decoration: none;
}

li a:hover {
    background-color: #111111;
}

input {

margin: 5px 0px 5px 0px;

}

</style>

</head>

<body>
	<!--This page will be our customer registration screen-->

<ul>
</ul>

<div align="center">

<h1>Select an image </h1>

<script>
function myFunction() {
    var x = document.getElementById("myForm").elements[0].value;
    document.getElementById("demo").style.display = "inline";
    document.getElementById("demo").src = x;
}
</script>

<form name="regForm" id="myForm" method="post" action="">
	<input type="file" name="filename" id="uniqueID" accept="image/gif, image/jpeg, image/png"><br>
</form>

<button type="button" onclick="myFunction()">Submit</button>
<br>
<img id="demo" src="" style="width:304px;height:228px;display:none">

</div>

</body>

</html>