<!DOCTYPE html>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Looma 2 Practice</title>
<link rel="stylesheet" type="text/css" href="loomaStyle.css">



<?php
function addFile() {
	ini_set('display_errors',1);
	error_reporting(E_ALL);
	


	$target_dir = "/var/www/RobLooma.com/uploadedFiles/";
	$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
	$uploadOk = 1;
	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
	
	// Check if file already exists
	if (file_exists($target_file)) {
	    echo "Sorry, file with that name already exists.";
	    $uploadOk = 0;
		//TODO: suggest renaming file
	}
	// Check file size: limit 2gb
	if ($_FILES["fileToUpload"]["size"] > 2000000000) {
	    echo "Sorry, your file is too large.";
	    $uploadOk = 0;
	}

	// Allow certain file formats
	/*
	if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
	&& $imageFileType != "gif" ) {
	    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
	    $uploadOk = 0;
	}*/

	// Check if $uploadOk is set to 0 by an error
	if ($uploadOk == 0) {
	    echo "Sorry, your file was not uploaded.";
	// if everything is ok, try to upload file
	} else {
	    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {

		//add to SQL database
		$sql = "select max(childID) from content";
		$result= $GLOBALS['conn']->query($sql);
		$row = $result->fetch_assoc();
		$id = $row["max(childID)"]+1; //need to generate unique ID, this is a bad way
		$sql = 'insert into content (parentID,childID,guiName,fileName,fileType) values ('
		. $_SESSION["currID"] .', '
		. $id .', "'
		. $_POST["guiName"] .'", "' 
		. $_FILES["fileToUpload"]["name"] . '", '
		. '"' .$imageFileType .'")';
		$GLOBALS['conn']->query($sql);
		$GLOBALS['conn']->close();
	
	    } else {
		echo "Sorry, there was an error uploading your file.";
	    }
	}

} //function bracket
?>

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
	addFile();
//TODO: change header to call with childID
	header("Location: index.php");
    	exit;
} 
?>

</head>

<body>

<div class='topTools'>
<?php
include 'topTools.php';
?>
</div>


<div class="content-section">
<form action="uploadFile.php" align="center" method="post" enctype="multipart/form-data">
    <h1>Select file to upload:</h1>
    <input type="file" name="fileToUpload" id="fileToUpload" />
    <h2>Name in Looma: </h2> <input type="text" name="guiName" id="guiName">
    <input type="submit" value="Upload" name="submit">
</form>
</div>

<section>
<?php
include 'bottomTools.php';
?>
</section>

</body>
</html>

