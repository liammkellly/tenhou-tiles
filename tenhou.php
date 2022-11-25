<?php
// Enter the URL where you're hosting this below (including the final /):
$base_url = "https://example.com/tenhou/";

$data = file_get_contents('https://tenhou.net/3/');
$modified_data = str_replace("e.src=src", "e.src='".$base_url."loadjs.php?src=' + src", $data);
echo $modified_data;

?>