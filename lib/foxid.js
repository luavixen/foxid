var crypto = require("crypto")

var alphabet = "0123456789abcdefghjkmnpqrstvwxyz"
var buffer = null

module.exports = function (size) {
    size = Math.floor(Math.max(size, 0)) || 16

    if (buffer == null || buffer.length < size) {
        buffer = Buffer.allocUnsafeSlow(size)
    }
    crypto.randomFillSync(buffer, 0, size)

    var id = ""

    while (size--) {
        id += alphabet[buffer[size] & 31]
    }

    return id
}
