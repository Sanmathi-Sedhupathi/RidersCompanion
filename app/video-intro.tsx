import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function VideoIntroScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const videoRef = useRef<Video>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      router.replace('/(tabs)');
      return;
    }

    // Check if video has already been played in this session
    if (hasPlayed) {
      router.replace('/');
      return;
    }
  }, [isAuthenticated, hasPlayed]);

  const handleVideoEnd = () => {
    setHasPlayed(true);
    // Navigate to splash screen after video ends
    router.replace('/');
  };

  const handleVideoError = () => {
    // If video fails to load, go directly to splash
    router.replace('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#000000' }]}>
      <StatusBar hidden />
      <Video
        ref={videoRef}
        style={styles.video}
        source={require('@/assets/logo.mp4')}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        shouldPlay={true}
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded && status.didJustFinish) {
            handleVideoEnd();
          }
        }}
        onError={handleVideoError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height,
  },
});