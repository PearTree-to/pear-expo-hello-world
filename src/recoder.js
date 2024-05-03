import { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { sendURI, renderTranscript } from '../lib/native';

export default function AudioRecorder({updateTextInput=()=>{}}) {
  const [recording, setRecording] = useState();
  const [recordingChunks, setRecordingChunks] = useState([]);
  const [permissionResponse, requestPermission] = Audio.usePermissions();


  const onRecordingStatusUpdate = async (status) => {
    
  };

  useEffect(()=>{
    renderTranscript(updateTextInput)
  },[updateTextInput])

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        const response = await requestPermission(); // Update permissionResponse
        if (response.status !== 'granted') {
            console.log('Permission denied.', response );
            alert('Audio Permission denied')
            return; // Exit function if permission is denied
        }
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY, onRecordingStatusUpdate, 1000 );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    // console.log('Recording stopped and stored at', uri);
    sendURI(uri)
  }

  return (
    <View style={styles.recoder}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    recoder: {
        position: 'absolute',
        bottom: 20,  
        width: '100%',  
        alignItems: 'center',
    },
});
