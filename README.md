# `drag-drop-img`

An Angular 1.x directive to allow a user to drag and drop an image and convert it to a base64 data URL to be sent to an API

![drag-drop](https://user-images.githubusercontent.com/3531085/27737311-97aed882-5d9f-11e7-85de-0773527dbc02.gif)

#### Installation

Install using bower:

```bash
bower install --save mickyginger/mh-dragdrop-image
```

Add the script in your project:

```html
<script src="/path/to/bower_components/mh-dragdrop-image/dist/mh-dragdrop-image.js"></script>
```

Include in your Angular dependencies:

```js
angular
  .module('myApp', ['mhDragdropImage']);
```

Use in your project like so:

```html
<drag-drop-img ng-model="base64String"></drag-drop-img>
```

Where `base64String` is the converted base64 data URI, to be sent to the server.

#### Styling the directive

The directive ships with the following default styles:

```css
.drag-drop-img {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #ccc;
  height: 250px;
  width: 250px;
  text-align: center;
  position: relative;
}

.drag-drop-img:before {
  content: 'choose a file or drag it here';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  font-family: sans-serif;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 2px rgba(0,0,0,0.6);
}

.drag-drop-img.active {
  opacity: 0.5;
}

.drag-drop-img.has-image:before {
  display:none;
}
```

Modify these styles in your project's stylesheet to change the look and feel of the directive.

#### TODO

- [ ] Add tests
- [ ] Update gulp task