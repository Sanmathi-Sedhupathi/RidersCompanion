import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, Settings, Trophy, Camera, CreditCard as Edit3, Grid3x3 as Grid3X3, Car, Warehouse } from 'lucide-react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MomentModal from '@/components/MomentModal';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('achievements');

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const moments = [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Epic mountain ride! 🏔️',
      likes: 45,
      timeAgo: '2h',
      comments: 12,
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Night city cruise 🌃',
      likes: 32,
      timeAgo: '1d',
      comments: 8,
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Group ride adventure',
      likes: 67,
      timeAgo: '3d',
      comments: 23,
    },
    {
      id: '4',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Sunset highway',
      likes: 28,
      timeAgo: '5d',
      comments: 5,
    },
    {
      id: '5',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Weekend getaway',
      likes: 89,
      timeAgo: '1w',
      comments: 34,
    },
    {
      id: '6',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400',
      caption: 'Mountain trails',
      likes: 156,
      timeAgo: '1w',
      comments: 67,
    },
  ];

  const garage = [
    {
      id: '1',
      name: 'Yamaha R15 V4',
      model: '2023',
      color: 'Racing Blue',
      engine: '155cc',
      mileage: '45 kmpl',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      name: 'Honda CB350',
      model: '2022',
      color: 'Matte Black',
      engine: '348cc',
      mileage: '38 kmpl',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const stats = [
    { label: 'Moments', value: '24' },
    { label: 'Tracker', value: '234' },
    { label: 'Tracking', value: '189' },
  ];

  const [selectedMoment, setSelectedMoment] = useState<any>(null);
  const [showMomentModal, setShowMomentModal] = useState(false);

  const handleMomentPress = (moment: any) => {
    setSelectedMoment(moment);
    setShowMomentModal(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'achievements':
        return (
          <View style={styles.tabContent}>
            {/* Miles Achievement */}
            <View style={styles.milesSection}>
              <View style={styles.milesHeader}>
                <Trophy size={24} color={theme.primary} />
                <Text style={[styles.milesTitle, { color: theme.textPrimary }]}>
                  Miles Triumph
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
          </View>
        );

      case 'moments':
        return (
          <View style={styles.tabContent}>
            <View style={styles.momentsGrid}>
              {moments.map((moment) => (
                <TouchableOpacity 
                  key={moment.id} 
                  style={styles.momentItem}
                  onPress={() => handleMomentPress(moment)}
                >
                  <Image source={{ uri: moment.image }} style={styles.momentImage} />
                  <View style={styles.momentOverlay}>
                    <Text style={styles.momentLikes}>❤️ {moment.likes}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'garage':
        return (
          <View style={styles.tabContent}>
            {garage.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={[styles.vehicleCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
              >
                <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
                <View style={styles.vehicleInfo}>
                  <Text style={[styles.vehicleName, { color: theme.textPrimary }]}>
                    {vehicle.name}
                  </Text>
                  <Text style={[styles.vehicleModel, { color: theme.textSecondary }]}>
                    {vehicle.model} • {vehicle.color}
                  </Text>
                  <View style={styles.vehicleSpecs}>
                    <Text style={[styles.vehicleSpec, { color: theme.textSecondary }]}>
                      🏍️ {vehicle.engine}
                    </Text>
                    <Text style={[styles.vehicleSpec, { color: theme.textSecondary }]}>
                      ⛽ {vehicle.mileage}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={[styles.editVehicleButton, { backgroundColor: theme.primary }]}>
                  <Warehouse size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.addVehicleButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
            >
              <Car size={24} color={theme.textSecondary} />
              <Text style={[styles.addVehicleText, { color: theme.textSecondary }]}>
                Add Vehicle
              </Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
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
        {/* Banner Background */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay} />
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
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

          <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.primary }]}>
            <Edit3 size={16} color="#FFFFFF" />
            <Text style={styles.editButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.textPrimary }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {stat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'achievements' && { borderBottomColor: theme.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setActiveTab('achievements')}
          >
            <Trophy size={20} color={activeTab === 'achievements' ? theme.primary : theme.textSecondary} />
            <Text style={[
              styles.tabButtonText,
              { color: activeTab === 'achievements' ? theme.primary : theme.textSecondary }
            ]}>
              Triumphs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'moments' && { borderBottomColor: theme.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setActiveTab('moments')}
          >
            <Grid3X3 size={20} color={activeTab === 'moments' ? theme.primary : theme.textSecondary} />
            <Text style={[
              styles.tabButtonText,
              { color: activeTab === 'moments' ? theme.primary : theme.textSecondary }
            ]}>
              Moments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'garage' && { borderBottomColor: theme.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setActiveTab('garage')}
          >
            <Car size={20} color={activeTab === 'garage' ? theme.primary : theme.textSecondary} />
            <Text style={[
              styles.tabButtonText,
              { color: activeTab === 'garage' ? theme.primary : theme.textSecondary }
            ]}>
              Garage
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>

      {/* Moment Modal */}
      <MomentModal
        visible={showMomentModal}
        moment={selectedMoment}
        moments={moments}
        onClose={() => setShowMomentModal(false)}
      />
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
  bannerContainer: {
    height: 200,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -50,
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
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
  },
  editButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  tabNavigation: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  tabButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  momentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  momentItem: {
    width: (width - 80) / 3,
    aspectRatio: 1,
    marginBottom: 4,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  momentImage: {
    width: '100%',
    height: '100%',
  },
  momentOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  momentLikes: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  vehicleCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  vehicleImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 16,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vehicleModel: {
    fontSize: 14,
    marginBottom: 8,
  },
  vehicleSpecs: {
    flexDirection: 'row',
    gap: 16,
  },
  vehicleSpec: {
    fontSize: 12,
  },
  editVehicleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addVehicleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  addVehicleText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});