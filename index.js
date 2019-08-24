#!/usr/bin/env node

// const mdLinks = require('./md-links.js');
// console.log(yourMarkdown);

// module.exports = () => {
//   // ...
// };

const process = require('process');
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// preguntar si es mejor hacerlo en otro JS 
//let mdLinks = require('./README.md')   
//    for (let i = 0; i < mdLinks.length; i++) {
//      if (mdLinks.includes('http://')) {
//            console.log(mdLinks[i]);       
//    } 
//exports.all = mdLinks;
//console.log(mdLinks);

//module.exports = function(width) {
//  return {
//    area: function() {
//      return width * width;
//    }
//  };
//}
