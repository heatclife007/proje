import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';
import { Button } from '../components';

interface PlanOption {
  id: string;
  name: string;
  period: string;
  price: string;
  originalPrice?: string;
  discount?: string;
}

const plans: PlanOption[] = [
  {
    id: 'yearly',
    name: 'Annual Pro',
    period: 'Yıllık faturalandırma',
    price: '₺399.99',
    originalPrice: '₺599.99',
    discount: '30% İndirim',
  },
  {
    id: 'monthly',
    name: 'Aylık',
    period: 'Aylık faturalandırma',
    price: '₺49.99',
  },
];

const benefits = [
  {
    icon: 'bolt' as const,
    title: 'Gerçek Zamanlı Veri',
    description: 'Sıfır gecikme ile piyasa güncellemeleri',
  },
  {
    icon: 'rocket-launch' as const,
    title: '100x Kaldıraç',
    description: 'Maksimum işlem gücünü aç',
  },
  {
    icon: 'block' as const,
    title: 'Reklamsız Deneyim',
    description: 'Reklamlara değil, işlemlerine odaklan',
  },
];

const PaywallScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const handlePurchase = () => {
    // Satın alma işlemi
    console.log('Purchasing plan:', selectedPlan);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Image */}
      <View style={styles.headerImage}>
        <LinearGradient
          colors={['transparent', Colors.backgroundDark]}
          style={styles.headerGradient}
        />
        <View style={styles.rocketContainer}>
          <LinearGradient
            colors={Colors.gradientPrimary as [string, string]}
            style={styles.rocketIcon}
          >
            <MaterialIcons name="rocket-launch" size={64} color="#FFF" />
          </LinearGradient>
        </View>
      </View>

      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="close" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Headlines */}
        <View style={styles.headlines}>
          <Text style={styles.headline}>
            Portföyünü{'\n'}
            <Text style={styles.headlineAccent}>Yükselt</Text>
          </Text>
          <Text style={styles.subheadline}>
            Pro araçlarla simülasyonda avantaj sağla.
          </Text>
        </View>

        {/* Benefits */}
        <View style={styles.benefits}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <MaterialIcons name={benefit.icon} size={24} color={Colors.primary} />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Plan Selection */}
        <View style={styles.plans}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected,
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{plan.discount}</Text>
                </View>
              )}
              
              <View style={styles.planLeft}>
                <View
                  style={[
                    styles.radioButton,
                    selectedPlan === plan.id && styles.radioButtonSelected,
                  ]}
                >
                  {selectedPlan === plan.id && (
                    <MaterialIcons name="check" size={16} color="#FFF" />
                  )}
                </View>
                <View>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
              </View>
              
              <View style={styles.planRight}>
                <Text style={styles.planPrice}>{plan.price}</Text>
                {plan.originalPrice && (
                  <Text style={styles.planOriginalPrice}>{plan.originalPrice}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA Button */}
        <Button
          title="3 Günlük Ücretsiz Denemeyi Başlat"
          onPress={handlePurchase}
          variant="gradient"
          size="lg"
          icon={<MaterialIcons name="arrow-forward" size={20} color="#FFF" />}
        />
        
        <Text style={styles.priceNote}>
          Ardından ₺399.99/yıl. İstediğin zaman iptal et.
        </Text>

        {/* Footer Links */}
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Satın Almayı Geri Yükle</Text>
          </TouchableOpacity>
          <View style={styles.footerDot} />
          <TouchableOpacity>
            <Text style={styles.footerLink}>Hizmet Şartları</Text>
          </TouchableOpacity>
          <View style={styles.footerDot} />
          <TouchableOpacity>
            <Text style={styles.footerLink}>Gizlilik</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  headerImage: {
    height: 280,
    backgroundColor: Colors.surfaceDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  rocketContainer: {
    zIndex: 0,
  },
  rocketIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    marginTop: -40,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },
  headlines: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  headline: {
    fontSize: FontSizes.xxxl,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 40,
  },
  headlineAccent: {
    color: Colors.primary,
  },
  subheadline: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  benefits: {
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceDark + '80',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderDark,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  benefitDescription: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  plans: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    backgroundColor: Colors.surfaceDark,
  },
  planCardSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.primary + '15',
  },
  discountBadge: {
    position: 'absolute',
    top: -12,
    right: 24,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  discountText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  planName: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  planPeriod: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  planRight: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  planOriginalPrice: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  priceNote: {
    textAlign: 'center',
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: Spacing.md,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xxl,
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  footerLink: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.textMuted,
  },
});

export default PaywallScreen;

