import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();

class App extends React.Component  {
  
  static BASE_URL = 'http://192.168.0.16:45455/api/';

  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

};

export default App;