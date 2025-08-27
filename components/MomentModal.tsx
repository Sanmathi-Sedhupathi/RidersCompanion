import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { X, Zap, MessageCircle, Share, TrendingUp } from 'lucide-react-native';
import CommentModal from './CommentModal';
import ShareModal from './ShareModal';

const { width, height } = Dimensions.get('window');

interface Moment {
  id: string;
  image: string;
  caption: string;
  likes: number;
  timeAgo: string;
  comments: number;
}

interface MomentModalProps {
  visible: boolean;
  moment: Moment;
  moments: Moment[];
  onClose: () => void;
}

export default function MomentModal({ visible, moment, moments, onClose }: MomentModalProps) {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(moments.findIndex(m => m.id === moment.id));
  const [momentsData, setMomentsData] = useState(moments.map(m => ({ ...m, isBumped: false, isTrendingUp: false })));
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleBump = (momentId: string) => {
    setMomentsData(prevMoments =>
      prevMoments.map(moment =>
        moment.id === momentId
          ? {
              ...moment,
              isBumped: !moment.isBumped,
              likes: moment.isBumped ? moment.likes - 1 : moment.likes + 1,
            }
          : moment
      )
    );
  };

  const handleTrendingUp = (momentId: string) => {
    setMomentsData(prevMoments =>
      prevMoments.map(moment =>
        moment.id === momentId
          ? {
              ...moment,
              isTrendingUp: !moment.isTrendingUp,
            }
          : moment
      )
    );
  };

  const handleComment = (momentId: string) => {
    setShowCommentModal(true);
  };

  const handleShare = (momentId: string) => {
    setShowShareModal(true);
  };

  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.surface }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={theme.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
            Posts
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Posts Carousel */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentOffset={{ x: currentIndex * width, y: 0 }}
        >
          {momentsData.map((momentItem, index) => (
            <View key={momentItem.id} style={styles.postContainer}>
              <Image source={{ uri: momentItem.image }} style={styles.postImage} />
              
              {/* Post Actions */}
              <View style={styles.actionsContainer}>
                <View style={styles.leftActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleBump(momentItem.id)}
                  >
                    <Zap 
                      size={28} 
                      color={momentItem.isBumped ? '#FF3040' : theme.textPrimary}
                      fill={momentItem.isBumped ? '#FF3040' : 'none'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleComment(momentItem.id)}
                  >
                    <MessageCircle size={28} color={theme.textPrimary} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleShare(momentItem.id)}
                  >
                    <Share size={28} color={theme.textPrimary} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleTrendingUp(momentItem.id)}
                  >
                    <TrendingUp 
                      size={28} 
                      color={momentItem.isTrendingUp ? '#FF3040' : theme.textPrimary}
                      fill={momentItem.isTrendingUp ? '#FF3040' : 'none'}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Post Info */}
              <View style={styles.postInfo}>
                <Text style={[styles.bumpsText, { color: theme.textPrimary }]}>
                  {momentItem.likes} bumps
                </Text>
                <Text style={[styles.captionText, { color: theme.textPrimary }]}>
                  {momentItem.caption}
                </Text>
                <TouchableOpacity onPress={() => handleComment(momentItem.id)}>
                  <Text style={[styles.commentsText, { color: theme.textSecondary }]}>
                    View all {momentItem.comments} comments
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.timeText, { color: theme.textSecondary }]}>
                  {momentItem.timeAgo}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Page Indicator */}
        <View style={styles.pageIndicator}>
          {momentsData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentIndex ? theme.primary : theme.border,
                },
              ]}
            />
          ))}
        </View>

        {/* Comment Modal */}
        <CommentModal
          visible={showCommentModal}
          postId={momentsData[currentIndex]?.id || ''}
          onClose={() => setShowCommentModal(false)}
        />

        {/* Share Modal */}
        <ShareModal
          visible={showShareModal}
          postId={momentsData[currentIndex]?.id || ''}
          onClose={() => setShowShareModal(false)}
        />
      </View>
    </Modal>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  postContainer: {
    width: width,
    flex: 1,
  },
  postImage: {
    width: width,
    height: height * 0.6,
    resizeMode: 'cover',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
    padding: 4,
  },
  postInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  bumpsText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  captionText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  commentsText: {
    fontSize: 14,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});