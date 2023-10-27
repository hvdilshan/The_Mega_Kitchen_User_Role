import {
    StyledContainer,
} from '../../components/styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import NavBar from '../../components/NavigationBar';


const Cart = ({navigation}) => {
    return (
        <StyledContainer>
            <NavBar children={'cart'} navigation={navigation}></NavBar>
        </StyledContainer>
    );
}

export default Cart;