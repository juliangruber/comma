var Stream = require('stream');

module.exports = parse;

function readLineToArray (line) {
  var matches = line.match(/(["|'].*?["|']|[^",\s|^',\s]+)(?=\s*,|\s*$)/g);
  return matches.map(function (item) { 
    return item.replace(/^['|"]/g,'').replace(/['|"]$/g,'').replace(/[\\]+/g,'');
  });
}

/**
 * Returns a new readable writable Stream that emits parsed CSV or
 * a parsed CSV string if a string is provided
 *
 * @param {String} str
 * @param {Object} options
 */
function parse (str, options) {
  // ensure options is an object
  options = (typeof str === 'object' && !Buffer.isBuffer(str))? str : options;
  options = (typeof options === 'object')? options : {};
  str     = (typeof str === 'string' || Buffer.isBuffer(str))? str : null;

  if (str) {
    var p = parse(options);
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
      if (!lines[i]) continue;
      var line  = lines[i];
      var parts = (options.escape === false)? lines[i].split(',') : readLineToArray(line);
      s.emit('data', parts);
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
      if (options.escape === false) s.emit('data', lineBuf.split(','));
      else s.emit('data', readLineToArray(lineBuf));
    }

    s.writable = false;
    s.emit('close');
    s.emit('end');
    return s;
  }

  return s;
}
