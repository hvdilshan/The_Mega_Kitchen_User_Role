import { StyledContainer, StyledButton, ButtonText } from '../../components/styles';
import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavigationBar';
import ReviewItems from './ReviewItems';
import { View } from 'react-native';

const Review = ({ navigation }) => {
  const [initReviews, setInitReviews] = useState([]);
  const [reviews, setReviews] = useState([]);

  function defaultLoad() {
    fetch('http://10.0.2.2.:3000/getReviews', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setInitReviews(data);
        }
      });
  }

  function calculateTimeDifference(review) {
    const reviewDate = new Date(review.date);
    const currentDate = new Date();
    const timeDifference = currentDate - reviewDate;

    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const yearsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    const monthsAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const weeksAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    let long = '';
    if (daysAgo === 1) {
      long = 'yesterday';
    } else if (daysAgo === 2) {
      long = '2 days ago';
    } else if (daysAgo > 2 && daysAgo < 7) {
      long = `${daysAgo} days ago`;
    } else if (yearsAgo > 1) {
      long = `${yearsAgo} years ago`;
    } else if (yearsAgo === 1) {
      long = 'a year ago';
    } else if (monthsAgo > 1) {
      long = `${monthsAgo} months ago`;
    } else if (monthsAgo === 1) {
      long = 'a month ago';
    } else if (weeksAgo > 1) {
      long = `${weeksAgo} weeks ago`;
    } else if (weeksAgo === 1) {
      long = 'a week ago';
    } else {
      long = 'today';
    }

    return long;
  }

  const refreshReviews = () => {
    defaultLoad();
  };

  useEffect(() => {
    defaultLoad(); 

    const unsubscribe = navigation.addListener('focus', () => {
      refreshReviews();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const updatedReviews = initReviews.map((review) => {
      return {
        ...review,
        long: calculateTimeDifference(review),
      };
    });

    setReviews(updatedReviews);
  }, [initReviews]);

  return (
    <StyledContainer>
      <View style={{ top: 20 }}>
        <ReviewItems reviews={reviews} setReviews={setReviews} />
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 70 }}>
        <StyledButton
          onPress={() => {
            navigation.navigate('PostReview');
          }}
        >
          <ButtonText>POST REVIEW</ButtonText>
        </StyledButton>
      </View>
      <NavBar children={'rate'} navigation={navigation}></NavBar>
    </StyledContainer>
  );
};

export default Review;
