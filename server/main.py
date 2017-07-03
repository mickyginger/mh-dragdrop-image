import re
import base64
import uuid

# mime type whitelist
WHITELIST = [
    'image/jpeg',
    'image/png',
    'image/gif'
]

def uploadImage(dataURI):
    # split the dataURI into its constituent parts
    regex = re.compile('^data:(.*);base64,(.*)$')
    parts = regex.match(dataURI)

    # check that mime type is in whitelist
    if parts.group(1) not in WHITELIST:
        raise Exception('Invalid file type')

    # decode the data
    image = base64.b64decode(parts.group(2))
    # generate a reasonable file extension from the mime type
    ext = parts.group(1).replace('image/', '.')
    # create the filename
    filename = str(uuid.uuid4()) + ext

    # create the file in a tmp folder
    file = open('tmp/' + filename, 'w')
    file.write(image)
    file.close()

    print "File successfully uploaded"