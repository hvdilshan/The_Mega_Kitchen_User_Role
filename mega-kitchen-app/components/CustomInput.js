import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LeftIcon, StyledInputLabel, StyledTextInput, RightIcon, Colors } from './styles';
import { Ionicons } from '@expo/vector-icons';

const { darkLight } = Colors;

const CustomInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  showDatePicker,
  isDate = false,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Ionicons name={icon} size={30} color={darkLight} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default CustomInput;
