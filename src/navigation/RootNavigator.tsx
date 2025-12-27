import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// Navigators
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

// Screens
import PaywallScreen from '../screens/PaywallScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Auth Context için basit bir global state (gerçek uygulamada Context API kullanılır)
export let setAuthenticated: (value: boolean) => void;

export const RootNavigator: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Global erişim için (demo amaçlı)
  setAuthenticated = setIsAuthenticated;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen
              name="Paywall"
              component={PaywallScreen}
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
