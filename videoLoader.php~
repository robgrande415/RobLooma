<!--
	filename: fullsizeVideo.php
	author: peter and ankit
	modified: skip 2013 01 13
	modified: for custom controls by Skip 2013 12 01
	copyright: VillageTech Solutions, 2013
-->
<?php

$sql = 'SELECT fileName,fileType FROM content where childID=' .$_SESSION['currID'];
$result = $GLOBALS['conn']->query($sql);
$row = $result->fetch_assoc();
$fileName = $row['fileName'];
$fileType = $row['fileType'];
$filePath = "uploadedFiles/". $fileName;
?>
<div class='content-section'>
	<form align='middle' name='fullimage' action='' method='get'>
	<div id='media-container'>
	<video id='media' align='center' height='300' preload >
	<?php echo "<source src='" . $filePath . "' type='video/".$fileType."' />"; ?>
	</video>

	<!-- Video Controls -->
	<div id='media-controls'>
	    <button type='button' id='play-pause'>&#x25BA</button>
	    <input type='range' id='seek-bar' value='0'>
	    <button type='button' id='mute'>Mute</button>
	    <input type='range' id='volume-bar' min='0' max='1' step='0.1' value='1'>
	<!--    <button type='button' id='full-screen'>Full-Screen</button>";-->
	</div>
	</div>
</div>


<script src='mediascript.js'></script>
</form>
