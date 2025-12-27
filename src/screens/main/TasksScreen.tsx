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
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../../constants/theme';
import { Card } from '../../components';

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  reward: string;
  rewardType: 'xp' | 'avatar' | 'coin';
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  completed: boolean;
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'İlk Kar',
    description: '%5 kar ile bir işlem kapat.',
    progress: 0,
    maxProgress: 1,
    reward: '+100 XP',
    rewardType: 'xp',
    iconName: 'trending-up',
    iconColor: Colors.success,
    completed: false,
  },
  {
    id: '2',
    title: 'Kripto Balinası',
    description: 'Toplam 10.000$ işlem hacmine ulaş.',
    progress: 6500,
    maxProgress: 10000,
    reward: 'Yeni Avatar',
    rewardType: 'avatar',
    iconName: 'currency-bitcoin',
    iconColor: Colors.accent,
    completed: false,
  },
  {
    id: '3',
    title: 'Akademi Mezunu',
    description: 'Eğitim modülünü başarıyla tamamladın.',
    progress: 1,
    maxProgress: 1,
    reward: '+500 Coin',
    rewardType: 'coin',
    iconName: 'school',
    iconColor: Colors.success,
    completed: true,
  },
];

const TasksScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'achievements'>('tasks');

  const renderTask = (task: Task) => (
    <View
      key={task.id}
      style={[
        styles.taskCard,
        task.completed && styles.taskCardCompleted,
      ]}
    >
      {task.completed && (
        <View style={styles.completedBadge}>
          <MaterialIcons name="check" size={14} color="#FFF" />
        </View>
      )}
      
      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <View style={[styles.taskIcon, { backgroundColor: task.iconColor + '20' }]}>
            <MaterialIcons name={task.iconName} size={24} color={task.iconColor} />
          </View>
          <View style={styles.taskInfo}>
            <View style={styles.taskTitleRow}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <View style={[
                styles.rewardBadge,
                task.rewardType === 'xp' && styles.rewardBadgeXP,
                task.rewardType === 'avatar' && styles.rewardBadgeAvatar,
                task.rewardType === 'coin' && styles.rewardBadgeCoin,
              ]}>
                <Text style={[
                  styles.rewardText,
                  task.rewardType === 'xp' && styles.rewardTextXP,
                  task.rewardType === 'avatar' && styles.rewardTextAvatar,
                  task.rewardType === 'coin' && styles.rewardTextCoin,
                ]}>
                  {task.reward}
                </Text>
              </View>
            </View>
            <Text style={styles.taskDescription}>{task.description}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, task.completed && styles.progressLabelCompleted]}>
              {task.completed ? 'Tamamlandı' : 'İlerleme'}
            </Text>
            <Text style={styles.progressValue}>
              {task.progress >= 1000 
                ? `${(task.progress / 1000).toFixed(1)}K` 
                : task.progress}/{task.maxProgress >= 1000 
                ? `${(task.maxProgress / 1000).toFixed(0)}K` 
                : task.maxProgress}
            </Text>
          </View>
          <View style={[styles.progressBar, task.completed && styles.progressBarCompleted]}>
            <View
              style={[
                styles.progressFill,
                { width: `${(task.progress / task.maxProgress) * 100}%` },
                task.completed && styles.progressFillCompleted,
              ]}
            />
          </View>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={[
          styles.taskButton,
          task.completed && styles.taskButtonCompleted,
        ]}
        activeOpacity={0.8}
      >
        {task.completed ? (
          <>
            <MaterialIcons name="redeem" size={18} color="#FFF" />
            <Text style={styles.taskButtonText}>Ödülü Topla</Text>
          </>
        ) : (
          <Text style={styles.taskButtonText}>
            {task.progress === 0 ? 'İşlem Yap' : 'Devam Et'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
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
          <Text style={styles.headerTitle}>Görev Merkezi</Text>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="help-outline" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Level Progress Card */}
          <Card style={styles.levelCard}>
            <View style={styles.levelCardGlow} />
            <View style={styles.levelHeader}>
              <View>
                <Text style={styles.levelLabel}>MEVCUT SEVİYE</Text>
                <Text style={styles.levelTitle}>Seviye 5 Tüccar</Text>
              </View>
              <View style={styles.levelBadge}>
                <MaterialIcons name="auto-graph" size={24} color={Colors.primary} />
              </View>
            </View>
            
            <View style={styles.levelProgress}>
              <View style={styles.levelProgressHeader}>
                <Text style={styles.xpValue}>
                  750 <Text style={styles.xpLabel}>XP</Text>
                </Text>
                <Text style={styles.xpTarget}>1000 XP Hedef</Text>
              </View>
              <View style={styles.levelProgressBar}>
                <LinearGradient
                  colors={Colors.gradientPrimary as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.levelProgressFill, { width: '75%' }]}
                />
              </View>
              <Text style={styles.xpRemaining}>Sonraki seviyeye 250 XP kaldı</Text>
            </View>
          </Card>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <View style={styles.statIcon}>
                <MaterialIcons name="local-fire-department" size={20} color="#F97316" />
              </View>
              <Text style={styles.statLabel}>GÜNLÜK SERİ</Text>
              <Text style={styles.statValue}>5 Gün</Text>
            </Card>
            <Card style={styles.statCard}>
              <View style={styles.statIcon}>
                <MaterialIcons name="emoji-events" size={20} color="#FACC15" />
              </View>
              <Text style={styles.statLabel}>BAŞARIMLAR</Text>
              <Text style={styles.statValue}>12 / 50</Text>
            </Card>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'tasks' && styles.tabActive]}
              onPress={() => setActiveTab('tasks')}
            >
              <Text style={[styles.tabText, activeTab === 'tasks' && styles.tabTextActive]}>
                Aktif Görevler
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'achievements' && styles.tabActive]}
              onPress={() => setActiveTab('achievements')}
            >
              <Text style={[styles.tabText, activeTab === 'achievements' && styles.tabTextActive]}>
                Başarımlar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Task List */}
          <View style={styles.taskList}>
            {tasks.map(renderTask)}
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark,
  },
  headerButton: {
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  levelCard: {
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  levelCardGlow: {
    position: 'absolute',
    top: -32,
    right: -40,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: Colors.primary,
    opacity: 0.1,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  levelLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  levelTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '20',
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  levelProgress: {
    gap: Spacing.sm,
  },
  levelProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  xpValue: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  xpLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '400',
    color: Colors.textMuted,
  },
  xpTarget: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  levelProgressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.surfaceDark,
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    borderRadius: 6,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  xpRemaining: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
  },
  statIcon: {
    marginBottom: Spacing.sm,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceDark,
    borderRadius: BorderRadius.full,
    padding: 4,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.cardDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  tabTextActive: {
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  taskList: {
    gap: Spacing.md,
  },
  taskCard: {
    backgroundColor: Colors.cardDark,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderDark,
    padding: Spacing.lg,
  },
  taskCardCompleted: {
    backgroundColor: Colors.success + '08',
    borderColor: Colors.success + '30',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskContent: {
    marginBottom: Spacing.md,
  },
  taskHeader: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  taskIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingRight: 24,
  },
  taskTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  rewardBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  rewardBadgeXP: {
    backgroundColor: '#FACC15' + '15',
    borderColor: '#FACC15' + '30',
  },
  rewardBadgeAvatar: {
    backgroundColor: Colors.accent + '15',
    borderColor: Colors.accent + '30',
  },
  rewardBadgeCoin: {
    backgroundColor: Colors.success + '15',
    borderColor: Colors.success + '30',
  },
  rewardText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  rewardTextXP: {
    color: '#FACC15',
  },
  rewardTextAvatar: {
    color: Colors.accent,
  },
  rewardTextCoin: {
    color: Colors.success,
  },
  taskDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  progressSection: {
    marginTop: Spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  progressLabelCompleted: {
    color: Colors.success,
    fontWeight: '700',
  },
  progressValue: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.surfaceDark,
    overflow: 'hidden',
  },
  progressBarCompleted: {
    backgroundColor: Colors.success + '30',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  progressFillCompleted: {
    backgroundColor: Colors.success,
  },
  taskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.sm + 2,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  taskButtonCompleted: {
    backgroundColor: Colors.success,
    shadowColor: Colors.success,
  },
  taskButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: '#FFF',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default TasksScreen;

