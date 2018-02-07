# concat-stream

This module return a writable stream that takes
the content of a readable stream and concat the chunks
into one single buffer.
Once all the content is emitted it returns a Promise object
that is resolved  with the concatenated buffer.


```
npm install concat-promise
```

## Usage

``` js
var concat = require('concat-promise')
var Readable = require('stream').Readable;

var rs = new Readable;

rs.push('beep ');
rs.push('boop\n');
rs.push(null);

rs.pipe(concat).then( result => {
  console.log(result.toString())
}).catch((err) => {
  console.log(err)
})

```
