require 'securerandom' # https://ruby-doc.org/stdlib-2.1.2/libdoc/securerandom/rdoc/SecureRandom.html
require 'base64' # https://ruby-doc.org/stdlib-2.1.3/libdoc/base64/rdoc/Base64.html

# mime type whitelist
WHITELIST = [
  'image/jpeg',
  'image/png',
  'image/gif'
];

def upload_image(data_uri)
  # split the dataURI into its constituent parts
  parts = data_uri.match(/^data:(.*);base64,(.*)$/)

  # check that mime type is in whitelist
  raise "Invalid file" unless WHITELIST.contains parts[1]

  # decode the data
  image = Base64.decode64 parts[2]
  # generate a reasonable file extension from the mime type
  ext = MIME::Types[parts[1]].first.preferred_extension
  # create the filename
  filename = "#{SecureRandom.uuid}.#{ext}"

  # create the file in a tmp folder
  File.open("tmp/#{filename}", "w") do |file|
    file.write(image)
    puts "File successfully uploaded"
  end
end