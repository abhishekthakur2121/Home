import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import OTPScreen from '../screens/OTPScreen';
import SuccessScreen from '../screens/SuccessScreen';
import LoginScreen from '../screens/LoginScreen';
import colors from '../utils/colors';
import homeLogo from '../../assets/homeLogo.png'; 
import HomeScreen from '../screens/HomeScreen';
const Stack = createStackNavigator();

const HeaderLogoTitle = () => (
  <View style={styles.headerContainer}>
    <Image source={homeLogo} style={styles.logo} />
    <Text style={styles.headerTitle}>Home-Buddy</Text>
  </View>
);

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <HeaderLogoTitle />,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: () => null, 
      }}
    >
      
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginRight: 2,
    tintColor: colors.accent,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  },
});
