import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Font } from 'expo';
import ListScreen from './screens/ListScreen';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';


const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  List: { screen: ListScreen },
  Map: { screen: MapScreen },
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFontsLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isFontsLoaded: true });
  }

  render() {
    const { isFontsLoaded } = this.state;
    return (isFontsLoaded && <AppContainer />);
  }
}
