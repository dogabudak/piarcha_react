import Main from './main/main';
import Login from './login/login';
import Start from './start/start';
import ForgotPassword from './forgotPassword/forgotPassword';
import Register from './register/register';
import Tutorial from './tutorial/tutorial';
import Profile from './profile/profile';
import Destination from './destination/destination';
import Inbox from './inbox/inbox';
import Settings from './settings/settings';

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          //TODO these names should come from an enum and navigate should also get from the same enum
          name="Start"
          component={Start}
        />
        <Stack.Screen name="Tutorial" component={Tutorial} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Destination" component={Destination} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Inbox" component={Inbox} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
