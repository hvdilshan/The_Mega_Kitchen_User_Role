import { NavContainer, Colors } from './styles';
import Icon from 'react-native-ico-material-design';
import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

const { primary, brand } = Colors;

const NavBar = ({ navigation, children }) => {
  return (
    <NavContainer>
      {children === 'menu' ? (
        <Pressable disabled={true}>
          <Icon
            name="menu-button"
            style={{ ...styles.IconBehave }}
            background={{ type: 'circle', color: primary }}
            width={45}
            height={45}
          />
          <Text style={{ ...styles.TextBehave, left: 2 }}>Menu</Text>
        </Pressable>
      ) : (
        <Pressable
          disabled={false}
          onPress={() => navigation.navigate('Menu')}
          android_ripple={{ borderless: true, radius: 45 }}
        >
          <Icon
            name="menu-button"
            style={{ ...styles.IconBehave }}
            background={{ type: 'circle', color: primary }}
            width={45}
            height={45}
          />
          <Text style={{ left: 2 }}>Menu</Text>
        </Pressable>
      )}
      {children === 'cart' ? (
        <Pressable disabled={true}>
          <Icon
            name="shopping-cart"
            style={{ ...styles.IconBehave }}
            background={{ type: 'circle', color: primary }}
            width={45}
            height={45}
          />
          <Text style={{ ...styles.TextBehave, left: 7 }}>Cart</Text>
        </Pressable>
      ) : (
        <Pressable
          disabled={false}
          onPress={() => {
            navigation.navigate('Cart');
          }}
          android_ripple={{ borderless: true, radius: 45 }}
        >
          <Icon
            name="shopping-cart"
            style={{ ...styles.IconBehave }}
            background={{ type: 'circle', color: primary }}
            width={45}
            height={45}
          />
          <Text style={{ left: 7 }}>Cart</Text>
        </Pressable>
      )}
      {children === 'notify' ? (
        <Pressable disabled={true}>
          <Icon
            name="notifications-button"
            style={{ ...styles.IconBehave }}
            background={{ type: 'circle', color: primary }}
            width={45}
            height={45}
          />
          <Text style={{ ...styles.TextBehave, left: 2 }}>Notify</Text>
        </Pressable>
      ) : (
        <Pressable
          disabled={false}
          onPress={() => {
            navigation.navigate('Notify');
          }}
          android_ripple={{ borderless: true, radius: 45 }}
        >
          <Icon
            name="notifications-button"
            style={{ ...styles.IconBehave }}
            background={{ type: 'circle', color: primary }}
            width={45}
            height={45}
          />
          <Text style={{ left: 2 }}>Notify</Text>
        </Pressable>
      )}
      {children === 'rate' ? (
        <Pressable disabled={true}>
          <Icon
            name="rate-star-button"
            style={{ ...styles.IconBehave, left: 3 }}
            background={{ type: 'circle', color: primary }}
            width={45}
            height={45}
          />
          <Text style={{ ...styles.TextBehave, left: 3 }}>Review</Text>
        </Pressable>
      ) : (
        <Pressable
          disabled={false}
          onPress={() => {
            navigation.navigate('Review');
          }}
          android_ripple={{ borderless: true, radius: 45 }}
        >
          <Icon
            name="rate-star-button"
            style={{ ...styles.IconBehave, left: 3 }}
            background={{ type: 'circle', color: primary }}
            width={45}
            height={45}
          />
          <Text style={{ left: 3 }}>Review</Text>
        </Pressable>
      )}
      {children === 'user' ? (
        <Pressable disabled={true}>
          <Icon
            name="user-shape"
            style={{ ...styles.IconBehave, left: 6 }}
            background={{ type: 'circle', color: primary }}
            width={45}
            height={45}
          />
          <Text style={{ ...styles.TextBehave, left: 3 }}>Account</Text>
        </Pressable>
      ) : (
        <Pressable
          disabled={false}
          onPress={() => {
            navigation.navigate('Account');
          }}
          android_ripple={{ borderless: true, radius: 45 }}
        >
          <Icon
            name="user-shape"
            style={{ ...styles.IconBehave, left: 6 }}
            background={{ type: 'circle', color: primary }}
            width={45}
            height={45}
          />
          <Text style={{ left: 3 }}>Account</Text>
        </Pressable>
      )}
    </NavContainer>
  );
};

const styles = StyleSheet.create({
  IconBehave: {
    padding: 14,
  },
  TextBehave: {
    color: primary,
  },
});

export default NavBar;
