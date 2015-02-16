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

<div class="topTools">
<?php
include 'topTools.php';
?>
</div>

<?php
//get content or file information
$sql = "select fileName, fileType from content where childID=".$_SESSION['currID'];
$result = $conn->query($sql);
$row = $result->fetch_assoc();


if ($row['fileType'] == 'dir') {
	//folder
	//echo "<nav>";
	//include 'logo.html';
	//echo "</nav>";

	echo "<div class='content-section'>";
	echo "<form name='fullsizeimage' action='index.php' target='_self' method='get'>";
	include 'contentList.php';
	echo "</div>";
}
elseif ($row['fileType'] == 'png' 
	or $row['fileType'] == 'jpg' 
	or $row['fileType'] == 'jpeg'
	or $row['fileType'] == 'gif'){
	//image	
	include "imageLoader.php";
}
elseif ($row['fileType'] == 'mp4'
	or $row['fileType'] == 'ogg'
	or $row['fileType'] == 'webm'){
	//video	
	include "videoLoader.php";
}
elseif ($row['fileType'] == 'mp3'
	or $row['fileType'] == 'acc'){
	//audio	
	include "audioLoader.php";	
}
elseif ($row['fileType'] == 'pdf') {

}

?>

<?php
include 'bottomTools.php';
?>

</body>
</html>
