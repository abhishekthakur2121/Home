import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

export default function TitleText({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
  },
});
