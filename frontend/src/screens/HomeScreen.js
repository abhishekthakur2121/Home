import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/userSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Home-Buddy 🏡</Text>
      <Text style={styles.subText}>You’re now logged in successfully!</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  welcome: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  subText: {
    color: colors.textLight,
    marginBottom: 40,
    textAlign: 'center',
  },
  logoutBtn: {
    backgroundColor: colors.error,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
