import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import ListScreen from "./screens/ListScreen";
import LoginScreen from "./screens/LoginScreen";
import { Font } from 'expo';


const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  List: {screen: ListScreen},
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  render() {
    return <AppContainer />;
  }
}
