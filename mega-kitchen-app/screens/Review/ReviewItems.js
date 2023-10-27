import React from 'react';
import { StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ListView, Colors, ListCardHeader, ListCardTimeHit, ListCardContent } from '../../components/styles';
import Icon from 'react-native-ico-material-design';
import CustomRatingBar from '../../components/CustomRatingBar';

const { primary } = Colors;

const ReviewItems = ({ reviews, setReviews }) => {
  return (
    <SwipeListView
      style={{ maxHeight: 500 }}
      data={reviews}
      renderItem={(data) => {
        return (
          <ListView>
            <>
              <Icon
                name="round-account-button-with-user-inside"
                style={{ ...styles.IconBehave }}
                width={45}
                height={45}
              />
              <ListCardHeader>{data.item.name}</ListCardHeader>
              <ListCardTimeHit>{data.item.long}</ListCardTimeHit>
              <CustomRatingBar
                customStyles={styles.RatingBar}
                starImgStyle={styles.starImgStyle}
                rating={data.item.rate}
                isLabel={true}
              />
              <ListCardContent>{data.item.comment}</ListCardContent>
            </>
          </ListView>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  IconBehave: {
    padding: 14,
  },
  TextBehave: {
    color: primary,
  },
  RatingBar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 45,
    left: 65,
  },
  starImgStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
});

export default ReviewItems;
