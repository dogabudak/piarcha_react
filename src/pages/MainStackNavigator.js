import Main from './main/main';
import Login from './login/login';
import Start from './start/start';
import Register from './register/register';
import Tutorial from './tutorial/tutorial';
import Profile from './profile/profile';
import Destination from './destination/destination';

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Tutorial" component={Tutorial} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Destination" component={Destination} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
