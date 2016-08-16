var css = require('./')
var test = require('tape')
var prefix = require('prefix-style')

test('handles multiple', function (t) {
  var div = document.createElement('div')
  css(div, {
    'background-color': 'blue',
    marginTop: '10px',
    width: 20,
    height: 20,
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 45,
    opacity: 0.5,
    'font-smoothing': 'none'
  })

  document.body.appendChild(div)

  var style = window.getComputedStyle(div, null)
  t.equal(style.backgroundColor, 'rgb(0, 0, 255)', 'converts dash to camel case')
  t.equal(style.width, '20px', 'injects px for standard properties')
  t.equal(style.opacity, '0.5', 'avoids px for unitless CSS properties')
  t.equal(style.zIndex, '45', 'avoids px for unitless CSS properties')
  t.equal(style.marginTop, '10px', 'accepts camel case props')

  var prefixed = prefix('fontSmoothing')
  if (prefixed) { // webkit only test
    t.equal(style[prefixed], 'none', 'hanldes prefixing')
  }

  css(div, 'marginTop', 20)
  css(div, 'width', '') // clears a style
  style = window.getComputedStyle(div, null)
  t.equal(style.marginTop, '20px', 'single property version works')
  t.equal(style.width, '0px', 'empty string clears style')

  document.body.removeChild(div)
  t.end()
})

test('transforms', function (t) {
  var div = document.body.appendChild(document.createElement('div'))
  css(div, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    display: 'inline-block',
    height: 100,
    background: 'blue',
    padding: 0,
    margin: 0
  })

  // if transforms are supported
  if (prefix('transform')) {
    var width = div.getBoundingClientRect().width
    t.equal(width, 100, 'starts with 100px')

    css(div, 'transform', 'translateZ(10px)')
    width = div.getBoundingClientRect().width
    t.equal(width, 100, 'still 100px after translateZ')

    // apply the 3D effect to parent
    css(document.body, {
      transformStyle: 'preserve-3d',
      perspective: 1000
    })

    css(div, 'transform', 'rotateY(90deg) translateZ(10px)')
    width = div.getBoundingClientRect().width
    t.ok(width < 100, 'shrinks after 3d perspective')
  }

  css(div, 'left', '50%')

  document.body.removeChild(div)
  t.end()
})

test('get / set exports', function (t) {
  var div = document.createElement('div')
  css.set(div, {
    marginTop: 10,
    width: 20
  })

  document.body.appendChild(div)

  t.equal(css.get(div), div.style['foo-barcacha'], 'handles missing props')
  t.equal(css.get(div, undefined), div.style['foo-barcacha'], 'handles missing props')
  t.deepEqual(css.get(div, []), {}, 'handles missing props')

  t.equal(css.get(div, 'width'), '20px', 'single value')
  t.deepEqual(
    css.get(div, ['width', 'marginTop']),
    { width: '20px', marginTop: '10px' },
    'multiple values'
  )

  document.body.removeChild(div)
  t.end()
})

test('string argument', function (t) {
  var div = document.createElement('div')

  // in new versions of Node/Browser this might be
  // a template string :)
  css.set(div, [
    'margin-top: 10px;',
    'position: absolute;'
  ].join('\n'))

  document.body.appendChild(div)

  var style = window.getComputedStyle(div)
  t.equal(style.marginTop, '10px')
  t.equal(style.position, 'absolute')

  // empty string does not remove properties
  css(div, '')

  style = window.getComputedStyle(div, null)
  t.equal(style.marginTop, '10px')
  t.equal(style.position, 'absolute')

  // new string appends/replaces properties
  css(div, 'margin-bottom: 20px; position: relative;')

  style = window.getComputedStyle(div, null)
  t.equal(style.marginBottom, '20px')
  t.equal(style.position, 'relative')

  document.body.removeChild(div)
  t.end()
})
