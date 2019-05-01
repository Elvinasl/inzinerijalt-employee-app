import React from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import Globals from '../Globals';


export default class LoginScreen extends React.Component {

    static navigationOptions = {
        title: 'Prašome prisijungti',
    };

    constructor(props) {
        super(props);
        this.state = {
            code: ''
        };
    }

    handleInput(code) {
        this.setState({code})
    }

    handleLoginClick() {
        console.log('click', Globals.SERVER_URL)
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Jūsų prisijungimo kodas:</Text>
                <TextInput
                    placeholder="Kodas"
                    onChangeText={(text) => this.handleInput(text)}
                />
                <Button
                    title={'Prisijungti'}
                    onPress={() => navigate('List')}
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
