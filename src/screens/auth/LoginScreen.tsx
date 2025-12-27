import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input } from '../../components';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';
import { AuthStackParamList } from '../../navigation/types';
import { setAuthenticated } from '../../navigation/RootNavigator';

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simüle edilmiş login - gerçek uygulamada API çağrısı yapılır
    setTimeout(() => {
      setLoading(false);
      // Demo: Giriş başarılı
      setAuthenticated(true);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />
      
      {/* Background Gradient Orbs */}
      <View style={styles.backgroundOrb1} />
      <View style={styles.backgroundOrb2} />
      
      {/* Abstract Chart Lines */}
      <View style={styles.chartLines}>
        <View style={[styles.chartLine, { top: '30%' }]} />
        <View style={[styles.chartLine, { top: '50%' }]} />
        <View style={[styles.chartLine, { top: '70%' }]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo / Icon */}
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={Colors.gradientPrimary as [string, string]}
                style={styles.logoGradient}
              >
                <MaterialIcons name="candlestick-chart" size={48} color="#FFF" />
              </LinearGradient>
              {/* Decorative Bolt */}
              <View style={styles.boltBadge}>
                <MaterialIcons name="bolt" size={12} color="#000" />
              </View>
            </View>

            {/* Headlines */}
            <Text style={styles.headline}>
              Tekrar Hoşgeldin,{'\n'}Yatırımcı
            </Text>
            <Text style={styles.subheadline}>
              Simülasyon başlıyor. Piyasalar senin hamleni bekliyor.
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <Input
                placeholder="Kullanıcı Adı veya E-posta"
                value={email}
                onChangeText={setEmail}
                icon="person"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                placeholder="Şifre"
                value={password}
                onChangeText={setPassword}
                icon="lock"
                secureTextEntry
              />

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
              </TouchableOpacity>

              <Button
                title="GİRİŞ YAP"
                onPress={handleLogin}
                loading={loading}
                variant="gradient"
                size="lg"
                icon={<MaterialIcons name="arrow-forward" size={20} color="#FFF" />}
              />
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>veya şununla devam et</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialIcons name="code" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <MaterialIcons name="phone-iphone" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Hesabın yok mu? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signUpLink}>Hemen Başla</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  backgroundOrb1: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: Colors.primary,
    opacity: 0.1,
  },
  backgroundOrb2: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.accent,
    opacity: 0.08,
  },
  chartLines: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.03,
  },
  chartLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.textPrimary,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
    justifyContent: 'center',
  },
  logoContainer: {
    alignSelf: 'center',
    marginBottom: Spacing.xl,
  },
  logoGradient: {
    width: 96,
    height: 96,
    borderRadius: BorderRadius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 10,
  },
  boltBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FACC15',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.backgroundDark,
  },
  headline: {
    fontSize: FontSizes.xxxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: Spacing.sm,
  },
  subheadline: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    lineHeight: 22,
  },
  form: {
    gap: Spacing.lg,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -Spacing.sm,
  },
  forgotPasswordText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xxl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderDark,
  },
  dividerText: {
    color: Colors.textMuted,
    fontSize: FontSizes.xs,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginHorizontal: Spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.surfaceDark,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xxl,
  },
  signUpText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  signUpLink: {
    color: Colors.primary,
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
});

export default LoginScreen;
