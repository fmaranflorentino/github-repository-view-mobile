import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';

const Stack = createStackNavigator();

const screenOptions = {
  headerLayoutPreset: 'center',
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#7159c1',
  },
  headerTintColor: '#fff',
};

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Usuários"
          component={Main}
          options={screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
