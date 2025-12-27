import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';
import { Card } from '../../components';

interface CryptoMarket {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change: number;
  color: string;
  icon: string;
}

const markets: CryptoMarket[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: '$45,200', change: 1.2, color: Colors.bitcoin, icon: '₿' },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: '$3,200', change: -0.5, color: Colors.ethereum, icon: 'Ξ' },
  { id: '3', symbol: 'SOL', name: 'Solana', price: '$110', change: 4.2, color: Colors.solana, icon: '◎' },
  { id: '4', symbol: 'BNB', name: 'BNB', price: '$315', change: 2.1, color: '#F3BA2F', icon: '◆' },
  { id: '5', symbol: 'XRP', name: 'XRP', price: '$0.62', change: -1.3, color: '#23292F', icon: '✕' },
  { id: '6', symbol: 'ADA', name: 'Cardano', price: '$0.45', change: 3.8, color: '#0033AD', icon: '₳' },
];

const MarketsScreen: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(markets[0]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerAvatar}>
            <Text style={styles.avatarEmoji}>😎</Text>
          </View>
          <Text style={styles.headerTitle}>TİCARET SİMÜLATÖRÜ</Text>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="notifications" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Stats Cards */}
          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <Text style={styles.statValue}>$12,450</Text>
              <View style={styles.statLabel}>
                <MaterialIcons name="trending-up" size={14} color={Colors.success} />
                <Text style={styles.statLabelText}>Portföy Değeri</Text>
              </View>
            </Card>
            <Card style={[styles.statCard, styles.statCardHighlight]}>
              <Text style={[styles.statValue, { color: Colors.primary }]}>#402</Text>
              <View style={styles.statLabel}>
                <MaterialIcons name="emoji-events" size={14} color={Colors.primary} />
                <Text style={styles.statLabelText}>Global Sıralama</Text>
              </View>
            </Card>
          </View>

          {/* Assets Carousel */}
          <View style={styles.assetsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>VARLIKLAR</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Tümünü Gör</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.assetsCarousel}
            >
              {markets.slice(0, 3).map((market, index) => (
                <TouchableOpacity
                  key={market.id}
                  style={[
                    styles.assetCard,
                    selectedCrypto.id === market.id && styles.assetCardSelected,
                  ]}
                  onPress={() => setSelectedCrypto(market)}
                >
                  {selectedCrypto.id === market.id && (
                    <View style={styles.assetCardGlow} />
                  )}
                  <View style={styles.assetCardHeader}>
                    <View style={[styles.assetIcon, { backgroundColor: market.color }]}>
                      <Text style={styles.assetIconText}>{market.icon}</Text>
                    </View>
                    <Text style={styles.assetSymbol}>{market.symbol}</Text>
                  </View>
                  <Text style={styles.assetPrice}>{market.price}</Text>
                  <View style={styles.assetChange}>
                    <MaterialIcons
                      name={market.change >= 0 ? 'arrow-upward' : 'arrow-downward'}
                      size={10}
                      color={market.change >= 0 ? Colors.success : Colors.danger}
                    />
                    <Text
                      style={[
                        styles.assetChangeText,
                        { color: market.change >= 0 ? Colors.success : Colors.danger },
                      ]}
                    >
                      {Math.abs(market.change)}%
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Chart Section */}
          <View style={styles.chartSection}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartLabel}>{selectedCrypto.symbol} Momentum</Text>
                <View style={styles.chartPriceRow}>
                  <Text style={styles.chartPrice}>{selectedCrypto.price}</Text>
                  <View
                    style={[
                      styles.chartChange,
                      {
                        backgroundColor:
                          selectedCrypto.change >= 0 ? Colors.successLight : Colors.dangerLight,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.chartChangeText,
                        { color: selectedCrypto.change >= 0 ? Colors.success : Colors.danger },
                      ]}
                    >
                      {selectedCrypto.change >= 0 ? '+' : ''}{selectedCrypto.change}%
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.timeFilters}>
                <TouchableOpacity style={[styles.timeFilter, styles.timeFilterActive]}>
                  <Text style={styles.timeFilterTextActive}>1H</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeFilter}>
                  <Text style={styles.timeFilterText}>1D</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeFilter}>
                  <Text style={styles.timeFilterText}>1W</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Chart Placeholder */}
            <View style={styles.chartContainer}>
              <View style={styles.chartGrid}>
                {[...Array(5)].map((_, i) => (
                  <View key={i} style={styles.chartGridLine} />
                ))}
              </View>
              <View style={styles.whaleBadge}>
                <Text style={styles.whaleBadgeText}>Büyük Balina Hareketi 🐋</Text>
              </View>
            </View>
          </View>

          {/* Market List */}
          <View style={styles.marketList}>
            <Text style={styles.sectionTitle}>TÜM PİYASALAR</Text>
            {markets.map((market) => (
              <TouchableOpacity key={market.id} style={styles.marketItem}>
                <View style={styles.marketLeft}>
                  <View style={[styles.marketIcon, { backgroundColor: market.color }]}>
                    <Text style={styles.marketIconText}>{market.icon}</Text>
                  </View>
                  <View>
                    <Text style={styles.marketName}>{market.name}</Text>
                    <Text style={styles.marketSymbol}>{market.symbol}</Text>
                  </View>
                </View>
                <View style={styles.marketRight}>
                  <Text style={styles.marketPrice}>{market.price}</Text>
                  <View style={styles.marketChange}>
                    <MaterialIcons
                      name={market.change >= 0 ? 'trending-up' : 'trending-down'}
                      size={14}
                      color={market.change >= 0 ? Colors.success : Colors.danger}
                    />
                    <Text
                      style={[
                        styles.marketChangeText,
                        { color: market.change >= 0 ? Colors.success : Colors.danger },
                      ]}
                    >
                      {market.change >= 0 ? '+' : ''}{market.change}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark + '50',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceDark,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 1,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statCardHighlight: {
    backgroundColor: Colors.primary + '10',
    borderColor: Colors.primary + '30',
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.xs,
  },
  statLabelText: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  assetsSection: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  seeAllText: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
    color: Colors.primary,
  },
  assetsCarousel: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  assetCard: {
    width: 140,
    padding: Spacing.md,
    backgroundColor: Colors.cardDark,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  assetCardSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  assetCardGlow: {
    position: 'absolute',
    top: -16,
    right: -16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    opacity: 0.1,
  },
  assetCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  assetIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  assetIconText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  assetSymbol: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  assetPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  assetChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  assetChangeText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  chartSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  chartLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  chartPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  chartPrice: {
    fontSize: FontSizes.xxxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  chartChange: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
  },
  chartChangeText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  timeFilters: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceDark,
    borderRadius: BorderRadius.sm,
    padding: 4,
  },
  timeFilter: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 6,
  },
  timeFilterActive: {
    backgroundColor: Colors.cardDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  timeFilterText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  timeFilterTextActive: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  chartContainer: {
    height: 200,
    backgroundColor: Colors.primary + '08',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
    padding: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  chartGrid: {
    flex: 1,
    justifyContent: 'space-between',
  },
  chartGridLine: {
    height: 1,
    backgroundColor: Colors.primary + '15',
    borderStyle: 'dashed',
  },
  whaleBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.backgroundDark + 'CC',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  whaleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  marketList: {
    paddingHorizontal: Spacing.lg,
  },
  marketItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark + '50',
  },
  marketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  marketIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketIconText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  marketName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  marketSymbol: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  marketRight: {
    alignItems: 'flex-end',
  },
  marketPrice: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  marketChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  marketChangeText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default MarketsScreen;

