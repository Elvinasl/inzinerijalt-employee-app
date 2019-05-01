import React from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import { Container, Toast, Root } from "native-base";
import Globals from '../Globals';


export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
        };
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
            .catch(() => {
                Toast.show({
                    text: "Netinkamas kodas!",
                    buttonText: "Supratau",
                    position: "bottom",
                    type: "danger",
                    duration: 3000
                })
            });
    }

    render() {
        return (
            <Root>
                <Container style={styles.container}>
                    <Text>Jūsų prisijungimo kodas:</Text>
                    <TextInput
                        placeholder="Kodas"
                        onChangeText={(text) => this.handleInput(text)}
                    />
                    <Button
                        title={'Prisijungti'}
                        onPress={() => this.handleLoginClick()}
                    />
                </Container>
            </Root>
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
