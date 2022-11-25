<?php

$url = "img/".$_GET['img'];


function resize_image($img, $width, $height, $newname) {
   $image = imagecreatefrompng ( $img );

    $new_image = imagecreatetruecolor ( $width, $height ); // new wigth and height
    imagealphablending($new_image , false);
    imagesavealpha($new_image , true);
    imagecopyresampled ( $new_image, $image, 0, 0, 0, 0, $width, $height, imagesx ( $image ), imagesy ( $image ) );
    $image = $new_image;
    
    // saving
    imagealphablending($image , false);
    imagesavealpha($image , true);
    imagepng($image,"img/".$newname);
    imagepng($image);
    imagedestroy($image);

}

if (file_exists($url)) {
    header('Content-Type: image/png');
    echo file_get_contents($url);
} else {
    $base_width = substr($_GET['img'],8,3);
    if (substr($_GET['img'],5,1) == 1 || substr($_GET['img'],5,1) == 3 ) {
        $height = $base_width/0.275;
    } else {
        $height = $base_width*6;
    }
    header('Content-Type: image/png');
    resize_image("img/".substr($_GET['img'],5,3).".png",$base_width*10,$height,$_GET['img']);
}
?>