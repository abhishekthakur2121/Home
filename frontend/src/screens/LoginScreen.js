import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import InputField from '../components/InputField';
import ButtonPrimary from '../components/ButtonPrimary';
import colors from '../utils/colors';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginMethod } from '../features/userSlice';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const loginMethod = useSelector((state) => state.auth.loginMethod);

  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    try {
      setLoading(true);
      Alert.alert('OTP Sent', 'A 6-digit code has been sent to your number.');
      setOtpSent(true);
    } catch (error) {
      console.error('Send OTP Error:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!phone) return Alert.alert('Error', 'Please enter your phone number');

    if (loginMethod === 'password' && !password)
      return Alert.alert('Error', 'Please enter your password');

    if (loginMethod === 'otp') {
      if (!otpSent) return Alert.alert('Error', 'Please request an OTP first');
      if (!otp) return Alert.alert('Error', 'Please enter the OTP');
    }

    try {
      setLoading(true);
      Alert.alert('Login Successful', `Logged in using ${loginMethod}`);
      navigation.replace('Home');
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue with HomeBuddy</Text>
      </View>

   
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setLoginMethod('password'));
            setOtpSent(false);
          }}
        >
          <Text
            style={[
              styles.toggle,
              loginMethod === 'password' && styles.activeToggle,
            ]}
          >
            Password Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dispatch(setLoginMethod('otp'));
            setPassword('');
          }}
        >
          <Text
            style={[
              styles.toggle,
              loginMethod === 'otp' && styles.activeToggle,
            ]}
          >
            OTP Login
          </Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.phoneWrapper}>
        <View style={styles.countryBox}>
  <CountryPicker
    countryCode={countryCode}
    withFlag
    withCallingCode
    withFilter
    onSelect={(country) => {
      setCountryCode(country.cca2);
      setCallingCode(country.callingCode[0]);
    }}
  />
  <Text style={styles.callingCode}>+{callingCode}</Text>
</View>

        <View style={styles.phoneBox}>
          <InputField
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      </View>

    
      {loginMethod === 'password' && (
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      )}

  
      {loginMethod === 'otp' && (
        <>
          {!otpSent ? (
            <TouchableOpacity onPress={handleSendOtp}>
              <Text style={styles.resendOtp}>Send OTP</Text>
            </TouchableOpacity>
          ) : (
            <>
              <InputField
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
              />
              <Text style={styles.resendOtp} onPress={handleSendOtp}>
                Resend OTP
              </Text>
            </>
          )}
        </>
      )}

   
      <ButtonPrimary
        title={loading ? 'Please wait...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />

      <Text style={styles.linkText}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.replace('Signup')}>
          Sign up
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  subtitle: {
    color: colors.textLight,
    fontSize: 14,
    marginTop: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggle: {
    marginHorizontal: 10,
    fontSize: 16,
    color: colors.textLight,
  },
  activeToggle: {
    color: colors.accent,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  phoneWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  countryBox: {
  flex: 0, 
  borderWidth: 0.5,
  borderColor: colors.textLight,
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: 46,
  paddingVertical:2,

},

  callingCode: {
    marginLeft: 4,
    fontWeight: '600',
    color: colors.textLight,
  },
  phoneBox: {
    flex: 2,
  },
  resendOtp: {
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'right',
    marginVertical: 8,
  },
  linkText: {
    textAlign: 'center',
    color: colors.textLight,
    marginTop: 14,
  },
  link: {
    color: colors.accent,
    fontWeight: '600',
  },
});
