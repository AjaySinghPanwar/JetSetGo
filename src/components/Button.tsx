import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ButtonProps} from '../utils/types';

const Button = ({
  title,
  handlePress,
  buttonContainerStyle,
  titleStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[styles.buttonContainer, buttonContainerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0067FF',
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 4},
    shadowRadius: 6,
    elevation: 8,
    shadowOpacity: 0.3,
  },

  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    color: '#FFF',
  },
});
