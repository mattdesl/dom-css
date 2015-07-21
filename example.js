

var css = require('./')

var figure = document.createElement('figure')
var url = require('baboon-image-uri')

css(figure, {
  backgroundImage: 'url(' + url + ')',
  position: 'absolute',
  left: 25,
  top: 25,
  width: 50,
  height: 50,
  // '-webkit-clip-path': 'polygon(50% 0%, 0% 100%, 100% 100%)'
})

// var prefix = require('prefix-style')('-webkit-clip-path')

// debugger
figure.style['-webkit-clip-path'] = 'polygon(50% 0%, 0% 100%, 100% 100%)'

// var prefix2 = Modernizr.prefixed('clipPath')
document.body.appendChild(figure)