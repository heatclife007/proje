import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack Screens
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main Tab Screens
export type MainTabParamList = {
  Home: undefined;
  Markets: undefined;
  Trade: undefined;
  Tasks: undefined;
  Profile: undefined;
};

// Root Stack (combines Auth and Main)
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Paywall: undefined;
  Leaderboard: undefined;
};

// Screen props types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

