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
declare function foxid(length?: number): string
export = foxid
