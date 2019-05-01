import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import ListScreen from "./screens/ListScreen";
import LoginScreen from "./screens/LoginScreen";

const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  List: {screen: ListScreen},
}, {
  initialRouteName: 'Login'
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
