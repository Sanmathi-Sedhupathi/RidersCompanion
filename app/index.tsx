import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function IndexScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      // Start with video intro
      router.replace('/video-intro');
    }
  }, [isAuthenticated]);

  return null;
}