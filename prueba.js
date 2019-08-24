const fs = require('./README.html');

fs.readFile('./README.html', (err, data) => {
    if (err) throw err;
    console.log(fs);
  });