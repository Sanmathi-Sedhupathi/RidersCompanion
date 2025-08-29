import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
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
  const [status, setStatus] = useState({});
  const video = useRef<Video>(null);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      router.replace('/(tabs)');
      return;
    }
  }, [isAuthenticated]);

  const handleVideoEnd = () => {
    router.replace('/splash');
  };

  const handleSkip = () => {
    router.replace('/splash');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Video
        ref={video}
        style={styles.video}
        source={require('@/assets/logo.mp4')}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          setStatus(status);
          if (status.isLoaded && status.didJustFinish) {
            handleVideoEnd();
          }
        }}
      />
      
      <TouchableOpacity 
        style={[styles.skipButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
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
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});