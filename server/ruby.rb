require 'securerandom'
require 'base64'

WHITELIST = [
  'image/jpeg',
  'image/png',
  'image/gif'
];

def upload_image(data_uri)
  parts = data_uri.match(/^data:(.*);base64,(.*)$/)

  raise "Invalid file" unless WHITELIST.contains parts[1]

  image = Base64.decode64 parts[3]
  ext = MIME::Types[parts[1]].first.preferred_extension
  filename = "#{SecureRandom.uuid}.#{ext}"

  File.open("tmp/#{filename}", "w") do |file|
    file.write(image)
    puts "File successfully uploaded"
  end
end