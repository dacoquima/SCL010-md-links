#!/usr/bin/env node
const path = require('path');
const mdLinks = require('./md-links');

let userPath = process.argv[2];
let validate = process.argv[3];
let stats = process.argv[3];

 if (!path.isAbsolute(userPath)) {
  userPath = path.normalize(userPath)
  userPath = path.resolve(userPath)
  console.log(userPath);
  return userPath
 } 
 else {
   console.log()
 }

 if (process.argv[3] === '--stats' && process.argv[4] === '--validate' || process.argv[3] ===  '--validate' && process.argv[4] === '--stats'){
  /* Total: 3
  Unique: 3
  Broken: 1 */
  console.log('opción 3');

} else if (process.argv[3] === '--validate'){
  /* ./some/example.md http://google.com/ ok 301 Google */
  console.log('opción 1');
  
 } else if (process.argv[3] === '--stats'){
  /* Total: 3
  Unique: 3 */
  console.log('opción 2');
}
