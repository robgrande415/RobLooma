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
if(isset($_POST['submit']))
{
	addFolder();
//TODO: change header to call with childID
	header("Location: index.php");
    	exit;
} 

function addFolder() {
	$sql = "select max(childID) from content";
	$result= $GLOBALS['conn']->query($sql);
	$row = $result->fetch_assoc();
	$id = $row["max(childID)"]+1; //need to generate unique ID, this is a bad way
	$sql = 'insert into content (parentID,childID,guiName,fileType) values ('. $_SESSION["currID"] .', '. $id .', "' . $_POST["folderName"] . '","dir")';
	$GLOBALS['conn']->query($sql);
	$GLOBALS['conn']->close();
	
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
<div class="cent-button">
<h1>Add Folder</h1>
<form action='addFolder.php' method='post'>
<p>Name of Folder: <input type="text" autofocus="autofocus" name="folderName"><br></p>
<input type="submit" value="Add Folder" name="submit"> 
</form>
</div>
</div>

<section>
<?php
include 'bottomTools.php';
?>
</section>

</body>
</html>
