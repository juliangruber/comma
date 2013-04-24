var Stream = require('stream');

module.exports = parse;

function parse (str) {
  if (str) {
    var p = parse();
    var parsed = [];
    p.on('data', function (row) { parsed.push(row); });
    p.write(str);
    p.end();
    return parsed;
  }

  var s = new Stream;
  s.writable = s.readable = true;

  var paused = false;

  var lineBuf = '';
  var pauseBuf = [];

  s.write = function (chunk) {
    if (paused) {
      pauseBuf.push(chunk);
      return false;
    }

    var lines = (lineBuf + chunk).split('\n');
    lineBuf = lines.pop();

    for (var i = 0; i < lines.length; i++) {
      s.emit('data', lines[i].split(','));
    }
  }

  s.pause = function () {
    paused = true;
    return s;
  }

  s.drain = s.resume = function () {
    if (!paused) return;
    paused = false;
    for (var i = 0; i < pauseBuf.length; i++) {
      s.write(pauseBuf[i]);
    }
    return s;
  }

  s.end = function () {
    if (lineBuf) {
      s.emit('data', lineBuf.split(','));
    }

    s.writable = false;
    s.emit('close');
    s.emit('end');
    return s;
  }

  return s;
}
