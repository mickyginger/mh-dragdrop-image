<?php

const WHITELIST = [
  'image/jpeg',
  'image/png',
  'image/gif'
];

function uploadImage($dataURI) {
  preg_match('/^data:(.*);base64,(.*)$/', $dataURI, $parts);

  if(!in_array($parts[1], WHITELIST)) throw new Exception('Invalid file type');

  $image = base64_decode($parts[2]);
  $ext = str_replace('image/', '.', $parts[1]);
  $filename = uniqid() . $ext;

  if(file_put_contents(dirname(__FILE__) . '/tmp/' . $filename, $image)) {
    fwrite(STDOUT, 'File successfully uploaded');
  }

}

?>