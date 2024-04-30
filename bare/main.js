require('./runtime')

const RPC = require('tiny-buffer-rpc')
const ce = require('compact-encoding')
try{
  console.log(Bare.arch, 'Bare.arch')
  const fs = require('bare-fs')

  const readFileRPC = () => {
    fs.readFile('file.txt', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file:', err);
          return 'Error';
      }
      return data
    });
  }

}catch(e){
  console.log('Error: ', e)
}

const rpc = new RPC(HelloBare.sendMessage)
HelloBare.onMessage = rpc.recv.bind(rpc)

rpc.register(0, {
  request: ce.string,
  response: ce.string,
  onrequest: message => message.split('').reverse().join('')
  // onrequest: message => readFileRPC()
})

// keep the event loop alive
setInterval(() => {}, 2000)

// tell app we're ready
HelloBare.onReady()