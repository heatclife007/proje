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
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input } from '../../components';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';
import { AuthStackParamList } from '../../navigation/types';

type RegisterNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Şifre gücü hesaplama
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleRegister = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const passwordStrength = getPasswordStrength();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />
      
      {/* Background Effects */}
      <View style={styles.backgroundBlob1} />
      <View style={styles.backgroundBlob2} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hesap Oluştur</Text>
          <View style={styles.headerSpacer} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Headlines */}
            <View style={styles.headlines}>
              <Text style={styles.headline}>Maceraya Başla</Text>
              <Text style={styles.subheadline}>
                Gerçek verilerle piyasayı öğren.
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <Input
                label="E-posta"
                placeholder="crypto@master.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Şifre"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Input
                label="Şifre Tekrar"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              {/* Password Strength Indicator */}
              <View style={styles.strengthContainer}>
                {[1, 2, 3, 4].map((level) => (
                  <View
                    key={level}
                    style={[
                      styles.strengthBar,
                      passwordStrength >= level && styles.strengthBarActive,
                    ]}
                  />
                ))}
              </View>

              {/* Checkboxes */}
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                >
                  <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
                    {acceptTerms && (
                      <MaterialIcons name="check" size={14} color="#FFF" />
                    )}
                  </View>
                  <Text style={styles.checkboxText}>
                    <Text style={styles.checkboxHighlight}>Hizmet Şartları</Text> ve{' '}
                    <Text style={styles.checkboxHighlight}>Gizlilik Politikası</Text>'nı okudum, kabul ediyorum.
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setAcceptMarketing(!acceptMarketing)}
                >
                  <View style={[styles.checkbox, acceptMarketing && styles.checkboxChecked]}>
                    {acceptMarketing && (
                      <MaterialIcons name="check" size={14} color="#FFF" />
                    )}
                  </View>
                  <Text style={styles.checkboxText}>
                    Kampanyalardan ve oyun içi ödüllerden haberdar olmak istiyorum.
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Register Button */}
              <Button
                title="Kayıt Ol"
                onPress={handleRegister}
                loading={loading}
                variant="primary"
                size="lg"
              />

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ya da</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Buttons */}
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <MaterialIcons name="language" size={20} color={Colors.textPrimary} />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <MaterialIcons name="apple" size={20} color={Colors.textPrimary} />
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Zaten hesabın var mı?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  backgroundBlob1: {
    position: 'absolute',
    top: -100,
    left: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.primary,
    opacity: 0.1,
  },
  backgroundBlob2: {
    position: 'absolute',
    bottom: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: Colors.accent,
    opacity: 0.08,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerSpacer: {
    width: 48,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  headlines: {
    marginBottom: Spacing.xxl,
    alignItems: 'center',
  },
  headline: {
    fontSize: FontSizes.xxxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subheadline: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  form: {
    gap: Spacing.lg,
  },
  strengthContainer: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: -Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.surfaceDark,
  },
  strengthBarActive: {
    backgroundColor: Colors.primary,
  },
  checkboxContainer: {
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: Colors.surfaceDark,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  checkboxHighlight: {
    color: Colors.textPrimary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.md,
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
    marginHorizontal: Spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  socialButtonText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
  },
  footerLink: {
    color: Colors.primary,
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
});

export default RegisterScreen;

