var parse = require('./');

var parser = parse();

var start = Date.now();
var num = 1e6;

parser.on('close', function () {
  console.log('took %s ms for %s entries', Date.now() - start, num);
});

for (var i = 0; i < num; i++) {
  parser.write('foo,bar,baz\n');
  parser.write('1,2.5,3');
}

parser.end();
