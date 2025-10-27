var alphabet = '0123456789abcdefghjkmnpqrstvwxyz'
var size, buffer

var random = (function () {
  var nodeCrypto = typeof require !== 'undefined' && require('crypto')
  if (nodeCrypto) {
    return function () {
      if (!buffer || buffer.length < size) {
        buffer = Buffer.allocUnsafeSlow(size)
      }
      nodeCrypto.randomFillSync(buffer, 0, size)
    }
  }
  var webCrypto = (typeof window !== 'undefined' ? window : globalThis).crypto
  return function () {
    if (!buffer || buffer.length !== size) {
      buffer = new Uint8Array(size)
    }
    webCrypto.getRandomValues(buffer)
  }
})()

/**
 * Generates a secure URL-friendly unique ID.
 *
 * @param {number} [length] Length of the generated ID, defaults to 16.
 * @returns {string} Generated ID as a string.
 *
 * @example
 * var foxid = require('foxid')
 * foxid() // "w9q567s7qj4bmp9h"
 * foxid(32) // "tw24cymw3kb225mctevc3csna241pnm2"
 */
function foxid(length) {
  length = Math.max(length | 0, 0) || 16
  size = (length * 5 + 7) >>> 3

  random()

  var value = 0
  var bits = 0
  var output = ''

  for (var i = 0; i < size; i++) {
    value = (value << 8) | buffer[i]
    bits += 8

    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0 && output.length < length) {
    output += alphabet[(value << (5 - bits)) & 31]
  }

  return output.substring(0, length)
}

foxid.foxid = foxid

module.exports = foxid
