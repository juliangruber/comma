var parse = require('..');
var test = require('tape');

test('comma', function (t) {
  t.plan(3);

  var parser = parse();
  
  var i = 0;
  parser.on('data', function (data) {
    if (i++ == 0) {
      t.deepEqual(data, ['foo', 'bar', 'baz']);
    } else {
      t.deepEqual(data, ['1', '2.5', '3']);
    }
  });

  parser.on('close', function () {
    t.ok(true, 'closed');
    t.end();
  });

  parser.write('foo,bar,baz\n');
  parser.pause();
  parser.write('1,2.5,3');
  parser.resume();
  parser.end();
});

