import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { X, Send, Zap } from 'lucide-react-native';

interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timeAgo: string;
  bumps: number;
  isBumped: boolean;
}

interface CommentModalProps {
  visible: boolean;
  postId: string;
  postData?: any;
  onClose: () => void;
}

const dummyComments: Comment[] = [
  {
    id: '1',
    username: 'alex_rider',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    text: 'Amazing shot! Where is this place?',
    timeAgo: '2h',
    bumps: 12,
    isBumped: false,
  },
  {
    id: '2',
    username: 'sarah_moto',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    text: 'Love the view! 🏔️',
    timeAgo: '1h',
    bumps: 8,
    isBumped: true,
  },
  {
    id: '3',
    username: 'mike_tours',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    text: 'Perfect weather for riding!',
    timeAgo: '45m',
    bumps: 5,
    isBumped: false,
  },
];

export default function CommentModal({ visible, postId, postData, onClose }: CommentModalProps) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [newComment, setNewComment] = useState('');

  const handleBumpComment = (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isBumped: !comment.isBumped,
              bumps: comment.isBumped ? comment.bumps - 1 : comment.bumps + 1,
            }
          : comment
      )
    );
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: user?.username || 'current_user',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        text: newComment.trim(),
        timeAgo: 'now',
        bumps: 0,
        isBumped: false,
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
            Comments {postData ? `• ${postData.comments || 0}` : ''}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Post Preview */}
        {postData && (
          <View style={[styles.postPreview, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
            <Text style={[styles.postLikes, { color: theme.textPrimary }]}>
              {postData.likes} bumps
            </Text>
            <Text style={[styles.postCaption, { color: theme.textSecondary }]}>
              {postData.caption}
            </Text>
          </View>
        )}

        {/* Comments List */}
        <ScrollView style={styles.commentsList} showsVerticalScrollIndicator={false}>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={[styles.commentUsername, { color: theme.textPrimary }]}>
                    {comment.username}
                  </Text>
                  <Text style={[styles.commentTime, { color: theme.textSecondary }]}>
                    {comment.timeAgo}
                  </Text>
                </View>
                <Text style={[styles.commentText, { color: theme.textPrimary }]}>
                  {comment.text}
                </Text>
                <View style={styles.commentActions}>
                  <TouchableOpacity
                    style={styles.commentBumpButton}
                    onPress={() => handleBumpComment(comment.id)}
                  >
                    <Zap
                      size={16}
                      color={comment.isBumped ? '#FF3040' : theme.textSecondary}
                      fill={comment.isBumped ? '#FF3040' : 'none'}
                    />
                    <Text style={[styles.commentBumps, { color: theme.textSecondary }]}>
                      {comment.bumps}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Add Comment */}
        <View style={[styles.addCommentContainer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' }}
            style={styles.userAvatar}
          />
          <TextInput
            style={[styles.commentInput, { backgroundColor: theme.background, color: theme.textPrimary, borderColor: theme.border }]}
            placeholder="Add a comment..."
            placeholderTextColor={theme.textSecondary}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: newComment.trim() ? theme.primary : theme.border }]}
            onPress={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  postPreview: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  postLikes: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  postCaption: {
    fontSize: 14,
    lineHeight: 18,
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  commentItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentContent: {
    flex: 1,
    marginLeft: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
  },
  commentBumpButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentBumps: {
    fontSize: 12,
    marginLeft: 4,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentInput: {
    flex: 1,
    marginHorizontal: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});