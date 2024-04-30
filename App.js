import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { reverseString } from './lib/native';
import AudioRecorder from './src/recoder';

export default function App() {
  return (
    <View style={styles.container}>
      <AudioRecorder/>
    </View>
  );
}


const reverseStrCom = () => {
  const [value, setValue] = useState('')
  const [reversed, setReversed]  = useState(null)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reverse string in bare:</Text>
      <TextInput style={styles.input} value={value} onChangeText={setValue}/>
      <Button
        onPress={() => {
          reverseString(value).then(result => {
            setReversed(result)
          })
          setValue("")
        }}
        title="Send"
      />
      {reversed !== null && <><Text style={styles.text}>Result: {reversed}</Text></>}
      <StatusBar style="auto" />
      <AudioRecorder/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  text: {
    fontSize: 16
  },
  input: {
    width: 300,
    padding: 10,
    backgroundColor: '#fff'
  }
});
