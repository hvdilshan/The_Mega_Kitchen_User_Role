import styled from 'styled-components';
import { View, Text, Image, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.StatusBarHeight;

// colors
export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#AB836A',
  lightBrand: '#B49581',
  green: '#10B981',
  red: '#EF4444',
  gry: '#CCCCCC',
  transparent: '#00000040',
  error: '#C0392B',
};

const { primary, secondary, tertiary, darkLight, brand, green, red, gry, transparent, error } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const PageLogo = styled.Image`
  width: 250px;
  height: 250px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 10px;
  font-size: 16px;
  height: 50px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 14px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  margin-vertical: 10px;
  height: 60px;
  width: 100%;
  text-color: ${primary};
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 20px;
  font-weight: bold;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraViewForLogin = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-bottom: 107%;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-content: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;

export const NavContainer = styled.View`
  position: absolute;
  align-items: center;
  bottom: 0px;
  flex-direction: row;
  background-color: ${brand};
  width: 115%;
  height: 13%;
  justify-content: space-evenly;
`;

export const ListView = styled.TouchableHighlight`
  background-color: ${secondary};
  min-height: 85px;
  width: 100%;
  padding: 15px;
  justify-content: space-around;
  margin-bottom: 15px;
  border-radius: 10px;
`;

export const ListCardHeader = styled.Text`
  left: 70px;
  top: 20px;
  position: absolute;
  font-size: 18px;
  font-weight: bold;
`;

export const ListCardTimeHit = styled.Text`
  color: ${tertiary};
  right: 12px;
  top: 20px;
  position: absolute;
  font-size: 14px;
`;

export const ListCardContent = styled.Text`
  top: 5px;
  font-size: 15px;
`;
export const ErrorMsg = styled.Text`
  font-size: 11px;
  color: ${error};
  left: 105px;
  right: 0px;
`;
