<!DOCTYPE html>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Looma 2 Practice</title>
<link rel="stylesheet" type="text/css" href="loomaStyle.css">

<?php
//SQL details
$servername = "localhost";
$username = "root";
$password = "999olive";
$dbname = "Testing";
$maxCol = 5;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start();
if(isset($_POST['childID']))
{
	deleteFolder();
//TODO: change header to call with childID
	header("Location: index.php");
    	exit;
} 

function deleteFolder($row = -1) {

	//if there are no children delete self, otherwise, delete children first
	if ($row == -1) {
		$otherID = $_POST['childID'];
		$sql="select fileType,fileName from content where childID=".$otherID;
		$result=$GLOBALS['conn']->query($sql);
		$row = $result->fetch_assoc();
		$fileType = $row['fileType'];
		$fileName = $row['fileName'];
	}
	else {
		$otherID = $row['childID'];
		$fileType = $row['fileType'];
		$fileName = $row['fileName'];
	}
	$sql = "select childID,fileType,fileName from content where parentID=".$otherID."";
	$result = $GLOBALS['conn']->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			deleteFolder($row);
		}
	}
	
	//base case no children
	$sql = "delete from content where childID=".$otherID."";

	//if file, delete from computer
	if ($fileType <> 'dir') {
		unlink("uploadedFiles/".$fileName);
	}
	//echo $sql;
	//echo "<br>";
	$GLOBALS['conn']->query($sql);
	
}
?>

</head>

<body>

<div class="topTools">
<?php
include 'topTools.php';
?>
</div>

<div class="logo">
<?php
//include 'logo.html';
?>
</div>

<div class="content-section">
<h1> Select Item to Delete: </h1>
<?php
if(isset($_GET["childID"])) {
session_start();
	$parentID = $_GET["childID"];
	$_SESSION["currID"] = $_GET["childID"];
	
}
else {
	//start session global variables
	session_start();
	$parentID = 0;
	$_SESSION["currID"] = $parentID;
}

// make buttons names
$sql = 'SELECT * FROM content where parentID=' . $parentID .' order by guiName';
$result = $conn->query($sql);

echo "<form name='fullsizeimage' action='deleteContent.php' target='_self' method='post'>";
include "contentList.php";

?> 

</form>
</div>

</body>
</html>
