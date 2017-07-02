# Example server-side code

Some examples of how you might handle the dataURI of the image on the server.

Consider the following dataURI:

```
data:image/png;base64,Zm9v==
```

It is comprised of 4 parts:

- `data:` This indicates that it is raw data and should be handled as such
- `image/png;` The mime type. This tells the browser how the data should be interpreted
- `base64,` The encoding. The tells the browser how to decode the string of raw data
- `Zm9v==` The actual image data.

Essentially the server side code will split the dataURI into its constituent parts with a regular expression, decode the raw data and write it to a file with the correct mime type.