import {
    StyledContainer,
} from '../../components/styles';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import NavBar from '../../components/NavigationBar';


const Notify = ({navigation}) => {
    return (
        <StyledContainer>
            <NavBar children={'notify'} navigation={navigation}></NavBar>
        </StyledContainer>
    );
}

export default Notify;