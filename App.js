import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { reverseString } from './lib/native';
import AudioRecorder from './src/recoder';

export default function App() {
  const textInputRef = useRef(null);
  const updateTextInput = (transcript) => {
    if (textInputRef.current) {
      // we need to collect the cureent values from `TextInput`

      const currentValue = textInputRef.current?._transcript || '';
      const newValue = currentValue + transcript;
      textInputRef.current._transcript = newValue;
      textInputRef.current.setNativeProps({ text: newValue });
    }
  };


  // setInterval(()=>{
  //   updateTextInput('Hello ');
  // }, 1000)

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        style={styles.textArea}
        multiline={true}
        placeholder="Type something..."
      />
      <AudioRecorder updateTextInput={updateTextInput}/>
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
  textArea: {
    width: '80%',
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    position: 'absolute'
  },
  text: {
    fontSize: 16
  },
  input: {
    width: 300,
    padding: 10,
    backgroundColor: '#fff'
  },
});
