import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, Plus, MessageCircle, Share } from 'lucide-react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import StoryViewer from '@/components/StoryViewer';
import CommentModal from '@/components/CommentModal';

const { width } = Dimensions.get('window');

const posts = [
  {
    id: '1',
    username: 'alex_rider',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Amazing ride through the mountains today! 🏔️ #RiderLife',
    likes: 142,
    isLiked: false,
    comments: 23,
    timeAgo: '2h',
  },
  {
    id: '2',
    username: 'sarah_moto',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Group ride with the squad! Best weekend ever 🏍️',
    likes: 89,
    isLiked: false,
    comments: 15,
    timeAgo: '4h',
  },
];

export default function HomeScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [postsData, setPostsData] = React.useState(posts);
  const [showCommentModal, setShowCommentModal] = React.useState(false);
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [selectedPostId, setSelectedPostId] = React.useState<string>('');

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleLike = (postId: string) => {
    setPostsData(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleComment = (postId: string) => {
    setSelectedPostId(postId);
    setShowCommentModal(true);
  };

  const handleShare = (postId: string) => {
    setSelectedPostId(postId);
    setShowShareModal(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: theme.surface,
            borderBottomColor: theme.border,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -10],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={openDrawer}>
          <Menu size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          RIDER'S COMPANION
        </Text>
        <TouchableOpacity>
          <Plus size={24} color={theme.textPrimary} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Posts Section */}
        <View style={styles.postsContainer}>
          {postsData.map((post) => (
            <View key={post.id} style={[styles.postContainer, { backgroundColor: theme.surface }]}>
              <View style={styles.postHeader}>
                <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
                <View style={styles.postUserInfo}>
                  <Text style={[styles.postUsername, { color: theme.textPrimary }]}>
                    {post.username}
                  </Text>
                  <Text style={[styles.postTimeAgo, { color: theme.textSecondary }]}>
                    {post.timeAgo}
                  </Text>
                </View>
              </View>

              <Image source={{ uri: post.image }} style={styles.postImage} />

              <View style={styles.postActions}>
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleComment(post.id)}
                  >
                    <MessageCircle size={24} color={theme.textPrimary} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleShare(post.id)}
                  >
                    <Share size={24} color={theme.textPrimary} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  style={styles.likeButton}
                  onPress={() => handleLike(post.id)}
                >
                  <Text style={[styles.fistBumpIcon, { color: post.isLiked ? '#FF3040' : theme.textPrimary }]}>
                    🤜🤛
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.postInfo}>
                <Text style={[styles.likesText, { color: theme.textPrimary }]}>
                  {post.likes} likes
                </Text>
                <Text style={[styles.captionText, { color: theme.textPrimary }]}>
                  <Text style={styles.captionUsername}>{post.username}</Text> {post.caption}
                </Text>
                <TouchableOpacity onPress={() => handleComment(post.id)}>
                  <Text style={[styles.commentsText, { color: theme.textSecondary }]}>
                    View all {post.comments} comments
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </Animated.ScrollView>

      {/* Comment Modal */}
      <CommentModal
        visible={showCommentModal}
        postId={selectedPostId}
        onClose={() => setShowCommentModal(false)}
      />

      {/* Share Modal */}
      <ShareModal
        visible={showShareModal}
        postId={selectedPostId}
        onClose={() => setShowShareModal(false)}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  postsContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    marginBottom: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postUserInfo: {
    marginLeft: 12,
  },
  postUsername: {
    fontSize: 16,
    fontWeight: '600',
  },
  postTimeAgo: {
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  likeButton: {
    padding: 4,
  },
  fistBumpIcon: {
    fontSize: 20,
  },
  postInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  likesText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  captionText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  captionUsername: {
    fontWeight: '600',
  },
  commentsText: {
    fontSize: 14,
  },
});