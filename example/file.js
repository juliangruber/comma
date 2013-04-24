var parse = require('..');
var fs = require('fs');

fs.createReadStream(__dirname + '/some.csv')
  .pipe(parse())
  .on('data', console.log);
