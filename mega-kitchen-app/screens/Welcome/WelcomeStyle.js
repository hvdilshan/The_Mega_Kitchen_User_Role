import styled from 'styled-components';
import { Colors } from '../../components/styles';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.StatusBarHeight;

const { brand, tertiary, primary } = Colors;

export const AppLogo = styled.Image`
  width: 250px;
  height: 250px;
`;

export const AppTitle = styled.Text`
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;

export const WelcomeNote = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  padding: 10px;
`;

export const PageText = styled.Text`
  font-size: 18px;
  text-align: center;
  padding: 10px;
  color: ${tertiary};
`;

export const WelcomeStyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  align-items: center;
  margin-top: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`;

export const WelcomeInnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;
