<!--<script type="text/javascript">
window.ondragstart = function() { return false; }
</script>
-->


<script type="text/javascript">
document.getElementById("editContentButton").style.visibility = "hidden";

function centerImage() {
    	var myImage = document.getElementById("content");
    	myImage.style.marginTop = "-"+ myImage.height/2.0 + "px";
	myImage.style.marginLeft = "-"+ myImage.width/2.0 + "px";
}

function zoomIn() {
    	var myImage = document.getElementById("content");
    	myImage.height = myImage.height*1.2;
    	myImage.width = myImage.width*1.2;
	centerImage();	
}

function zoomOut() {
    	var myImage = document.getElementById("content");
    	myImage.height = myImage.height/1.2;
    	myImage.width = myImage.width/1.2;
	centerImage();	
}

</script> 

<?php
$sql = 'SELECT fileName FROM content where childID=' . $_SESSION['currID'];
$result = $GLOBALS['conn']->query($sql);
$row = $result->fetch_assoc();
$name = $row['fileName'];
echo "<img id='content' class='centered-image' src='uploadedFiles/" . $name ."'>";
?>

<div class='side-bar'>
<button onclick='zoomIn()'> <img src='Resources/zoomin.png' height = 70px></button> <br>
<button onclick='zoomOut()'> <img src='Resources/zoomout.png' height = 70px> </button>
</div>

<script type="text/javascript">
centerImage();
</script> 
