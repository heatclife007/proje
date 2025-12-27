import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MainTabParamList } from './types';
import { Colors, Spacing } from '../constants/theme';

// Screens
import HomeScreen from '../screens/main/HomeScreen';
import MarketsScreen from '../screens/main/MarketsScreen';
import TradeScreen from '../screens/main/TradeScreen';
import TasksScreen from '../screens/main/TasksScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  name: keyof typeof MaterialIcons.glyphMap;
  label: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, color, size, name }) => (
  <MaterialIcons name={name} size={size} color={color} />
);

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Ana Ekran',
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon focused={focused} color={color} size={24} name="home" label="Ana Ekran" />
          ),
        }}
      />
      <Tab.Screen
        name="Markets"
        component={MarketsScreen}
        options={{
          tabBarLabel: 'Piyasalar',
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon focused={focused} color={color} size={24} name="show-chart" label="Piyasalar" />
          ),
        }}
      />
      <Tab.Screen
        name="Trade"
        component={TradeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.tradeButtonContainer}>
              <LinearGradient
                colors={Colors.gradientPrimary as [string, string]}
                style={styles.tradeButton}
              >
                <MaterialIcons name="swap-horiz" size={28} color="#FFF" />
              </LinearGradient>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: 'Görevler',
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon focused={focused} color={color} size={24} name="verified" label="Görevler" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon focused={focused} color={color} size={24} name="person" label="Profil" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.glassDark,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
    height: Platform.OS === 'ios' ? 88 : 70,
    paddingTop: Spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 28 : Spacing.sm,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  tradeButtonContainer: {
    position: 'absolute',
    top: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: Colors.backgroundDark,
  },
});

export default MainTabNavigator;

