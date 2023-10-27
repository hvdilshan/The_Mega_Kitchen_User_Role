import React from 'react';
import { Text } from 'react-native';

import { StyledButton, ButtonText } from '../../components/styles';

import {
  AppLogo,
  AppTitle,
  PageText,
  WelcomeStyledContainer,
  WelcomeInnerContainer,
} from './WelcomeStyle';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Welcome = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Aclonica: require('../../assets/fonts/Aclonica.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <WelcomeStyledContainer>
      <WelcomeInnerContainer>
        <AppTitle>The Mega Kitchen</AppTitle>
        <AppLogo resizeMode="cover" source={require('../../assets/img/logo.png')} />
        <Text style={{ fontFamily: 'Aclonica', fontSize: 35, textAlign: 'center' }}>Eat Healthy</Text>
        <PageText>Log in or Sign up to explore delicious food and meals</PageText>
        <StyledButton onPress={() => navigation.navigate('Login')}>
          <ButtonText> Log in </ButtonText>
        </StyledButton>
        <StyledButton onPress={() => navigation.navigate('Signup')}>
          <ButtonText> Sign up </ButtonText>
        </StyledButton>
      </WelcomeInnerContainer>
    </WelcomeStyledContainer>
  );
};

export default Welcome;
