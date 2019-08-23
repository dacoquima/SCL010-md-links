//acá van las funciones (?)
let yourMarkdown = require('./README.md')
let mdLinks = require('./index.js') 
let fetchUrl = require("fetch").fetchUrl;  

    for (let i = 0; i < mdLinks.length; i++) {
        if (mdLinks.includes('http://')) {
            exports.all = mdLinks[i].includes;
            console.log(mdLinks[i].includes);       
     }}

//exports.all = mdLinks;