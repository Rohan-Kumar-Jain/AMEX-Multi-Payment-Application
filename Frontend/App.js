import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Document from './src/components/Document';
import ManualBill from './src/components/ManualBill';
import CheckOut from './src/components/CheckOut';
import Home from './src/components/Home';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import Pin from './src/components/Pin';
import Views from './src/components/Views';
import Passbook from './src/components/Passbook';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Document"
          component={Document}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManualBill"
          component={ManualBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckOut"
          component={CheckOut}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pin"
          component={Pin}
          options={{headerShown: false}}
        />
            <Stack.Screen
          name="Views"
          component={Views}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Passbook"
          component={Passbook}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
