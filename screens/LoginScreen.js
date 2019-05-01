import React from 'react';
import {Container, Header, Content, Item, Input, Button, Toast, Root, Text} from 'native-base';
import Globals from '../Globals';
import { StyleSheet } from "react-native";

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
                    <Content contentContainerStyle={styles.content}>
                        <Item rounded>
                            <Input placeholder='Jūsų prisijungimo kodas' onChangeText={(text) => this.handleInput(text)} />
                        </Item>
                        <Button large success onPress={() => this.handleLoginClick()}>
                            <Text>Prisijungti</Text>
                        </Button>
                    </Content>
                </Container>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
