import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  StyledFormArea,
  StyledButton,
  Colors,
  ButtonText,
  ExtraText,
  ExtraViewForLogin,
  TextLinkContent,
} from '../../components/styles';
import { Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import CustomAlert from '../../components/CustomAlert';
import { StyleSheet, Text } from 'react-native';
import { useAuth } from '../../components/AuthContext';

const { darkLight, error } = Colors;

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [isAlertVisible, setAlertVisibility] = useState(false);
  const [alertType, setAlertType] = useState('warning');
  const [alertTitle, setAlertTitle] = useState('Alert');
  const [alertMassage, setAlertMassage] = useState('Are You Sure?');
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const { loginEmail, setLoginEmail } = useAuth();

  const [fdata, setFdata] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!isInitialRender) {
      if (fdata.email == '' || fdata.password == '') {
        setAlertMassage('Invalid Credentials');
        warningAlert();
      } else {
        fetch('http://10.0.2.2.:3000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fdata),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setErrorMsg(data.error);
            } else {
              setLoginEmail(fdata.email);
              navigation.navigate('Account');
            }
          });
      }
    } else {
      setIsInitialRender(false);
    }
  }, [fdata]);

  const warningAlert = () => {
    setAlertVisibility(true);
    setAlertType('warning');
    setAlertTitle('Warning');
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Log In</PageTitle>
          {errorMsg ? <Text style={styles.errorMessage}>{errorMsg}</Text> : null}
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
              setFdata({
                email: values.email,
                password: values.password,
              });
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <CustomInput
                  label="Email"
                  icon="mail-outline"
                  placeholder="example@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                <CustomInput
                  label="Password"
                  icon="lock-closed-outline"
                  placeholder="Enter Password"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <StyledButton
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <ButtonText>Log in</ButtonText>
                </StyledButton>
                <ExtraViewForLogin>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLinkContent onPress={() => navigation.navigate('Signup')}>Signup</TextLinkContent>
                </ExtraViewForLogin>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
        <CustomAlert
          visible={isAlertVisible}
          type={alertType}
          title={alertTitle}
          message={alertMassage}
          onConfirm={() => {
            setAlertVisibility(false);
          }}
          onCancel={() => {
            setAlertVisibility(false);
          }}
          onOk={() => {
            setAlertVisibility(false);
          }}
        />
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: error,
    padding: 10,
    borderRadius: 10,
    width: '90%',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Login;
