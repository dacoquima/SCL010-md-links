#!/usr/bin/env node
const path = require("path");
const mdLinksJS = require("./md-links");

//Leyendo la línea de comando
const process = require("process");
process.argv.forEach((val, index) => {
const process2 = process.argv.slice(1); /* Recuerda cambiar el slice final a 2 */
//console.log(process2); /* Respuesta que tiene que ver el usuario */
// path.push(process.argv[1])
});

let userPath = path.resolve(path.normalize(process.argv[2]));

// Opciones
let options = {
  validate: false,
  stats: false
};

if (
  (process.argv[3] === "--stats" && process.argv[4] === "--validate") ||
  (process.argv[3] === "--validate" && process.argv[4] === "--stats") ||
  (process.argv[3] === "--s" && process.argv[4] === "--v") ||
  (process.argv[3] === "--v" && process.argv[4] === "--s") ||
  (process.argv[3] === "-v" && process.argv[4] === "-s") ||
  (process.argv[3] === "-s" && process.argv[4] === "-v")
) 
{ /* Total: 3
  Unique: 3
  Broken: 1 */
  options.validate = true;
  options.stats = true;
  console.log("stats y validate");} 
  
  else if (
  process.argv[3] === "--validate" ||
  process.argv[3] === "--v" ||
  process.argv[3] === "-v") 
{ /* ./some/example.md http://google.com/ ok 301 Google */
  options.validate = true;
  console.log("validate");
  if (mdLinksJS.isDirectory(userPath)) {
      mdLinksJS.getFilesFromDirectory(userPath).then(fileList => {
        console.log(fileList);
        fileList.forEach(file => {
          mdLinksJS.validate(file);
        });
      });} 
      
  else {
    mdLinksJS.validate(userPath);
  }} 
  
  else if (
  process.argv[3] === "--stats" ||
  process.argv[3] === "--s" ||
  process.argv[3] === "-s") 
{ /* Total: 3
  Unique: 3 */
  options.stats = true;
  console.log("stats"); } 
  
  else if (process.argv[1] && process.argv[2]) 
{/* [{ href, text, file }] */
if (mdLinksJS.isDirectory(userPath)) {
  mdLinksJS.getFilesFromDirectory(userPath).then(fileList => {
    fileList.forEach(file => {
      mdLinksJS.nonOptions(file);
      });
    });
  } else {
    mdLinksJS.readFile(userPath);
  }}

mdLinksJS
  .mdLinks(userPath, options) /* Me dice que no es una función */
  .then(res => {
    console.log("$$$$$$ soy res de la funcion mdLinks bb", res);
  })
  .catch(err => {
    //console.log("mdLinks error in index.js", err);
  });
