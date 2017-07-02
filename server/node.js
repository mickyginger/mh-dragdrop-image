const fs = require('fs'); // node's FileSystem module
const uuid = require('uuid'); // https://github.com/kelektiv/node-uuid
// mime type whitelist
const whitelist = [
  'image/jpeg',
  'image/png',
  'image/gif'
];

function uploadImage(dataURI) {
  // split the dataURI into its constituent parts
  const [, mimeType, encoding, rawData ] = dataURI.match(/^data:(.*);(.*),(.*)$/);

  // check that mime type is in whitelist
  if(!whitelist.includes(mimeType)) throw new Error('Invalid file type');

  // decode the data
  const image = new Buffer(rawData, encoding);
  // generate a reasonable file extension from the mime type
  const ext = mimeType.replace('image/', '.');
  // create the name
  const filename = `${uuid.v4()}${ext}`;

  // create the file in a tmp folder
  fs.writeFile(`tmp/${filename}`, image, (err) => {
    if(err) throw err;
    console.log(`${filename} successfully uploaded!`);
  });
}

module.exports = uploadImage;