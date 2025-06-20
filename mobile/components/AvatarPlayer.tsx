import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

export default function AvatarPlayer({ videoUrl }: { videoUrl: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Avatar:</Text>
      <Video
        source={{ uri: videoUrl }}
        useNativeControls
        resizeMode="contain"
        style={{ width: '100%', height: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  label: { fontWeight: 'bold', marginBottom: 8 },
});
