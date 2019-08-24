//acá van las funciones (?)
//let yourMarkdown = require('./README.md')

//let fetchUrl = require("fetch").fetchUrl;  

let FetchStream = require("fetch").FetchStream;
let fetch = new FetchStream("http://google.com");

fetch.on("data", function(chunk){
    console.log(chunk);
});

//exports.all = mdLinks;