# dom-css

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Small module for fast and reliable DOM styling. 

- normalizes for camel and dash case (see [to-camel-case](https://www.npmjs.com/package/to-camel-case))
- detects vendor prefixes as necessary, cached for performance (see [prefix-style](https://github.com/mattdesl/prefix-style))
- converts numbers to `px` strings for common properties (see [add-px-to-style](https://www.npmjs.com/package/add-px-to-style))

```js
var css = require('dom-css')

//set a style
css(element, 'position', 'absolute')

//will be set as "WebkitFontSmoothing" on Chrome
css(element, 'font-smoothing', 'none')

//set multiple styles
css(element, {
  // can be camel or dash case
  'background-color': 'blue',

  // you can use numbers to auto-"px"
  left: 25, 
  top: 0,
  marginTop: 0,
  position: 'absolute',
  
  // certain props will not have "px" added
  opacity: 0.5
})

//get the current style
css.get(element, 'position') 
// -> 'absolute'

css.get(element, ['left', 'marginTop']) 
// -> { left: '25px', marginTop: '0px' }
``` 

**Note:** The `get()` method does not *compute* an element's style, it only fetches the currently set inline style.

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
css.get(div, ['width', 'height'])
//=> { width: '20px', height: '40px' }
```

This does not provide the *computed* style, only the current inline style.

#### auto px

If a number is specified, the value will have `"px"` added to it, *unless* it is a special unitless property like `'opacity'` and `'zIndex'`. See the full list in [add-px-to-style](https://www.npmjs.com/package/add-px-to-style) (sourced from React).

## Changelog

- `2.x`
  - formatted to [standard](https://npmjs.com/package/standard) code style
  - updates to latest `prefix-style`, since `'Khtml'` prefix has long been obsolete
  - now all properties are suffixed with "px" except a few like `opacity`, `zIndex`, etc. The list is sourced from React and maintained in another module.
- `1.x` - initial version which had a list of properties to be suffixed with "px"

## License

Special thanks to Paul Irish's gist for the prefix detection (now part of Modernizr). 

MIT, see [LICENSE.md](http://github.com/mattdesl/dom-css/blob/master/LICENSE.md) for details.
