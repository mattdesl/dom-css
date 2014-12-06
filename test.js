var css = require('./')
var test = require('tape')
var prefix = require('./prefix')

test('handles multiple', function(t) {
    var div = document.createElement('div')
    css(div, {
        'background-color': 'blue',
        marginTop: '10px',
        width: 20,
        height: 20,
        position: 'absolute',
        top: 20,
        left: 20,
        'font-smoothing': 'none'
    })

    document.body.appendChild(div)

    var style = window.getComputedStyle(div, null)
    t.equal(style.backgroundColor, 'rgb(0, 0, 255)', 'converts dash to camel case')
    t.equal(style.width, '20px', 'injects px for standard properties')
    t.equal(style.marginTop, '10px', 'accepts camel case props')

    var prefixed = prefix('fontSmoothing')
    if (prefixed) //webkit only test
        t.equal(style[prefixed], 'none', 'hanldes prefixing')
    
    css(div, 'marginTop', 20)
    css(div, 'width', '') //clears a style
    style = window.getComputedStyle(div, null)
    t.equal(style.marginTop, '20px', 'single property version works')
    t.equal(style.width, '0px', 'empty string clears style')
    t.end()
})