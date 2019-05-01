import {createStackNavigator, createAppContainer} from 'react-navigation';
import ListScreen from "./screens/ListScreen";
import LoginScreen from "./screens/LoginScreen";

const MainNavigator = createStackNavigator({
  Home: {screen: LoginScreen},
  List: {screen: ListScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
