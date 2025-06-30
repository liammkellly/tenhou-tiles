<?php

// Allow CORS for requests from Tenhou

$allowedOrigins = array(
  '(http(s)://)?(www\.)?tenhou\.net'
);

if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] != '') {
  foreach ($allowedOrigins as $allowedOrigin) {
    if (preg_match('#' . $allowedOrigin . '#', $_SERVER['HTTP_ORIGIN'])) {
      header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
      header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
      header('Access-Control-Max-Age: 1000');
      header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
      break;
    }
  }
}

$url = "translations.json";


if (file_exists($url)) {
    header('Content-Type: application/json');
    echo file_get_contents($url);
} else {
    echo "File missing";
}
?>
