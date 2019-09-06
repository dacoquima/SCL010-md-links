# Markdown links / Md-dm-links

  

Md-links es una librería de npm que debe ser implementada en Javascript y ser ejecutada en Node.js, esta tiene la función de poder reconocer archivos **markdown** y poder entregar el estado de los links que este contenga.

  

![enter image description here](https://lh3.googleusercontent.com/uNYh9gXQ5aEaWT58lL7bfhfIS1VxLH13nKhXYDsajl0rbOT1u9dEB6NruPFm89BHd-PX88EpqbVX5A)

  
  

### Instalación ⚙

Para su instalación se debe ejecutar en la terminal la siguiente linea de comando `npm i md-dm-links`, posteriormente se debe ingresar los siguiente parámetros en la terminal.

  

 - `$ md-links <path-to-file> [options]` o `node md-links <path-to-file>
   [options]`

 
`<path-to-file>` puede ser un directorio, o directamente un`archivo.md`

  
  

### Modo de uso 📔

La librería tiene 4 opciones disponibles; sin opciones, validate, stats y estas dos últimas en conjunto.

  

**Ejemplo al sólo ingresar path**

 - `$ md-links README.md`

**Ejemplo de opciones**

 - `$ md-links README.md --validate`
 - `$ md-links README.md --stats`
 - `$ md-links README.md --v --s`

  

**La visualización de cada opción sería la siguiente**

 - `$ md-links README.md`
   *[{ href, text, file }]*

 - `$ md-links README.md --validate`
   *./some/example.md http://google.com/ OK 200 Google*

 - `$ md-links README.md --stats`
   *Total: 3 Unique: 3*

 - `$ md-links README.md --v --s`
   *Total: 3 Unique: 3 Broken: 1*

  
  

### Pre-requisitos 🚦

Para el correcto funcionamiento, debes tener instalado [Node.js](https://nodejs.org/), y otras librearías complementarias:

  

-  [Path](https://nodejs.org/api/path.html)
-  [File System](https://nodejs.org/api/fs.html)
-  [Fetch](https://www.npmjs.com/package/fetch)
-  [FileHound](https://www.npmjs.com/package/filehound)
-  [Marked](https://www.npmjs.com/package/marked)

  
  

## Diagrama de flujo 📝

![enter image description here](https://lh3.googleusercontent.com/t_HfDNHi0-vpX2tWfIfFzybqJeP6GyXGDO-67it9a5bLyvc6WByvcpegaSklPljl541iYOaN_k1QMQ)

  
  

## Desarrolladora 💻
*Daniela Quintana Martínez*
