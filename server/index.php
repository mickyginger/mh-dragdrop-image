<?php
// mime type whitelist
const WHITELIST = [
  'image/jpeg',
  'image/png',
  'image/gif'
];

function uploadImage($dataURI) {
  // split the dataURI into its constituent parts
  preg_match('/^data:(.*);base64,(.*)$/', $dataURI, $parts);

  // check that mime type is in whitelist
  if(!in_array($parts[1], WHITELIST)) throw new Exception('Invalid file type');

  // decode the data
  $image = base64_decode($parts[2]);
  // generate a reasonable file extension from the mime type
  $ext = str_replace('image/', '.', $parts[1]);
  // create the filename
  $filename = uniqid('', true) . $ext;

  // create the file in a tmp folder
  if(file_put_contents(dirname(__FILE__) . '/tmp/' . $filename, $image)) {
    fwrite(STDOUT, 'File successfully uploaded');
  }
}

?>