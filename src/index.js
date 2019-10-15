const { pipeline, Transform } = require('stream')
const { StringDecoder } = require('string_decoder')

if (process.stdin.isTTY) {
  let input = process.argv[2]
  input = Number(input) / 1000 || new Date().getTime() / 1000
  console.log(Math.round(input))
  process.exit(0)
}

class MilisecondToSeconds extends Transform {
  constructor (options) {
    super(options)
    this._decoder = new StringDecoder('utf-8')
  }

  _transform (chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk)
    }

    if (chunk === '\u0003') {
      process.exit()
    }
    let convertedChunks = chunk.split('\n').map(c => Math.round(Number(c) / 1000) || -1)
    convertedChunks = convertedChunks.filter(c => Number.isInteger(c) && c > 0)
    // LF
    convertedChunks.push('')
    callback(null, convertedChunks.join('\n'))
  }
}

pipeline(process.stdin, new MilisecondToSeconds(), process.stdout,
  err => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
