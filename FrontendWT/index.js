/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './screens/Login';
import Register from './screens/Register';
import Subscriptions from './screens/Subscriptions';

AppRegistry.registerComponent(appName, () => App);
