import React, { useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';

const CustomRatingBar = ({ rating, customStyles, starImgStyle, isLabel = false, onRatingChange }) => {
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';
  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';

  const [defaultRating, setDefaultRating] = useState(rating);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const handleRatingChange = (item) => {
    if (!isLabel) {
      setDefaultRating(item);
      if (onRatingChange) {
        onRatingChange(item);
      }
    }
  };

  return (
    <View style={{ ...customStyles }}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => handleRatingChange(item)}>
            <Image
              style={{ ...starImgStyle }}
              source={
                defaultRating == 0
                  ? { uri: starImgCorner }
                  : item <= defaultRating
                  ? { uri: starImgFilled }
                  : { uri: starImgCorner }
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomRatingBar;
