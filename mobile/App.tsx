import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import AvatarPlayer from './components/AvatarPlayer';
import axios from 'axios';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await axios.post('https://your-api.com/api/llm', { prompt });
      const response = res.data.response;
      const tts = await axios.post('https://your-api.com/api/tts', { text: response });
      const audioUrl = tts.data.audioUrl;
      setVideoUrl(audioUrl);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>AI Avatar Mobile</Text>
        <TextInput
          style={styles.input}
          placeholder="Tanya sesuatu..."
          value={prompt}
          onChangeText={setPrompt}
        />
        <Button title="Hantar ke AI" onPress={handleGenerate} />
        {videoUrl && <AvatarPlayer videoUrl={videoUrl} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, marginBottom: 12
  },
});
