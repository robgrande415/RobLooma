<!DOCTYPE html>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Looma 2 Practice</title>
<link rel="stylesheet" type="text/css" href="loomaStyle.css">
</head>

<body>

<?php
//SQL details
$servername = "localhost";
$username = "root";
$password = "999olive";
$dbname = "Testing";
$maxCol = 5;

//checks if we are visiting from previous page, or first login
if(isset($_GET["childID"])) {
	$parentID = $_GET["childID"];
	$_SESSION["currID"] = $parentID;
}
else {
	//start session global variables
	session_start();
	$_SESSION["editing"] = False;
	$parentID = 0;
	$_SESSION["currID"] = $parentID;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>


<header>
<?php
include 'topTools.php';
?>
</header>



<iframe src="http://www.google.com"></iframe>

<section>
<?php
include 'bottomTools.php';
?>
</section>

</body>
</html>

<!--
<frameset rows="110px,*" cols="*" border="0">
  <frame name="topTools" src="topTools.php" noresize="noresize" scrolling="no"/>
  <frame name="externalWeb" src="http://www.google.com" noresize="noresize" scrolling="auto"/>
</frameset>
-->
