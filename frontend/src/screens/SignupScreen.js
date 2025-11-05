import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import InputField from '../components/InputField';
import ButtonPrimary from '../components/ButtonPrimary';
import colors from '../utils/colors';
import { useDispatch } from 'react-redux';
import { signupUser } from '../features/userSlice';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email))
      newErrors.email = 'Enter a valid email address';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(phone))
      newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSignup = () => {
    if (validateForm()) {
      const fullPhone = `+${callingCode}${phone}`;
      dispatch(signupUser({ username, email, phone: fullPhone, password }));
      navigation.navigate('OTP', { phone: fullPhone });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

 
      <InputField
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={errors.username && styles.inputError}
      />
      {errors.username && <Text style={styles.error}>{errors.username}</Text>}

     
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={errors.email && styles.inputError}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

   
      <View style={styles.phoneContainer}>
        <TouchableOpacity style={styles.countryPicker}>
          <CountryPicker
            countryCode={countryCode}
            withCallingCodeButton
            withFlag
            withFilter
            withCallingCode
            withEmoji
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(country.callingCode[0]);
            }}
          />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <InputField
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={[errors.phone && styles.inputError, { marginLeft: 6 }]}
          />
        </View>
      </View>
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}


      <View style={styles.passwordContainer}>
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={[styles.flex, errors.password && styles.inputError]}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconContainer}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color={colors.textLight}
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

  
      <View style={styles.passwordContainer}>
        <InputField
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          style={[styles.flex, errors.confirmPassword && styles.inputError]}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.iconContainer}
        >
          <Ionicons
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={20}
            color={colors.textLight}
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

   
      <ButtonPrimary title="Continue" onPress={handleSignup} />

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 22,
    fontWeight: '600',
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    color: colors.error,
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPicker: {
    borderWidth: 0.5 ,
    borderColor: colors.textLight,
    borderRadius: 10,
    paddingVertical: 8.5,
    justifyContent: 'center',
    // backgroundColor: colors.white,
    marginRight: 2,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
  },
  flex: {
    flex: 1,
  },
  footerText: {
    textAlign: 'center',
    color: colors.textLight,
    marginTop: 20,
  },
  link: {
    color: colors.accent,
    fontWeight: '600',
  },
});
