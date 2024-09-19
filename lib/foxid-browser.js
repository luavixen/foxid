var alphabet = '0123456789abcdefghjkmnpqrstvwxyz'

/**
 * Encodes the data in `buffer` as Base32 with the custom foxid alphabet.
 * Algorithm copied from https://github.com/LinusU/base32-encode by Linus Unnebäck, MIT licensed.
 * @param {Uint8Array} buffer -
 * @param {number} length - Number of characters in the encoded string.
 * @param {number} size - Number of bytes in `buffer` to encode.
 * @returns {string} Encoded string.
 */
function encode(buffer, length, size) {
  var bits = 0
  var value = 0
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

/**
 * Generates a secure and URL-friendly unique ID.
 * @param {number} [length] - Length of the generated ID, defaults to 16.
 * @returns {string} Newly generated ID as a string.
 */
function foxid(length) {
  var length = Math.max(length | 0, 0) || 16
  var size = (length * 5 + 7) >>> 3

  var buffer = new Uint8Array(size)
  window.crypto.getRandomValues(buffer)

  return encode(buffer, length, size)
}
foxid.foxid = foxid

module.exports = foxid
