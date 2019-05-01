import React from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import Globals from '../Globals';
import { Font } from 'expo';


export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            showToast: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }

    handleInput(code) {
        this.setState({code})
    }

    handleLoginClick() {
        const { navigation } = this.props;
        const { code } = this.state;

        fetch(`${Globals.SERVER_URL}/api/app/get-my-sales?app_code=1111`, { // TODO: replace number with the state code
                method: 'GET',
            })
            .then((response) => response.json())
            .then((responseJson) => {
                navigation.push('List', {
                    name: responseJson.username,
                    sales: responseJson.sales,
                });
            })
            .catch((error) => {
                console.error(error);
                // TODO: proper error handling
            });
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
