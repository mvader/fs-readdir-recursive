'use strict';

var fs = require('fs');
var path = require('path');

module.exports = read;

/**
 * Recursively reads a directory
 * @param {String}   root   Root directory
 * @param {Function} filter Filter function for discarding result files
 * @param {Array}    files  Array with files
 * @param {String}   prefix Path prefix
 * @return {Array}          Array of resulting files
 */
function read(root, filter, files, prefix) {
  prefix = prefix || '';
  files = files || [];
  filter = filter || noDotFiles;

  var dir = path.join(root, prefix);
  if (fs.statSync(dir).isDirectory()) {
    fs.readdirSync(dir)
    .filter(filter)
    .forEach(function (name) {
      read(root, filter, files, path.join(prefix, name));
    })
  } else {
    files.push(prefix);
  }

  return files;
}

/**
 * Makes sure the given file is not a dot file
 * @param {String} filename File name
 * @return {Boolean}
 */
function noDotFiles(filename) {
  return filename[0] !== '.';
}
