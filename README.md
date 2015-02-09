# dom-css

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Small module for fast and reliable DOM styling. 

- detects prefixes as necessary, cached for performance
- converts numbers to `px` strings for common properties
- normalizes for camel and dash case

```js
var css = require('dom-css')

//set a style
css(element, 'position', 'absolute')

//will be set as "WebkitFontSmoothing" on Chrome
css(element, 'font-smoothing', 'none')

//set multiple styles
css(element, {
    //can be camel or dash case
    'background-color': 'blue',

    //some properties use 'px' by default
    left: 25, 
    top: 0,
    marginTop: 0,
    position: 'absolute'
})

//get the current style
css.get(element, 'position') 
// -> 'absolute'

css.get(element, ['left', 'marginTop']) 
// -> { left: '25px', marginTop: '0px' }
``` 

See the [special cases](#special-cases) for a list of `px`-suffixed properties (same list is used in GreenSock API).

## Usage

[![NPM](https://nodei.co/npm/dom-css.png)](https://nodei.co/npm/dom-css/)

#### `css(element, property, value)`
#### `css.set(element, property, value)`

Styles an element with the css `property` (dash or camel case) and a given value. `value` is a string, or a number to be suffixed with `'px'` (special cases, see below). 

#### `css(element, styles)`
#### `css.set(element, styles)`

A shorthand for setting multiple styles, where `styles` is an object containing `property:value` pairs. 

#### `css.get(element, prop)`

Gets the inline style of element, where `prop` is a string (like `"borderRadius"`) or an array of strings. If an array of strings is given, an object is returned with key-value pairs representing the specified properties.

```js
css.get(div, ['width', 'height']) => { width: "20px", height: "40px" }
```

*Note:* This does not provide the *computed* style! 

#### special cases

The following properties are suffixed with `'px'` when their value is specified as a number.

```
top, right, bottom, left, 
width, height, fontSize, 
paddingLeft, paddingRight, 
paddingTop, paddingBottom, 
marginLeft, marginRight, 
marginTop, marginBottom, 
padding, margin, perspective
```

## License

Special thanks to Paul Irish's gist for the prefix detection (now part of Modernizr). 

MIT, see [LICENSE.md](http://github.com/mattdesl/dom-css/blob/master/LICENSE.md) for details.
