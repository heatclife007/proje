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
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';

interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  profit: string;
  level: number;
  portfolioValue?: string;
}

const topThree: LeaderboardUser[] = [
  { id: '2', rank: 2, username: 'Trader_Joe', avatar: '🧑‍💼', profit: '+312%', level: 42 },
  { id: '1', rank: 1, username: 'CryptoQueen', avatar: '👸', profit: '+485%', level: 54 },
  { id: '3', rank: 3, username: 'BullishBoy', avatar: '🐂', profit: '+289%', level: 38 },
];

const otherUsers: LeaderboardUser[] = [
  { id: '4', rank: 4, username: 'Satoshi_Fan', avatar: '🥷', profit: '+210%', level: 30, portfolioValue: '$84,200' },
  { id: '5', rank: 5, username: 'MoonWalker', avatar: '🚀', profit: '+195%', level: 28, portfolioValue: '$76,150' },
  { id: '6', rank: 6, username: 'Altcoin_Hunter', avatar: '🏹', profit: '+174%', level: 25, portfolioValue: '$62,900' },
  { id: '7', rank: 7, username: 'HODL_Queen', avatar: '💎', profit: '+150%', level: 24, portfolioValue: '$58,200' },
  { id: '8', rank: 8, username: 'Block_Master', avatar: '🧊', profit: '+132%', level: 22, portfolioValue: '$51,100' },
];

const currentUser: LeaderboardUser = {
  id: 'current',
  rank: 142,
  username: 'Siz (Kullanıcı)',
  avatar: '😎',
  profit: '+12.4%',
  level: 12,
  portfolioValue: '$12,450',
};

const LeaderboardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global');
  const [activeFilter, setActiveFilter] = useState<'week' | 'month' | 'all'>('week');

  const renderPodium = () => (
    <View style={styles.podium}>
      {/* Rank 2 */}
      <View style={styles.podiumItem}>
        <View style={[styles.podiumAvatar, styles.rank2Avatar]}>
          <Text style={styles.avatarEmoji}>{topThree[0].avatar}</Text>
        </View>
        <View style={styles.rankBadge2}>
          <Text style={styles.rankBadgeText}>#2</Text>
        </View>
        <Text style={styles.podiumUsername}>{topThree[0].username}</Text>
        <Text style={styles.podiumProfit}>{topThree[0].profit}</Text>
        <Text style={styles.podiumLevel}>Lvl {topThree[0].level}</Text>
      </View>

      {/* Rank 1 */}
      <View style={[styles.podiumItem, styles.podiumItemFirst]}>
        <MaterialIcons name="emoji-events" size={32} color="#FACC15" style={styles.crown} />
        <View style={[styles.podiumAvatar, styles.rank1Avatar]}>
          <Text style={[styles.avatarEmoji, { fontSize: 40 }]}>{topThree[1].avatar}</Text>
        </View>
        <View style={styles.rankBadge1}>
          <Text style={[styles.rankBadgeText, { color: '#000' }]}>#1</Text>
        </View>
        <Text style={[styles.podiumUsername, styles.podiumUsernameFirst]}>{topThree[1].username}</Text>
        <Text style={[styles.podiumProfit, styles.podiumProfitFirst]}>{topThree[1].profit}</Text>
        <Text style={styles.podiumLevel}>Lvl {topThree[1].level} • Balina</Text>
      </View>

      {/* Rank 3 */}
      <View style={styles.podiumItem}>
        <View style={[styles.podiumAvatar, styles.rank3Avatar]}>
          <Text style={styles.avatarEmoji}>{topThree[2].avatar}</Text>
        </View>
        <View style={styles.rankBadge3}>
          <Text style={styles.rankBadgeText}>#3</Text>
        </View>
        <Text style={styles.podiumUsername}>{topThree[2].username}</Text>
        <Text style={styles.podiumProfit}>{topThree[2].profit}</Text>
        <Text style={styles.podiumLevel}>Lvl {topThree[2].level}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lider Tablosu</Text>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="search" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'global' && styles.tabActive]}
            onPress={() => setActiveTab('global')}
          >
            <Text style={[styles.tabText, activeTab === 'global' && styles.tabTextActive]}>
              Genel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'friends' && styles.tabActive]}
            onPress={() => setActiveTab('friends')}
          >
            <Text style={[styles.tabText, activeTab === 'friends' && styles.tabTextActive]}>
              Arkadaşlar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          {(['week', 'month', 'all'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter === 'week' ? 'Bu Hafta' : filter === 'month' ? 'Bu Ay' : 'Tüm Zamanlar'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Podium */}
          {renderPodium()}

          {/* Other Users */}
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Diğer Oyuncular</Text>
            {otherUsers.map((user) => (
              <View key={user.id} style={styles.listItem}>
                <Text style={styles.listRank}>{user.rank}</Text>
                <View style={styles.listAvatar}>
                  <Text style={styles.listAvatarEmoji}>{user.avatar}</Text>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelBadgeText}>Lvl {user.level}</Text>
                  </View>
                </View>
                <View style={styles.listInfo}>
                  <Text style={styles.listUsername}>{user.username}</Text>
                  <Text style={styles.listPortfolio}>Portföy Değeri: {user.portfolioValue}</Text>
                </View>
                <View style={styles.listProfit}>
                  <MaterialIcons name="trending-up" size={16} color={Colors.primary} />
                  <Text style={styles.listProfitText}>{user.profit}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Current User Sticky Bar */}
        <View style={styles.currentUserBar}>
          <View style={styles.currentUserRank}>
            <Text style={styles.currentUserRankLabel}>Sıra</Text>
            <Text style={styles.currentUserRankValue}>{currentUser.rank}</Text>
          </View>
          <View style={styles.currentUserAvatar}>
            <Text style={styles.currentUserAvatarEmoji}>{currentUser.avatar}</Text>
            <View style={[styles.levelBadge, styles.currentUserLevelBadge]}>
              <Text style={styles.levelBadgeText}>Lvl {currentUser.level}</Text>
            </View>
          </View>
          <View style={styles.currentUserInfo}>
            <Text style={styles.currentUserName}>{currentUser.username}</Text>
            <View style={styles.currentUserStats}>
              <Text style={styles.currentUserPortfolio}>{currentUser.portfolioValue}</Text>
              <View style={styles.dot} />
              <Text style={styles.currentUserProfit}>{currentUser.profit}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <MaterialIcons name="share" size={20} color="#FFF" />
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
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: Spacing.xl,
    marginVertical: Spacing.sm,
    backgroundColor: Colors.surfaceDark,
    borderRadius: BorderRadius.full,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: '#FFF',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceDark,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  filterText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  filterTextActive: {
    color: '#FFF',
  },
  content: {
    flex: 1,
  },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.md,
  },
  podiumItem: {
    flex: 1,
    alignItems: 'center',
  },
  podiumItemFirst: {
    marginBottom: Spacing.lg,
  },
  crown: {
    marginBottom: Spacing.sm,
  },
  podiumAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  rank1Avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: '#FACC15',
    backgroundColor: Colors.surfaceDark,
    shadowColor: '#FACC15',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  rank2Avatar: {
    borderWidth: 4,
    borderColor: Colors.textMuted,
    backgroundColor: Colors.surfaceDark,
  },
  rank3Avatar: {
    borderWidth: 4,
    borderColor: '#CD7F32',
    backgroundColor: Colors.surfaceDark,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  rankBadge1: {
    position: 'absolute',
    top: 80,
    backgroundColor: '#FACC15',
    paddingHorizontal: Spacing.md,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.backgroundDark,
  },
  rankBadge2: {
    position: 'absolute',
    top: 60,
    backgroundColor: Colors.textMuted,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.backgroundDark,
  },
  rankBadge3: {
    position: 'absolute',
    top: 60,
    backgroundColor: '#CD7F32',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.backgroundDark,
  },
  rankBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: '#FFF',
  },
  podiumUsername: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
  },
  podiumUsernameFirst: {
    color: '#FACC15',
  },
  podiumProfit: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 2,
  },
  podiumProfitFirst: {
    fontSize: FontSizes.lg,
  },
  podiumLevel: {
    fontSize: 10,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  listContainer: {
    backgroundColor: Colors.surfaceDark,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: 120,
  },
  listTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundDark + '80',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  listRank: {
    width: 24,
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
    textAlign: 'center',
  },
  listAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.md,
  },
  listAvatarEmoji: {
    fontSize: 24,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: Colors.textMuted,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.backgroundDark,
  },
  levelBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFF',
  },
  listInfo: {
    flex: 1,
  },
  listUsername: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  listPortfolio: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  listProfit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listProfitText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.primary,
  },
  currentUserBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceDark,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  currentUserRank: {
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  currentUserRankLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  currentUserRankValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  currentUserAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: Spacing.md,
  },
  currentUserAvatarEmoji: {
    fontSize: 24,
  },
  currentUserLevelBadge: {
    backgroundColor: Colors.primary,
  },
  currentUserInfo: {
    flex: 1,
  },
  currentUserName: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  currentUserStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 2,
  },
  currentUserPortfolio: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.textMuted,
  },
  currentUserProfit: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.success,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LeaderboardScreen;

