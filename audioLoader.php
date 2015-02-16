<!--
	filename: fullsizeAudio.php
	author: peter and ankit
	modified: Skip 2013 12 02 added custom controls by javascript (V1.7.7a ff)
	copyright: VillageTech Solutions, 2013
-->

<body>
<?php
$sql = 'SELECT fileName,fileType,guiName FROM content where childID=' .$_SESSION['currID'];
$result = $GLOBALS['conn']->query($sql);
$row = $result->fetch_assoc();
$fileName = $row['fileName'];
$fileType = $row['fileType'];
$filePath = "uploadedFiles/". $fileName;

echo "<div class='content-section'>";
echo "<form align='center' name='fullimage' action='' method='get'>";
echo "<h1>" . $row['guiName'] . "</h1>";
echo "<div id='media-container'>";
echo "<audio id='media' preload>";
echo "<source src='" . $filePath . "' type='audio/".$fileType."' />"; 
//echo "<source src='" . $filepath . "' type='audio/mp3' />";
//echo "<source src='" . $filepath . "' type='audio/ogg' />";
echo "</audio>";
?>
<!-- Audio Controls -->
  <div id='media-controls'>
    <button type='button' id='play-pause'>&#x25BA</button>
    <input type='range' id='seek-bar' value='0'>
    <button type='button' id='mute'>Mute</button>
    <input type='range' id='volume-bar' min='0' max='1' step='0.1' value='1'>

  </div></div></div>
<script src='mediascript.js'></script>

</form>
</body>
</html>
