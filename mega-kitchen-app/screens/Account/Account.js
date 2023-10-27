import React, { useState, useEffect } from 'react';
import {
  StyledContainer,
  InnerContainer,
  Colors,
  StyledFormArea,
  StyledButton,
  ButtonText,
  LeftIcon,
  StyledInputLabel
} from '../../components/styles';
import { Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import NavBar from '../../components/NavigationBar';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-ico-material-design';
import CustomAlert from '../../components/CustomAlert';
import { useAuth } from '../../components/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';

let organizations = [];

const { brand, darkLight, primary, secondary, tertiary } = Colors;

const Account = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [isAlertVisible, setAlertVisibility] = useState(false);
  const [alertType, setAlertType] = useState('warning');
  const [alertTitle, setAlertTitle] = useState('Alert');
  const [alertMassage, setAlertMassage] = useState('Are You Sure?');
  const { loginEmail, setLoginEmail } = useAuth();
  const { loginUserName, setLoginUserName } = useAuth();
  const [organization, setOrganization] = useState('');
  const [details, setDetails] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    console.log('email ', loginEmail);
    if (loginEmail) {
      fetch('http://10.0.2.2.:3000/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrorMsg(data.error);
          } else {
            setDetails({
              name: data.name,
              email: data.email,
              organization: data.organization,
              phone: data.phone,
            });
            setOrganization(data.organization);
            setLoginUserName(data.name);
          }
        });
    }
  }, [loginEmail]);

  useEffect(() => {
    fetch('http://10.0.2.2.:3000/getOrganizations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrorMsg(data.error);
          } else {
            organizations = [];
            data.map(val => {
              organizations.push(val.name);
            });
            console.log('organizations', organizations);
          }
        });
  }, []);

  const confirmAlert = () => {
    setAlertVisibility(true);
    setAlertType('confirm');
    setAlertTitle('Changes');
  };

  const warningAlert = () => {
    setAlertVisibility(true);
    setAlertType('warning');
    setAlertTitle('Warning');
  };

  const SuccessAlert = () => {
    setAlertVisibility(true);
    setAlertType('warning');
    setAlertTitle('Successful');
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <Icon name="round-account-button-with-user-inside" style={{ ...styles.IconBehave }} width={80} height={80} />
          <Formik
            initialValues={details}
            enableReinitialize={true}
            onSubmit={(values) => {
              setDetails({
                ...values,
                organization: organization
              });
              if(values.name == '' ||
                values.email == '' ||
                values.phone == '' ||
                organization == ''){
                  setAlertMassage('Fields cannot be empty!');
                  warningAlert()
              }else{
                setAlertMassage('Are You Sure?');
                confirmAlert();
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <CustomInput
                  label="Name"
                  icon="person-outline"
                  placeholder="Name"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
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
                  label="Phone"
                  icon="phone-portrait-outline"
                  placeholder="Phone"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  keyboardType="number-pad"
                />
                <View>
                  <LeftIcon>
                    <Ionicons name={"earth-outline"} size={30} color={darkLight} />
                  </LeftIcon>
                  <StyledInputLabel>{"Organization"}</StyledInputLabel>
                  <SelectList 
                    setSelected={(val) => setOrganization(val)}
                    data={organizations}
                    placeholder={'Organization'}
                    search={false}
                    boxStyles={styles.boxStyles}
                    dropdownStyles={styles.dropdownStyles}
                    maxHeight={85}
                    defaultOption={{key: "", value: organization != '' ? organization : "SLIIT"}}
                  />
                </View>
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
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 87 }}>
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Save</ButtonText>
                  </StyledButton>
                </View>
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
            if (details) {
              fetch('http://10.0.2.2.:3000/account/update', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...details,
                  oldEmail: loginEmail,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.error) {
                    setAlertMassage(data.error);
                    warningAlert();
                  } else {
                    setLoginEmail(details.email);
                    setLoginUserName(details.name);
                    setAlertMassage('Successfully Updated');
                    SuccessAlert();
                  }
                });
            }
          }}
          onCancel={() => {
            setAlertVisibility(false);
          }}
          onOk={() => {
            setAlertVisibility(false);
          }}
        />
        <NavBar children={'user'} navigation={navigation}></NavBar>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  IconBehave: {
    padding: 14,
    top: 20,
    marginBottom: 20,
  },
  TextBehave: {
    color: primary,
  },
  boxStyles: {
    backgroundColor: secondary,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    height: 50,
    marginBottom: 10,
    marginVertical: 3,
    color: tertiary,
    borderWidth: 0,
    paddingLeft: 55,
  },
  dropdownStyles:{
    backgroundColor: secondary,
    marginBottom: 10,
    borderWidth: 0,
    marginTop: -18,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  }
});

export default Account;
