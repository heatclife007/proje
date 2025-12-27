import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';

const TradeScreen: React.FC = () => {
  const [tradeType, setTradeType] = useState<'long' | 'short'>('long');
  const [amount, setAmount] = useState('1000');

  const percentages = ['10%', '25%', '50%', 'MAX'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundDark} />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>İŞLEM AÇ</Text>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="info-outline" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Selected Crypto */}
          <View style={styles.cryptoCard}>
            <View style={styles.cryptoLeft}>
              <View style={[styles.cryptoIcon, { backgroundColor: Colors.bitcoin }]}>
                <Text style={styles.cryptoIconText}>₿</Text>
              </View>
              <View>
                <Text style={styles.cryptoName}>Bitcoin</Text>
                <Text style={styles.cryptoSymbol}>BTC/USDT</Text>
              </View>
            </View>
            <View style={styles.cryptoRight}>
              <Text style={styles.cryptoPrice}>$45,200</Text>
              <View style={styles.cryptoChange}>
                <MaterialIcons name="trending-up" size={14} color={Colors.success} />
                <Text style={styles.cryptoChangeText}>+1.2%</Text>
              </View>
            </View>
          </View>

          {/* Trade Type Selector */}
          <View style={styles.tradeTypeContainer}>
            <TouchableOpacity
              style={[
                styles.tradeTypeButton,
                tradeType === 'long' && styles.tradeTypeLongActive,
              ]}
              onPress={() => setTradeType('long')}
            >
              <MaterialIcons
                name="trending-up"
                size={18}
                color={tradeType === 'long' ? Colors.success : Colors.textMuted}
              />
              <Text
                style={[
                  styles.tradeTypeText,
                  tradeType === 'long' && styles.tradeTypeLongText,
                ]}
              >
                ALIM (Long)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tradeTypeButton,
                tradeType === 'short' && styles.tradeTypeShortActive,
              ]}
              onPress={() => setTradeType('short')}
            >
              <MaterialIcons
                name="trending-down"
                size={18}
                color={tradeType === 'short' ? Colors.danger : Colors.textMuted}
              />
              <Text
                style={[
                  styles.tradeTypeText,
                  tradeType === 'short' && styles.tradeTypeShortText,
                ]}
              >
                SATIŞ (Short)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Amount Input */}
          <View style={styles.amountSection}>
            <View style={styles.amountInputContainer}>
              <Text style={styles.amountLabel}>YATIRIM TUTARI</Text>
              <View style={styles.amountInputRow}>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  placeholderTextColor={Colors.textMuted}
                />
                <Text style={styles.amountCurrency}>USDT</Text>
              </View>
            </View>

            <View style={styles.percentageButtons}>
              {percentages.map((percent, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.percentageButton,
                    percent === 'MAX' && styles.percentageButtonMax,
                  ]}
                >
                  <Text
                    style={[
                      styles.percentageButtonText,
                      percent === 'MAX' && styles.percentageButtonMaxText,
                    ]}
                  >
                    {percent}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Leverage Slider */}
          <View style={styles.leverageSection}>
            <View style={styles.leverageHeader}>
              <Text style={styles.leverageLabel}>KALDIRAÇ</Text>
              <Text style={styles.leverageValue}>10x</Text>
            </View>
            <View style={styles.leverageSlider}>
              <View style={styles.leverageTrack}>
                <View style={[styles.leverageFill, { width: '40%' }]} />
              </View>
              <View style={styles.leverageMarks}>
                {['1x', '5x', '10x', '25x', '50x'].map((mark, index) => (
                  <Text key={index} style={styles.leverageMark}>{mark}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* Trade Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>İşlem Değeri</Text>
              <Text style={styles.summaryValue}>$10,000</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Teminat</Text>
              <Text style={styles.summaryValue}>$1,000 USDT</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Giriş Fiyatı</Text>
              <Text style={styles.summaryValue}>$45,200</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Likidasyon Fiyatı</Text>
              <Text style={[styles.summaryValue, { color: Colors.danger }]}>$40,680</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Komisyon</Text>
              <Text style={styles.summaryValue}>0.05%</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <TouchableOpacity style={styles.confirmButton} activeOpacity={0.8}>
            <LinearGradient
              colors={
                tradeType === 'long'
                  ? [Colors.success, '#00B87B']
                  : [Colors.danger, '#E53935']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.confirmButtonGradient}
            >
              <Text style={styles.confirmButtonText}>EMRİ ONAYLA</Text>
              <View style={styles.confirmButtonIcon}>
                <MaterialIcons name="arrow-forward" size={20} color="#FFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.pnlText}>
            Tahmini PnL: <Text style={{ color: Colors.success }}>+24.5%</Text>
          </Text>
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
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 150,
  },
  cryptoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardDark,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  cryptoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  cryptoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cryptoIconText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  cryptoName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  cryptoSymbol: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  cryptoRight: {
    alignItems: 'flex-end',
  },
  cryptoPrice: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  cryptoChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  cryptoChangeText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.success,
  },
  tradeTypeContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceDark,
    borderRadius: BorderRadius.full,
    padding: 4,
    marginBottom: Spacing.xl,
  },
  tradeTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  tradeTypeLongActive: {
    backgroundColor: Colors.cardDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tradeTypeShortActive: {
    backgroundColor: Colors.cardDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tradeTypeText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  tradeTypeLongText: {
    color: Colors.success,
  },
  tradeTypeShortText: {
    color: Colors.danger,
  },
  amountSection: {
    marginBottom: Spacing.xl,
  },
  amountInputContainer: {
    backgroundColor: Colors.surfaceDark + '80',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  amountLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountInput: {
    flex: 1,
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  amountCurrency: {
    fontSize: FontSizes.md,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  percentageButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  percentageButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceDark,
    alignItems: 'center',
  },
  percentageButtonMax: {
    backgroundColor: Colors.primary + '20',
  },
  percentageButtonText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  percentageButtonMaxText: {
    color: Colors.primary,
  },
  leverageSection: {
    marginBottom: Spacing.xl,
  },
  leverageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  leverageLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  leverageValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  leverageSlider: {
    paddingHorizontal: Spacing.xs,
  },
  leverageTrack: {
    height: 8,
    backgroundColor: Colors.surfaceDark,
    borderRadius: 4,
    marginBottom: Spacing.sm,
  },
  leverageFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  leverageMarks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leverageMark: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  summaryCard: {
    backgroundColor: Colors.cardDark,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  summaryLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  summaryValue: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.borderDark,
    marginVertical: Spacing.sm,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.cardDark,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  confirmButton: {
    marginBottom: Spacing.md,
  },
  confirmButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.xl,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  confirmButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 1,
  },
  confirmButtonIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pnlText: {
    textAlign: 'center',
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
});

export default TradeScreen;

