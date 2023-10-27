import {
    StyledContainer,
} from '../../components/styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import NavBar from '../../components/NavigationBar';


const Menu = ({navigation}) => {
    return (
        <StyledContainer>
            <NavBar children={'menu'} navigation={navigation}></NavBar>
        </StyledContainer>
    );
}

export default Menu;