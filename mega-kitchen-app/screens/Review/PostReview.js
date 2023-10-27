import React, { useState } from 'react';
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  StyledFormArea,
  StyledButton,
  Colors,
  ButtonText,
} from '../../components/styles';
import { AppLogo, PageText } from '../Welcome/WelcomeStyle';
import { Formik } from 'formik';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import Icon from 'react-native-ico-material-design';
import { Modal, View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import NavBar from '../../components/NavigationBar';
import CustomRatingBar from '../../components/CustomRatingBar';
import { BlurView } from 'expo-blur';
import { useAuth } from '../../components/AuthContext';
import { format } from 'date-fns';

const { gry, primary, tertiary } = Colors;

const PostReview = ({ navigation }) => {
  const [name, setName] = useState('Tiran Jayawardena');
  const [review, setReview] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const { loginUserName, setLoginUserName } = useAuth();
  const { loginEmail, setLoginEmail } = useAuth();

  const currentDate = format(new Date(), "EEE, dd MMM yyyy HH:mm:ss 'GMT'", { timeZone: 'GMT' });

  function renderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <BlurView intensity={90} width={'100%'} height={'100%'}>
          <TouchableOpacity
            style={{ left: 350 }}
            onPress={() => {
              setOpenModal(false);
              navigation.navigate('Review');
            }}
          >
            <Icon
              name="clear-button"
              style={{ ...styles.IconBehave }}
              background={{ type: 'circle', color: primary }}
              width={30}
              height={30}
            />
          </TouchableOpacity>
          <AppLogo
            resizeMode="cover"
            style={{ left: 70, top: 80, marginBottom: 90 }}
            source={require('../../assets/img/review-icon.png')}
          />
          <Text style={{ fontFamily: 'Aclonica', fontSize: 60, textAlign: 'center' }}>Thank You!</Text>
          <PageText style={{ fontSize: 28 }}>Your Review has been Posted.</PageText>
        </BlurView>
      </Modal>
    );
  }
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <Icon
            name="round-account-button-with-user-inside"
            style={{ ...styles.IconBehave }}
            width={100}
            height={100}
          />
          <PageTitle style={{ color: 'black' }}>{loginUserName}</PageTitle>
          <CustomRatingBar
            customStyles={styles.RatingBar}
            starImgStyle={styles.starImgStyle}
            rating={0}
            onRatingChange={(newRating) => setRating(newRating)}
          />
          <Formik
            initialValues={{ review: '' }}
            onSubmit={(values) => {
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea style={styles.formArea}>
                <TextInput
                  editable
                  multiline
                  numberOfLines={30}
                  maxLength={2000}
                  style={styles.inputText}
                  placeholderTextColor={gry}
                  placeholder="Enter your feedback and suggestions here."
                  onChangeText={(text) => setReview(text)}
                  value={review}
                />
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 150 }}>
                  <StyledButton
                    onPress={() => {
                      handleSubmit;
                      data = {
                        name: loginUserName,
                        rate: rating,
                        comment: review,
                        date: currentDate,
                      };
                      if (data) {
                        fetch('http://10.0.2.2.:3000/postReview', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(data),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            if (data.error) {
                              setErrorMsg(data.error);
                            } else {
                            }
                          });
                      }
                      setOpenModal(true);
                    }}
                  >
                    <ButtonText>POST REVIEW</ButtonText>
                  </StyledButton>
                </View>
                {renderModal()}
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
        <NavBar children={'rate'} navigation={navigation}></NavBar>
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
  RatingBar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 170,
    left: 96,
  },
  starImgStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  formArea: {
    top: 30,
  },
  inputText: {
    height: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: tertiary,
    borderColor: tertiary,
    fontSize: 16,
    justifyContent: 'flex-start',
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 15,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
});

export default PostReview;
