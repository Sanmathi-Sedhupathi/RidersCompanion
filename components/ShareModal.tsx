import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { X, MessageCircle, Mail, Copy, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

interface ShareModalProps {
  visible: boolean;
  postId: string;
  postData?: any;
  onClose: () => void;
}

const shareOptions = [
  { id: 'message', label: 'Send Message', icon: MessageCircle, action: 'message' },
  { id: 'email', label: 'Email', icon: Mail, action: 'email' },
  { id: 'copy', label: 'Copy Link', icon: Copy, action: 'copy' },
  { id: 'more', label: 'More Options', icon: MoreHorizontal, action: 'more' },
];

export default function ShareModal({ visible, postId, postData, onClose }: ShareModalProps) {
  const { theme } = useTheme();

  const handleShare = (action: string) => {
    switch (action) {
      case 'message':
        Alert.alert('Share via Message', 'Opening messaging app...');
        break;
      case 'email':
        Alert.alert('Share via Email', 'Opening email app...');
        break;
      case 'copy':
        Alert.alert('Link Copied', 'Post link copied to clipboard!');
        break;
      case 'more':
        Alert.alert('More Options', 'Additional sharing options...');
        break;
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <View style={[styles.container, { backgroundColor: theme.surface }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
              Share Post {postData ? `• ${postData.likes} bumps` : ''}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Share Options */}
          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {shareOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionItem, { borderBottomColor: theme.border }]}
                onPress={() => handleShare(option.action)}
              >
                <View style={[styles.optionIcon, { backgroundColor: theme.background }]}>
                  <option.icon size={24} color={theme.primary} />
                </View>
                <Text style={[styles.optionLabel, { color: theme.textPrimary }]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Cancel Button */}
          <TouchableOpacity
            style={[styles.cancelButton, { backgroundColor: theme.background }]}
            onPress={onClose}
          >
            <Text style={[styles.cancelButtonText, { color: theme.textPrimary }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // Safe area padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});