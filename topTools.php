<link rel="stylesheet" type="text/css" href="loomaStyle.css">

<script>
	function toggleAddRemove() {
	el = document.getElementById("dialog");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	}
</script>


<div class="cent-button">
	<button onclick="history.back()"> <img src="Resources/backArrow.png" alt='Back' height=70></button>
	
	<button onclick = "parent.location='index.php'"> <img src="Resources/yak.png" alt="Home" height=70></button>

	<button onclick="history.forward()"> <img src="Resources/forwardArrow.png" alt='Back' height=70></button>

	<button class='right-button' id = 'editContentButton' onclick="toggleAddRemove();"> <img src="Resources/editFolder.png" alt="Edit" height=70></button>

</div>


<!--edit files and folders window -->
<div id="dialog">
<div id="dialog-bg">
<?php echo '<a href="addFolder.php?childID=' . $_SESSION["currID"] . '"> <img src="Resources/addFolder.jpeg" alt="Add Folder" height=128 width=128></a>' ?>

<?php echo '<a href="deleteContent.php?childID=' . $_SESSION["currID"] . '"> <img src="Resources/deleteFolder.png" alt="Delete Folder" height=128 width=128></a>' ?>

<a href="uploadFile.php"> <img src="Resources/addFile.png" alt="Add File" height=128 width=128></a>

<?php echo '<a href="deleteContent.php?childID=' . $_SESSION["currID"] . '"> <img src="Resources/deleteFile.png" alt="Delete File" height=128 width=128></a>' ?>

<button onclick="toggleAddRemove();"> <img src="Resources/backArrow.png" alt="Go Back" height=128 width=128></button>

</div>
</div>
