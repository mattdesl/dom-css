var prefix = require('prefix-style')
var toCamelCase = require('to-camel-case')
var cache = { 'float': 'cssFloat' }

var suffixMap = {}
;['top','right','bottom','left',
    'width','height','fontSize',
    'paddingLeft','paddingRight',
    'paddingTop','paddingBottom',
    'marginLeft','marginRight',
    'marginTop','marginBottom',
    'padding','margin','perspective'
].forEach(function(prop) {
    suffixMap[prop] = 'px'
})

function style(element, property, value) {
    var camel = cache[property]
    if (typeof camel === 'undefined')
        camel = detect(property)

    //may be false if CSS prop is unsupported
    if (camel) {
        if (value === undefined)
            return element.style[camel]

        if (typeof value === 'number')
            value = value + (suffixMap[camel]||'')
        element.style[camel] = value
    }
}

function each(element, properties) {
    for (var k in properties) {
        if (properties.hasOwnProperty(k)) {
            style(element, k, properties[k])
        }
    }
}

function detect(cssProp) {
    var camel = toCamelCase(cssProp)
    var result = prefix(camel)
    cache[camel] = cache[cssProp] = cache[result] = result
    return result
}

function set() {
    if (arguments.length === 2) {
        each(arguments[0], arguments[1])
    } else
        style(arguments[0], arguments[1], arguments[2])
}

module.exports = set
module.exports.set = set

module.exports.get = function(element, properties) {
    if (Array.isArray(properties))
        return properties.reduce(function(obj, prop) {
            obj[prop] = style(element, prop||'')
            return obj
        }, {})
    else
        return style(element, properties||'')
}
