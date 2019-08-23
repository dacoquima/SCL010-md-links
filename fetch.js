let FetchStream = require("fetch").FetchStream;
let fetch = new FetchStream("http://google.com");

fetch.on("data", function(chunk){
    console.log(chunk);
});

