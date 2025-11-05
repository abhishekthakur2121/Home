import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ButtonPrimary from '../components/ButtonPrimary';
import colors from '../utils/colors';

export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
    
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/homeLogo.png')} 
          style={styles.logo}
        />
        <Text style={styles.appName}>Home-Buddy</Text>
      </View>

  
      <Text style={styles.title}>Registration Successful!</Text>
      <Text style={styles.subtitle}>
        Your account has been created successfully.
        {'\n'}You can now log in to continue.
      </Text>

      
      <ButtonPrimary
        title="Go to Login"
        onPress={() => navigation.replace('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: colors.success, 
    marginBottom: 8,
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary, 
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.success,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textDark,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
});
