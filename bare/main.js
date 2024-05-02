require('./runtime')

const RPC = require('tiny-buffer-rpc')
const ce = require('compact-encoding')
const fs = require('bare-fs')
console.log('Bare.arch>>>', Bare.arch, 'Bare.platform>>>' , Bare.platform)

 
const readFileRPC = (filePath) => {
  try{
    const data = fs.readFileSync(filePath);
    console.log('File content:', data.buffer);
  }catch(e){
    console.log('File read Error :', e);
  }
}


function removeFilePrefix(uri) {
  if (uri.startsWith('file://')) {
    return uri.substring(7);
  }
  return uri;
}

const rpc = new RPC(HelloBare.sendMessage)
HelloBare.onMessage = rpc.recv.bind(rpc)

rpc.register(0, {
  request: ce.string,
  response: ce.string,
  onrequest: message => {
    console.log(message, 'message');
    const path = removeFilePrefix(message)
    readFileRPC(path)

    return message.split('').reverse().join('');
  } 
})

// keep the event loop alive
setInterval(() => {}, 2000)

// tell app we're ready
HelloBare.onReady()