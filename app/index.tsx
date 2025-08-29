import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    'RedSeven': require('@/assets/fonts/Redseven.otf'),
  });

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      router.replace('/(tabs)');
      return;
    }

    // Start animations only when fonts are loaded
    if (fontsLoaded) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isAuthenticated, fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleGetStarted = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        router.push('/auth/login');
      });
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/WhatsApp Image 2025-08-20 at 12.34.21_3d229e5f.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              transform: [{ translateY: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              })}],
            },
          ]}
        >
          <Text style={[styles.title, { color: theme.textPrimary, fontFamily: 'RedSeven' }]}>
            RIDER'S COMPANION
          </Text>
          <Text style={[styles.subtitle, { color: '#B71D1D' }]}>
            The Ultimate Riding Experience
          </Text>
          <Text style={[styles.tagline, { color: '#666666' }]}>
            Solo journeys & group adventures with friends and family
          </Text>
          <Text style={[styles.motto, { color: '#B71D1D' }]}>
            Together on Every Road
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{ translateY: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              })}],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.getStartedButton, { backgroundColor: theme.primary }]}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
    textShadowColor: 'rgba(183, 29, 29, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 30,
    marginBottom: 8,
  },
  motto: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    width: '100%',
  },
  getStartedButton: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});