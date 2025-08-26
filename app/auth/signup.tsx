import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Mail, Lock, Phone, Moon, Sun } from 'lucide-react-native';

export default function SignupScreen() {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to OTP verification
      router.push({
        pathname: '/auth/otp-verification',
        params: { 
          type: 'signup',
          email: formData.email,
          mobile: formData.mobile,
          userData: JSON.stringify(formData),
        },
      });
    } catch (error) {
      Alert.alert('Error', 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim },
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.themeToggle, { backgroundColor: theme.surface }]}
              onPress={toggleTheme}
            >
              {isDark ? (
                <Sun size={20} color={theme.textSecondary} />
              ) : (
                <Moon size={20} color={theme.textSecondary} />
              )}
            </TouchableOpacity>

            <Text style={[styles.title, { color: theme.textPrimary }]}>
              Create Account
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Join the riding community
            </Text>
          </View>

          <View style={styles.form}>
            <View style={[styles.inputContainer, { backgroundColor: theme.surface, borderColor: errors.fullName ? theme.primary : theme.border }]}>
              <User size={20} color={theme.textSecondary} />
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Full Name"
                placeholderTextColor={theme.textSecondary}
                value={formData.fullName}
                onChangeText={(value) => updateFormData('fullName', value)}
              />
            </View>
            {errors.fullName && <Text style={[styles.errorText, { color: theme.primary }]}>{errors.fullName}</Text>}

            <View style={[styles.inputContainer, { backgroundColor: theme.surface, borderColor: errors.username ? theme.primary : theme.border }]}>
              <User size={20} color={theme.textSecondary} />
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Username"
                placeholderTextColor={theme.textSecondary}
                value={formData.username}
                onChangeText={(value) => updateFormData('username', value.toLowerCase())}
                autoCapitalize="none"
              />
            </View>
            {errors.username && <Text style={[styles.errorText, { color: theme.primary }]}>{errors.username}</Text>}

            <View style={[styles.inputContainer, { backgroundColor: theme.surface, borderColor: errors.email ? theme.primary : theme.border }]}>
              <Mail size={20} color={theme.textSecondary} />
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Email"
                placeholderTextColor={theme.textSecondary}
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && <Text style={[styles.errorText, { color: theme.primary }]}>{errors.email}</Text>}

            <View style={[styles.inputContainer, { backgroundColor: theme.surface, borderColor: errors.mobile ? theme.primary : theme.border }]}>
              <Phone size={20} color={theme.textSecondary} />
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Mobile Number"
                placeholderTextColor={theme.textSecondary}
                value={formData.mobile}
                onChangeText={(value) => updateFormData('mobile', value)}
                keyboardType="phone-pad"
              />
            </View>
            {errors.mobile && <Text style={[styles.errorText, { color: theme.primary }]}>{errors.mobile}</Text>}

            <View style={[styles.inputContainer, { backgroundColor: theme.surface, borderColor: errors.password ? theme.primary : theme.border }]}>
              <Lock size={20} color={theme.textSecondary} />
              <TextInput
                style={[styles.input, { color: theme.textPrimary }]}
                placeholder="Password"
                placeholderTextColor={theme.textSecondary}
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry={true}
              />
            </View>
            {errors.password && <Text style={[styles.errorText, { color: theme.primary }]}>{errors.password}</Text>}

            <TouchableOpacity
              style={[styles.signupButton, { backgroundColor: theme.primary }]}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.signupButtonText}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>
              Already have an account?{' '}
              <Text
                style={[styles.loginLink, { color: theme.primary }]}
                onPress={() => router.back()}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  themeToggle: {
    position: 'absolute',
    top: -40,
    right: 0,
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  signupButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  loginLink: {
    fontWeight: '600',
  },
});