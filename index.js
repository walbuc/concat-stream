const { Writable } = require('stream');

ConcatStream.prototype = Object.create(Writable.prototype)

function ConcatStream() {
  if (!(this instanceof ConcatStream)) return new ConcatStream();
  Writable.call(this);
  this.body = []
}

ConcatStream.prototype.then = function(cb) {
  const result = new Promise((resolve, reject) => {
    this.on('finish', () => {
      resolve(this.getBuffer())
    })
    this.on('error', (err) => {
      reject(err)
    })
  })
  return result.then(cb)
}

ConcatStream.prototype._write = function(chunk, enc, next) {
  this.body.push(chunk)
  next()
}

ConcatStream.prototype.getBuffer = function() {
  return Buffer.concat(this.body)
}

module.exports = ConcatStream()
