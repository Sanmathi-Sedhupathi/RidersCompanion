import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, Settings, Award, MapPin, Calendar, Users, Camera, CreditCard as Edit3 } from 'lucide-react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const achievements = [
    { id: '1', title: 'First Ride', description: 'Completed your first ride', icon: '🏍️' },
    { id: '2', title: 'Speed Demon', description: 'Reached 100 km/h', icon: '⚡' },
    { id: '3', title: 'Explorer', description: 'Visited 10 different cities', icon: '🗺️' },
    { id: '4', title: 'Social Rider', description: 'Joined 5 group rides', icon: '👥' },
  ];

  const stats = [
    { label: 'Total Rides', value: '47' },
    { label: 'Followers', value: '234' },
    { label: 'Following', value: '189' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={openDrawer}>
          <Menu size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Profile
        </Text>
        <TouchableOpacity>
          <Settings size={24} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={[styles.profileSection, { backgroundColor: theme.surface }]}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={[styles.cameraButton, { backgroundColor: theme.primary }]}>
              <Camera size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.textPrimary }]}>
              {user?.fullName || 'John Rider'}
            </Text>
            <Text style={[styles.profileUsername, { color: theme.textSecondary }]}>
              @{user?.username || 'johnrider'}
            </Text>
            <Text style={[styles.profileBio, { color: theme.textSecondary }]}>
              Adventure seeker | Mountain lover | Group ride enthusiast
            </Text>
          </View>

          <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Edit3 size={16} color={theme.textPrimary} />
            <Text style={[styles.editButtonText, { color: theme.textPrimary }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={[styles.statsContainer, { backgroundColor: theme.surface }]}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.textPrimary }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Miles Achievement */}
        <View style={[styles.milesSection, { backgroundColor: theme.surface }]}>
          <View style={styles.milesHeader}>
            <Award size={24} color={theme.primary} />
            <Text style={[styles.milesTitle, { color: theme.textPrimary }]}>
              Miles Achievement
            </Text>
          </View>
          <View style={styles.milesContent}>
            <Text style={[styles.milesValue, { color: theme.primary }]}>
              {user?.milesAchievement || 2847} KM
            </Text>
            <Text style={[styles.milesSubtitle, { color: theme.textSecondary }]}>
              Total Distance Traveled
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
            <View style={[styles.progressFill, { backgroundColor: theme.primary, width: '68%' }]} />
          </View>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            68% to next milestone (5000 KM)
          </Text>
        </View>

        {/* Achievements */}
        <View style={[styles.achievementsSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Achievements
          </Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={[styles.achievementItem, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={[styles.achievementTitle, { color: theme.textPrimary }]}>
                  {achievement.title}
                </Text>
                <Text style={[styles.achievementDescription, { color: theme.textSecondary }]}>
                  {achievement.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={[styles.activitySection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Recent Activity
          </Text>
          <View style={styles.activityItem}>
            <MapPin size={20} color={theme.primary} />
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: theme.textPrimary }]}>
                Mountain Trail Ride
              </Text>
              <Text style={[styles.activitySubtitle, { color: theme.textSecondary }]}>
                45.2 KM • 2 hours ago
              </Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Users size={20} color={theme.secondary} />
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: theme.textPrimary }]}>
                Group Ride with 8 riders
              </Text>
              <Text style={[styles.activitySubtitle, { color: theme.textSecondary }]}>
                78.5 KM • Yesterday
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  editButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    margin: 16,
    borderRadius: 16,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  milesSection: {
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  milesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  milesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  milesContent: {
    alignItems: 'center',
    marginBottom: 16,
  },
  milesValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  milesSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'center',
  },
  achievementsSection: {
    padding: 20,
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  activitySection: {
    padding: 20,
    margin: 16,
    borderRadius: 16,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  activityContent: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  activitySubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});