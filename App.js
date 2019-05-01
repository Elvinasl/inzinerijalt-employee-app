import React from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import Globals from "./Globals";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  handleInput(code) {
    this.setState({code})
    alert(code);
  }

  handleLoginClick() {
    console.log('click', Globals.SERVER_URL)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Jūsų prisijungimo kodas:</Text>
        <TextInput
            placeholder="Kodas"
            onChangeText={(text) => this.handleInput(text)}
        />
        <Button
            title={'Prisijungti'}
            onPress={() => this.handleLoginClick()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
