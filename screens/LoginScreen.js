import React from 'react';
import {Container, Header, Content, Item, Input, Button, Toast, Root, Text} from 'native-base';
import Globals from '../Globals';
import { StyleSheet, Image } from "react-native";

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
                <Container>
                    <Header />
                    <Container style={styles.logoContainer}>
                        <Image source={require('../assets/inzinerijalt_png_logo.png')} />
                    </Container>
                    <Content contentContainerStyle={styles.content}>
                        <Item rounded>
                            <Input
                                placeholder='Jūsų prisijungimo kodas'
                                onChangeText={(text) => this.handleInput(text)}
                                keyboardType={"number-pad"}
                                style={styles.placeholder}
                            />
                        </Item>
                        <Button
                            onPress={() => this.handleLoginClick()}
                            style={styles.loginBtn}
                            large
                            success
                        >
                            <Text>Prisijungti</Text>
                        </Button>
                    </Content>
                </Container>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    loginBtn: {
        display: 'flex',
        alignSelf: 'center',
        marginTop: 10
    },
    placeholder: {
        textAlign: 'center'
    }
});
