import Main from './main/main';
import Login from './login/login';
import Start from './start/start';
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
      <Stack.Navigator>
        <Stack.Screen
          //TODO these names should come from an enum and navigate should also get from the same enum
          name="Start"
          component={Start}
          //TODO this header shown is everywhere, decrease it to one
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tutorial"
          component={Tutorial}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Destination"
          component={Destination}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Inbox"
          component={Inbox}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
