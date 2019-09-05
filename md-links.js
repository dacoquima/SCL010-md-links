const fetch = require("fetch");
fetchUrl = fetch.fetchUrl;
const path = require("path");
const fs = require("fs");
const markdownLinkExtractor = require("markdown-link-extractor");
const markdown = fs.readFileSync("./README.md").toString();
const FileHound = require("filehound");
const marked = require("marked");

const mdLinks = (userPath, options) => {
  return new Promise((resolve, reject) => {
    checkStats(userPath);
    // console.log("userPath in mdLinks", userPath);
    // console.log("options en mdLinks", options);
    // resolve("funciona fx mdLinks :B")
  });
};

//Ver si path es directorio o archivo
let userPath = process.argv[2];
if (!path.isAbsolute(userPath)) {
  userPath = path.normalize(userPath);
  userPath = path.resolve(userPath);
}

const checkStats = userPath => {
  fs.lstat(userPath, (err, stats) => {
    if (err) {
      console.log('Agrega un directorio válido o un archivo markdown ".md"');

      //Si es directorio, ejecutar funcion fileHound para encontrar archivos .md
    } else if (stats.isDirectory()) {
      
      //Extrayendo los archivos .md
       FileHound.create()
        .discard("node_modules")
        .paths(userPath)
        .ext("md")
        .find()
        .then(res => {
          res.forEach(file => {
            console.log(file);
            readFile(file);
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      let userPathMd = userPath.split(".");
      if (userPathMd[1] === "md") {
        readFile(userPath, "utf8")
          .then(res => {
            readFile(userPath);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  });
};
//checkStats(userPath);

//Recorriendo lo .md /* No esta funcionando */

//Si path del usuario es un .md
// //Extrayendo links y viendo status
// links.forEach(function (link) {
//     function checkStatus(res) {
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
//         .then(checkStatus);
//  })

const readFile = path => {
  return new Promise((resolve, reject) => {
    let links = [];
    fs.readFile(path, "utf-8", function(err, data) {
      if (err) {
        reject(err);
      } else {
        const renderer = new marked.Renderer();
        renderer.link = function(href, title, text) {
          links.push({
            href: href,
            text: text,
            file: path
          });
          console.log(links);
        };
        marked(data, { renderer: renderer });
        resolve(links);
      }
    });
  });
};

// Respuesta a opción validate (./some/example.md http://google.com/ ok 301 Google)

let links = markdownLinkExtractor(markdown);
links.forEach(link => {
  fetchUrl(link, function(error, meta, body) {
    //console.log("EL LINK ES:", link);
    //console.log("FETCH STATUS:", meta.status);
  });
});

module.exports = {
  mdLinks,
  checkStats,
  readFile
};
