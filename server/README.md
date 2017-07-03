# Example server-side code

Some examples of how you might handle the dataURI of the image on the server.

Consider the following dataURI:

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAXCAMAAABd273TAAAAXVBMVEX////+/v79/f1/f3+AgID6+vp3d3fv7+/29vbs7Ox6enqJiYl0dHSQkJDGxsbk5OSzs7OXl5fCwsLW1taioqKdnZ3e3t7Pz8+8vLzn5+etra2SkpK3t7epqanY2Nj0qtsjAAABYUlEQVQokYVSCXKDMAyUZQlf4AMDDjTJ/59ZEXJ2Oq04BtvLrrQSwD3U4/4rnIEn5gdUQRtq87M5Vr8QpVByTz4CrqxWCya9OOSD7TK0oIkMmBPKFuKK+JLDJS2NRwG4nV5ZA26KwHyIMcAYU75C6YJsyWVtC/1wTnU/Nsuw5Wk+ny9r7iIryJOpmTTpjny5RHCt73tPtDQ3RljhOpfSyVr0dsgoxcc0aD9xrqgAbYthP9ZC8VXreiSaiPyFZpR06xT0EeSDtbck5VV8CMWgUthO05YvOz+F0d7rVCr2YXA3tu20tmEWceqq5Zej5xPvfkD1nso8RSr6bvuzTy4JBcRO8psSNI6GP5vFQYsmuqb9BuKyuTq2bwDFs++zADF0C97aw4t5a7oC50MCVBgGaebu91e3vWWJsPTX2w+xHqPl8ka8iz0AYjTCZ1iwz0wVRHMM0nOc8P48gj/KeozS//ENbvoPoji/PE0AAAAASUVORK5CYII=
```

It is comprised of 4 parts:

- `data:` This indicates that it is raw data and should be handled as such
- `image/png;` The mime type. This tells the browser how the data should be interpreted
- `base64,` The encoding. The tells the browser how to decode the string of raw data
- `Zm9v==` The actual image data.

Essentially the server side code will split the dataURI into its constituent parts with a regular expression, decode the raw data and write it to a file with the correct mime type.