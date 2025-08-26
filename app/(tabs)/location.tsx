import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { MapPin, Play, Square, Navigation } from 'lucide-react-native';

export default function LocationScreen() {
  const { theme } = useTheme();
  const [isRiding, setIsRiding] = useState(false);
  const [rideData, setRideData] = useState({
    distance: 0,
    duration: '00:00:00',
    speed: 0,
  });

  const handleStartRide = () => {
    setIsRiding(true);
    // Simulate ride tracking
    const interval = setInterval(() => {
      setRideData(prev => ({
        distance: prev.distance + 0.1,
        duration: prev.duration, // Would be calculated in real implementation
        speed: Math.floor(Math.random() * 60) + 20,
      }));
    }, 1000);
  };

  const handleStopRide = () => {
    setIsRiding(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Ride Tracking
        </Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.mapContainer, { backgroundColor: theme.surface }]}>
          <MapPin size={60} color={theme.textSecondary} />
          <Text style={[styles.mapPlaceholder, { color: theme.textSecondary }]}>
            Map View Coming Soon
          </Text>
        </View>

        <View style={[styles.statsContainer, { backgroundColor: theme.surface }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {rideData.distance.toFixed(1)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              KM
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {rideData.duration}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              TIME
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.textPrimary }]}>
              {rideData.speed}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              KM/H
            </Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[
              styles.rideButton,
              {
                backgroundColor: isRiding ? '#FF3B30' : theme.primary,
              },
            ]}
            onPress={isRiding ? handleStopRide : handleStartRide}
          >
            {isRiding ? (
              <Square size={24} color="#FFFFFF" />
            ) : (
              <Play size={24} color="#FFFFFF" />
            )}
            <Text style={styles.rideButtonText}>
              {isRiding ? 'Stop Ride' : 'Start Ride'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navigationButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
          >
            <Navigation size={20} color={theme.textPrimary} />
            <Text style={[styles.navigationButtonText, { color: theme.textPrimary }]}>
              Navigation
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mapPlaceholder: {
    fontSize: 18,
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  controlsContainer: {
    gap: 12,
  },
  rideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  rideButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  navigationButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});