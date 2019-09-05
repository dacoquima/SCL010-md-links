const fetch = require("fetch");
fetchUrl = fetch.fetchUrl;
const path = require("path");
const fs = require("fs");
const markdownLinkExtractor = require("markdown-link-extractor");
const FileHound = require("filehound");
const marked = require("marked");

const mdLinks = (userPath, options) => {
  return new Promise((resolve, reject) => {
    checkFile(userPath);
    // console.log("userPath in mdLinks", userPath);
    // console.log("options en mdLinks", options);
    // resolve("funciona fx mdLinks :B")
  });
};

//Leer path, normalizar y absolutizar la ruta
let userPath = process.argv[2];
if (!path.isAbsolute(userPath)) {
  userPath = path.normalize(userPath);
  userPath = path.resolve(userPath);
}

// Viendo si el path ingresado es .md o directorio
const checkFile  = userPath => {
  fs.lstat(userPath, (err, stats) => {
    if (err) {
      console.log('Agrega un directorio válido o un archivo markdown ".md"');
    } else if (stats.isDirectory()) {
      getFilesFromDirectory(userPath); 
      console.log(userPath);
    } else isMd(userPath);    
    })}

//Si es path es directorio 
const isDirectory = userPath => {
  return fs.lstatSync(userPath).isDirectory() /* Buscar como hacerlo asincrono */
}

// Extraer archivos .md del directorio 
const getFilesFromDirectory = userPath => {
  return new Promise((resolve, reject) => {
  FileHound.create()
    .discard("node_modules")
    .paths(userPath)
    .ext("md")
    .find()
    .then(res => { 
      resolve(res) 
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      reject(err)
    });
  })
}

// Si es un archivo .md
const isMd = userPath => {
return new Promise((resolve, reject) => {
let userPathMd = userPath.split(".")
if (userPathMd[1] === "md") {
  readFile(userPath, "utf8")
    .then(res => {
      resolve(res) 
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      reject(err);
    })}})}

// Leyendo archivo y adquiriendo la "Opción sin opción" [{ href, text, file }]
const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const renderer = new marked.Renderer();
        links = [];
        renderer.link = (href, title, text) => {
          links.push({
            href: href,
            text: text,
            file: path            
          });
        };
        marked(data, { 
        renderer: renderer 
        });
        resolve(links);
      }
    });
  });
};

// Respuesta a opción validate (./some/example.md http://google.com/ ok 301 Google)
const validate = path => {
  readFile(path)
    .then(links => {
      console.log(links);
      links.forEach(link => {
        //let extractorLinks = markdownLinkExtractor(fs.readFileSync(link.file).toString());
        fetchUrl(link.href, function(error, meta, body) {
          console.log("EL LINK ES:", link);
          console.log("FETCH STATUS:", meta.status);
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  mdLinks,
  checkFile,
  readFile,
  validate,
  isDirectory,
  getFilesFromDirectory,
  isMd
};


//Si path del usuario es un .md
// //Extrayendo links y viendo status
// links.forEach(function (link) {
//     function checkFile (res) {
//         if (res.ok) {
//             // console.log(res.statusText)
//             // console.log(res.status)
//             // console.log(res.url)
//             arrayLinks.push(res.statusText, res.status, res.url)
//             //console.log(arrayLinks); /* Muestra links y sus estados */
//         } else {
//             //console.log('ERROR');
//         }
//     }
//     fetch(link)
//         .then(checkFile);
//  })