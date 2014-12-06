var elem = null

//https://gist.github.com/paulirish/523692
module.exports = function prefix(prop) {
    var prefixes = ['Moz', 'Khtml', 'Webkit', 'O', 'ms'],
        upper = prop.charAt(0).toUpperCase() + prop.slice(1)
    
    if (!elem)
        elem = document.createElement('div')

    if (prop in elem.style)
        return prop

    for (var len = prefixes.length; len--;) {
        if ((prefixes[len] + upper) in elem.style)
            return (prefixes[len] + upper)
    }
    return false
}