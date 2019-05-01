import {createStackNavigator, createAppContainer} from 'react-navigation';
import ListScreen from "./screens/ListScreen";
import LoginScreen from "./screens/LoginScreen";

const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  List: {screen: ListScreen},
},
{
  initialRouteName: 'Login'
});

const App = createAppContainer(MainNavigator);

export default App;
