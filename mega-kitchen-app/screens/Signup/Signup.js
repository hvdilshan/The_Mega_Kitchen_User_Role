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
  ExtraView,
  TextLinkContent,
  LeftIcon,
  StyledInputLabel
} from '../../components/styles';
import { StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import CustomInput from '../../components/CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import CustomAlert from '../../components/CustomAlert';
import { SelectList } from 'react-native-dropdown-select-list';
import {View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { brand, darkLight, error, secondary, tertiary } = Colors;

//Item array for the dropdown
const organizations = ['SLIIT','NIBM', 'IIT', 'ABC'];

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2023, 0, 1));
  const [serverData, setServerData] = useState([]);
  const [isAlertVisible, setAlertVisibility] = useState(false);
  const [alertType, setAlertType] = useState('warning');
  const [alertTitle, setAlertTitle] = useState('Alert');
  const [alertMassage, setAlertMassage] = useState('Are You Sure?');
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isSignupDone, setIsSignupDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [dob, setDob] = useState();

  const [organization, setOrganization] = useState();

  const [fdata, setFdata] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
    organization: ''
  });

  const warningAlert = () => {
    setAlertVisibility(true);
    setAlertType('warning');
    setAlertTitle('Warning');
    setAlertMassage('Fields cannot be empty!');
  };

  useEffect(() => {
    if (!isInitialRender) {
      console.log(fdata);
      if(fdata.name == '' ||
          fdata.email == '' ||
          fdata.phone == '' ||
          fdata.dob == '' ||
          fdata.dob == undefined ||
          fdata.organization == '' ||
          fdata.password == ''){
            setErrorMsg('Fields cannot be empty!');
          }
      else {
        fetch('http://10.0.2.2.:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fdata)
        })
        .then(res => res.json()).then(
          data => {
            if(data.error){
              // setAlertMassage(data.error);
              // setAlertVisibility(true);
              setErrorMsg(data.error);
            }else{
              setAlertTitle('Successful');
              setAlertMassage('Account Create Successfully');
              setAlertVisibility(true);
              setIsSignupDone(true);
            }
            console.log(data)
          }
        )
      }
    } else {
      setIsInitialRender(false);
    }
  }, [fdata]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark;" />
        <InnerContainer>
          <PageTitle>Sign Up</PageTitle>
          {
              errorMsg ? <Text style={styles.errorMessage}>{errorMsg}</Text> : null
          }
          {show && (
            <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} onChange={onChange} />
          )}

          <Formik
            initialValues={{ name: '', email: '', phone: '', dateOfBirth: '', password: '', organization: '' }}
            onSubmit={(values) => {
              setFdata({
                name: values.name,
                email: values.email,
                phone: values.phone,
                dob: dob,
                password: values.password,
                organization: organization
              })
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
                <CustomInput
                  label="Date of Birth"
                  icon="calendar-outline"
                  placeholder="YYYY - MM - DD"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('dateOfBirth')}
                  onBlur={handleBlur('dateOfBirth')}
                  value={dob ? dob.toDateString() : ''}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
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
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Sign Up</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLinkContent onPress={() => navigation.navigate('Login')}>Login</TextLinkContent>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
        <CustomAlert
          visible={isAlertVisible}
          type={alertType}
          title={alertTitle}
          message={alertMassage}
          onOk={() => {
            setAlertVisibility(false);
            if(isSignupDone){
              navigation.navigate('Login');
            }
          }}
        />
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: error,
    padding: 10,
    borderRadius: 10,
    width: '90%',
    marginBottom: 5,
    marginTop: 5
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

export default Signup;
