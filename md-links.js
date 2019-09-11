#!/usr/bin/env node

const fetch = require("fetch");
fetchUrl = fetch.fetchUrl;
const path = require("path");
const fs = require("fs");
const markdownLinkExtractor = require("markdown-link-extractor");
const FileHound = require("filehound");
const marked = require("marked");
const chalk = require('chalk');

const mdLinks = (userPath, options) => {
  return new Promise((resolve, reject) => {
    resolve
    .then(res => { 
      resolve(res) 
      checkFile(userPath);
      readFile(userPath);
      isDirectory(userPath);
      getFilesFromDirectory(userPath);
      isMd(userPath);
      nonOptions(options);
      statsAndValidate(options);
      validate(options);
      stats(options);
    })
    .catch(err => {
      console.log(err);
      reject(err)
    });
  });
};

//Leer path, normalizar y absolutizar la ruta
let userPath = process.argv[2];
if (!path.isAbsolute(userPath)) {
  userPath = path.normalize(userPath);
  userPath = path.resolve(userPath);
  console.log(userPath); 
}

// Viendo si el path ingresado es .md o directorio
const checkFile  = userPath => {
  fs.lstat(userPath, (err, stats) => {
    if (err) {
      console.log('Agrega un directorio válido o un archivo markdown ".md"');
    } else if (stats.isDirectory()) {
      getFilesFromDirectory(userPath); 
      //console.log(userPath);
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

// Leyendo archivo 
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

// Respuesta a opción sin opciones [{ href, text, file }]
const nonOptions = path => {
  readFile(path)
    .then(links => {
      console.log(links);
      links.forEach(link => {
        fetchUrl(link.href, function(error, meta, body) {          
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Respuesta a stats & validate /* Total: 3 Unique: 3 Broken: 1 */
const statsAndValidate = path => {
  let counter = 0;
  readFile(path)
    .then(links => { 
      links.forEach(link => {
      fetchUrl(link.href, function(error, meta, body) {
        if(meta) {
          if ( meta.status > 299 ){
            counter++;
            console.log(chalk.yellow('Broken: ',counter));
            console.log(chalk.yellow('Total:', links.length));
          }
        } 
    })
  }) 
})
    .catch(err => {
      console.log(err);
    });  }  

// Respuesta a opción validate (./some/example.md http://google.com/ ok 301 Google)
const validate = path => {
  readFile(path)
    .then(links => {
      links.forEach(link => {
        fetchUrl(link.href, function(error, meta, body) {   
          console.log(path); 
          console.log(chalk.white.bold(link.href));  
            if ( links.status < 299 ){
              console.log(chalk.yellow(' OK '));
          } else if ( links.status > 299 ){
          console.log(chalk.white.bgRed.bold(' FAIL '));
          }}
        ); 
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Respuesta a opción stats /* Total: 3 Unique: 3 */
  const stats = path => {
  readFile(path)
  .then(links => {
      let totalLinks = links.length;
      console.log(chalk.yellow('Total:', totalLinks));
        })
        .catch(err => {
          console.log(err);
     });
  }

module.exports = {
  mdLinks,
  checkFile,
  readFile,
  isDirectory,
  getFilesFromDirectory,
  isMd,
  nonOptions,
  statsAndValidate,
  validate,
  stats
};