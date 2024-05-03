import ce from 'compact-encoding';
import { requireNativeModule } from 'expo-modules-core';
import RPC from 'tiny-buffer-rpc';

requireNativeModule('HelloBare').install();

// forward bare's logs to console
HelloBare.onLog = console.log

// RPC
const rpc = new RPC(HelloBare.sendMessage)
HelloBare.onMessage = rpc.recv.bind(rpc)

let transcriberMethod = null

export const renderTranscript = (callback)=> {
  transcriberMethod = rpc.register(0, {
    request: ce.string,
    response: ce.string,
    onrequest: message => {
      console.log(message, 'message');
      callback(message);
      return message;
    }
  })
}

export const sendURI = async (uri) => {
  if (transcriberMethod) {
    return await transcriberMethod.request(uri)

  }

  console.error('TRANSCRIBERMETHOD_NULL')
}
