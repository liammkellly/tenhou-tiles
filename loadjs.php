<?php
// Enter the URL where you're hosting this below (including the final /):
$base_url = "https://example.com/tenhou/";

header("Content-Type: text/javascript");
$data = file_get_contents('https://tenhou.net'.$_GET['src']);

$modified_data = str_replace("var u=\"https://cdn.tenhou.net/5/img/", "var base_injected_url = (l == 0) ? '".$base_url."serveimg.php?img=' : 'https://cdn.tenhou.net/5/img/'; var u=base_injected_url + \"", $data);

echo $modified_data;
?>