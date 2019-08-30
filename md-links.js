const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const markdown = fs.readFileSync('./README.md').toString();
const links = markdownLinkExtractor(markdown);
const FileHound = require('filehound');

let mdFiles = []; 
let arrayLinks = [];

//Leyendo la línea de comando 
const process = require('process');
   process.argv.forEach((val, index) => {
    //console.log(`${index}: ${val}`);
});

//Guardando el path que ingresa el usuario y mostrando en la consola la respuesta
let userPath = process.argv[2]; 
userPath = path.normalize(userPath)
userPath = path.resolve(userPath)
console.log(userPath);
const process2 = process.argv.slice(1); /* Recuerda cambiarl el slice final a 2 */
  //console.log(process2); /* Respuesta que tiene que ver el usuario */
  // path.push(process.argv[1])

//Ver si path es directorio o archivo
const checkStats = userPath => {
fs.lstat(userPath, (err, stats) => {
    if (err) {
    console.log('Agrega un directorio válido o un archivo markdown ".md"');

//Si es directorio, ejecutar funcion fileHound para encontrar archivos .md
} else if (stats.isDirectory()) { 
    console.log('Es directorio');

//Extrayendo los archivos .md 
const files = FileHound.create() 
.discard('node_modules')
.paths(userPath)
.ext('md')
.find();
files
  .then(res => {
      mdFiles.push(res);            
      console.log(mdFiles);
  })
  .catch(err => {
      //console.log(err)      
  }) 
};     
})};

checkStats(userPath);

//Si path del usuario es un .md
let userPathMd = userPath.split('.');
if (userPathMd[1] === 'md') {
console.log('Es un archivo md');  

//Leyendo archivo .md
const readFile = (fileName, type) => {
    return new Promise ((resolve, reject) => {
        fs.readFile(fileName, type, (error, content) => {
            if(error) {
              reject(error);  
            } else {
                resolve(content);
            }})})};
readFile(userPath, 'utf8')
    .then(res => {
    //console.log(res) /* Me lee todo el README */
    })
    .catch(err => {
    //console.log(err)
    });   
};       

//Extrayendo links y viendo status
links.forEach(function (link) {
function checkStatus(res) {
    if (res.ok) { 
        // console.log(res.statusText)
        // console.log(res.status)
        // console.log(res.url)
        arrayLinks.push(res.statusText, res.status, res.url) 
        //console.log(arrayLinks); /* Muestra links y sus estados */
    } else {
        //console.log('ERROR');
    }}
fetch(link)
    .then(checkStatus);  
 });

module.exports = () => {
process,
files,
readFile,
links,
checkStatus
};