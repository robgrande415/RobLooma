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

if ($result->num_rows > 0) {
	
	echo "<table name='table_wbdisplay' border='0' align='center'>";	
    	// output data of each row
	$col = 0;
    	while($row = $result->fetch_assoc()) {
        	echo "<td height='100'><button type='submit' name='childID' height = '100' value='" . $row["childID"] . "'>" . $row["guiName"] . "</button></td>";
	//creates new row if last is full
	$col++;
	if ($col >= $maxCol)
		{
		echo "<tr>";
		$col=0;
		}
		
    	}
	
	echo "</table></form>";
} else {
    echo "<h1>This Folder is Empty</h1>";
}

$conn->close();

?> 

