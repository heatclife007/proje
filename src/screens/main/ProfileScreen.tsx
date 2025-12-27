import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';
import { Card } from '../../components';

interface SettingItem {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  title: string;
  subtitle?: string;
  value?: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  badge?: string;
  danger?: boolean;
}

const ProfileScreen: React.FC = () => {
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const accountSettings: SettingItem[] = [
    { icon: 'person', iconColor: Colors.primary, title: 'Profil Düzenle' },
    { icon: 'security', iconColor: Colors.success, title: 'Güvenlik ve Şifre' },
    { icon: 'workspace-premium', iconColor: '#FACC15', title: 'Pro Üyelik', badge: 'AKTİF' },
  ];

  const experienceSettings: SettingItem[] = [
    { icon: 'notifications', iconColor: Colors.accent, title: 'Fiyat Alarmları', subtitle: 'Anlık bildirim al', hasToggle: true, toggleValue: priceAlerts },
    { icon: 'volume-up', iconColor: '#EC4899', title: 'Ses Efektleri', subtitle: 'Alım-satım sesleri', hasToggle: true, toggleValue: soundEffects },
    { icon: 'palette', iconColor: '#F97316', title: 'Arayüz Teması', value: 'Koyu Mod' },
  ];

  const appSettings: SettingItem[] = [
    { icon: 'language', iconColor: Colors.textMuted, title: 'Dil / Language', value: 'TR' },
    { icon: 'logout', iconColor: Colors.danger, title: 'Çıkış Yap', danger: true },
  ];

  const renderSettingItem = (item: SettingItem, index: number, isLast: boolean) => (
    <TouchableOpacity
      key={index}
      style={[styles.settingItem, !isLast && styles.settingItemBorder]}
      activeOpacity={item.hasToggle ? 1 : 0.7}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, { backgroundColor: item.iconColor + '15' }]}>
          <MaterialIcons name={item.icon} size={18} color={item.iconColor} />
        </View>
        <View>
          <Text style={[styles.settingTitle, item.danger && styles.settingTitleDanger]}>
            {item.title}
          </Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
      <View style={styles.settingRight}>
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        {item.value && (
          <Text style={styles.settingValue}>{item.value}</Text>
        )}
        {item.hasToggle ? (
          <Switch
            value={item.title === 'Fiyat Alarmları' ? priceAlerts : soundEffects}
            onValueChange={(value) => {
              if (item.title === 'Fiyat Alarmları') {
                setPriceAlerts(value);
              } else {
                setSoundEffects(value);
              }
            }}
            trackColor={{ false: Colors.surfaceDark, true: Colors.primary + '50' }}
            thumbColor={item.toggleValue ? Colors.primary : Colors.textMuted}
          />
        ) : !item.danger && (
          <MaterialIcons name="chevron-right" size={24} color={Colors.textMuted} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil & Ayarlar</Text>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="edit" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>👑</Text>
              </View>
              <TouchableOpacity style={styles.avatarEdit}>
                <MaterialIcons name="photo-camera" size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.username}>KriptoKralı99</Text>
            <View style={styles.verifiedRow}>
              <MaterialIcons name="verified" size={16} color={Colors.primary} />
              <Text style={styles.levelText}>Level 12 • Market Maker</Text>
            </View>
          </View>

          {/* XP Progress */}
          <View style={styles.xpSection}>
            <View style={styles.xpHeader}>
              <Text style={styles.xpLabel}>XP İLERLEMESİ</Text>
              <Text style={styles.xpValue}>3250 / 5000</Text>
            </View>
            <View style={styles.xpBar}>
              <LinearGradient
                colors={Colors.gradientPrimary as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.xpFill, { width: '65%' }]}
              />
            </View>
            <Text style={styles.xpNext}>Sonraki: Balina</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: Colors.primary }]}>$124.5K</Text>
              <Text style={styles.statLabel}>TOPLAM KÂR</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: Colors.success }]}>68%</Text>
              <Text style={styles.statLabel}>KAZANMA</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={[styles.statValue, { color: Colors.accent }]}>#42</Text>
              <Text style={styles.statLabel}>SIRALAMA</Text>
            </Card>
          </View>

          {/* Settings Sections */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>HESAP</Text>
            <Card style={styles.settingsCard} padding="none">
              {accountSettings.map((item, index) =>
                renderSettingItem(item, index, index === accountSettings.length - 1)
              )}
            </Card>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>OYUN DENEYİMİ</Text>
            <Card style={styles.settingsCard} padding="none">
              {experienceSettings.map((item, index) =>
                renderSettingItem(item, index, index === experienceSettings.length - 1)
              )}
            </Card>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>UYGULAMA</Text>
            <Card style={styles.settingsCard} padding="none">
              {appSettings.map((item, index) =>
                renderSettingItem(item, index, index === appSettings.length - 1)
              )}
            </Card>
          </View>

          {/* Version Info */}
          <Text style={styles.versionText}>
            Sürüm 2.4.1 (Build 8902){'\n'}
            User ID: #839102-X
          </Text>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark + '50',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surfaceDark,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  avatarEmoji: {
    fontSize: 56,
  },
  avatarEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  username: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  levelText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  xpSection: {
    marginBottom: Spacing.lg,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.sm,
  },
  xpLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
  },
  xpValue: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  xpBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.surfaceDark,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  xpFill: {
    height: '100%',
    borderRadius: 6,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  xpNext: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'right',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  statValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  settingsSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: Spacing.md,
    marginLeft: Spacing.sm,
  },
  settingsCard: {
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark + '50',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  settingTitleDanger: {
    color: Colors.danger,
  },
  settingSubtitle: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  settingValue: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  badge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.primary,
  },
  versionText: {
    textAlign: 'center',
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontFamily: 'monospace',
    lineHeight: 18,
    marginTop: Spacing.lg,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default ProfileScreen;

