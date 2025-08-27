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
import { MessageCircle, Share, Bookmark, Search } from 'lucide-react-native';
import CommentModal from '@/components/CommentModal';
import ShareModal from '@/components/ShareModal';
import BumpIcon from '@/components/BumpIcon';

const feedPosts = [
  {
    id: '1',
    username: 'mountain_rider',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Epic mountain trail ride! The views were absolutely breathtaking 🏔️',
    likes: 234,
    comments: 45,
    timeAgo: '1h',
    location: 'Rocky Mountains, Colorado',
    isBumped: false,
    isBookmarked: false,
    type: 'image',
  },
  {
    id: '2',
    username: 'speed_demon',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Night ride through the city. Nothing beats the freedom of the open road 🌃',
    likes: 156,
    comments: 28,
    timeAgo: '3h',
    location: 'Downtown LA',
    isBumped: false,
    isBookmarked: false,
    type: 'image',
  },
  {
    id: '3',
    username: 'adventure_seeker',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Group ride with the crew! 15 riders, 300 miles, unforgettable memories 🏍️',
    likes: 389,
    comments: 67,
    timeAgo: '6h',
    location: 'Pacific Coast Highway',
    isBumped: false,
    isBookmarked: false,
    type: 'image',
  },
  {
    id: '4',
    username: 'trail_blazer',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Solo adventure through the desert trails 🏜️',
    likes: 78,
    comments: 19,
    timeAgo: '8h',
    location: 'Mojave Desert',
    isBumped: false,
    isBookmarked: false,
    type: 'image',
  },
  {
    id: '5',
    username: 'city_cruiser',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Morning commute vibes ☀️',
    likes: 45,
    comments: 12,
    timeAgo: '12h',
    location: 'San Francisco',
    isBumped: false,
    isBookmarked: false,
    type: 'image',
  },
];

export default function FeedScreen() {
  const { theme } = useTheme();
  const [feedData, setFeedData] = React.useState(feedPosts);
  const [showCommentModal, setShowCommentModal] = React.useState(false);
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [selectedPostId, setSelectedPostId] = React.useState<string>('');

  const handleBump = (postId: string) => {
    setFeedData(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isBumped: !post.isBumped,
              likes: post.isBumped ? post.likes - 1 : post.likes + 1,
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

  const handleBookmark = (postId: string) => {
    setFeedData(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
            Feed
          </Text>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {feedData.map((post, index) => (
          <View key={post.id} style={[
            styles.postContainer, 
            { backgroundColor: theme.surface },
            index % 3 === 1 && styles.compactPost,
            index % 4 === 3 && styles.widePost
          ]}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={[styles.username, { color: theme.textPrimary }]}>
                  {post.username}
                </Text>
                <Text style={[styles.location, { color: theme.textSecondary }]}>
                  {post.location}
                </Text>
              </View>
              <Text style={[styles.timeAgo, { color: theme.textSecondary }]}>
                {post.timeAgo}
              </Text>
            </View>

            <Image 
              source={{ uri: post.image }} 
              style={[
                styles.postImage,
                index % 3 === 1 && styles.compactImage,
                index % 4 === 3 && styles.wideImage
              ]} 
            />

            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.bumpButton}
                onPress={() => handleBump(post.id)}
              >
                <BumpIcon 
                  size={24} 
                  color={post.isBumped ? '#FF3040' : theme.textPrimary}
                  fill={post.isBumped ? '#FF3040' : 'none'}
                />
              </TouchableOpacity>
              <View style={styles.leftActions}>
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
              <TouchableOpacity onPress={() => handleBookmark(post.id)}>
                <Bookmark 
                  size={24} 
                  color={post.isBookmarked ? theme.primary : theme.textPrimary}
                  fill={post.isBookmarked ? theme.primary : 'none'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.postInfo}>
              <Text style={[styles.bumpsText, { color: theme.textPrimary }]}>
                {post.likes} bumps
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
      </ScrollView>

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
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  searchButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
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
  compactPost: {
    marginHorizontal: 8,
    borderRadius: 8,
  },
  widePost: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
  location: {
    fontSize: 12,
    marginTop: 2,
  },
  timeAgo: {
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  compactImage: {
    height: 200,
    borderRadius: 8,
  },
  wideImage: {
    height: 400,
    borderRadius: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bumpButton: {
    marginRight: 16,
    padding: 4,
  },
  leftActions: {
    flexDirection: 'row',
    flex: 1,
  },
  actionButton: {
    marginRight: 16,
  },
  postInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  bumpsText: {
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