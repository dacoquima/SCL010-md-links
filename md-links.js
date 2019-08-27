const fetch = require('node-fetch');
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const markdown = fs.readFileSync('README.md').toString();
const links = markdownLinkExtractor(markdown);
const FileHound = require('filehound');

let mdFiles = []; 
let arrayLinks = [];

//Extrayendo los archivos .md 
const files = FileHound.create()
  .discard('node_modules')
  .paths('./')
  .ext('md')
  .find();

files
    .then(res => {
    //call function readFile(res);
    mdFiles.push(res);            
    //console.log(mdFiles);
    });

//Extrayendo links y viendo status
links.forEach(function (link) {
function checkStatus(res) {
    if (res.ok) { 
        // console.log(res.statusText)
        // console.log(res.status)
        // console.log(res.url)
        arrayLinks.push(res.statusText, res.status, res.url)
        console.log(arrayLinks);
    } else {
        console.log('ERROR');
    }}
fetch(link)
    .then(checkStatus);  
 });

