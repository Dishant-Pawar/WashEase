import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { height } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, Globe, Apple } from 'lucide-react-native';
import { COLORS, SPACING, ROUNDNESS, TYPOGRAPHY } from '../src/styles/theme';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = () => {
    // Navigate to main flow
    router.replace('/(main)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Join WashEase'}</Text>
            <Text style={styles.subtitle}>
              {isLogin 
                ? 'Sign in to start your laundry journey' 
                : 'Experience the "Fluid Sanctuary" for your garments'}
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Mail size={20} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor={COLORS.outline}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor={COLORS.outline}
                style={styles.input}
                secureTextEntry
              />
            </View>

            {isLogin && (
              <TouchableOpacity style={styles.forgotPass}>
                <Text style={styles.forgotPassText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleAuth} style={{ marginTop: SPACING.lg }}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{isLogin ? 'Sign In' : 'Create Account'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Globe size={24} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Apple size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.footerLink}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: SPACING.xl,
    paddingTop: height * 0.08,
    paddingBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xxl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textVariant,
    marginTop: SPACING.sm,
    fontSize: 16,
  },
  form: {
    gap: SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: ROUNDNESS.lg,
    paddingHorizontal: SPACING.md,
    height: 56,
    // Ghost border fallback from PRD
    borderWidth: 1,
    borderColor: 'rgba(112, 120, 131, 0.1)',
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontFamily: 'Inter-Medium',
  },
  forgotPass: {
    alignSelf: 'flex-end',
  },
  forgotPassText: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    textTransform: 'none',
    fontFamily: 'Inter-Medium',
  },
  button: {
    height: 56,
    borderRadius: ROUNDNESS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: '#FFF',
    fontFamily: 'Inter-Medium',
    fontSize: 18,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.outline,
    opacity: 0.1,
  },
  dividerText: {
    ...TYPOGRAPHY.label,
    color: COLORS.outline,
    fontSize: 10,
    textTransform: 'none',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.lg,
  },
  socialBtn: {
    width: 64,
    height: 64,
    borderRadius: ROUNDNESS.lg,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl * 2,
  },
  footerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textVariant,
  },
  footerLink: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontFamily: 'Inter-SemiBold',
  },
});
