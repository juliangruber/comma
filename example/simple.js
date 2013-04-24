var parse = require('..');

var parser = parse();
parser.on('data', console.log);

parser.write('foo,bar,baz\n');
parser.pause();
parser.write('1,2.5,3');
parser.resume();
parser.end();
