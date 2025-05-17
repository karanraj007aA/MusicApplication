import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import Login from '../screen/Auth';
import AudioPlayerScreen from '../screen/Player';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="AudioPlayerScreen" component={AudioPlayerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
