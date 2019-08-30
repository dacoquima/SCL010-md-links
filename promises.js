const fetch = require('fetch');
const fetchUrl = fetch.fetchUrl;
const fs = require('fs');
const getData = (url) => {
    return new Promise ((resolve, reject) => {
        fetchUrl(url, (error, meta, body) => {
            if (meta){
                if(meta.status === 200){
                    resolve(meta.status.toString());
                } else {
                reject(error);
                }
            }
        })
    })
}

let url = 'https://google.com';
getData(url)
.then(res => {
   // console.log('El estado de ', url, 'es', res);
})
.catch(error => {
    //console.log('error');
})

//____________________________________________________________________________________________________

let myFirstPromise = Promise.resolve('Hola Mundo');

myFirstPromise.then(response => {
//  console.log(response);
});

let mySecondPromise = new Promise((resolve, reject) => {
  setTimeout (() => resolve(5), 2000);
})

mySecondPromise.then(res => {
  res+=5;
//  console.log(res);
})
