<?php
$OUTPUT_DIR = 'imgs';

function makeImg($str) {
    global $OUTPUT_DIR;

    $height = 100;
    $width = 100;
    $img = imagecreate($width, $height);
    $bgColor = imagecolorallocate($img, 255, 255, 255);
    imagefill($img, 0, 0, $bgColor);
    $color = imagecolorallocate($img, 238, 68, 102);
    imagestring($img, 5, 42, 42, $str, $color);
    imagepng($img, $OUTPUT_DIR .'/'. $str . '.png');
    imagedestroy($img);
}
if (!file_exists($OUTPUT_DIR)) {
    mkdir($OUTPUT_DIR);
}

for($i = 1; $i <= 1000; $i++) {
    makeImg($i);
}
