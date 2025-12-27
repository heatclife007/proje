import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop, Circle } from 'react-native-svg';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';
import { Card } from '../../components';

const { width } = Dimensions.get('window');

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  amount: string;
  value: string;
  change: number;
  color: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const assets: CryptoAsset[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', amount: '0.5 BTC', value: '$8,000.00', change: 2.4, color: Colors.bitcoin, icon: 'currency-bitcoin' },
  { id: '2', name: 'Ethereum', symbol: 'ETH', amount: '2.0 ETH', value: '$3,500.00', change: -0.8, color: Colors.ethereum, icon: 'token' },
  { id: '3', name: 'Solana', symbol: 'SOL', amount: '15.0 SOL', value: '$950.00', change: 12.5, color: Colors.solana, icon: 'bolt' },
];

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>😎</Text>
                </View>
                <View style={styles.onlineIndicator} />
              </View>
              <View>
                <Text style={styles.greeting}>Hoşgeldin,</Text>
                <Text style={styles.username}>Alex Trader 👋</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <MaterialIcons name="notifications" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* XP Progress Card */}
          <Card style={styles.xpCard}>
            <View style={styles.xpHeader}>
              <Text style={styles.xpLevel}>Level 12</Text>
              <Text style={styles.xpTitle}>Crypto Novice</Text>
            </View>
            <View style={styles.xpBarContainer}>
              <LinearGradient
                colors={Colors.gradientPrimary as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.xpBar, { width: '75%' }]}
              />
            </View>
            <View style={styles.xpFooter}>
              <Text style={styles.xpValue}>2,450 XP</Text>
              <Text style={styles.xpNext}>Next: Market Whale 🐋</Text>
            </View>
          </Card>

          {/* Portfolio Value */}
          <View style={styles.portfolioSection}>
            <Text style={styles.portfolioLabel}>Toplam Portföy Değeri</Text>
            <Text style={styles.portfolioValue}>$12,450.00</Text>
            <View style={styles.changeContainer}>
              <MaterialIcons name="trending-up" size={16} color={Colors.success} />
              <Text style={styles.changeText}>+$450 (3.5%)</Text>
            </View>
          </View>

          {/* Chart */}
          <Card style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Performans</Text>
              <View style={styles.chartFilters}>
                <TouchableOpacity style={[styles.chartFilter, styles.chartFilterActive]}>
                  <Text style={styles.chartFilterTextActive}>24h</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chartFilter}>
                  <Text style={styles.chartFilterText}>1W</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chartFilter}>
                  <Text style={styles.chartFilterText}>1M</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.chartContainer}>
              <Svg width="100%" height={140} viewBox="0 0 375 120" preserveAspectRatio="none">
                <Defs>
                  <SvgLinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor={Colors.primary} stopOpacity={0.3} />
                    <Stop offset="100%" stopColor={Colors.primary} stopOpacity={0} />
                  </SvgLinearGradient>
                </Defs>
                <Path
                  d="M0 80 C 40 80, 50 40, 90 50 C 130 60, 140 90, 180 70 C 220 50, 230 20, 270 30 C 310 40, 320 10, 375 5 L 375 120 L 0 120 Z"
                  fill="url(#chartGradient)"
                />
                <Path
                  d="M0 80 C 40 80, 50 40, 90 50 C 130 60, 140 90, 180 70 C 220 50, 230 20, 270 30 C 310 40, 320 10, 375 5"
                  stroke={Colors.primary}
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                />
                <Circle cx={270} cy={30} r={5} fill={Colors.backgroundDark} stroke={Colors.primary} strokeWidth={3} />
              </Svg>
            </View>
          </Card>

          {/* Assets */}
          <View style={styles.assetsSection}>
            <View style={styles.assetsHeader}>
              <Text style={styles.assetsTitle}>Varlıkların (Envanter)</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Tümünü Gör</Text>
              </TouchableOpacity>
            </View>
            
            {assets.map((asset) => (
              <TouchableOpacity key={asset.id} style={styles.assetCard} activeOpacity={0.8}>
                <View style={styles.assetLeft}>
                  <View style={[styles.assetIcon, { backgroundColor: asset.color + '20' }]}>
                    <MaterialIcons name={asset.icon} size={28} color={asset.color} />
                  </View>
                  <View>
                    <Text style={styles.assetName}>{asset.name}</Text>
                    <Text style={styles.assetAmount}>{asset.amount}</Text>
                  </View>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetValue}>{asset.value}</Text>
                  <Text style={[styles.assetChange, asset.change >= 0 ? styles.positive : styles.negative]}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Bottom spacing for tab bar */}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceDark,
    borderWidth: 2,
    borderColor: Colors.primary + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.backgroundDark,
  },
  greeting: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  username: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardDark,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xpCard: {
    marginBottom: Spacing.lg,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  xpLevel: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  xpTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  xpBarContainer: {
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.surfaceDark,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  xpBar: {
    height: '100%',
    borderRadius: 6,
  },
  xpFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpValue: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  xpNext: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  portfolioSection: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  portfolioLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  portfolioValue: {
    fontSize: FontSizes.display,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  changeText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.success,
  },
  chartCard: {
    marginBottom: Spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  chartTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  chartFilters: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  chartFilter: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  chartFilterActive: {
    backgroundColor: Colors.primary,
  },
  chartFilterText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  chartFilterTextActive: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: '#FFF',
  },
  chartContainer: {
    height: 140,
  },
  assetsSection: {
    marginBottom: Spacing.lg,
  },
  assetsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  assetsTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.primary,
  },
  assetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardDark,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  assetAmount: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontWeight: '500',
    marginTop: 2,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetValue: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  assetChange: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    marginTop: 2,
  },
  positive: {
    color: Colors.success,
  },
  negative: {
    color: Colors.danger,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default HomeScreen;

