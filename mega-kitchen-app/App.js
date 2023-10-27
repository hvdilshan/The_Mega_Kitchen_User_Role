import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, LogoTitle } from 'react-native';
import { Colors } from './components/styles';
// screens
import Welcome from './screens/Welcome/Welcome';
import Login from './screens/Login/Login';
import Signup from './screens/Signup/Signup';
import Account from './screens/Account/Account';
import Review from './screens/Review/Review';
import Menu from './screens/Menu/Menu';
import Cart from './screens/Cart/Cart';
import Notify from './screens/Notify/Notify';
import PostReview from './screens/Review/PostReview';
import { AuthProvider } from './components/AuthContext';

const Stack = createNativeStackNavigator();
const { brand } = Colors;

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: brand },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false, animation: 'none' }} />
          <Stack.Screen name="Login" component={Login} options={{ title: '', animation: 'none' }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: '', animation: 'none' }} />
          <Stack.Screen name="Account" component={Account} options={{ title: 'My Account', animation: 'none' }} />
          <Stack.Screen name="Review" component={Review} options={{ title: 'Review', animation: 'none' }} />
          <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu', animation: 'none' }} />
          <Stack.Screen name="Notify" component={Notify} options={{ title: 'Notification', animation: 'none' }} />
          <Stack.Screen name="Cart" component={Cart} options={{ title: 'Cart', animation: 'none' }} />
          <Stack.Screen
            name="PostReview"
            component={PostReview}
            options={{ title: 'Post Review', animation: 'none' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
