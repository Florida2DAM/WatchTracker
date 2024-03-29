import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Subscriptions from './screens/Subscriptions';
import Providers from './screens/Providers';
import FooterMenu from './components/general/FooterMenu';
import AddSubscription from './screens/AddSubscription';
import Home from './screens/Home';
import Search from './screens/Search';
import MyList from './screens/MyList';
import Details from './screens/Details';
import Profile from './screens/Profile';

const Stack = createStackNavigator();

class App extends React.Component  {
  
  static BASE_URL = 'http://192.168.0.16:45455/api/';

  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Search" component={Search}/>
          <Stack.Screen name="MyList" component={MyList}/>
          <Stack.Screen name="Details" component={Details}/>
          <Stack.Screen name="Subscriptions" component={Subscriptions}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="AddSubscription" component={AddSubscription}/>
          <Stack.Screen name="Providers" component={Providers}/>
          <Stack.Screen name="FooterMenu" component={FooterMenu}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

};

export default App;