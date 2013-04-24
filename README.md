
# comma

A S{t,c}reaming fast CSV parser!

Speed comes at a cost: Strings containing `,`s are not supported.

## Usage

With this data stored in `some.csv`:

```csv
foo,bar,baz
1,2.5,3
```

And this script:

```js
var parse = require('comma');
var fs = require('fs');

fs.createReadStream(__dirname + '/some.csv')
  .pipe(parse())
  .on('data', console.log);
```

This output will be:

```bash
$ node example/file.js
[ 'foo', 'bar', 'baz' ]
[ '1', '2.5', '3' ]
```

## API

### comma()

Returns a new readable writable Stream that emits parsed CSV.

### comma(string)

Sugar for parsing a `String` of CSV.

```js
var parsed = parse('a,b,c\n1,2,3');
// => [ ['a', 'b', 'c'],
//      ['1', '2', '3'] ]
```

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install comma
```
## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
